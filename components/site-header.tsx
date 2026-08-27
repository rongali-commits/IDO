export function SiteHeader() {
  return (
    <header className="site-header shell">
      <a className="wordmark" href="/" aria-label="Noerong home">noerong<span>.</span></a>
      <nav aria-label="Primary navigation">
        <a href="/#products">Products</a>
        <a href="/#method">Method</a>
        <a href="/essays">Essays</a>
        <a href="/#about">About</a>
      </nav>
      <a className="header-cta" href="/#contact">Start a conversation</a>
    </header>
  );
}
