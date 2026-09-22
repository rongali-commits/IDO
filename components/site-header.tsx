import { MobileNavigation } from "@/components/mobile-navigation";
import { Link } from "@/components/plain-link";

const navigation = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/essays", label: "Writing" },
];

export function SiteHeader({ activeSection }: { activeSection?: "projects" | "about" | "essays" }) {
  return (
    <>
    <header className="site-header-wrap">
      <div className="site-header shell">
        <Link className="wordmark" href="/" aria-label="Noerong home">noerong<span>.</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <Link href={item.href} key={item.href} aria-current={item.href === `/${activeSection}` ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <div className="header-tools">
          <Link className="header-cta" href="/contact">Start a project <span aria-hidden="true">↗</span></Link>
        </div>
        <MobileNavigation activeSection={activeSection} />
      </div>
    </header>
    <span id="main-content" tabIndex={-1} />
    </>
  );
}
