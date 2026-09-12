import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/plain-link";
import { ProjectMotionCover } from "@/components/project-motion-cover";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatDate, getAllEssays } from "@/lib/essays";
import { products } from "@/lib/products";
import { WaysToWork } from "@/components/ways-to-work";

export const metadata: Metadata = {
  title: { absolute: "Noerong | Independent SaaS product studio" },
  description: "Noerong designs and builds focused SaaS products, AI systems, and business automation from idea to production.",
  alternates: { canonical: "/" },
};

const featuredSlugs = ["margin-and-matter", "noerong-proposals", "clientdesk"];

export default function Home() {
  const flagship = products.find((product) => product.slug === "signalroom")!;
  const featured = featuredSlugs.map((slug) => products.find((product) => product.slug === slug)!);
  const essays = getAllEssays().slice(0, 2);

  return (
    <main>
      <SiteHeader motionControls />
      <section className="home-hero shell">
        <div className="hero-meta reveal">
          <p>Independent SaaS product studio</p>
          <p>Bengaluru · Working worldwide</p>
        </div>
        <div className="hero-layout">
          <h1 className="reveal reveal-delay-1">Useful software,<br /><em>built all the way.</em></h1>
          <div className="hero-bottom reveal reveal-delay-2">
            <p>I’m Rongali, the founder of Noerong. I design and build focused products for service businesses and independent teams, from the first workflow to a usable handoff.</p>
            <Link className="text-link" href="/projects">Explore the work <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="flagship shell" aria-labelledby="flagship-title">
        <Link className="flagship-visual" href="/projects/signalroom">
          <ProjectMotionCover poster={flagship.image} video={flagship.motionCover} alt={flagship.imageAlt} priority sizes="(max-width: 980px) 100vw, 70vw" />
        </Link>
        <div className="flagship-info">
          <div><p className="section-kicker">Featured / Customer intelligence</p><h2 id="flagship-title">SignalRoom</h2></div>
          <p>Turn scattered customer research into decisions you can trace back to the evidence. A complete product, from the research workspace to cited AI answers.</p>
          <Link className="button button-dark" href="/projects/signalroom">View case study <span>↗</span></Link>
        </div>
      </section>

      <section className="proof-strip shell" aria-label="Studio capabilities">
        <div><strong>{String(products.filter((product) => product.stage === "Live product").length).padStart(2, "0")}</strong><span>Live studio products</span></div>
        <div><strong>5+ years</strong><span>In IT & software</span></div>
        <div><strong>Design + code</strong><span>One point of contact</span></div>
        <div><strong>Bengaluru</strong><span>Working worldwide</span></div>
      </section>

      <section className="selected-work shell">
        <div className="section-heading">
          <div><p className="section-kicker">Selected work</p><h2>Different products.<br /><em>The same care.</em></h2></div>
          <Link className="text-link" href="/projects">All projects <span>↗</span></Link>
        </div>
        <div className="project-list">
          {featured.map((product, index) => (
            <article className="project-row" key={product.slug}>
              <Link className="project-row-image" href={`/projects/${product.slug}`}><ProjectMotionCover poster={product.image} video={product.motionCover} alt={product.imageAlt} sizes="(max-width: 800px) 100vw, 42vw" /></Link>
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

      <WaysToWork />

      <section className="studio-method shell">
        <div className="section-heading">
          <div><p className="section-kicker">How Noerong works</p><h2>One studio.<br /><em>The whole journey.</em></h2></div>
          <p>Strategy, design, development, and launch work better when they share the same context. Noerong keeps those decisions in one place.</p>
        </div>
        <div className="method-grid">
          <article><span>01</span><h3>Shape</h3><p>Clarify the painful workflow, the buyer, and the smallest product worth paying for.</p></article>
          <article><span>02</span><h3>Design</h3><p>Turn the workflow into a focused interface with clear states, hierarchy, and trust.</p></article>
          <article><span>03</span><h3>Build</h3><p>Engineer the real system, its data model, integrations, and operational safeguards.</p></article>
          <article><span>04</span><h3>Launch</h3><p>Deploy, document, position, and hand over a product ready for real business use.</p></article>
        </div>
      </section>

      <section className="founder-note shell">
        <div className="founder-portrait"><Image src="/about/rongali-chaitanya.webp" alt="Rongali Chaitanya, founder of Noerong" width={240} height={240} sizes="(max-width: 680px) 120px, 200px" /></div>
        <div><p className="section-kicker">A note from the founder</p><blockquote>“I care about the last 10 percent, the part that turns a good prototype into something a business can confidently use.”</blockquote><p>Rongali Chaitanya · Founder and product builder</p><Link className="text-link" href="/about">About the studio <span>↗</span></Link></div>
      </section>

      <section className="writing-preview shell">
        <div className="section-heading">
          <div><p className="section-kicker">Writing, for the questions that stay</p><h2>Beyond the<br /><em>product work.</em></h2></div>
          <p>Essays on history, philosophy, technology, and geopolitics. A place to follow a question further, examine the evidence, and make room for a different perspective.</p>
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
