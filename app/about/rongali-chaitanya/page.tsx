import type { Metadata } from "next";
import Link from "next/link";
import { getAllEssays } from "@/lib/essays";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rongali Chaitanya — Writer and Creator of Noerong",
  description: "Meet Rongali Chaitanya, the independent research writer behind Noerong and a Python automation developer.",
  alternates: { canonical: siteConfig.authorPath },
  openGraph: {
    title: "Rongali Chaitanya — Independent Research Writer & Creator of Noerong",
    description: "The research writer behind Noerong and a developer building Python automation, practical AI workflows, and focused web tools.",
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
      description: "Independent research writer and creator of Noerong, and a developer focused on Python automation, AI integration, and practical web tools.",
      jobTitle: ["Independent research writer", "Creator of Noerong", "Python automation and AI integration developer"],
      sameAs: [siteConfig.personalUrl, siteConfig.githubUrl, siteConfig.linkedinUrl],
      knowsAbout: ["History", "Anthropology", "Science", "Philosophy", "Geopolitics", "Python automation", "AI integration", "Web development"],
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
      <section className="about-hero shell"><p className="eyebrow">Independent research writer &amp; builder</p><h1>Rongali Chaitanya</h1><p className="about-hero-deck">I follow difficult questions until they become clear enough to share.</p></section>
      <section className="about-copy shell-narrow">
        <p className="lead">I’m Rongali Chaitanya, an independent research writer and the creator of Noerong.</p>
        <p>I am interested in subjects that do not fit comfortably inside one category: history touching biology, philosophy colliding with physics, institutions surviving the empires that built them, and ordinary assumptions becoming strange when examined closely.</p>
        <p>My subject range is deliberately broad. I do not claim to begin every project as an expert. I begin as a disciplined investigator: define the question, find credible sources, compare explanations, locate the uncertainty, and keep working until a non-specialist reader can see both the argument and the evidence behind it.</p>
        <p>Noerong is where I practice that method publicly. The essays are not generic content assembled around keywords. They are question-led, source-backed pieces with an identifiable point of view. The aim is to make complicated ideas vivid without pretending they are simple.</p>
        <p>I also accept commissioned research and writing for publications, founders, organizations, newsletters, and video channels. That can include long-form articles, reports, explainers, scripts, white papers, source research, fact-checking, and structural editing. <Link href="/work-with-me">See how to work with me</Link>.</p>
        <p>Alongside writing, I build practical software—Python automations, AI-assisted workflows, and focused web tools. You can review both professional tracks at <a className="personal-site-link" href={siteConfig.personalUrl} target="_blank" rel="me noreferrer">RongaliChaitanya.com ↗</a>, or connect with me on <a href={siteConfig.linkedinUrl} target="_blank" rel="me noreferrer">LinkedIn ↗</a>.</p>
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
        <div className="about-signoff"><span>RC</span><p><strong>Rongali Chaitanya</strong><br />Independent research writer &amp; creator of Noerong</p></div>
        <p className="about-contact">Questions, corrections, or reading suggestions: <a href="mailto:hello@noerong.com">hello@noerong.com</a>. Read the <Link href="/editorial-policy">editorial and corrections policy</Link>.</p>
        <Link className="button" href="/essays">Read the essays →</Link>
      </section>
    </main>
  );
}
