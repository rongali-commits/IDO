"use client";

import { useRef, useState, type CSSProperties, type PointerEvent, type RefObject } from "react";
import { NoerongBot } from "@/components/noerong-bot";
import { setBotHidden } from "@/components/bot-preference";

const positionKey = "noerong-bot-position-v1";
type Position = { x: number; y: number };
const clamp = (n: number, max: number) => Math.max(12, Math.min(n, Math.max(12, max)));

/** A tiny pointer-only interaction layer. Chat does not rerender during a drag. */
export function DraggableBot({ open, launcher, onToggle, onMove }: {
  open: boolean;
  launcher: RefObject<HTMLButtonElement | null>;
  onToggle: () => void;
  onMove: () => void;
}) {
  const [position, setPosition] = useState<Position | null>(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(positionKey) || "null");
      if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
        return { x: Math.max(0, Math.min(1, saved.x)), y: Math.max(0, Math.min(1, saved.y)) };
      }
    } catch { /* Start in the dock when storage is unavailable or invalid. */ }
    return null;
  });
  const [dragging, setDragging] = useState(false);
  const [overRemove, setOverRemove] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const dock = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const ignoreClick = useRef(false);
  const gesture = useRef<{ id: number; startX: number; startY: number; left: number; top: number; moved: boolean; original: Position | null } | null>(null);

  function place(left: number, top: number): Position {
    const width = dock.current?.offsetWidth || 76, height = dock.current?.offsetHeight || 89;
    const maxX = Math.max(12, window.innerWidth - width - 12);
    const maxY = Math.max(12, window.innerHeight - height - 12);
    return { x: (clamp(left, maxX) - 12) / Math.max(1, maxX - 12), y: (clamp(top, maxY) - 12) / Math.max(1, maxY - 12) };
  }
  function save(next: Position | null) {
    try {
      if (next) sessionStorage.setItem(positionKey, JSON.stringify(next));
      else sessionStorage.removeItem(positionKey);
    } catch { /* Position still works in this page. */ }
  }
  function hitsRemove(x: number, y: number) {
    const box = target.current?.getBoundingClientRect();
    return !!box && x >= box.left - 16 && x <= box.right + 16 && y >= box.top - 16 && y <= box.bottom + 16;
  }
  function start(event: PointerEvent<HTMLButtonElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    const box = dock.current?.getBoundingClientRect();
    if (!box) return;
    ignoreClick.current = false;
    gesture.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, left: box.left, top: box.top, moved: false, original: position };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent<HTMLButtonElement>) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.startX, dy = event.clientY - current.startY;
    if (!current.moved && Math.hypot(dx, dy) < 7) return;
    if (!current.moved) { current.moved = true; onMove(); setDragging(true); }
    ignoreClick.current = true;
    setPosition(place(current.left + dx, current.top + dy));
    setOverRemove(hitsRemove(event.clientX, event.clientY));
  }
  function finish(event: PointerEvent<HTMLButtonElement>, cancelled = false) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    gesture.current = null;
    setDragging(false); setOverRemove(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!current.moved) return;
    if (cancelled) { setPosition(current.original); return; }
    if (hitsRemove(event.clientX, event.clientY)) { setBotHidden(true); return; }
    const next = place(current.left + event.clientX - current.startX, current.top + event.clientY - current.startY);
    setPosition(next); save(next); setAnnouncement("Bot moved. Press Enter to chat.");
  }
  const style = position ? { left: `calc(12px + (100vw - var(--bot-width) - 24px) * ${position.x})`, top: `calc(12px + (100dvh - var(--bot-height) - 24px) * ${position.y})`, right: "auto", bottom: "auto" } as CSSProperties : undefined;
  return <>
    <div ref={dock} className={`bot-dock${dragging ? " bot-is-dragging" : ""}${overRemove ? " bot-over-remove" : ""}`} style={style}>
      <button ref={launcher} type="button" className="assistant-launcher bot-launcher"
        title="Tap to chat. Drag to move."
        aria-expanded={open} aria-controls={open ? "noerong-assistant-panel" : undefined}
        aria-label={open ? "Close Noerong Bot" : "Chat with Noerong Bot"} aria-describedby="bot-move-help"
        onPointerDown={start} onPointerMove={move} onPointerUp={event => finish(event)}
        onPointerCancel={event => finish(event, true)} onLostPointerCapture={event => finish(event, true)}
        onClick={() => { if (ignoreClick.current) { ignoreClick.current = false; return; } onToggle(); }}
        onKeyDown={event => {
          if (event.key === "Enter" || event.key === " ") ignoreClick.current = false;
          if (event.key === "Escape" && gesture.current) {
            setPosition(gesture.current.original); gesture.current = null; setDragging(false); setOverRemove(false); return;
          }
          if (event.key === "Delete" || event.key === "Backspace") { event.preventDefault(); setBotHidden(true); return; }
          const direction = ({ ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] } as Record<string, number[]>)[event.key];
          if (!direction) return;
          event.preventDefault(); onMove();
          const box = dock.current?.getBoundingClientRect();
          if (!box) return;
          const step = event.shiftKey ? 60 : 24;
          const next = place(box.left + direction[0] * step, box.top + direction[1] * step);
          setPosition(next); save(next); setAnnouncement("Bot moved. Press Enter to chat.");
        }}><NoerongBot /></button>
    </div>
    <span id="bot-move-help" className="assistant-sr">Drag to move. Use arrow keys to reposition, Delete to hide. Add it again from the footer.</span>
    <span className="assistant-sr" role="status">{announcement}</span>
    <div ref={target} className={`bot-remove-target${dragging ? " bot-remove-active" : ""}${overRemove ? " bot-remove-ready" : ""}`} aria-hidden="true">
      <span className="bot-remove-cross">×</span><strong>{overRemove ? "Release to remove" : "Drop here to remove"}</strong>
      <small>Bring me back from the footer</small>
    </div>
  </>;
}
