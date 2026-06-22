import type { Metadata } from "next";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Occasional letters from Noerong: one worthwhile question, carefully explored.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  return (
    <main className="page-main shell">
      <header className="page-header">
        <p className="eyebrow">The occasional letter</p>
        <h1>Think slowly.<br />Stay curious.</h1>
        <p>New essays, research notes, and one question worth carrying into the week. Sent only when there is something worthwhile to say.</p>
      </header>
      <section className="signup-panel">
        <div><h2>Join the readers of Noerong.</h2><p>Each letter brings a new essay, the sources behind it, and the questions the research left unresolved. There is no fixed schedule—only a note when the work is ready.</p></div>
        <NewsletterForm source="newsletter_page" />
      </section>
    </main>
  );
}
