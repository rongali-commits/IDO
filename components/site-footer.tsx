import { Link } from "@/components/plain-link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-lead">
        <p className="section-kicker">Have a useful idea?</p>
        <h2>Let&apos;s turn it into<br /><em>working software.</em></h2>
        <Link className="circle-link" href="/contact" aria-label="Start a project"><span>Start a<br />project</span><b>↗</b></Link>
      </div>
      <div className="shell footer-main">
        <div>
          <Link className="wordmark wordmark-large" href="/">noerong<span>.</span></Link>
          <p>Independent SaaS product studio.<br />Built in Bengaluru, available worldwide.</p>
        </div>
        <div className="footer-links">
          <nav aria-label="Footer pages"><span>Explore</span><Link href="/projects">Projects</Link><Link href="/about">About</Link><Link href="/essays">Writing</Link><Link href="/contact">Contact</Link></nav>
          <nav aria-label="Social links"><span>Elsewhere</span><a href="https://contra.com/rongalichaitanya" target="_blank" rel="noreferrer">Contra ↗</a><a href="https://www.linkedin.com/in/rongalichaitanya" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://x.com/rongalichay" target="_blank" rel="noreferrer">X ↗</a><a href="https://github.com/rongali-commits" target="_blank" rel="noreferrer">GitHub ↗</a></nav>
        </div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Noerong</span><span>Software that earns its place.</span></div>
    </footer>
  );
}
