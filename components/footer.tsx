import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-bottom">
        <Link className="wordmark inverse" href="/">NOERONG<span>.</span></Link>
        <nav aria-label="Footer navigation"><Link href="/reading-list">Reading List</Link><Link href="/now">Now</Link><Link href="/editorial-policy">Editorial</Link><a href="https://www.rongalichaitanya.com/" target="_blank" rel="me noreferrer">Portfolio ↗</a><a href="https://www.linkedin.com/in/rongali-chaitanya-29b4772a2" target="_blank" rel="me noreferrer">LinkedIn ↗</a><Link href="/privacy">Privacy</Link></nav>
        <p>© {new Date().getFullYear()} Rongali Chaitanya<br /><a className="footer-portfolio-link" href="https://www.rongalichaitanya.com/" target="_blank" rel="me noreferrer">RongaliChaitanya.com ↗</a></p>
      </div>
    </footer>
  );
}
