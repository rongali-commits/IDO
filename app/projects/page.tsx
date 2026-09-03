import type { Metadata } from "next";
import { Link } from "@/components/plain-link";
import { ProjectMotionCover } from "@/components/project-motion-cover";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Projects",
  description: "Independent SaaS products, AI systems, and focused business automation designed and built by Noerong.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main>
      <SiteHeader motionControls />
      <header className="page-hero shell">
        <div className="hero-meta"><p><span className="status-dot" /> Noerong project archive</p><p>{String(products.length).padStart(2, "0")} systems · {String(products.filter((product) => product.stage === "Live product").length).padStart(2, "0")} live products</p></div>
        <h1>Software with a<br /><em>job to do.</em></h1>
        <div className="page-hero-bottom"><p>Independently designed and built at Noerong. Each project explores a real business workflow through a working product, concrete design decisions, and documented implementation boundaries.</p><Link className="text-link" href="/contact">Build with Noerong <span>↗</span></Link></div>
      </header>
      <section className="projects-archive shell" aria-label="All Noerong projects">
        <div className="projects-grid">
          {products.map((product, index) => (
            <article className="project-card" key={product.slug}>
              <Link className="project-card-image" href={`/projects/${product.slug}`}><ProjectMotionCover poster={product.image} video={product.motionCover} alt={product.imageAlt} sizes="(max-width: 680px) 100vw, 50vw" /></Link>
              <div className="project-card-meta"><span>{String(index + 1).padStart(2, "0")} / {product.category}</span><span>{product.stage}</span></div>
              <h2><Link href={`/projects/${product.slug}`}>{product.name}</Link></h2><p>{product.summary}</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
