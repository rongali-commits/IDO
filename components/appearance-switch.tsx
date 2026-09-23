"use client";

import { useSyncExternalStore } from "react";

const key = "noerong-appearance-v1";
const eventName = "noerong-appearance";
const snapshot = () => document.documentElement.dataset.appearance === "midnight";
const serverSnapshot = () => false;

function subscribe(onChange: () => void) {
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== key && event.key !== null) return;
    document.documentElement.dataset.appearance = event.newValue === "midnight" ? "midnight" : "studio";
    onChange();
  };
  window.addEventListener(eventName, onChange);
  window.addEventListener("storage", syncStorage);
  return () => {
    window.removeEventListener(eventName, onChange);
    window.removeEventListener("storage", syncStorage);
  };
}

export function AppearanceSwitch() {
  const midnight = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  function toggle() {
    const next = snapshot() ? "studio" : "midnight";
    document.documentElement.dataset.appearance = next;
    try { localStorage.setItem(key, next); } catch { /* The switch also works without storage. */ }
    window.dispatchEvent(new Event(eventName));
  }
  return <button type="button" className="appearance-switch" aria-label="Appearance: Midnight color theme" aria-pressed={midnight} title={midnight ? "Return to the warm Studio palette" : "Try the Midnight palette"} onClick={toggle}>
    <span className="appearance-symbol" aria-hidden="true" />
    <span>Appearance</span>
    <span className="appearance-current" aria-hidden="true">{midnight ? "Midnight" : "Studio"}</span>
  </button>;
}
