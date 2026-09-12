import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatDate, getAllEssays } from "@/lib/essays";

export const metadata: Metadata = {
  title: "Essays",
  description: "Long-form essays from Noerong on history, philosophy, geopolitics, and the questions that refuse to stay small.",
  alternates: { canonical: "/essays" },
  openGraph: {
    title: "Essays | Noerong",
    description: "Long-form curiosity from the Noerong product studio.",
    url: "https://noerong.com/essays",
    images: ["/og-v2.webp"],
  },
};

export default function EssaysPage() {
  const essays = getAllEssays();

  return (
    <main>
      <SiteHeader activeSection="essays" />
      <section className="essay-archive-header shell">
        <p className="eyebrow">The Noerong journal · By Rongali Chaitanya</p>
        <h1>A question worth<br /><em>staying with.</em></h1>
        <p>Writing is my personal passion. I explore unconventional topics in history, philosophy, technology, and geopolitics, following the evidence and making room for a different perspective.</p>
        <div className="journal-topics"><span>History</span><span>Philosophy</span><span>Geopolitics</span><span>{essays.length} essays</span></div>
      </section>

      <section className="essay-archive-grid shell" aria-label="Essay archive">
        {essays.map((essay) => (
          <article className="essay-archive-card" key={essay.slug}>
            <a className="essay-card-image" href={`/essays/${essay.slug}`}>
              <Image src={essay.coverImage} alt={essay.coverAlt} fill sizes="(max-width: 780px) 100vw, 46vw" />
            </a>
            <div>
              <p>{essay.topic} · {formatDate(essay.date)} · {essay.readTime}</p>
              <h2><a href={`/essays/${essay.slug}`}>{essay.title}</a></h2>
              <p>{essay.description}</p>
              <a className="archive-link" href={`/essays/${essay.slug}`}>Read the essay <span>↗</span></a>
            </div>
          </article>
        ))}
      </section>

      <aside className="journal-note shell"><p>Written by Rongali Chaitanya, a developer and founder who also follows questions beyond software. These essays express personal interpretations. References are included so you can explore the evidence yourself.</p><a href="/about">About the author ↗</a></aside>
      <SiteFooter showProjectCta={false} />
    </main>
  );
}
