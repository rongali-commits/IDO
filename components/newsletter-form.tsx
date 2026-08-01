export function NewsletterForm({ dark = false, source = "site" }: { dark?: boolean; source?: string }) {
  const embedUrl = `https://noerong.substack.com/embed?utm_source=noerong.com&utm_medium=web&utm_campaign=${encodeURIComponent(source)}`;

  return (
    <div className={`newsletter-form newsletter-embed ${dark ? "newsletter-dark" : ""}`}>
      <iframe
        title="Subscribe to Noerong"
        src={embedUrl}
        width="100%"
        height="320"
        loading="lazy"
        scrolling="no"
      />
      <p>Free. Unsubscribe whenever.</p>
    </div>
  );
}
