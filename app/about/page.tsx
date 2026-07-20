import type { Metadata } from "next";
import Link from "next/link";
import { getAllEssays } from "@/lib/essays";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rongali Chaitanya — Writer, Developer & Founder",
  description: "Meet Rongali Chaitanya, founder and writer of Noerong and a developer building Python automation, practical AI assistants, and web tools.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Rongali Chaitanya — Writer, Developer & Founder of Noerong",
    description: "The writer behind Noerong and a developer building Python automation, practical AI assistants, and web tools.",
    url: "/about",
    type: "profile",
    firstName: "Rongali",
    lastName: "Chaitanya",
  },
};

export default function AboutPage() {
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/about#profile-page`,
    url: `${siteConfig.url}/about`,
    dateModified: "2026-07-20T18:35:22+05:30",
    mainEntity: {
      "@type": "Person",
      "@id": siteConfig.personId,
      name: siteConfig.author,
      url: siteConfig.personalUrl,
      description: "Writer and founder of Noerong, and a developer focused on Python automation, AI integration, and practical web tools.",
      jobTitle: ["Writer and founder of Noerong", "Python automation and AI integration developer"],
      sameAs: [`${siteConfig.url}/about`, siteConfig.githubUrl, siteConfig.linkedinUrl],
      knowsAbout: ["History", "Anthropology", "Science", "Philosophy", "Geopolitics", "Python automation", "AI integration", "Web development"],
    },
    hasPart: getAllEssays().map((essay) => ({
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
      <section className="about-hero shell"><p className="eyebrow">Writer, developer, curious generalist</p><h1>Rongali Chaitanya</h1><p className="about-hero-deck">A home for questions that refuse to sit still.</p></section>
      <section className="about-copy shell-narrow">
        <p className="lead">I’m Rongali Chaitanya—a curious generalist who enjoys following stimulating questions wherever they lead.</p>
        <p>I have always loved reading, researching, and making connections across history, anthropology, science, philosophy, and the strange patterns of human life. I’m especially drawn to questions that sound a little unreasonable at first: the ones that challenge familiar explanations, cross the borders between subjects, or make us look again at something the establishment treats as settled.</p>
        <p>I don’t approach these subjects as someone with all the answers. I approach them as an independent reader who enjoys the search: gathering evidence, testing an idea from several directions, noticing patterns, and staying willing to change my mind. Noerong began because I wanted to share that process—my thoughts, questions, surprising connections, and occasional crazy ideas—with other curious people.</p>
        <p>These essays begin with a concrete question, move patiently across disciplines, and keep the uncertainty visible. The goal is not to sound clever or force every question into a neat conclusion. It is to think in public, question inherited assumptions, and leave the reader seeing an ordinary piece of the world differently.</p>
        <p>Outside Noerong, I also build practical software—Python automations, AI assistants, and focused web tools. You can see that work, along with my projects and professional profile, at <a className="personal-site-link" href={siteConfig.personalUrl} target="_blank" rel="me noreferrer">RongaliChaitanya.com ↗</a>, or connect with me on <a href={siteConfig.linkedinUrl} target="_blank" rel="me noreferrer">LinkedIn ↗</a>.</p>
        <h2>How an essay is made</h2>
        <p>Each piece begins with a question rather than a conclusion. Research moves across primary material, serious secondary sources, and competing explanations. Claims are checked, uncertainty stays visible, and the argument is revised until a curious reader can follow it without specialist language.</p>
        <h2>What the name means</h2>
        <p><em>Noerong</em> joins two ideas. “Noe” comes from <em>noesis</em>, a Greek word associated with thought and intellectual understanding. “Rong” comes from <em>Rongali</em>, a word I associate with colour and liveliness. Together, the name captures what I want this publication to be: colourful intellectual exploration—serious without becoming lifeless, and curious without being afraid of unusual ideas.</p>
        <p>More than a title, it is a working posture: stay curious, follow the awkward implication, question easy certainty, and never confuse confidence with clarity.</p>
        <div className="about-signoff"><span>RC</span><p><strong>Rongali Chaitanya</strong><br />Writer &amp; builder of Noerong</p></div>
        <p className="about-contact">Questions, corrections, or reading suggestions: <a href="mailto:hello@noerong.com">hello@noerong.com</a>. Read the <Link href="/editorial-policy">editorial and corrections policy</Link>.</p>
        <Link className="button" href="/essays">Read the essays →</Link>
      </section>
    </main>
  );
}
