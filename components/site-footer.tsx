export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div>
          <a className="wordmark wordmark-large" href="/">noerong<span>.</span></a>
          <p>Focused SaaS products for real business work.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/#products">Products</a>
          <a href="/#about">About</a>
          <a href="/essays">Essays</a>
          <a href="https://contra.com/noerong_au1wq0v2" target="_blank" rel="noreferrer">Contra ↗</a>
          <a href="https://x.com/rongalichay" target="_blank" rel="noreferrer">X ↗</a>
          <a href="https://github.com/rongali-commits" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/rongalichaitanya" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </nav>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Noerong</span>
        <span>Independent product studio · Bengaluru, India</span>
      </div>
    </footer>
  );
}
