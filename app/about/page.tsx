import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About" };
export default function AboutPage() {
  return <main className="about-page"><section className="about-hero shell"><p className="eyebrow">About Noerong</p><h1>A home for questions<br />that refuse to sit still.</h1></section><section className="about-copy shell-narrow"><p className="lead">Noerong is an independent publication by Sai R about history, science, civilization, philosophy, and human nature.</p><p>It began with a simple frustration: the most interesting ideas are often flattened into slogans, buried in academic language, or separated into fields that rarely speak to one another.</p><p>These essays try something else. They start with a concrete question, move patiently across disciplines, and keep the uncertainty visible. The goal is not to sound clever. It is to leave the reader seeing an ordinary piece of the world differently.</p><h2>What the name means</h2><p>Noerong is less a doctrine than a working posture: stay curious, follow the awkward implication, and never confuse confidence with clarity.</p><div className="about-signoff"><span>SR</span><p><strong>Sai R</strong><br />Writer & builder of Noerong</p></div><Link className="button" href="/essays">Read the essays →</Link></section></main>;
}
