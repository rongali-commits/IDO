"use client";

import { useEffect, useRef, useState } from "react";

type ShareMethod = "WhatsApp" | "X" | "LinkedIn" | "Copy link";

function trackShare(method: ShareMethod, title: string, url: string) {
  window.gtag?.("event", "share", {
    method,
    content_type: "essay",
    item_id: url,
    content_title: title,
  });
}

function copyWithFallback(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

export function EssayShare({ title, url }: { title: string; url: string }) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimer = useRef<number | null>(null);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedWhatsAppText = encodeURIComponent(`${title}\n${url}`);

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
  }, []);

  function resetCopyStatusLater() {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyStatus("idle"), 2400);
  }

  async function copyLink() {
    let copied = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        copied = true;
      } else {
        copied = copyWithFallback(url);
      }
    } catch {
      copied = copyWithFallback(url);
    }

    if (copied) {
      setCopyStatus("copied");
      trackShare("Copy link", title, url);
    } else {
      setCopyStatus("failed");
    }
    resetCopyStatusLater();
  }

  return (
    <aside className="essay-share" aria-labelledby="essay-share-title">
      <p className="eyebrow">Pass it on</p>
      <h2 id="essay-share-title">If you enjoyed this essay, share it with someone who might enjoy it too.</h2>
      <div className="essay-share-actions" aria-label="Share this essay">
        <a
          className="essay-share-action"
          href={`https://wa.me/?text=${encodedWhatsAppText}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShare("WhatsApp", title, url)}
          aria-label={`Share “${title}” on WhatsApp`}
        >
          WhatsApp
        </a>
        <a
          className="essay-share-action"
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShare("X", title, url)}
          aria-label={`Share “${title}” on X`}
        >
          X
        </a>
        <a
          className="essay-share-action"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShare("LinkedIn", title, url)}
          aria-label={`Share “${title}” on LinkedIn`}
        >
          LinkedIn
        </a>
        <button className="essay-share-action" type="button" onClick={copyLink}>
          {copyStatus === "copied" ? "Copied" : copyStatus === "failed" ? "Try again" : "Copy link"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {copyStatus === "copied" ? "Essay link copied." : copyStatus === "failed" ? "The link could not be copied." : ""}
      </p>
    </aside>
  );
}
