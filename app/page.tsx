import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/plain-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatDate, getAllEssays } from "@/lib/essays";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Independent SaaS product studio",
  description: "Noerong designs and builds focused SaaS products, AI systems, and business automation from idea to production.",
  alternates: { canonical: "/" },
};

const featuredSlugs = ["growthdesk", "leaddesk-ai", "clientdesk"];

export default function Home() {
  const featured = featuredSlugs.map((slug) => products.find((product) => product.slug === slug)!);
  const essays = getAllEssays().slice(0, 2);

  return (
    <main>
      <SiteHeader />
      <section className="home-hero shell">
        <div className="hero-meta reveal">
          <p><span className="status-dot" /> Independent SaaS product studio</p>
          <p>Bengaluru · Working worldwide</p>
        </div>
        <h1 className="reveal reveal-delay-1">Useful software,<br /><em>built all the way.</em></h1>
        <div className="hero-bottom reveal reveal-delay-2">
          <p>We turn practical business problems into clear, production-ready software. Product thinking, interface design, engineering, deployment, and handoff in one focused studio.</p>
          <Link className="text-link" href="/projects">Explore the work <span>↗</span></Link>
        </div>
      </section>

      <section className="flagship shell" aria-labelledby="flagship-title">
        <Link className="flagship-visual" href="/projects/growthdesk">
          <Image src="/products/growthdesk.png" alt="GrowthDesk business operations platform" fill priority unoptimized sizes="(max-width: 900px) 100vw, 80vw" />
          <div className="visual-badge"><span className="status-dot" /> Live product</div>
        </Link>
        <div className="flagship-info">
          <div><p className="section-kicker">01 / Flagship platform</p><h2 id="flagship-title">GrowthDesk</h2></div>
          <p>An all-in-one operating system for service businesses, bringing lead management, follow-up, client delivery, feedback, and reporting into one branded platform.</p>
          <Link className="button button-dark" href="/projects/growthdesk">View case study <span>↗</span></Link>
        </div>
      </section>

      <section className="proof-strip shell" aria-label="Studio capabilities">
        <div><strong>05</strong><span>Production systems</span></div>
        <div><strong>04</strong><span>Marketplace channels</span></div>
        <div><strong>0→1</strong><span>Idea to deployment</span></div>
        <div><strong>∞</strong><span>Available worldwide</span></div>
      </section>

      <section className="selected-work shell">
        <div className="section-heading">
          <div><p className="section-kicker">Selected work</p><h2>Built for the work<br /><em>businesses repeat.</em></h2></div>
          <Link className="text-link" href="/projects">All projects <span>↗</span></Link>
        </div>
        <div className="project-list">
          {featured.map((product, index) => (
            <article className="project-row" key={product.slug}>
              <Link className="project-row-image" href={`/projects/${product.slug}`}><Image src={product.image} alt={product.imageAlt} fill unoptimized sizes="(max-width: 800px) 100vw, 42vw" /></Link>
              <div className="project-row-copy">
                <p className="project-index">0{index + 2}</p><p className="project-category">{product.category}</p>
                <h3><Link href={`/projects/${product.slug}`}>{product.name}</Link></h3><p>{product.summary}</p>
                <div className="tag-row">{product.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
                <Link className="text-link" href={`/projects/${product.slug}`}>Open project <span>↗</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="studio-method shell">
        <div className="section-heading">
          <div><p className="section-kicker">How Noerong works</p><h2>One studio.<br /><em>The whole journey.</em></h2></div>
          <p>Most projects fail in the gaps between strategy, design, development, and launch. Noerong keeps those decisions in one place.</p>
        </div>
        <div className="method-grid">
          <article><span>01</span><h3>Shape</h3><p>Clarify the painful workflow, the buyer, and the smallest product worth paying for.</p></article>
          <article><span>02</span><h3>Design</h3><p>Turn the workflow into a focused interface with clear states, hierarchy, and trust.</p></article>
          <article><span>03</span><h3>Build</h3><p>Engineer the real system, its data model, integrations, and operational safeguards.</p></article>
          <article><span>04</span><h3>Launch</h3><p>Deploy, document, position, and hand over a product ready for real business use.</p></article>
        </div>
      </section>

      <section className="founder-note shell">
        <div className="founder-monogram" aria-hidden="true">N<span>●</span></div>
        <div><p className="section-kicker">A note from the founder</p><blockquote>“I care about the last 10 percent, the part that turns a good prototype into something a business can confidently use.”</blockquote><p>Rongali Chaitanya · Founder and product builder</p><Link className="text-link" href="/about">About the studio <span>↗</span></Link></div>
      </section>

      <section className="writing-preview shell">
        <div className="section-heading">
          <div><p className="section-kicker">Writing, for the questions that stay</p><h2>Beyond the<br /><em>product work.</em></h2></div>
          <p>Essays on history, philosophy, technology, and the ideas that deserve more room than a feed can give them.</p>
        </div>
        <div className="essay-preview-grid">
          {essays.map((essay) => (
            <article key={essay.slug}>
              <Link className="essay-preview-image" href={`/essays/${essay.slug}`}><Image src={essay.coverImage} alt={essay.coverAlt} fill sizes="(max-width: 760px) 100vw, 48vw" /></Link>
              <p>{essay.topic} · {formatDate(essay.date)}</p><h3><Link href={`/essays/${essay.slug}`}>{essay.title}</Link></h3><Link className="text-link" href={`/essays/${essay.slug}`}>Read essay <span>↗</span></Link>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
