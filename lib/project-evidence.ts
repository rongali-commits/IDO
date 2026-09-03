type ProjectEvidence = {
  architecture: string;
  outcome: string;
  deployment: string;
  gallery?: { image: string; caption: string; width?: number; height?: number }[];
};

export const projectEvidence: Record<string, ProjectEvidence> = {
  "noerong-proposals": {
    architecture: "React and TypeScript keep the proposal editor and pricing states explicit. Supabase authentication and PostgreSQL Row Level Security separate each user's records; a server-side function handles token-based client review without exposing private workspace data.",
    outcome: "A working path from client record to priced scope, branded review link, and recorded decision. The public sample lets a reviewer inspect the client experience without signing up.",
    deployment: "The source kit requires its own database, authentication configuration, function deployment, and secrets. Configure and test the buyer's production origin before sharing real proposals. Sample records illustrate the workflow; they are not client results.",
    gallery: [
      { image: "/products/evidence/noerong-proposals-client.png", caption: "The client review page keeps scope, pricing, and decision actions together." },
      { image: "/products/evidence/noerong-proposals-pipeline.png", caption: "The workspace exposes proposal status, value, and the next action." },
    ],
  },
  growthdesk: {
    architecture: "Next.js and TypeScript support the customer-facing pages and operational workspace in one application. Shared records connect leads, delivery, feedback, and reporting, avoiding duplicated customer context across modules.",
    outcome: "A deployed end-to-end customer-service workflow with connected modules and a reusable white-label configuration. The work demonstrates product integration, not measured revenue gains from a client engagement.",
    deployment: "The source kit is a single-business foundation, not a turnkey multi-tenant SaaS. Add and verify authentication and authorization before using real customer data. Configure storage, secrets, provider credentials, backups, and integrations for the buyer's environment.",
    gallery: [
      { image: "/products/evidence/growthdesk-pipeline.png", width: 1265, height: 712, caption: "A lead pipeline makes ownership, value, stage, and next action visible." },
      { image: "/products/evidence/growthdesk-portal.png", width: 1265, height: 712, caption: "Client delivery stays connected to the same customer journey." },
    ],
  },
  "leaddesk-ai": {
    architecture: "FastAPI handles approved-answer retrieval and validated quote capture. SQLite stores enquiries for a focused business deployment. The optional OpenAI integration stays server-side, with deterministic answers and safe fallback behavior when AI is unavailable.",
    outcome: "A working visitor-to-enquiry flow: ask a question, inspect an approved answer, submit a structured request, and manage the lead. A useful baseline works without a paid AI API.",
    deployment: "Configure the business knowledge base, persistent storage, admin token, and optional AI/webhook credentials. Review approved answers and privacy requirements before launch. Full multi-user authentication and a database upgrade are separate work for larger deployments.",
    gallery: [
      { image: "/products/evidence/leaddesk-ai-dashboard.png", caption: "The lead workspace turns captured enquiries into records the business can act on." },
      { image: "/products/evidence/leaddesk-ai-workflow.png", caption: "The product connects approved business information with a structured enquiry workflow." },
    ],
  },
  followdesk: {
    architecture: "FastAPI and SQLite maintain the lead record, six-stage pipeline, and activity history. Scheduled follow-ups use editable approved templates; booking and closed states suppress future sequence messages. SMTP is configured separately from the no-send showcase.",
    outcome: "A working enquiry-to-booking workflow with explicit next actions and repeatable follow-up. The emphasis is operational clarity rather than an unverified conversion-rate promise.",
    deployment: "Production email needs the buyer's SMTP provider, verified sender domain, and approved copy. Configure private admin/webhook tokens and persistent storage. The public example does not send real outreach; multi-tenant operation requires additional authentication and database work.",
    gallery: [
      { image: "/products/evidence/followdesk-dashboard.png", caption: "Pipeline stages and next actions make lead follow-up visible." },
      { image: "/products/evidence/followdesk-workflow.png", caption: "Follow-up controls keep the workflow configurable for the business." },
    ],
  },
  reviewdesk: {
    architecture: "FastAPI and SQLite connect request links, response records, reminders, and publishing permissions. Consent and admin approval are separate states. Every rating receives the same public-review option, keeping the workflow distinct from review gating.",
    outcome: "A working path from completed job to private feedback and an approved testimonial. The screens demonstrate consent and publishing decisions, not ratings earned by a real client.",
    deployment: "Configure persistent storage, private tokens, a verified email sender, and buyer-approved request copy. Public examples do not send email or retain visitor submissions. The buyer must review applicable privacy and review-platform requirements before launch.",
    gallery: [
      { image: "/products/evidence/reviewdesk-dashboard.png", caption: "Request and response status remain visible in the review workspace." },
      { image: "/products/evidence/reviewdesk-workflow.png", caption: "The feedback workflow separates private responses from permissioned public proof." },
    ],
  },
  clientdesk: {
    architecture: "FastAPI and SQLite serve a focused client portal and a separate studio workspace. Client-specific links expose the relevant project view, while administrative APIs are token-protected. Deliverables and payments use buyer-owned external links rather than custom file or payment processing.",
    outcome: "A working client-delivery experience that joins progress, approvals, files, updates, and invoice visibility in one branded place. The interface gives clients context and teams a clear operational view.",
    deployment: "Configure the business identity, admin token, persistent storage, and client access links before launch. Intended for a single-business deployment; full user authentication and PostgreSQL are the upgrade path for serving multiple organizations. Hosting and payment-provider costs are separate.",
    gallery: [
      { image: "/products/evidence/clientdesk-portal.png", caption: "A private client view surfaces progress, deliverables, and pending decisions." },
      { image: "/products/evidence/clientdesk-studio.png", caption: "The studio dashboard organizes active delivery workspaces." },
    ],
  },
  sourceroom: {
    architecture: "A local-first JavaScript workspace keeps source material beside editable channel drafts. The separation between source, audience, and output makes editorial review part of the interface instead of treating generation as automatic publication.",
    outcome: "An interactive exploration of content repurposing with a visible human editing step.",
    deployment: "This is a working portfolio example. Review and edit all output before publication; production integrations, accounts, and collaboration need a separately scoped implementation.",
  },
  proofread: {
    architecture: "Local processing compares document content with explicit criteria and displays evidence alongside findings. Structured JSON export makes the result inspectable and reusable rather than hiding the reasoning in a single score.",
    outcome: "An interactive document-review workflow that keeps criteria, evidence, and exceptions visible to the reviewer.",
    deployment: "This is a working portfolio example, not a compliance certification or legal review. Human judgment remains necessary; production storage, access controls, and external integrations require a separate scope.",
  },
  ledgerflow: {
    architecture: "The Python-oriented workflow separates input validation, cleanup, exceptions, and export. This makes a recurring billing process reproducible and keeps malformed records visible before they enter downstream reports.",
    outcome: "A working example of repeatable billing-data preparation with explicit validation and export stages.",
    deployment: "This portfolio example demonstrates the workflow. Validate against the buyer's actual source format and accounting requirements before using outputs operationally; integrations are separately scoped.",
  },
  prospectlab: {
    architecture: "The data workflow separates normalization, duplicate removal, fit scoring, and export. Visible quality signals let an operator assess a record before moving it into an outreach system.",
    outcome: "A working example of turning inconsistent public business records into a reviewable prospect list.",
    deployment: "This portfolio example is not an automated outreach service. Production collection must use permitted sources and buyer-approved criteria, with applicable privacy and platform requirements reviewed before use.",
  },
};
