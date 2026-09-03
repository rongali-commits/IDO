import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/plain-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Rongali Chaitanya, founder of Noerong and a full-stack product builder focused on useful SaaS, AI systems, and business automation.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Start with the pain", body: "A strong product does not begin with a fashionable feature. It begins with work that is too slow, too expensive, too fragmented, or too easy to forget." },
  { title: "Make the system legible", body: "People should understand what happened, what needs attention, and what comes next. Clarity is a product capability, not decoration." },
  { title: "Build through launch", body: "The work includes the difficult final stretch: deployment, edge cases, positioning, documentation, and a handoff people can use." },
  { title: "Keep trust visible", body: "AI and automation should support judgment without hiding uncertainty, inventing authority, or taking control away from the operator." },
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="about-intro shell">
        <div className="portrait-wrap"><Image src="/about/rongali-chaitanya.webp" alt="Rongali Chaitanya, founder of Noerong" fill priority sizes="(max-width: 980px) 100vw, 42vw" /></div>
        <div className="about-copy"><p className="section-kicker">Rongali Chaitanya · Founder</p><h1>I build SaaS<br /><em>from 0 to 1.</em></h1><p className="lead">Not just the code. The problem, product, interface, system, launch, and the work after launch.</p><p>I have worked independently as a full-stack engineer since 2021. Noerong is the product studio that grew from that practice: a place for focused software that solves operational problems and feels considered from the first screen to the final handoff.</p><p>My work spans Next.js, TypeScript, Python, FastAPI, PostgreSQL, Supabase, Stripe, LLM integrations, product design, deployment, and marketplace positioning. I care most about joining those pieces into one product people can confidently understand and operate.</p><p>Outside the studio, I write long-form essays on history, philosophy, technology, and geopolitics. Writing is a passion and a way to think carefully, explore unconventional topics, and look at familiar questions from a different perspective. It is not a freelance writing service.</p><Link className="text-link" href="/contact">Work with me <span>↗</span></Link></div>
      </section>
      <section className="about-values shell"><div className="section-heading"><div><p className="section-kicker">Working principles</p><h2>What stays true<br /><em>across every build.</em></h2></div><p>Different products need different technologies. The standard for thinking, clarity, and finish should remain the same.</p></div><div className="value-list">{values.map((value, index) => <article className="value-row" key={value.title}><span>0{index + 1}</span><h3>{value.title}</h3><p>{value.body}</p></article>)}</div></section>
      <section className="capability-band shell"><p className="section-kicker">The studio stack</p><h2>Strategy to production,<br /><em>under one roof.</em></h2><div className="capability-columns"><article><span>01</span><h3>Product</h3><p>Finding the smallest coherent system that solves the real business problem.</p><ul><li>Workflow discovery</li><li>Product scope</li><li>Information architecture</li><li>Marketplace positioning</li></ul></article><article><span>02</span><h3>Design</h3><p>Interfaces built for comprehension, confidence, and useful daily operation.</p><ul><li>UX and UI design</li><li>Responsive systems</li><li>Interaction design</li><li>Product storytelling</li></ul></article><article><span>03</span><h3>Engineering</h3><p>Maintainable full-stack products, integrations, deployments, and handoff.</p><ul><li>Next.js and TypeScript</li><li>Python and FastAPI</li><li>Data and payments</li><li>AI and automation</li></ul></article></div></section>
      <SiteFooter />
    </main>
  );
}
