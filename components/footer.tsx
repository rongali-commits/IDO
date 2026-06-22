import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-bottom">
        <Link className="wordmark inverse" href="/">NOERONG<span>.</span></Link>
        <nav aria-label="Footer navigation"><Link href="/reading-list">Reading List</Link><Link href="/now">Now</Link><Link href="/editorial-policy">Editorial</Link><Link href="/privacy">Privacy</Link></nav>
        <p>© {new Date().getFullYear()} Rongali Chaitanya</p>
      </div>
    </footer>
  );
}
