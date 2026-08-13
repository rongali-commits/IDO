import type { Metadata } from "next";
import Link from "next/link";
import { getAllEssays } from "@/lib/essays";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rongali Chaitanya — Founder and Editor of Noerong",
  description: "Meet Rongali Chaitanya, the writer, founder, and editor of the independent publication Noerong.",
  alternates: { canonical: siteConfig.authorPath },
  openGraph: {
    title: "Rongali Chaitanya — Founder and Editor of Noerong",
    description: "The writer, founder, and editor behind the independent publication Noerong.",
    url: siteConfig.authorPath,
    type: "profile",
    firstName: "Rongali",
    lastName: "Chaitanya",
  },
};

export default function AboutPage() {
  const essays = getAllEssays();
  const authorUrl = `${siteConfig.url}${siteConfig.authorPath}`;
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}${siteConfig.authorPath}#profile-page`,
    url: `${siteConfig.url}${siteConfig.authorPath}`,
    dateModified: "2026-07-30T12:00:00+05:30",
    mainEntity: {
      "@type": "Person",
      "@id": siteConfig.personId,
      name: siteConfig.author,
      url: authorUrl,
      description: "Writer, founder, and editor of Noerong, an independent publication of source-backed essays.",
      jobTitle: ["Writer", "Founder and editor of Noerong"],
      worksFor: { "@id": `${siteConfig.url}/#organization` },
      sameAs: [siteConfig.personalUrl, siteConfig.githubUrl, siteConfig.linkedinUrl],
      knowsAbout: ["History", "Anthropology", "Science", "Philosophy", "Geopolitics"],
    },
    hasPart: essays.map((essay) => ({
      "@type": "Article",
      headline: essay.title,
      url: `${siteConfig.url}/essays/${essay.slug}`,
      datePublished: essay.date,
      author: { "@id": siteConfig.personId },
    })),
  };
  return (
    <main className="about-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd).replace(/</g, "\\u003c") }} />
      <section className="about-hero shell"><p className="eyebrow">Founder &amp; editor of Noerong</p><h1>Rongali Chaitanya</h1><p className="about-hero-deck">I follow difficult questions until they become clear enough to share.</p></section>
      <section className="about-copy shell-narrow">
        <p className="lead">I’m Rongali Chaitanya, an independent research writer and the founder and editor of Noerong.</p>
        <p>I am interested in subjects that do not fit comfortably inside one category: history touching biology, philosophy colliding with physics, institutions surviving the empires that built them, and ordinary assumptions becoming strange when examined closely.</p>
        <p>My subject range is deliberately broad. I do not claim to begin every project as an expert. I begin as a disciplined investigator: define the question, find credible sources, compare explanations, locate the uncertainty, and keep working until a non-specialist reader can see both the argument and the evidence behind it.</p>
        <p>Noerong is where I practice that method publicly. The essays are not generic content assembled around keywords. They are question-led, source-backed pieces with an identifiable point of view. The aim is to make complicated ideas vivid without pretending they are simple.</p>
        <p>Outside the publication, I also build practical software. That work lives at <a className="personal-site-link" href={siteConfig.personalUrl} target="_blank" rel="me noreferrer">RongaliChaitanya.com ↗</a>. You can also find me on <a href={siteConfig.linkedinUrl} target="_blank" rel="me noreferrer">LinkedIn ↗</a>.</p>
        <section className="author-essays" aria-labelledby="author-essays-title">
          <h2 id="author-essays-title">Essays by Rongali Chaitanya</h2>
          <div className="author-essays-list">
            {essays.map((essay) => (
              <Link href={`/essays/${essay.slug}`} key={essay.slug}>
                <span>{essay.topic} · {essay.readTime}</span>
                <strong>{essay.title}</strong>
                <p>{essay.description}</p>
              </Link>
            ))}
          </div>
        </section>
        <h2>How an essay is made</h2>
        <p>Each piece begins with a question rather than a conclusion. Research moves across primary material, official data, peer-reviewed work, serious secondary sources, and competing explanations. Claims are checked, uncertainty stays visible, and the argument is revised until a curious reader can follow it without specialist language.</p>
        <h2>What the name means</h2>
        <p><em>Noerong</em> joins two ideas. “Noe” comes from <em>noesis</em>, a Greek word associated with thought and intellectual understanding. “Rong” comes from <em>Rongali</em>, a word I associate with colour and liveliness. Together, the name captures what I want this publication to be: colourful intellectual exploration—serious without becoming lifeless, and curious without being afraid of unusual ideas.</p>
        <p>More than a title, it is a working posture: stay curious, follow the awkward implication, question easy certainty, and never confuse confidence with clarity.</p>
        <div className="about-signoff"><span>RC</span><p><strong>Rongali Chaitanya</strong><br />Founder &amp; editor of Noerong</p></div>
        <p className="about-contact">Questions, corrections, or reading suggestions: <a href="mailto:hello@noerong.com">hello@noerong.com</a>. Read the <Link href="/editorial-policy">editorial and corrections policy</Link>.</p>
        <Link className="button" href="/essays">Read the essays →</Link>
      </section>
    </main>
  );
}
