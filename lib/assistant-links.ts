// Only links to reviewed public pages can become clickable model output.
const pages = new Set(["/", "/about", "/contact", "/projects", "/essays", "/assistant-privacy", "/privacy", "/terms", "/mission"]);
for (const slug of ["margin-and-matter", "noerong-proposals", "leaddesk-ai", "followdesk", "reviewdesk", "clientdesk", "growthdesk", "sourceroom", "proofread", "ledgerflow", "prospectlab"]) pages.add(`/projects/${slug}`);
for (const slug of ["would-i-exist-without-world-war-ii", "the-universe-is-not-a-coffee-mug", "the-british-empire-didnt-vanish-it-became-background-noise"]) pages.add(`/essays/${slug}`);
export function safeAssistantLink(value: string): string {
  try {
    if (!value || /[\\\u0000-\u0020]/.test(value)) return "";
    const url = new URL(value, "https://noerong.com");
    if (url.origin !== "https://noerong.com" || url.search || url.hash) return "";
    if (pages.has(url.pathname)) return url.pathname;
  } catch { /* Leave invalid links as plain text. */ }
  return "";
}
