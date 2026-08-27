import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header shell">
      <Link className="wordmark" href="/" aria-label="Noerong home">noerong<span>.</span></Link>
      <nav aria-label="Primary navigation">
        <Link href="/#products">Products</Link>
        <Link href="/#method">Method</Link>
        <Link href="/essays">Essays</Link>
        <Link href="/#about">About</Link>
      </nav>
      <a className="header-cta" href="mailto:hello@noerong.com?subject=Noerong%20product%20enquiry">Start a conversation</a>
    </header>
  );
}
