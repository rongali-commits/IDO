"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm({ dark = false, source = "site" }: { dark?: boolean; source?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const response = await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email: form.get("email") }), headers: { "Content-Type": "application/json" } });
    setState(response.ok ? "done" : "error");
    if (response.ok) {
      window.gtag?.("event", "newsletter_signup", {
        signup_source: source,
        page_path: window.location.pathname,
      });
      formElement.reset();
    }
  }
  return (
    <form className={`newsletter-form ${dark ? "newsletter-dark" : ""}`} onSubmit={submit}>
      <label htmlFor={dark ? "footer-email" : "email"} className="sr-only">Email address</label>
      <div className="newsletter-row">
        <input id={dark ? "footer-email" : "email"} name="email" type="email" placeholder="you@example.com" required disabled={state === "loading" || state === "done"} />
        <button type="submit" disabled={state === "loading" || state === "done"}>{state === "loading" ? "Joining…" : state === "done" ? "You’re in" : "Subscribe"}</button>
      </div>
      <p aria-live="polite">{state === "error" ? "Newsletter setup is not connected yet. See .env.example." : state === "done" ? "Welcome. The next idea will find you." : "No noise. No growth hacks. Unsubscribe whenever."}</p>
    </form>
  );
}
