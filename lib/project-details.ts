export type ProjectDetail = {
  audience: string;
  role: string;
  year: string;
  overview: string;
  approach: string;
  features: { title: string; description: string }[];
};

export const projectDetails: Record<string, ProjectDetail> = {
  "noerong-proposals": {
    audience: "Freelancers, consultants, studios, and small agencies",
    role: "Product strategy, UX design, full-stack engineering, security review",
    year: "2026",
    overview: "Noerong Proposals turns the path from scope to client decision into one professional workflow. It replaces proposal documents, pricing spreadsheets, email approvals, and uncertain follow-up with a branded system that records every important step.",
    approach: "The product was built in Bolt around five jobs: organize clients, price a clear scope, share one secure link, capture the decision, and maintain a trustworthy activity record. The interface stays deliberately focused so independent teams gain operational clarity without adopting a heavyweight CRM.",
    features: [
      { title: "Accurate proposal builder", description: "Services, quantities, rates, line discounts, proposal discounts, tax, terms, and expiry are calculated in one structured editor." },
      { title: "Branded client link", description: "Every proposal is presented through a secure public page where the client can review, comment, accept, or decline." },
      { title: "Visible proposal lifecycle", description: "Draft, viewed, accepted, rejected, and expired states give the business a clear pipeline instead of guesswork." },
      { title: "Production-grade foundation", description: "Authentication, user-isolated data, protected functions, exact-origin CORS, responsive layouts, and safe error states support a dependable launch." },
    ],
  },
  growthdesk: {
    audience: "Service businesses and agencies",
    role: "Product strategy, design, full-stack engineering",
    year: "2026",
    overview: "GrowthDesk was designed around one clear observation: a customer journey should not become six disconnected workflows just because a business grows. It brings the daily operating loop into one branded system without the weight of enterprise software.",
    approach: "The platform is structured around the customer journey, from first enquiry to follow-up, delivery, feedback, and revenue visibility. Each module shares the same records and context, so teams can act without rebuilding the story in another tool.",
    features: [
      { title: "Lead command center", description: "A single view of new opportunities, deal stage, value, ownership, and the next action." },
      { title: "Follow-up engine", description: "Repeatable outreach sequences and reminders that keep qualified enquiries from going cold." },
      { title: "Branded client portal", description: "One clear place for progress, deliverables, approvals, updates, and client communication." },
      { title: "Feedback and reporting", description: "Structured review collection and practical reporting across the full customer journey." },
    ],
  },
  "leaddesk-ai": {
    audience: "Local and service businesses",
    role: "AI product design, engineering, deployment",
    year: "2026",
    overview: "LeadDesk AI gives a business a useful presence after hours. It answers from approved information, identifies high-intent visitors, and turns an open-ended chat into a structured enquiry the team can follow up.",
    approach: "The assistant is intentionally constrained to business-approved knowledge and safe fallback behavior. The interaction is designed to be helpful before it is clever, with qualification and lead capture appearing only when the conversation earns it.",
    features: [
      { title: "Approved answers", description: "Business-controlled FAQs and fallback behavior keep responses useful, consistent, and safer." },
      { title: "Structured lead capture", description: "The assistant collects the contact and job details a team actually needs for follow-up." },
      { title: "White-label interface", description: "Brand color, logo, assistant name, welcome copy, and embedded experience are configurable." },
      { title: "Lead dashboard", description: "Qualified enquiries are stored in a focused workspace with export and follow-up visibility." },
    ],
  },
  followdesk: {
    audience: "Sales teams and service operators",
    role: "Workflow design, full-stack engineering",
    year: "2026",
    overview: "FollowDesk turns the fragile period after a new enquiry into an explicit, visible workflow. It helps small teams follow up consistently without adding a heavyweight CRM to their day.",
    approach: "Every lead has a stage, owner, next action, and history. The interface prioritizes what needs attention now, while templates and booking steps remove repetitive manual work.",
    features: [
      { title: "Focused pipeline", description: "A clear progression from new enquiry to qualified, booked, won, or closed." },
      { title: "Automated reminders", description: "Follow-up tasks and repeatable messages reduce the risk of valuable leads being forgotten." },
      { title: "Booking workflow", description: "Qualified conversations move toward a scheduled call with fewer back-and-forth messages." },
      { title: "Activity history", description: "Notes, contact attempts, stage changes, and next actions stay attached to the lead." },
    ],
  },
  reviewdesk: {
    audience: "Local businesses and client teams",
    role: "Product design, automation, engineering",
    year: "2026",
    overview: "ReviewDesk makes customer feedback a reliable part of completing a job. It collects honest responses, follows up respectfully, and turns permissioned praise into reusable social proof.",
    approach: "The workflow separates private feedback from public testimonials, makes consent explicit, and gives the business one place to manage requests and approved stories.",
    features: [
      { title: "Branded request flow", description: "A focused, mobile-friendly experience makes it easy for customers to respond." },
      { title: "Gentle reminders", description: "Automated follow-ups recover responses without creating an aggressive customer experience." },
      { title: "Consent controls", description: "Testimonials are only moved into public use when the customer has granted permission." },
      { title: "Embeddable proof", description: "Approved feedback can be presented on a business website through a clean trust widget." },
    ],
  },
  clientdesk: {
    audience: "Agencies, consultants, and studios",
    role: "Product strategy, portal design, engineering",
    year: "2026",
    overview: "ClientDesk gives every client one calm, branded place to understand what is happening. It replaces scattered status messages, file links, approvals, and invoice reminders with a shared operating space.",
    approach: "The product is split into a client-facing portal and a studio dashboard. Both sides see the same project truth, while each interface exposes only the decisions and actions relevant to that user.",
    features: [
      { title: "Client home", description: "Progress, the next decision, recent updates, and ready deliverables are visible immediately." },
      { title: "Approval workflow", description: "Feedback and sign-off stay connected to the relevant deliverable instead of an email thread." },
      { title: "Delivery workspace", description: "Files, milestones, notes, and project status remain organized through the full engagement." },
      { title: "Invoice visibility", description: "Clients and teams can see payment status without relying on repeated manual reminders." },
    ],
  },
  sourceroom: {
    audience: "Content teams and independent creators",
    role: "Workflow design and front-end engineering",
    year: "2026",
    overview: "SourceRoom starts with one strong source and turns it into a controlled set of channel-ready drafts. It keeps editorial judgment visible instead of hiding the work behind a one-click content promise.",
    approach: "The workspace separates source material, audience intent, output formats, and editing. Every result remains reviewable and editable before it leaves the system.",
    features: [
      { title: "One source workspace", description: "Articles, transcripts, and notes stay beside every generated or adapted draft." },
      { title: "Channel-specific formats", description: "Outputs are structured for their destination instead of being copied into every channel." },
      { title: "Editable drafts", description: "The user remains the final editor, with a clear place to shape voice and accuracy." },
      { title: "Local-first workflow", description: "The demonstration keeps content processing simple and transparent." },
    ],
  },
  proofread: {
    audience: "Operations and compliance teams",
    role: "Product design and front-end engineering",
    year: "2026",
    overview: "Proofread is a transparent document review workbench. It evaluates material against explicit criteria, shows the supporting evidence, and produces a structured result that a person can verify.",
    approach: "The interface treats automation as a review assistant, not an invisible judge. Criteria, matches, exceptions, and evidence remain visible throughout the workflow.",
    features: [
      { title: "Custom criteria", description: "Teams can represent their own review rules instead of adapting to a fixed checklist." },
      { title: "Evidence shown", description: "Every finding is connected to the relevant source passage for human verification." },
      { title: "Clear exceptions", description: "Uncertain or missing information is surfaced instead of being silently guessed." },
      { title: "Structured export", description: "Completed reviews can be exported for downstream reporting or record keeping." },
    ],
  },
  ledgerflow: {
    audience: "Finance and operations teams",
    role: "Automation design and data engineering",
    year: "2026",
    overview: "LedgerFlow replaces a recurring spreadsheet cleanup ritual with a repeatable billing pipeline. It validates source records, highlights exceptions, and prepares clean files for reporting.",
    approach: "The workflow makes each transformation explicit so operators can trust the output, resolve bad records, and reproduce the same process next month.",
    features: [
      { title: "Input validation", description: "Records are checked for missing, malformed, and inconsistent fields before processing." },
      { title: "Exception handling", description: "Problems are separated into an actionable queue rather than buried in the final export." },
      { title: "Repeatable cleanup", description: "The same rules can be run every reporting cycle without rebuilding formulas." },
      { title: "Audit-ready exports", description: "Clean data and summary documents are prepared for review and downstream use." },
    ],
  },
  prospectlab: {
    audience: "Lean sales and growth teams",
    role: "Data workflow design and engineering",
    year: "2026",
    overview: "ProspectLab turns public business records into a usable prospect list. It prioritizes fit and data quality so teams spend more time starting relevant conversations and less time fixing spreadsheets.",
    approach: "Collection, normalization, deduplication, scoring, and export are treated as one traceable pipeline, with quality signals visible before a record reaches outreach.",
    features: [
      { title: "Public data collection", description: "Business information is gathered from appropriate public sources into a consistent structure." },
      { title: "Deduplication", description: "Repeated companies and contacts are resolved before they inflate a sales list." },
      { title: "Fit scoring", description: "Clear criteria prioritize the records most relevant to the target market." },
      { title: "Clean export", description: "Validated prospects can move into a CRM or outreach workflow without another cleanup pass." },
    ],
  },
};
