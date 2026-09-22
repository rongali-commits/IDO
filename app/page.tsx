import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/plain-link";
import { ProjectMotionCover } from "@/components/project-motion-cover";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ProjectArtboard } from "@/components/project-artboard";
import { KineticForm } from "@/components/kinetic-form";
import { MotionStudies } from "@/components/motion-studies";
import { MotionControl } from "@/components/motion-preference";
import { formatDate, getAllEssays } from "@/lib/essays";
import { products } from "@/lib/products";
import { WaysToWork } from "@/components/ways-to-work";

export const metadata: Metadata = {
  title: { absolute: "Noerong | Independent design & development" },
  description: "Distinctive websites and thoughtful digital products. An independent design and development studio by Rongali Chaitanya, from first idea to working experience.",
  alternates: { canonical: "/" },
};
const selected = [
  { slug: "seatloom", discipline: "Web design · Booking experience", line: "A place for making. A system for gathering.", note: "Editorial warmth meets the practical details of a workshop booking.", className: "work-wide work-seatloom" },
  { slug: "frameproof", discipline: "Product design · Creative tools", line: "Good work deserves clear feedback.", note: "An image-first review space that keeps every decision in context.", className: "work-frameproof" },
  { slug: "margin-and-matter", discipline: "Art direction · Editorial web design", line: "Room for a different perspective.", note: "A considered reading experience with a distinct editorial rhythm.", className: "work-margin" },
  { slug: "signalroom", discipline: "Interface design · Research & AI", line: "From scattered evidence to a clear signal.", note: "A complex research workflow made legible, traceable, and calm.", className: "work-wide work-signalroom" },
];
export default function Home() {
  const essays = getAllEssays().slice(0, 2);
  return (
    <main className="curated-home">
      <SiteHeader />
      <section className="design-hero shell" aria-labelledby="home-title">
        <div className="hero-eyeline"><p><span className="studio-dot" /> Independent design & development</p><span>Bengaluru, India / Working worldwide</span></div>
        <div className="design-hero-stage"><div className="design-hero-type"><h1 id="home-title"><span>Made to</span><span><em>matter.</em></span></h1><p>Websites with character.<br />Products with purpose.</p></div><KineticForm /></div>
        <div className="design-hero-bottom"><a className="work-jump" href="#selected-work"><span className="arrow-disc" aria-hidden="true">↓</span><span>Explore selected work<small>Four projects, one considered approach</small></span></a><p>I’m Rongali, the designer and developer behind Noerong. I bring a clear point of view to the way things look, move, and work.</p><div className="hero-motion"><MotionControl /></div></div>
      </section>
      <section className="curated-work shell" id="selected-work" aria-labelledby="selected-title">
        <div className="portfolio-section-heading"><p className="section-kicker">01 / Selected work</p><h2 id="selected-title">A little character.<br /><em>A lot of intention.</em></h2><p>Independent studio projects.<br />Designed, built, and brought to life.</p></div>
        <div className="curated-work-grid">{selected.map((item, index) => {
          const product = products.find(p => p.slug === item.slug)!;
          return <article className={`curated-work-card ${item.className}`} key={item.slug} data-reveal>
            <ProjectArtboard href={`/projects/${item.slug}`} label={`Explore ${product.name}: ${item.line}`}><div className="work-media-bar"><span>{product.name}</span><span>{String(index + 1).padStart(2, "0")} / 2026</span></div><span className="work-art-title" aria-hidden="true">{product.name}</span><div className="work-image-stage"><ProjectMotionCover poster={product.image} video={product.motionCover} alt={product.imageAlt} sizes={item.className.includes("work-wide") ? "(max-width: 700px) 90vw, 75vw" : "(max-width: 700px) 90vw, 44vw"} /></div><span className="work-open" aria-hidden="true">View project ↗</span><span className="work-art-edition" aria-hidden="true">N° {String(index + 1).padStart(2, "0")}</span></ProjectArtboard>
            <div className="curated-work-caption"><div><p>{item.discipline}</p><h3><Link href={`/projects/${item.slug}`}>{product.name}<span aria-hidden="true">↗</span></Link></h3></div><div><h4>{item.line}</h4><p>{item.note}</p></div></div>
          </article>;
        })}</div>
        <div className="work-archive-link"><span>There’s more behind the work.</span><Link className="text-link" href="/projects">Explore all {products.length} projects <span aria-hidden="true">↗</span></Link></div>
      </section>
      <MotionStudies />
      <section className="design-practice" aria-labelledby="practice-title"><div className="shell practice-layout"><div className="practice-heading"><p className="section-kicker">03 / The approach</p><h2 id="practice-title">Care is in<br /><em>the details.</em></h2><p>A beautiful first impression matters. So does every interaction that follows it.</p><div className="practice-seal" aria-hidden="true"><span>n</span><span>Form meets function.</span></div></div><div className="practice-steps">
        <article data-reveal><span>01</span><div><h3>Find the point of view.</h3><p>Start with the people, the purpose, and the feeling the experience should leave behind. Give the work something specific to say.</p><small>Discovery / Creative direction</small></div></article>
        <article data-reveal><span>02</span><div><h3>Make every choice count.</h3><p>Type, space, imagery, and motion share a visual language. Build a hierarchy that feels natural, from the largest headline to the smallest state.</p><small>Web design / Interface systems / Motion</small></div></article>
        <article data-reveal><span>03</span><div><h3>Carry the idea all the way.</h3><p>Build the real experience. Check the small screens, the keyboard paths, the loading states, and the handoff. The finish is part of the design.</p><small>Development / Quality review / Launch</small></div></article>
      </div></div></section>
      <section className="studio-introduction shell" aria-labelledby="intro-title"><div className="intro-portrait" data-reveal><Image src="/about/rongali-chaitanya-color.png" alt="Rongali Chaitanya, designer, developer, and founder of Noerong" width={1254} height={1254} sizes="(max-width: 700px) 80vw, 30vw" /><span>Rongali Chaitanya / Founder</span></div><div className="intro-copy"><p className="section-kicker">04 / The independent spirit</p><h2 id="intro-title">One mind.<br /><em>Many moving parts.</em></h2><p>Good design and good engineering should be in the same conversation. At Noerong, they’re handled by the same person.</p><p>I bring 5+ years in IT and software to an independent practice spanning web design, digital products, and practical AI systems. A small studio, with care that carries from the first sketch to the final build.</p><Link className="text-link" href="/about">A little more about me <span aria-hidden="true">↗</span></Link></div></section>
      <WaysToWork />
      <section className="studio-notes shell" aria-labelledby="notes-title"><div className="notes-heading"><p className="section-kicker">05 / Outside the canvas</p><h2 id="notes-title">A curious mind<br /><em>keeps wandering.</em></h2><p>Personal essays on history, philosophy, technology, and the questions that stay with me.</p><Link className="text-link" href="/essays">All writing <span aria-hidden="true">↗</span></Link></div><div className="notes-list">{essays.map(essay => <article key={essay.slug}><Link href={`/essays/${essay.slug}`} className="notes-image"><Image src={essay.coverImage} alt={essay.coverAlt} fill sizes="(max-width: 700px) 30vw, 160px" /></Link><div><p>{essay.topic} / {formatDate(essay.date)}</p><h3><Link href={`/essays/${essay.slug}`}>{essay.title}</Link></h3><Link className="text-link" href={`/essays/${essay.slug}`}>Read essay <span aria-hidden="true">↗</span></Link></div></article>)}</div></section>
      <SiteFooter />
    </main>
  );
}
