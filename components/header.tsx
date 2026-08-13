import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Noerong home">NOERONG<span>.</span></Link>
        <nav aria-label="Primary navigation">
          <Link href="/essays">Essays</Link>
          <Link href="/topics">Topics</Link>
          <Link href="/newsletter">Newsletter</Link>
          <Link href={siteConfig.authorPath}>About</Link>
        </nav>
        <div className="header-actions"><ThemeToggle /><MobileNav /></div>
      </div>
    </header>
  );
}
