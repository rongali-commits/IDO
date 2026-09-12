export function LinkedInBadge() {
  return (
    <section className="linkedin-section shell" aria-labelledby="linkedin-heading">
      <div>
        <p className="section-kicker">Elsewhere</p>
        <h2 id="linkedin-heading">The work continues on LinkedIn.</h2>
        <p>Product notes, professional background, and the thinking behind the builds.</p>
      </div>
      <a className="linkedin-profile-card" href="https://www.linkedin.com/in/rongalichaitanya" target="_blank" rel="noreferrer" aria-label="Rongali Chaitanya on LinkedIn, opens in a new tab">
        <span className="linkedin-mark" aria-hidden="true">in</span>
        <span><strong>Rongali Chaitanya</strong><small>Founder at Noerong · LinkedIn</small></span>
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
