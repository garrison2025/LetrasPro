import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const baseline = JSON.parse(fs.readFileSync(new URL('./fixtures/seo-baseline.json', import.meta.url), 'utf8'));
const routes = [...fs.readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
assert.deepEqual(routes, baseline.map(page => page.route), 'Existing public URLs must remain unchanged');
for (const page of baseline) {
  const html = fs.readFileSync(path.join('dist', page.route === '/' ? 'index.html' : `${page.route}.html`), 'utf8');
  assert.equal(html.match(/<title[^>]*>([^]*?)<\/title>/)?.[1], page.title, `Title changed: ${page.route}`);
  assert.equal(html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/)?.[1], page.description, `Description changed: ${page.route}`);
  assert.equal(html.match(/<h1[^>]*>([^]*?)<\/h1>/)?.[1], page.h1, `H1 changed: ${page.route}`);
  assert.equal(html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)?.[1], page.canonical, `Canonical changed: ${page.route}`);
  assert.ok(!/name="robots"[^>]*content="[^"]*noindex/.test(html), `Indexing changed: ${page.route}`);
}
console.log(`Preserved URLs, titles, descriptions, H1, canonical and indexability for all ${baseline.length} pages.`);
