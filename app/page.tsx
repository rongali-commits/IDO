import Image from "next/image";
import Link from "next/link";
import { EssayCard } from "@/components/essay-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { ArrowIcon, SparkIcon } from "@/components/icons";
import { getAllEssays } from "@/lib/essays";
import { topicDescriptions } from "@/lib/site";

export default function Home() {
  const essays = getAllEssays();
  return (
    <main>
      <section className="hero">
        <Image src="/images/noerong-hero.png" alt="Abstract illustration connecting history, science, nature, and human curiosity" fill priority sizes="100vw" className="hero-image" />
        <div className="shell hero-content">
          <p className="eyebrow">Independent essays on a complicated world</p>
          <h1>Big questions.<br /><em>Carefully explored.</em></h1>
          <p className="hero-deck">History, science, philosophy, and the hidden forces shaping who we are—made vivid without being made simple.</p>
          <Link className="button" href={`/essays/${essays[0].slug}`}>Start with an essay <ArrowIcon /></Link>
        </div>
        <div className="hero-note"><SparkIcon /><span>For people who enjoy<br />changing their minds.</span></div>
      </section>

      <section className="section shell">
        <div className="section-heading"><div><p className="eyebrow">Featured thinking</p><h2>Essays worth sitting with</h2></div><Link className="text-link" href="/essays">Browse all essays <ArrowIcon /></Link></div>
        <div className="featured-grid">
          {essays.slice(0, 3).map((essay, index) => <EssayCard key={essay.slug} essay={essay} featured={index === 0} />)}
        </div>
      </section>

      <section className="manifesto">
        <div className="shell manifesto-grid">
          <p className="eyebrow">What Noerong is for</p>
          <blockquote>“The world becomes more interesting the moment an obvious answer stops being enough.”</blockquote>
          <p>Noerong is an independent publication about the ideas hiding in plain sight. Each essay begins with one stubborn question and follows it wherever the evidence leads.</p>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading"><div><p className="eyebrow">Follow a thread</p><h2>Explore by topic</h2></div></div>
        <div className="topic-grid">
          {Object.entries(topicDescriptions).slice(0, 4).map(([topic, description], index) => (
            <Link href={`/topics/${encodeURIComponent(topic.toLowerCase().replaceAll(" ", "-"))}`} className="topic-card" key={topic}>
              <span>0{index + 1}</span><h3>{topic}</h3><p>{description}</p><ArrowIcon />
            </Link>
          ))}
        </div>
      </section>

      <section className="newsletter-band">
        <div className="shell newsletter-band-grid"><div><p className="eyebrow">The occasional letter</p><h2>Keep one good question<br />in your inbox.</h2></div><NewsletterForm source="homepage" /></div>
      </section>
    </main>
  );
}
