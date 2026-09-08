export type ChatMessage = { role: "user" | "assistant"; content: string };
export type AssistantEnv = { DEEPSEEK_API_KEY?: string; DEEPSEEK_MODEL?: string; ASSISTANT_DB?: D1Database };
const jsonHeaders = { "Cache-Control": "no-store", "Content-Type": "application/json" };
const fail = (error: string, status: number, extra = {}) => new Response(JSON.stringify({error}), {status,headers:{...jsonHeaders,...extra}});

export function parseMessages(value: unknown): ChatMessage[] | null {
  if (!value || typeof value!=="object" || !("messages" in value) || !Array.isArray(value.messages)) return null;
  const messages = value.messages;
  if (!messages.length || messages.length>9 || messages.length%2!==1) return null;
  let total=0;
  for (let i=0;i<messages.length;i++) {
    const m=messages[i];
    if (!m || typeof m!=="object" || m.role!==(i%2===0?"user":"assistant") || typeof m.content!=="string" || !m.content.trim() || m.content.length>(m.role==="user"?1200:5000)) return null;
    total+=m.content.length;
  }
  if(total>18000) return null;
  return messages.map(m=>({role:m.role,content:m.content.trim()}));
}

export async function consumeLimit(db: D1Database, secret: string, ip: string, now = Date.now()) {
  const day=Math.floor(now/86400000), minute=Math.floor(now/60000);
  const hash=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(`${secret}:${day}:${ip}`));
  const id=Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,"0")).join("");
  const increment=(key:string,max:number,expires:number)=>db.prepare(`INSERT INTO assistant_limits (bucket, count, expires_at) VALUES (?, 1, ?)
    ON CONFLICT(bucket) DO UPDATE SET count = count + 1 WHERE count < ? RETURNING count`).bind(key,expires,max);
  await db.prepare("DELETE FROM assistant_limits WHERE expires_at < ?").bind(now).run();
  // Each increment is atomic across workers. Exhausted visitor budgets never consume the global budget.
  const visitor=await db.batch([increment(`m:${minute}:${id}`,6,(minute+1)*60000),increment(`d:${day}:${id}`,30,(day+1)*86400000)]);
  if(visitor.some(x=>!x.results.length))return false;
  return !!(await increment(`global:${day}`,200,(day+1)*86400000).all()).results.length;
}

async function readLimited(request: Request) {
  if (!request.body) throw new Error("empty");
  const reader=request.body.getReader(); const chunks:Uint8Array[]=[]; let size=0;
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>32000){await reader.cancel();throw new Error("large");}chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length;}
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function handleAssistant(request: Request, env: AssistantEnv, instructions: string, knowledge: (query:string)=>string, fetcher:typeof fetch=fetch):Promise<Response> {
  const origin=request.headers.get("origin");
  if (!origin || origin!==new URL(request.url).origin || request.headers.get("sec-fetch-site")==="cross-site") return fail("Please open the assistant on Noerong's website.",403);
  if(!request.headers.get("content-type")?.startsWith("application/json"))return fail("Please send a text question.",415);
  let messages:ChatMessage[]|null;
  try { messages=parseMessages(await readLimited(request)); } catch { return fail("Please send a shorter question.",400); }
  if(!messages)return fail("Please start a new conversation and keep questions under 1,200 characters.",400);
  if(!env.DEEPSEEK_API_KEY || !env.ASSISTANT_DB)return fail("The assistant isn't available just yet. You can explore the projects or contact Chaitanya directly.",503);
  try {
    if(!await consumeLimit(env.ASSISTANT_DB,env.DEEPSEEK_API_KEY,request.headers.get("cf-connecting-ip") || "local-preview"))return fail("The assistant has reached its message limit. Please try later or contact Chaitanya directly.",429,{"Retry-After":"60"});
  } catch { return fail("I can't connect just now. Please try again later.",503); }
  const abort=new AbortController();
  const timeout=setTimeout(()=>abort.abort(),30000);
  const disconnect=()=>abort.abort();request.signal.addEventListener("abort",disconnect,{once:true});
  const cleanup=()=>{clearTimeout(timeout);request.signal.removeEventListener("abort",disconnect);};
  let upstream:Response;
  try {
    upstream=await fetcher("https://api.deepseek.com/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${env.DEEPSEEK_API_KEY}`,"Content-Type":"application/json"},signal:abort.signal,body:JSON.stringify({model:env.DEEPSEEK_MODEL || "deepseek-v4-flash",messages:[{role:"system",content:`${instructions}\n\nPUBLIC REFERENCE:\n${knowledge(messages.filter(m=>m.role==="user").map(m=>m.content).join("\n"))}`},...messages],stream:true,thinking:{type:"disabled"},max_tokens:900})});
  } catch {cleanup();return fail("I couldn't finish the answer. Please try again.",502);}
  if(!upstream.ok || !upstream.body){await upstream.body?.cancel();cleanup();return fail("I can't answer right now. Please try again later or contact Chaitanya directly.",502);}
  const reader=upstream.body.getReader(); const encoder=new TextEncoder();let cancelled=false;
  const stream=new ReadableStream({
    async start(controller){
      const send=(data:object)=>{if(!cancelled)controller.enqueue(encoder.encode(JSON.stringify(data)+"\n"));};
      let completed=false, terminated=false, buffer="", outputLength=0; const decoder=new TextDecoder();
      try {
        while(true){
          const {done,value}=await reader.read();if(done)break;
          buffer+=decoder.decode(value,{stream:true});
          const lines=buffer.split("\n");buffer=lines.pop() || "";
          for(const line of lines){
            if(!line.startsWith("data: "))continue;
            const data=line.slice(6).trim();if(data==="[DONE]"){terminated=true;continue;}
            const event=JSON.parse(data);
            if(event.error)throw new Error("provider failed");
            const choice=event.choices?.[0];
            const delta=choice?.delta?.content;
            if(typeof delta==="string"){
              outputLength+=delta.length;if(outputLength>5000)throw new Error("output limit");
              send({delta});
            }
            if(choice?.finish_reason==="stop")completed=true;
            else if(choice?.finish_reason)throw new Error("incomplete answer");
          }
        }
        if(!completed || !terminated || !outputLength)throw new Error("incomplete");
        send({done:true});
      } catch {send({error:"The answer was interrupted. Please try again."});}
      finally {cleanup();abort.abort();await reader.cancel().catch(()=>{});if(!cancelled)controller.close();}
    },
    cancel(){cancelled=true;cleanup();abort.abort();void reader.cancel();},
  });
  return new Response(stream,{headers:{"Content-Type":"application/x-ndjson; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
}
