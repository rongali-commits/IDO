"use client";

import { useEffect, useRef } from "react";

export function LinkedInBadge() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let script: HTMLScriptElement | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || script) return;
      script = document.createElement("script");
      script.src = "https://platform.linkedin.com/badges/js/profile.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      observer.disconnect();
    }, { rootMargin: "100px" });
    observer.observe(element);
    return () => { observer.disconnect(); script?.remove(); };
  }, []);
  return <section className="linkedin-section shell" aria-labelledby="linkedin-heading">
    <div><p className="section-kicker">Elsewhere</p><h2 id="linkedin-heading">Connect on LinkedIn.</h2><p>Follow my work, explore my professional background, and stay in touch.</p><p className="linkedin-disclosure">This profile card is provided by LinkedIn. <a href="/privacy">Privacy details</a>.</p></div>
    <div ref={host} className="linkedin-badge-wrap"><div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="rongalichaitanya" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/rongalichaitanya?trk=profile-badge">Rongali Chaitanya</a></div></div>
  </section>;
}
