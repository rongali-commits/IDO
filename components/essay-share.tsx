"use client";

import { useState } from "react";

type EssayShareProps = {
  title: string;
  url: string;
};

export function EssayShare({ title, url }: EssayShareProps) {
  const [message, setMessage] = useState("");

  async function shareEssay() {
    setMessage("");

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setMessage("Link copied");
    } catch {
      setMessage("Copy the link below");
    }
  }

  return (
    <aside className="essay-share" aria-label="Share this essay">
      <div>
        <span className="essay-share-label">Pass it on</span>
        <p>If this question stayed with you, share it with someone curious.</p>
      </div>
      <div className="essay-share-actions">
        <button type="button" onClick={shareEssay}>
          Share this essay <span aria-hidden="true">↗</span>
        </button>
        <span className="essay-share-status" role="status" aria-live="polite">{message}</span>
        {message === "Copy the link below" && <a href={url}>{url}</a>}
      </div>
    </aside>
  );
}
