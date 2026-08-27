import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div>
          <Link className="wordmark wordmark-large" href="/">noerong<span>.</span></Link>
          <p>Focused SaaS products for real business work.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/#products">Products</Link>
          <Link href="/essays">Essays</Link>
          <a href="https://github.com/rongali-commits" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/rongalichaitanya" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </nav>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Noerong</span>
        <span>Independent product studio · Visakhapatnam, India</span>
      </div>
    </footer>
  );
}
