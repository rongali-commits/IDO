import { Link } from "@/components/plain-link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero shell">
        <p className="section-kicker">404 · Page not found</p>
        <h1>A wrong turn.<br /><em>A way back.</em></h1>
        <div className="page-hero-bottom">
          <p>This page may have moved, or the link may be incomplete. The project archive is a good place to pick up the thread.</p>
          <Link className="text-link" href="/projects">Explore projects <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
