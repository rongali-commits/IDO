"use client";

import { useSyncExternalStore } from "react";

const key = "noerong-bot-hidden-v1";
const event = "noerong-bot-visibility";
let hiddenInMemory: boolean | undefined;

function getHidden() {
  if (hiddenInMemory !== undefined) return hiddenInMemory;
  try { return sessionStorage.getItem(key) === "true"; } catch { return false; }
}
function subscribe(callback: () => void) {
  window.addEventListener(event, callback);
  return () => window.removeEventListener(event, callback);
}
export function setBotHidden(hidden: boolean) {
  hiddenInMemory = hidden;
  try { sessionStorage.setItem(key, String(hidden)); } catch { /* Optional session storage. */ }
  window.dispatchEvent(new Event(event));
}
export function useBotHidden() {
  return useSyncExternalStore(subscribe, getHidden, () => true);
}
export function BotVisibilityControl() {
  const hidden = useBotHidden();
  return <button type="button" className="bot-visibility-control" onClick={() => setBotHidden(!hidden)}
    title={hidden ? "Restore Noerong Bot for this visit" : "Hide Noerong Bot on every page for this visit"}>
    {hidden ? "Add bot" : "Remove bot"}
  </button>;
}
