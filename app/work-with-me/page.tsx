import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research Writing Services",
  description:
    "Commission Rongali Chaitanya for deep research, long-form articles, explainers, reports, scripts, white papers, fact-checking, and structural editing.",
  alternates: { canonical: "/work-with-me" },
};

const services = [
  {
    title: "Long-form articles & essays",
    text: "Question-led features, analysis, and narrative essays that combine broad research with a clear, memorable argument.",
    items: ["Research brief", "Source trail", "Edited final draft"],
  },
  {
    title: "Reports, explainers & scripts",
    text: "Readable work for publications, founders, organizations, newsletters, and video channels that need complexity handled carefully.",
    items: ["Technical or unfamiliar topics", "Reader-first structure", "Citation-ready research"],
  },
  {
    title: "Research support & editing",
    text: "Source discovery, claim verification, synthesis, structural editing, and fact-checking for material that already exists.",
    items: ["Evidence review", "Argument strengthening", "Corrections and notes"],
  },
];

export default function WorkWithMePage() {
  return (
    <main className="page-main shell">
      <header className="page-header">
        <p className="eyebrow">Commissioned research &amp; writing</p>
        <h1>Start with a difficult question.</h1>
        <p>
          I research complex subjects and turn the evidence into clear articles,
          reports, explainers, scripts, and editorial material. I am not limited
          to one topic: I work across domains when the brief rewards serious
          investigation, careful sourcing, and independent thought.
        </p>
      </header>

      <section className="resource-grid" aria-label="Research writing services">
        {services.map((service) => (
          <article className="resource-card" key={service.title}>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
            <ul>
              {service.items.map((item) => (
                <li key={item}><strong>{item}</strong></li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="work-method shell-narrow">
        <p className="eyebrow">How I work</p>
        <h2>The topic can change. The method does not.</h2>
        <p>
          We begin by defining the question, audience, scope, evidence standard,
          and final format. I then build a research map, compare primary and
          serious secondary sources, identify disagreements or missing evidence,
          and shape the material around an argument the reader can follow.
        </p>
        <p>
          I distinguish established facts from interpretation, keep uncertainty
          visible, and provide a usable source trail. Whatever tools assist the
          process, responsibility for every claim and every published line stays
          with me.
        </p>
      </section>

      <section className="signup-panel work-cta">
        <div>
          <p className="eyebrow">Send a brief</p>
          <h2>What needs to be understood?</h2>
          <p>
            Include the topic or question, intended reader, approximate length or
            format, deadline, and any sources or examples already available.
          </p>
        </div>
        <div className="work-cta-actions">
          <a className="button" href="mailto:hello@noerong.com?subject=Research%20and%20writing%20enquiry">
            hello@noerong.com
          </a>
          <Link className="text-link" href="/essays">Review published essays</Link>
        </div>
      </section>
    </main>
  );
}
