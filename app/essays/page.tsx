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
    title: "Essays — Noerong",
    description: "Long-form curiosity from the Noerong product studio.",
    url: "https://noerong.com/essays",
    images: ["/og.png"],
  },
};

export default function EssaysPage() {
  const essays = getAllEssays();

  return (
    <main>
      <SiteHeader />
      <section className="essay-archive-header shell">
        <p className="eyebrow"><span /> Passion writing</p>
        <h1>Long-form curiosity,<br /><em>kept in its proper place.</em></h1>
        <p>Noerong is a software product studio. These essays are the founder&apos;s independent writing on history, philosophy, and geopolitics—not a writing service.</p>
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

      <section className="archive-product-cta shell">
        <div><span>Noerong&apos;s main work</span><h2>See the software.</h2></div>
        <a className="button button-primary" href="/#products">Explore products <span>↗</span></a>
      </section>
      <SiteFooter />
    </main>
  );
}
