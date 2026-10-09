import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const titles = new Set();
for (const url of urls) {
  const route = new URL(url).pathname;
  const html = fs.readFileSync(path.join('dist', route, 'index.html'), 'utf8');
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `H1: ${route}`);
  const title = html.match(/<title[^>]*>([^]*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `Unique title: ${route}`);
  titles.add(title);
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
  assert.equal(canonical?.[1], url.replace(/\/$/, '') + (route === '/' ? '/' : ''), `Canonical: ${route}`);
  assert.match(html, /name="description"[^>]+content="[^\"]+"/, `Description: ${route}`);
  assert.ok(html.includes('property="og:image"'), `Share image: ${route}`);
  assert.ok(html.includes('data-prerendered="true"'), `Initial content: ${route}`);
  assert.ok(!html.includes('aggregateRating'), `No simulated rating: ${route}`);
  assert.ok(!html.includes('basado en 2450'), `No simulated votes: ${route}`);
  for (const script of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([^]*?)<\/script>/g)) JSON.parse(script[1]);
  for (const link of html.matchAll(/href="(\/[^"?#]*)/g)) {
    const target = link[1];
    if (target.startsWith('//')) continue;
    assert.ok(fs.existsSync(path.join('dist', target)) || fs.existsSync(path.join('dist', target, 'index.html')), `Local link ${target} from ${route}`);
  }
}
assert.equal(urls.length, 29);
const notFound = fs.readFileSync('dist/404.html','utf8');
assert.match(notFound, /name="robots"[^>]+content="noindex, follow"/);
assert.ok(!notFound.includes('rel="canonical"'));
assert.ok(fs.readFileSync('dist/logo.svg','utf8').includes('<svg'));
assert.equal(fs.readFileSync('dist/og-image.png').subarray(1,4).toString(), 'PNG');
const sw = fs.readFileSync('dist/sw.js','utf8');
assert.ok(sw.includes('try { importScripts('));
assert.ok(sw.indexOf('precacheAndRoute') < sw.indexOf('self.options ='));
console.log('Verified all 29 pages, metadata, internal links, structured data, assets and 404.');
