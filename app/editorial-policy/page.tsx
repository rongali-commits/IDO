import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "How Noerong researches, sources, corrects, and updates its essays.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <main className="page-main shell-narrow policy-page">
      <header className="page-header"><p className="eyebrow">How the work is made</p><h1>Editorial Policy</h1><p>Noerong is an independent publication. Curiosity starts the work; evidence decides where it ends.</p></header>
      <h2>Research and sourcing</h2>
      <p>Essays distinguish established facts from interpretation and speculation. Material factual claims should link to primary records, official data, peer-reviewed research, or serious reference works wherever practical. A reading list at the end of each essay shows the sources that most shaped it.</p>
      <h2>Uncertainty</h2>
      <p>History and science rarely fit perfectly into a headline. When evidence is disputed, incomplete, or model-dependent, the essay should say so. Provocation is welcome; manufactured certainty is not.</p>
      <h2>Writing tools and responsibility</h2>
      <p>Research and drafting may involve digital tools for search, organization, transcription, or revision, but tools are never treated as authorities or cited as evidence. Sources must be inspected directly. Responsibility for the argument, source selection, factual claims, and every published line remains with the author.</p>
      <h2>Corrections</h2>
      <p>Substantive errors are corrected in the article and its updated date is changed. If you spot a mistake, email <a href="mailto:hello@noerong.com">hello@noerong.com</a> with the article, disputed passage, and supporting source.</p>
      <h2>Independence</h2>
      <p>Noerong currently publishes no sponsored editorial. Any future sponsorship, affiliate relationship, or material conflict will be disclosed where readers encounter it.</p>
      <p className="policy-updated">Last updated: July 2026</p>
      <Link className="button" href="/about">About Noerong →</Link>
    </main>
  );
}
