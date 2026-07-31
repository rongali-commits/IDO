"use client";

export function NewsletterForm({ dark = false, source = "site" }: { dark?: boolean; source?: string }) {
  function trackSubscription() {
    window.gtag?.("event", "newsletter_signup", {
      signup_source: source,
      page_path: window.location.pathname,
      newsletter_provider: "substack",
    });
  }

  return (
    <form
      className={`newsletter-form ${dark ? "newsletter-dark" : ""}`}
      action="https://noerong.substack.com/api/v1/free?nojs=true"
      method="post"
      target="_blank"
      onSubmit={trackSubscription}
    >
      <input type="hidden" name="source" value="embed" />
      <label htmlFor={dark ? "footer-email" : `email-${source}`} className="sr-only">
        Email address
      </label>
      <div className="newsletter-row">
        <input
          id={dark ? "footer-email" : `email-${source}`}
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <button type="submit">Subscribe</button>
      </div>
      <p>Free. Unsubscribe whenever.</p>
    </form>
  );
}
