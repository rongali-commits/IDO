// Read-only production checks. No messages, purchases, or paid AI requests.
import assert from 'node:assert/strict';

const base = process.argv[2] || 'http://localhost:3014';
const checks = [
  ['/about', 'ProfilePage'],
  ['/contact', 'ContactPage'],
  ['/projects', 'ItemList'],
  ['/projects/signalroom', 'CreativeWork'],
  ['/essays/the-universe-is-not-a-coffee-mug', 'BlogPosting'],
];
for (const [path, type] of checks) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const entries = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]));
  assert.ok(entries.some(entry => entry['@type'] === type), `${path}: ${type}`);
  assert.ok(entries.some(entry => entry['@type'] === 'BreadcrumbList'), `${path}: breadcrumbs`);
  assert.ok(html.includes(`rel="canonical" href="https://noerong.com${path}"`), `${path}: canonical`);
  assert.ok(!/contra\s+labs|contralabs/i.test(html), `${path}: no private affiliations`);
}
for (const [path, target] of [['/work-with-me', '/contact'], ['/about/rongali-chaitanya', '/about']]) {
  const response = await fetch(new URL(path, base), { redirect: 'manual' });
  assert.equal(response.status, 308, `${path}: permanent redirect`);
  assert.equal(new URL(response.headers.get('location'), base).pathname, target);
}
const home = await fetch(base).then(response => response.text());
assert.ok(home.includes('Workflow clarity sprint'));
assert.ok(home.includes('LQq2ZQX6-workflow-clarity-sprint-map-simplify-plan'));
const contact = await fetch(new URL('/contact', base)).then(response => response.text());
assert.ok(contact.includes('Prepare my brief'));
assert.ok(contact.includes('Nothing is sent or stored by this form.'));
console.log(JSON.stringify({ origin: new URL(base).origin, structuredPages: checks.length, permanentRedirects: 2, offerAndBrief: 'passed' }, null, 2));
