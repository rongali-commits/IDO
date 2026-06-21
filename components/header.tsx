import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Noerong home">NOERONG<span>.</span></Link>
        <nav aria-label="Primary navigation">
          <Link href="/essays">Essays</Link>
          <Link href="/topics">Topics</Link>
          <Link href="/newsletter">Newsletter</Link>
          <Link href="/about">About</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
