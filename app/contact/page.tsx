import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Talk to Noerong about a SaaS product, AI system, client portal, CRM, or focused business automation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="contact-page shell">
        <div className="contact-grid">
          <div><p className="section-kicker">Start a project</p><h1>Bring the<br /><em>messy idea.</em></h1><p className="contact-lead">Tell me what is slowing the business down, what you use today, and what a successful outcome would look like. I will reply with a clear next step.</p></div>
          <div><div className="contact-links"><a href="mailto:hello@noerong.com?subject=Noerong%20project%20enquiry">Email Noerong <span>↗</span></a><a href="https://contra.com/rongalichaitanya" target="_blank" rel="noreferrer">Start through Contra <span>↗</span></a><a href="https://www.upwork.com/freelancers/~017d6b93e78fe54961" target="_blank" rel="noreferrer">Start through Upwork <span>↗</span></a><a href="https://www.linkedin.com/in/rongalichaitanya" target="_blank" rel="noreferrer">Connect on LinkedIn <span>↗</span></a></div><div className="response-note"><strong>Bengaluru · IST (UTC+5:30) · Working worldwide.</strong><span>Include the workflow, your current tools, desired launch date, and budget range. I will respond with the clearest next step.</span></div></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
