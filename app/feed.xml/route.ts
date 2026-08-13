import { getAllEssays } from "@/lib/essays";
import { siteConfig } from "@/lib/site";

function escapeXml(value: string) { return value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '\"': "&quot;" })[char] || char); }
export async function GET() {
  const items = getAllEssays().map((essay) => `    <item>\n      <title>${escapeXml(essay.title)}</title>\n      <link>${siteConfig.url}/essays/${essay.slug}</link>\n      <guid isPermaLink="true">${siteConfig.url}/essays/${essay.slug}</guid>\n      <description>${escapeXml(essay.description)}</description>\n      <pubDate>${new Date(essay.date).toUTCString()}</pubDate>\n      <category>${escapeXml(essay.topic)}</category>\n    </item>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${siteConfig.name}</title>\n    <link>${siteConfig.url}</link>\n    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />\n    <description>${escapeXml(siteConfig.description)}</description>\n    <language>en</language>\n    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n${items}\n  </channel>\n</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" } });
}
