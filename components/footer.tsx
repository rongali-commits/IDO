import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-bottom">
        <Link className="wordmark inverse" href="/">NOERONG<span>.</span></Link>
        <nav aria-label="Footer navigation"><Link href="/essays">Essays</Link><Link href="/topics">Topics</Link><Link href="/newsletter">Newsletter</Link><Link href="/reading-list">Reading List</Link><Link href="/editorial-policy">Editorial Policy</Link><Link href="/about/rongali-chaitanya">About</Link><a href="/feed.xml">RSS</a><Link href="/privacy">Privacy</Link></nav>
        <p>© {new Date().getFullYear()} Noerong<br />Founded and edited by <Link href="/about/rongali-chaitanya">Rongali Chaitanya</Link></p>
      </div>
    </footer>
  );
}
