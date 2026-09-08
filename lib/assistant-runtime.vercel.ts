import { parseMessages, readLimited } from "./assistant-server";

const backend = "https://noerong-product-studio.rongalisai757.chatgpt.site";
const fail = (error: string, status: number) => Response.json({error}, {status, headers:{"Cache-Control":"no-store"}});

// The native Next.js build selects this adapter. Sites retains the D1-backed handler.
export async function respond(request: Request) {
  if(request.headers.get("origin")!==new URL(request.url).origin || request.headers.get("sec-fetch-site")==="cross-site") return fail("Please open the assistant on Noerong's website.",403);
  if(!request.headers.get("content-type")?.startsWith("application/json"))return fail("Please send a text question.",415);
  let messages;
  try { messages=parseMessages(await readLimited(request)); } catch {return fail("Please send a shorter question.",400);}
  if(!messages)return fail("Please start a new conversation and keep questions under 1,200 characters.",400);
  const secret=process.env.ASSISTANT_PROXY_SECRET;
  if(!secret)return fail("The assistant isn't available just yet. Please contact Chaitanya directly.",503);
  try {
    const upstream=await fetch(backend+"/api/assistant",{method:"POST",headers:{"Content-Type":"application/json",Origin:backend,"x-noerong-proxy-secret":secret,"x-noerong-client-ip":request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || "unknown-vercel-visitor"},body:JSON.stringify({messages}),signal:AbortSignal.any([request.signal,AbortSignal.timeout(35000)]),cache:"no-store"});
    const headers=new Headers({"Content-Type":upstream.headers.get("content-type")||"application/json","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});
    const retry=upstream.headers.get("retry-after");if(retry)headers.set("Retry-After",retry);
    if(!upstream.headers.get("content-type")?.includes("json")){await upstream.body?.cancel();return fail("I can't connect just now. Please try again later.",502);}
    return new Response(upstream.body,{status:upstream.status,headers});
  } catch {return fail("I couldn't finish the answer. Please try again.",502);}
}
