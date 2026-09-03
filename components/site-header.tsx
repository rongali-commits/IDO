import { Link } from "@/components/plain-link";
import { MotionControl } from "@/components/motion-preference";

const navigation = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/essays", label: "Writing" },
];

export function SiteHeader({ motionControls = false }: { motionControls?: boolean }) {
  return (
    <>
    <header className="site-header-wrap">
      <div className="site-header shell">
        <Link className="wordmark" href="/" aria-label="Noerong home">noerong<span>.</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <div className={`header-tools${motionControls ? " has-motion-control" : ""}`}>
          {motionControls && <MotionControl />}
          <Link className="header-cta" href="/contact">Start a project <span aria-hidden="true">↗</span></Link>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <Link href={item.href} key={item.href}><small>0{index + 1}</small>{item.label}</Link>
            ))}
            <Link href="/contact"><small>04</small>Start a project</Link>
          </nav>
        </details>
      </div>
    </header>
    <span id="main-content" tabIndex={-1} />
    </>
  );
}
