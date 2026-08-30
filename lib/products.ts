export type Product = {
  slug: string;
  name: string;
  stage: "Production" | "Working demo";
  category: string;
  summary: string;
  problem: string;
  image: string;
  imageAlt: string;
  liveUrl: string;
  contraUrl?: string;
  purchaseUrl?: string;
  startingPrice?: string;
  repository?: string;
  tags: string[];
};

export const products: Product[] = [
  {
    slug: "leaddesk-ai",
    name: "LeadDesk AI",
    stage: "Production",
    category: "AI lead capture",
    summary: "A white-label website assistant that answers approved FAQs and turns high-intent visitors into structured quote requests.",
    problem: "For service businesses losing ready-to-buy visitors after hours.",
    image: "/products/leaddesk-ai.png",
    imageAlt: "LeadDesk AI customer website and embedded assistant",
    liveUrl: "https://leaddesk-ai-production.up.railway.app",
    contraUrl: "https://contra.com/s/UbWOeM2v-i-will-build-a-white-label-ai-chatbot-and-lead-capture-system",
    purchaseUrl: "https://www.upwork.com/services/product/development-it-a-white-label-ai-chatbot-and-lead-capture-system-for-your-website-2093012217047462206",
    startingPrice: "$29",
    tags: ["FastAPI", "OpenAI-ready", "SQLite", "Docker"],
  },
  {
    slug: "followdesk",
    name: "FollowDesk",
    stage: "Production",
    category: "Lead follow-up automation",
    summary: "A white-label follow-up system that moves new enquiries through a focused sales pipeline and toward a booked call.",
    problem: "For service businesses losing good leads because follow-up depends on memory, spreadsheets, and scattered inboxes.",
    image: "/products/followdesk.png",
    imageAlt: "FollowDesk lead follow-up and booking dashboard",
    liveUrl: "https://followdesk-production.up.railway.app",
    contraUrl: "https://contra.com/s/sFBmXXU3-i-will-build-an-automated-lead-follow-up-and-booking-crm",
    startingPrice: "$39",
    tags: ["FastAPI", "Email automation", "Booking", "SQLite"],
  },
  {
    slug: "reviewdesk",
    name: "ReviewDesk",
    stage: "Production",
    category: "Customer feedback automation",
    summary: "A white-label system that requests honest feedback, automates reminders, and turns permissioned customer stories into an embeddable trust widget.",
    problem: "For local businesses doing excellent work but failing to turn completed jobs into consistent feedback and credible social proof.",
    image: "/products/reviewdesk.png",
    imageAlt: "ReviewDesk branded customer feedback experience",
    liveUrl: "https://reviewdesk-noerong.vercel.app",
    contraUrl: "https://contra.com/s/E6bAEMgv-i-will-build-an-automated-review-and-testimonial-system",
    startingPrice: "$29",
    tags: ["FastAPI", "Review requests", "Testimonials", "SQLite"],
  },
  {
    slug: "clientdesk",
    name: "ClientDesk",
    stage: "Production",
    category: "Client operations",
    summary: "A white-label client portal for onboarding, project progress, deliverables, approvals, and invoice visibility.",
    problem: "For agencies and consultants losing time to scattered updates, files, approval threads, and invoice follow-up.",
    image: "/products/clientdesk.png",
    imageAlt: "ClientDesk branded client portal and studio dashboard",
    liveUrl: "https://clientdesk-production-6c93.up.railway.app",
    startingPrice: "$39",
    tags: ["FastAPI", "Client portals", "Approvals", "SQLite"],
  },
  {
    slug: "growthdesk",
    name: "GrowthDesk",
    stage: "Production",
    category: "Client-service operating system",
    summary: "A complete white-label platform for enquiries, lead management, follow-up automation, client delivery, reviews, and revenue visibility.",
    problem: "For service businesses running one customer journey across disconnected forms, inboxes, spreadsheets, portals, and reminder tools.",
    image: "/products/growthdesk.png",
    imageAlt: "GrowthDesk command center with revenue pipeline and automation status",
    liveUrl: "https://growthdesk-production-0258.up.railway.app",
    contraUrl: "https://contra.com/s/bQWU7WFR-all-in-one-crm-client-portal-and-automation-system",
    purchaseUrl: "https://www.upwork.com/services/product/development-it-a-complete-white-label-crm-client-portal-and-automation-system-2093957315253409665",
    startingPrice: "$49",
    tags: ["Next.js", "TypeScript", "Automations", "Client portals"],
  },
  {
    slug: "sourceroom",
    name: "SourceRoom",
    stage: "Working demo",
    category: "Content operations",
    summary: "A focused workspace that turns one article, transcript, or set of notes into editable drafts for several channels.",
    problem: "For teams repeatedly rebuilding content from the same strong source.",
    image: "/products/source-room.png",
    imageAlt: "SourceRoom content repurposing workspace",
    liveUrl: "https://rongali-commits.github.io/content-repurposing-workspace/",
    repository: "https://github.com/rongali-commits/content-repurposing-workspace",
    tags: ["Editorial workflow", "Local-first", "JavaScript"],
  },
  {
    slug: "proofread",
    name: "Proofread",
    stage: "Working demo",
    category: "Document review",
    summary: "A transparent workbench that checks documents against custom criteria, shows the evidence, and exports a structured result.",
    problem: "For operations teams comparing many documents against the same rules.",
    image: "/products/proofread.png",
    imageAlt: "Proofread document review workbench",
    liveUrl: "https://rongali-commits.github.io/document-review-workbench/",
    repository: "https://github.com/rongali-commits/document-review-workbench",
    tags: ["Evidence shown", "Local processing", "JSON export"],
  },
  {
    slug: "ledgerflow",
    name: "LedgerFlow",
    stage: "Working demo",
    category: "Billing automation",
    summary: "A repeatable workflow that cleans billing data, validates every record, and prepares audit-ready exports.",
    problem: "For teams losing hours to recurring spreadsheet cleanup and reporting.",
    image: "/products/ledgerflow.png",
    imageAlt: "LedgerFlow billing automation dashboard",
    liveUrl: "https://rongali-commits.github.io/invoice-report-automation/",
    repository: "https://github.com/rongali-commits/invoice-report-automation",
    tags: ["Python", "CSV validation", "PDF output"],
  },
  {
    slug: "prospectlab",
    name: "ProspectLab",
    stage: "Working demo",
    category: "Lead intelligence",
    summary: "A lead-data pipeline that collects public business records, removes duplicates, scores fit, and exports clean prospect lists.",
    problem: "For sales teams spending more time cleaning leads than contacting them.",
    image: "/products/prospectlab.png",
    imageAlt: "ProspectLab lead intelligence dashboard",
    liveUrl: "https://rongali-commits.github.io/lead-intelligence-pipeline/",
    repository: "https://github.com/rongali-commits/lead-intelligence-pipeline",
    tags: ["Python", "Data quality", "CSV export"],
  },
];
