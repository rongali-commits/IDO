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
    tags: ["FastAPI", "OpenAI-ready", "SQLite", "Docker"],
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
