import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow light">A letter for curious minds</p>
          <h2>One worthwhile idea,<br />occasionally.</h2>
        </div>
        <NewsletterForm dark source="footer" />
      </div>
      <div className="shell footer-bottom">
        <Link className="wordmark inverse" href="/">NOERONG<span>.</span></Link>
        <nav aria-label="Footer navigation"><Link href="/reading-list">Reading List</Link><Link href="/now">Now</Link><Link href="/privacy">Privacy</Link></nav>
        <p>© {new Date().getFullYear()} Sai R</p>
      </div>
    </footer>
  );
}
