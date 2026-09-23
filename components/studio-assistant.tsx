"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { safeAssistantLink } from "@/lib/assistant-links";
import { useMotionPaused } from "@/components/motion-preference";
import "./studio-assistant.css";

type Message = { role: "user" | "assistant"; content: string };
const ReactMarkdown = lazy(() => import("react-markdown"));
const suggestions = ["Which project fits my idea?", "What can Chaitanya build?", "How does a project work?"];
const welcomeKey = "noerong-assistant-welcome-v1";

function Mark() { return <span className="assistant-mark" aria-hidden="true">n<span>·</span></span>; }

export function StudioAssistant() {
  const paused = useMotionPaused();
  const [open, setOpen] = useState(false);
  const [welcoming, setWelcoming] = useState(false);
  const welcome = useRef<HTMLDivElement>(null);
  const welcomeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const welcomeAttempted = useRef(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const panel = useRef<HTMLElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const feed = useRef<HTMLDivElement>(null);
  const latestTurn = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const active = useRef(false);

  useEffect(() => {
    const dismissOnPreference = () => setWelcoming(false);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("noerong-motion-preference", dismissOnPreference);
    media.addEventListener("change", dismissOnPreference);
    return () => {
      clearTimeout(welcomeTimer.current);
      window.removeEventListener("noerong-motion-preference", dismissOnPreference);
      media.removeEventListener("change", dismissOnPreference);
    };
  }, []);

  useEffect(() => {
    if (paused || open || welcomeAttempted.current || window.location.pathname !== "/") return;
    try { if (sessionStorage.getItem(welcomeKey)) return; } catch { /* Session storage is optional. */ }
    const arrival = setTimeout(() => {
      // Never interrupt someone who has already started navigating or typing.
      if (document.hidden || window.scrollY > 100 || document.activeElement?.matches("input, textarea, button, a, summary")) return;
      welcomeAttempted.current = true;
      try { sessionStorage.setItem(welcomeKey, "seen"); } catch { /* Keep the page functional in private contexts. */ }
      setWelcoming(true);
      welcomeTimer.current = setTimeout(() => setWelcoming(false), 6500);
    }, 1400);
    return () => { clearTimeout(arrival); clearTimeout(welcomeTimer.current); };
  }, [paused, open]);

  const showWelcome = welcoming && !open && !paused;
  function dismissWelcome() { clearTimeout(welcomeTimer.current); setWelcoming(false); }
  function holdWelcome() { clearTimeout(welcomeTimer.current); }
  function releaseWelcome() {
    if (welcome.current?.matches(":hover, :focus-within")) return;
    clearTimeout(welcomeTimer.current);
    welcomeTimer.current = setTimeout(() => setWelcoming(false), 3500);
  }
  function openAssistant() { dismissWelcome(); setOpen(true); }

  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  // Position a new question once. Streaming text must not move the reader.
  useEffect(() => {
    const container = feed.current, turn = latestTurn.current;
    if (!container || !turn) return;
    const padding = parseFloat(getComputedStyle(container).paddingTop) || 0;
    container.scrollTo({ top: container.scrollTop + turn.getBoundingClientRect().top - container.getBoundingClientRect().top - padding, behavior: "instant" });
  }, [messages.length, open]);
  useEffect(() => () => request.current?.abort(), []);

  function close() { setOpen(false); launcher.current?.focus(); }
  function reset() {
    request.current?.abort(); request.current = null; active.current = false;
    setBusy(false); setMessages([]); setError(""); setQuestion(""); input.current?.focus();
  }

  async function send(value: string) {
    const text = value.trim();
    if (!text || active.current) return;
    const history: Message[] = [...messages, { role: "user", content: text }];
    active.current = true;
    setMessages([...history, { role: "assistant", content: "" }]); setQuestion(""); setError(""); setBusy(true);
    const controller = new AbortController(); request.current = controller;
    let answer = "";
    try {
      const response = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history.slice(-9) }), signal: controller.signal });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data && typeof data === "object" && "error" in data && typeof data.error === "string" ? data.error : "I couldn't connect just now. Please try again or contact Chaitanya directly.");
      }
      if (!response.body) throw new Error("The answer couldn't be loaded. Please try again.");
      const reader = response.body.getReader(); const decoder = new TextDecoder();
      let pending = ""; let completed = false;
      while (true) {
        const { value: chunk, done } = await reader.read();
        if (done) break;
        pending += decoder.decode(chunk, { stream: true });
        const lines = pending.split("\n"); pending = lines.pop() || "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line);
          if (event.error) throw new Error(event.error);
          if (typeof event.delta === "string") {
            answer += event.delta;
            if (request.current === controller) setMessages([...history, { role: "assistant", content: answer }]);
          }
          if (event.done) completed = true;
        }
      }
      if (!completed || !answer.trim()) throw new Error("The answer was interrupted. Please try again.");
    } catch (cause) {
      if (request.current !== controller) return;
      if (!controller.signal.aborted) {
        // Incomplete answers are not treated as authoritative conversation history.
        setMessages(history.slice(0, -1)); setQuestion(text);
        setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
      }
    } finally {
      if (request.current === controller) { request.current = null; active.current = false; setBusy(false); }
    }
  }

  return <div className={`studio-assistant${showWelcome ? " assistant-is-welcoming" : ""}`}>
    <div ref={welcome} className="assistant-arrival" aria-hidden={!showWelcome} inert={!showWelcome}
      onPointerEnter={holdWelcome} onPointerLeave={releaseWelcome} onFocus={holdWelcome} onBlur={releaseWelcome}
      onKeyDown={event => { if (event.key === "Escape") { dismissWelcome(); launcher.current?.focus(); } }}>
      <button className="assistant-arrival-dismiss" aria-label="Dismiss welcome" onClick={() => { dismissWelcome(); launcher.current?.focus(); }}>×</button>
      <div className="assistant-arrival-heading"><span className="assistant-orbit" aria-hidden="true"><i /><i /><i /><Mark /></span><span className="assistant-eyebrow">YOUR STUDIO GUIDE<br /><small>A little help finding your way.</small></span></div>
      <p className="assistant-arrival-title">Good to have you here.</p>
      <p className="assistant-arrival-copy">I’m Noerong’s AI guide. Explore the work, or tell me what you’re thinking.</p>
      <button className="assistant-arrival-start" onClick={openAssistant}>Let’s explore <span aria-hidden="true">↗</span></button>
    </div>
    {open && <section id="noerong-assistant-panel" ref={panel} className="assistant-panel" role="dialog" aria-label="Ask about Noerong" onKeyDown={event => {
      if (event.key === "Escape") { event.stopPropagation(); close(); }
      if (event.key === "Tab") {
        const items = panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], textarea:not(:disabled), summary');
        if (!items?.length) return;
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }}>
      <header className="assistant-header"><Mark /><div><strong>Noerong assistant</strong><span>AI guide to the studio</span></div><button type="button" onClick={close} aria-label="Close assistant" className="assistant-icon">×</button></header>
      <div className="assistant-feed" ref={feed}>
        {!messages.length && <div className="assistant-welcome"><span className="assistant-eyebrow">A GOOD PLACE TO START</span><h2>What are you<br />looking to build?</h2><p>Ask about Chaitanya’s work, explore a project, or tell me about your idea.</p><div className="assistant-suggestions">{suggestions.map(s => <button key={s} onClick={() => void send(s)} disabled={busy}>{s}<span aria-hidden="true">↗</span></button>)}</div><a className="assistant-writing" href="/essays">Here for the writing? Explore the essays ↗</a></div>}
        {messages.filter((_, i) => i % 2 === 0).map((_, turnIndex) => <div className="assistant-turn" key={turnIndex} ref={turnIndex === Math.ceil(messages.length / 2) - 1 ? latestTurn : undefined}>
        {messages.slice(turnIndex * 2, turnIndex * 2 + 2).map((message) => <div className={`assistant-message assistant-message-${message.role}`} key={message.role}>
          <span className="assistant-speaker">{message.role === "user" ? "YOU" : "NOERONG AI"}</span>
          {message.content ? <Suspense fallback={<p>{message.content}</p>}><ReactMarkdown skipHtml allowedElements={["p", "strong", "em", "ul", "ol", "li", "a", "br"]} unwrapDisallowed urlTransform={safeAssistantLink} components={{ a: ({ href, children }) => href ? <a href={href}>{children}</a> : <span>{children}</span> }}>{message.content}</ReactMarkdown></Suspense> : <span className="assistant-thinking" role="status">Reading the studio notes<span aria-hidden="true"> ···</span></span>}
        </div>)}</div>)}
        {error && <div className="assistant-error" role="alert">{error} <a href="/contact">Contact Chaitanya ↗</a></div>}
      </div>
      <footer className="assistant-bottom">
        <div className="assistant-actions"><a href="/contact">Start a project ↗</a>{messages.length > 0 && <button type="button" onClick={reset}>New conversation</button>}</div>
        <form onSubmit={event => { event.preventDefault(); void send(question); }} className="assistant-composer">
          <label className="assistant-sr" htmlFor="studio-question">Your question about Noerong</label>
          <textarea ref={input} id="studio-question" placeholder="Ask about the work…" value={question} maxLength={1200} rows={2} onChange={event => setQuestion(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void send(question); } }} />
          <button type="submit" disabled={busy || !question.trim()} aria-label="Send question">{busy ? <span className="assistant-spinner" /> : "↑"}</button>
        </form>
        <div className="assistant-privacy"><span>AI can make mistakes. Check linked sources.</span><details><summary>Privacy</summary><p>Your messages are sent to DeepSeek to generate answers. Noerong does not save this conversation; it clears when you refresh. Avoid sharing confidential or sensitive information. <a href="/assistant-privacy">Read more ↗</a></p></details></div>
        <span className="assistant-sr" role="status" aria-live="polite">{busy ? "Preparing an answer" : messages.at(-1)?.role === "assistant" ? "Answer ready" : ""}</span>
      </footer>
    </section>}
    <button ref={launcher} type="button" className="assistant-launcher" title={open ? "Close Noerong assistant" : "Ask about Noerong"} aria-expanded={open} aria-controls={open ? "noerong-assistant-panel" : undefined} aria-label={open ? "Close Noerong assistant" : "Ask about Noerong"} onClick={() => open ? close() : openAssistant()}><Mark /><span>{open ? "Close Noerong assistant" : "Ask about Noerong"}</span><span className="assistant-launch-icon" aria-hidden="true">{open ? "×" : "↗"}</span></button>
  </div>;
}
