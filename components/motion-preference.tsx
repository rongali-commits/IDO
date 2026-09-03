"use client";

import { useSyncExternalStore } from "react";

const preferenceKey = "noerong-motion-paused";
const changeEvent = "noerong-motion-preference";
let sessionPreference: boolean | undefined;

function getPaused() {
  if (sessionPreference !== undefined) return sessionPreference;
  try {
    const saved = window.localStorage.getItem(preferenceKey);
    if (saved === "true" || saved === "false") return saved === "true";
  } catch { /* The system preference still works when storage is unavailable. */ }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.addEventListener(changeEvent, callback);
  window.addEventListener("storage", callback);
  media.addEventListener("change", callback);
  return () => {
    window.removeEventListener(changeEvent, callback);
    window.removeEventListener("storage", callback);
    media.removeEventListener("change", callback);
  };
}

export function useMotionPaused() {
  return useSyncExternalStore(subscribe, getPaused, () => true);
}

export function MotionControl() {
  const paused = useMotionPaused();
  return (
    <button className="motion-control" type="button" aria-pressed={paused} aria-label={paused ? "Resume cover motion" : "Pause cover motion"} onClick={() => {
      sessionPreference = !paused;
      try { window.localStorage.setItem(preferenceKey, String(!paused)); } catch { /* Keep the in-memory control usable. */ }
      window.dispatchEvent(new Event(changeEvent));
    }}>
      <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span> {paused ? "Play motion" : "Pause motion"}
    </button>
  );
}
