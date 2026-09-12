import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ProjectBrief } from "@/components/project-brief";
import { StructuredData, breadcrumbData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Talk to Noerong about a SaaS product, AI system, client portal, CRM, or focused business automation.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Start a project | Noerong", description: "Share one workflow, your current tools, and the outcome you need. Start with a clear, scoped next step.", url: "https://noerong.com/contact", images: [{ url: "/og-v2.webp", alt: "Start a project with Noerong" }] },
  twitter: { card: "summary_large_image", title: "Start a project | Noerong", description: "A clear first step for your SaaS product or business workflow.", images: ["/og-v2.webp"] },
};

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <StructuredData data={[{ "@context": "https://schema.org", "@type": "ContactPage", "@id": "https://noerong.com/contact#page", url: "https://noerong.com/contact", name: "Start a project with Noerong", about: { "@id": "https://noerong.com/#studio" } }, breadcrumbData([{ name: "Home", path: "/" }, { name: "Start a project", path: "/contact" }])]} />
      <section className="contact-page shell">
        <div className="contact-grid">
          <div><p className="section-kicker">Start a project</p><h1>Bring the<br /><em>messy idea.</em></h1><p className="contact-lead">Tell me what is slowing the business down, what you use today, and what a successful outcome would look like. I will reply with a clear next step.</p></div>
          <div><div className="contact-links"><a href="mailto:hello@noerong.com?subject=Noerong%20project%20enquiry">Email Noerong <span>↗</span></a><a href="https://contra.com/rongalichaitanya" target="_blank" rel="noreferrer">Start through Contra <span>↗</span></a><a href="https://www.upwork.com/freelancers/~017d6b93e78fe54961" target="_blank" rel="noreferrer">Start through Upwork <span>↗</span></a><a href="https://www.linkedin.com/in/rongalichaitanya" target="_blank" rel="noreferrer">Connect on LinkedIn <span>↗</span></a></div><div className="response-note"><strong>Bengaluru · IST (UTC+5:30) · Working worldwide.</strong><span>Include the workflow, your current tools, desired launch date, and budget range. I will respond with the clearest next step.</span></div></div>
        </div>
        <ProjectBrief />
      </section>
      <SiteFooter showProjectCta={false} />
    </main>
  );
}
