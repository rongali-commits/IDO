import Image from "next/image";
import Link from "next/link";
import { EssayCard } from "@/components/essay-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { ArrowIcon, SparkIcon } from "@/components/icons";
import { getAllEssays } from "@/lib/essays";
import { topicDescriptions } from "@/lib/site";

export default function Home() {
  const essays = getAllEssays();
  const populatedTopics = Object.entries(topicDescriptions).filter(([topic]) => essays.some((essay) => essay.topic === topic));
  return (
    <main>
      <section className="hero">
        <Image src="/images/noerong-hero.webp" alt="Bookshelves and readers in a library reading room" fill priority sizes="100vw" className="hero-image" />
        <div className="shell hero-content">
          <p className="eyebrow">Independent research essays by Rongali Chaitanya</p>
          <h1>Question the obvious.<br /><em>Follow the strange.</em></h1>
          <p className="hero-deck">History, science, philosophy, and the hidden forces shaping who we are—made vivid without being made simple.</p>
          <Link className="button" href={`/essays/${essays[0].slug}`}>Start with an essay <ArrowIcon /></Link>
        </div>
        <div className="hero-note"><SparkIcon /><span>For people who enjoy<br />changing their minds.</span></div>
        <p className="hero-photo-credit">Photo: <a href="https://commons.wikimedia.org/wiki/File:LibraryReadingRoom4.jpg" target="_blank" rel="noreferrer">Raysonho / CC0</a></p>
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
          <p>Noerong is an independent, source-backed publication about ideas hiding in plain sight. Each essay begins with one stubborn question, tests competing explanations, and follows the evidence wherever it leads.</p>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading"><div><p className="eyebrow">Follow a thread</p><h2>Explore by topic</h2></div></div>
        <div className="topic-grid">
          {populatedTopics.slice(0, 4).map(([topic, description], index) => (
            <Link href={`/topics/${encodeURIComponent(topic.toLowerCase().replaceAll(" ", "-"))}`} className="topic-card" key={topic}>
              <span>0{index + 1}</span><h3>{topic}</h3><p>{description}</p><ArrowIcon />
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell commission-band">
        <div>
          <p className="eyebrow">Commissioned research &amp; writing</p>
          <h2>Need a difficult subject investigated and explained clearly?</h2>
        </div>
        <div>
          <p>I take on research-led articles, reports, explainers, scripts, white papers, and fact-checking projects across a broad range of subjects. The topic can change; the standard stays the same: credible sources, clear reasoning, and prose written for real readers.</p>
          <Link className="button" href="/work-with-me">Work with me <ArrowIcon /></Link>
        </div>
      </section>

      <section className="newsletter-band">
        <div className="shell newsletter-band-grid"><div><p className="eyebrow">The occasional letter</p><h2>Keep one good question<br />in your inbox.</h2></div><NewsletterForm source="homepage" /></div>
      </section>
    </main>
  );
}
