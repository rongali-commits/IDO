export function NewsletterForm({ dark = false, source = "site" }: { dark?: boolean; source?: string }) {
  const subscribeUrl = `https://noerong.substack.com/subscribe?utm_source=noerong.com&utm_medium=web&utm_campaign=${encodeURIComponent(source)}`;

  return (
    <div className={`newsletter-form newsletter-substack ${dark ? "newsletter-dark" : ""}`}>
      <p className="newsletter-substack-label">Delivered through Substack</p>
      <a className="newsletter-substack-link" href={subscribeUrl} target="_blank" rel="noopener noreferrer">
        <span>Subscribe free</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </a>
      <p>Free. Unsubscribe whenever.</p>
    </div>
  );
}
