// Read-only checks against the owned website. Does not follow checkout links.
const base = new URL(process.argv[2] || 'http://localhost:3000');
const sitemap = await fetch(new URL('/sitemap.xml', base)).then(r => r.text());
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
if (paths.length < 18) throw new Error('Expected the complete content sitemap.');
const failures = [];
const assets = new Set();
const links = new Map();
const pages = new Map();
for (const path of paths) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(30000) });
  const html = await response.text();
  pages.set(path, html);
  if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) failures.push(`${path}: expected one page heading`);
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${path}: missing title`);
  if (!/name="description" content="[^"]+"/.test(html)) failures.push(`${path}: missing description`);
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    const url = new URL(href.replaceAll('&amp;', '&'), base);
    if (url.origin === base.origin && !url.pathname.startsWith('/_next/') && !url.pathname.startsWith('/@')) links.set(url.pathname + url.hash, url);
  }
  for (const [, src] of html.matchAll(/<(?:img|source)[^>]*\ssrc="([^"]+)"/g)) {
    const url = new URL(src.replaceAll('&amp;', '&'), base);
    if (url.origin === base.origin) assets.add(url.href);
  }
}
for (const [key, url] of links) {
  if (pages.has(url.pathname)) {
    if (url.hash && !pages.get(url.pathname).includes(`id="${url.hash.slice(1)}"`)) failures.push(`${key}: missing anchor target`);
  } else {
    const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(30000) });
    if (!response.ok) failures.push(`${key}: HTTP ${response.status}`);
  }
}
for (const url of assets) {
  const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(30000) });
  if (!response.ok) failures.push(`${new URL(url).pathname}: HTTP ${response.status}`);
}
const missing = await fetch(new URL('/this-page-does-not-exist-layout-check', base));
const missingHtml = await missing.text();
if (missing.status !== 404 || !missingHtml.includes('A wrong turn.')) failures.push('Branded 404 recovery missing');
console.log(JSON.stringify({ origin: base.origin, pages: paths.length, localLinks: links.size, imageAndSourceAssets: assets.size, failures }, null, 2));
if (failures.length) process.exitCode = 1;
