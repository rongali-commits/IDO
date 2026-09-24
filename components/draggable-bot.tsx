"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";
import { NoerongBot } from "@/components/noerong-bot";
import { setBotHidden } from "@/components/bot-preference";
import { useMotionPaused } from "@/components/motion-preference";
import { advanceFlight, flightAtRest } from "@/lib/bot-flight.mjs";

const positionKey = "noerong-bot-position-v1";
type Position = { x: number; y: number };
type Pose = Position & { bank: number; yaw: number; pitch: number };
const clamp = (n: number, max: number) => Math.max(12, Math.min(n, Math.max(12, max)));

/** Pointer tracking and flight frames never rerender the chat or the SVG. */
export function DraggableBot({ open, launcher, onToggle, onMove }: {
  open: boolean;
  launcher: RefObject<HTMLButtonElement | null>;
  onToggle: () => void;
  onMove: () => void;
}) {
  const paused = useMotionPaused();
  const [dragging, setDragging] = useState(false);
  const [flying, setFlying] = useState(false);
  const [overRemove, setOverRemove] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const dock = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const position = useRef<Position | null>(null);
  const ignoreClick = useRef(false);
  const frame = useRef(0);
  const lastFrame = useRef(0);
  const flight = useRef<Pose | null>(null);
  const destination = useRef<Position | null>(null);
  const gesture = useRef<{ id: number; startX: number; startY: number; left: number; top: number; moved: boolean; original: Position | null } | null>(null);

  function limits() {
    return { x: Math.max(12, window.innerWidth - (dock.current?.offsetWidth || 76) - 12), y: Math.max(12, window.innerHeight - (dock.current?.offsetHeight || 89) - 12) };
  }
  function place(left: number, top: number): Position {
    const max = limits();
    return { x: (clamp(left, max.x) - 12) / Math.max(1, max.x - 12), y: (clamp(top, max.y) - 12) / Math.max(1, max.y - 12) };
  }
  const resting = useCallback((next: Position | null) => {
    const node = dock.current;
    if (!node) return;
    node.style.left = next ? `calc(12px + (100vw - var(--bot-width) - 24px) * ${next.x})` : "";
    node.style.top = next ? `calc(12px + (100dvh - var(--bot-height) - 24px) * ${next.y})` : "";
    node.style.right = next ? "auto" : "";
    node.style.bottom = next ? "auto" : "";
    node.style.transform = "";
    for (const key of ["--flight-bank", "--flight-yaw", "--flight-pitch"]) node.style.removeProperty(key);
  }, []);
  function save(next: Position | null) {
    position.current = next;
    try {
      if (next) sessionStorage.setItem(positionKey, JSON.stringify(next));
      else sessionStorage.removeItem(positionKey);
    } catch { /* The dock remains usable without storage. */ }
  }
  const stopFlight = useCallback((next: Position | null) => {
    cancelAnimationFrame(frame.current); frame.current = 0;
    flight.current = null; destination.current = null;
    resting(next); setFlying(false);
  }, [resting]);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(positionKey) || "null");
      if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
        position.current = { x: Math.max(0, Math.min(1, saved.x)), y: Math.max(0, Math.min(1, saved.y)) };
        resting(position.current);
      }
    } catch { /* Invalid or blocked storage starts at the normal dock. */ }
    const interrupt = () => {
      if (gesture.current) {
        position.current = gesture.current.original;
        gesture.current = null;
        setDragging(false); setOverRemove(false);
      }
      stopFlight(position.current);
    };
    const onVisibility = () => { if (document.hidden) interrupt(); };
    window.addEventListener("resize", interrupt);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("resize", interrupt);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [resting, stopFlight]);

  function paint(pose: Pose) {
    const node = dock.current;
    if (!node) return;
    node.style.left = "0px"; node.style.top = "0px";
    node.style.right = "auto"; node.style.bottom = "auto";
    node.style.transform = `translate3d(${pose.x}px,${pose.y}px,0)`;
    node.style.setProperty("--flight-bank", `${pose.bank}deg`);
    node.style.setProperty("--flight-yaw", `${pose.yaw}deg`);
    node.style.setProperty("--flight-pitch", `${pose.pitch}deg`);
  }
  function animate(now: number) {
    frame.current = 0;
    if (!flight.current || !destination.current) return;
    const reduced = document.documentElement.dataset.motion === "paused" || matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dt = (now - lastFrame.current) / 1000;
    lastFrame.current = now;
    flight.current = advanceFlight(flight.current, destination.current, dt, !!gesture.current?.moved, reduced);
    paint(flight.current);
    if (!gesture.current && flightAtRest(flight.current, destination.current)) { stopFlight(position.current); return; }
    if (!flightAtRest(flight.current, destination.current)) frame.current = requestAnimationFrame(animate);
  }
  function steer(left: number, top: number) {
    const max = limits();
    destination.current = { x: clamp(left, max.x), y: clamp(top, max.y) };
    if (!flight.current) {
      const box = dock.current!.getBoundingClientRect();
      flight.current = { x: box.left, y: box.top, bank: 0, yaw: 0, pitch: 0 };
    }
    if (paused) {
      flight.current = advanceFlight(flight.current, destination.current, 0, false, true);
      paint(flight.current);
      return;
    }
    setFlying(true);
    if (!frame.current) { lastFrame.current = performance.now(); frame.current = requestAnimationFrame(animate); }
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
    gesture.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, left: box.left, top: box.top, moved: false, original: position.current };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent<HTMLButtonElement>) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.startX, dy = event.clientY - current.startY;
    if (!current.moved && Math.hypot(dx, dy) < 7) return;
    if (!current.moved) { current.moved = true; onMove(); setDragging(true); }
    ignoreClick.current = true;
    steer(current.left + dx, current.top + dy);
    setOverRemove(hitsRemove(event.clientX, event.clientY));
  }
  function finish(event: PointerEvent<HTMLButtonElement>, cancelled = false) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    gesture.current = null;
    setDragging(false); setOverRemove(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!current.moved) return;
    if (cancelled) { stopFlight(current.original); return; }
    if (hitsRemove(event.clientX, event.clientY)) { stopFlight(position.current); setBotHidden(true); return; }
    const left = current.left + event.clientX - current.startX, top = current.top + event.clientY - current.startY;
    save(place(left, top)); steer(left, top);
    if (paused) stopFlight(position.current);
    setAnnouncement("Bot moved. Press Enter to chat.");
  }
  return <>
    <div ref={dock} className={`bot-dock${dragging ? " bot-is-dragging" : ""}${flying ? " bot-is-flying" : ""}${overRemove ? " bot-over-remove" : ""}`}>
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
            stopFlight(gesture.current.original); gesture.current = null; setDragging(false); setOverRemove(false); return;
          }
          if (event.key === "Delete" || event.key === "Backspace") { event.preventDefault(); setBotHidden(true); return; }
          const direction = ({ ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] } as Record<string, number[]>)[event.key];
          if (!direction) return;
          event.preventDefault(); onMove();
          const box = dock.current?.getBoundingClientRect();
          if (!box) return;
          const start = destination.current || { x: box.left, y: box.top };
          const step = event.shiftKey ? 60 : 24;
          const left = start.x + direction[0] * step, top = start.y + direction[1] * step;
          save(place(left, top)); steer(left, top);
          if (paused) stopFlight(position.current);
          setAnnouncement("Bot moved. Press Enter to chat.");
        }}><span className="bot-flight"><NoerongBot /></span></button>
    </div>
    <span id="bot-move-help" className="assistant-sr">Drag to move. Use arrow keys to reposition, Delete to hide. Add it again from the footer.</span>
    <span className="assistant-sr" role="status">{announcement}</span>
    <div ref={target} className={`bot-remove-target${dragging ? " bot-remove-active" : ""}${overRemove ? " bot-remove-ready" : ""}`} aria-hidden="true">
      <span className="bot-remove-cross">×</span><strong>{overRemove ? "Release to remove" : "Drop here to remove"}</strong>
      <small>Bring me back from the footer</small>
    </div>
  </>;
}
