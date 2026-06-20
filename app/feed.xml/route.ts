import { getAllEssays } from "@/lib/essays";
import { siteConfig } from "@/lib/site";

function escapeXml(value: string) { return value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '\"': "&quot;" })[char] || char); }
export async function GET() {
  const items = getAllEssays().map((essay) => `<item><title>${escapeXml(essay.title)}</title><link>${siteConfig.url}/essays/${essay.slug}</link><guid>${siteConfig.url}/essays/${essay.slug}</guid><description>${escapeXml(essay.description)}</description><pubDate>${new Date(essay.date).toUTCString()}</pubDate><category>${escapeXml(essay.topic)}</category></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${siteConfig.name}</title><link>${siteConfig.url}</link><description>${escapeXml(siteConfig.description)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
