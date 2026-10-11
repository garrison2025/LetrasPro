import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const titles = new Set();
const crawlLinks = new Map();
const manifest = JSON.parse(fs.readFileSync('dist/.vite/manifest.json', 'utf8'));
const fontCSS = fs.readFileSync('fonts.css', 'utf8');
const fontFaces = [...fontCSS.matchAll(/@font-face\s*\{([^}]+)\}/g)].map(match => match[1]);
assert.equal(fontFaces.length, 34, 'Preserve all original Google Fonts subsets and weights');
for (const face of fontFaces) {
  assert.match(face, /font-display: swap/);
  assert.match(face, /src: url\(https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2\)/);
  assert.match(face, /unicode-range:/);
}
for (const url of urls) {
  const route = new URL(url).pathname;
  const html = fs.readFileSync(path.join('dist', route === '/' ? 'index.html' : `${route}.html`), 'utf8');
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `H1: ${route}`);
  const title = html.match(/<title[^>]*>([^]*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `Unique title: ${route}`);
  titles.add(title);
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
  assert.equal(canonical?.[1], url.replace(/\/$/, '') + (route === '/' ? '/' : ''), `Canonical: ${route}`);
  assert.match(html, /name="description"[^>]+content="[^\"]+"/, `Description: ${route}`);
  assert.ok(html.includes('property="og:image"'), `Share image: ${route}`);
  assert.ok(html.includes('data-prerendered="true"'), `Initial content: ${route}`);
  assert.ok(!html.includes('fonts.googleapis.com'), `No render-blocking font stylesheet: ${route}`);
  assert.ok(!/<link[^>]+rel="stylesheet"/.test(html), `No stylesheet request before first paint: ${route}`);
  const inlineCSS = html.match(/<style data-site-styles>([^]*?)<\/style>/)?.[1];
  const builtCSS = manifest['index.html'].css.map(file => fs.readFileSync(path.join('dist', file), 'utf8')).join('');
  assert.equal(inlineCSS, builtCSS, `Complete compiled stylesheet preserved: ${route}`);
  const fontPreloads = [...html.matchAll(/<link[^>]+rel="preload"[^>]+as="font"[^>]+href="([^"]+)"[^>]+crossorigin/g)].map(match => match[1]);
  assert.equal(fontPreloads.length, 2, `Only the two first-screen fonts preloaded: ${route}`);
  for (const font of fontPreloads) assert.ok(inlineCSS.includes(font), `Preload matches the existing font: ${route}`);
  const preloads = [...html.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="([^"]+)"/g)].map(match => match[1]);
  const routeChunks = preloads.filter(file => Object.entries(manifest).some(([key, entry]) => key.startsWith('pages/') && `/${entry.file}` === file));
  assert.equal(routeChunks.length, 1, `Preload only the current page module: ${route}`);
  const pageName = applicationPageName(route);
  assert.equal(routeChunks[0], `/${manifest[`pages/${pageName}.tsx`].file}`, `Correct page module: ${route}`);
  assert.ok(!html.includes('aggregateRating'), `No simulated rating: ${route}`);
  assert.ok(!html.includes('basado en 2450'), `No simulated votes: ${route}`);
  const entities = [];
  const references = [];
  const inspectSchema = value => {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) return value.forEach(inspectSchema);
    if (value['@id']) {
      if (value['@type']) entities.push(value);
      else references.push(value['@id']);
    }
    Object.values(value).forEach(inspectSchema);
  };
  for (const script of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([^]*?)<\/script>/g)) inspectSchema(JSON.parse(script[1]));
  const siteUrl = 'https://conversordeletrasbonitas.org';
  const website = entities.filter(entity => entity['@type'] === 'WebSite');
  assert.equal(website.length, 1, `Single website identity: ${route}`);
  assert.equal(website[0]['@id'], `${siteUrl}/#website`);
  assert.equal(website[0].inLanguage, 'es');
  assert.equal(website[0].publisher['@id'], `${siteUrl}/#organization`);
  const organization = entities.find(entity => entity['@id'] === `${siteUrl}/#organization`);
  assert.equal(organization?.name, 'LetrasPro', `Publisher: ${route}`);
  assert.ok(fs.existsSync(path.join('dist', new URL(organization.logo.url).pathname)), `Publisher logo: ${route}`);
  const webpage = entities.find(entity => entity['@id'] === `${canonical[1]}#webpage`);
  assert.equal(webpage?.url, canonical[1], `Page identity matches canonical: ${route}`);
  assert.equal(webpage.inLanguage, 'es');
  assert.equal(webpage.isPartOf['@id'], website[0]['@id']);
  for (const reference of references) assert.ok(entities.some(entity => entity['@id'] === reference), `Resolved schema reference ${reference}: ${route}`);
  const application = entities.find(entity => entity['@type'] === 'WebApplication');
  if (application) {
    assert.equal(application.publisher['@id'], organization['@id']);
    assert.equal(webpage.mainEntity['@id'], application['@id']);
    assert.match(html, /id="ejemplo-conversion"/, `Visible usage explanation: ${route}`);
    assert.match(html, /data-conversion-example[^>]*>[^<]+<\/dd>/, `Real initial-HTML conversion: ${route}`);
    assert.ok(html.includes('href="https://www.unicode.org/faq/font_keyboard.html"'), `Primary technical source: ${route}`);
    assert.ok(html.includes('href="/sobre-nosotros#equipo-editorial"'), `Editorial attribution: ${route}`);
  }
  const article = entities.find(entity => entity['@type'] === 'BlogPosting');
  if (article) {
    assert.equal(article.author['@id'], `${siteUrl}/sobre-nosotros#equipo-editorial`);
    assert.equal(article.publisher['@id'], organization['@id']);
    assert.equal(webpage.mainEntity['@id'], article['@id']);
    assert.equal(article.dateModified, '2026-10-10');
    assert.ok(html.includes('Revisión editorial: 10 de octubre de 2026'), `Visible review date: ${route}`);
    assert.ok([...html.matchAll(/<a\s[^>]*>/g)].some(([anchor]) => anchor.includes('href="/sobre-nosotros#equipo-editorial"') && anchor.includes('rel="author"')), `Visible author link: ${route}`);
  }
  for (const link of html.matchAll(/href="(\/[^"?#]*)/g)) {
    const target = link[1];
    if (target.startsWith('//')) continue;
    assert.ok(fs.existsSync(path.join('dist', target)) || fs.existsSync(path.join('dist', `${target}.html`)), `Local link ${target} from ${route}`);
  }
  crawlLinks.set(route, [...html.matchAll(/<a[^>]+href="(\/[^"?#]*)/g)].map(match => match[1]));
}
assert.equal(urls.length, 29);
const reached = new Set();
const pending = ['/'];
while (pending.length) {
  const route = pending.pop();
  if (reached.has(route)) continue;
  reached.add(route);
  pending.push(...(crawlLinks.get(route) || []).filter(target => crawlLinks.has(target)));
}
for (const route of crawlLinks.keys()) assert.ok(reached.has(route), `Reachable from homepage: ${route}`);
assert.ok(fs.readFileSync('dist/sobre-nosotros.html', 'utf8').includes('id="equipo-editorial"'), 'Author destination exists');
const notFound = fs.readFileSync('dist/404.html','utf8');
assert.match(notFound, /name="robots"[^>]+content="noindex, follow"/);
assert.ok(!notFound.includes('rel="canonical"'));
assert.ok(fs.readFileSync('dist/logo.svg','utf8').includes('<svg'));
assert.equal(fs.readFileSync('dist/og-image.png').subarray(1,4).toString(), 'PNG');
const sw = fs.readFileSync('dist/sw.js','utf8');
const functionRoutes = JSON.parse(fs.readFileSync('dist/_routes.json', 'utf8'));
assert.deepEqual(functionRoutes, { version: 1, include: ['/api/diagnostics'], exclude: [] });
assert.ok(!fs.readFileSync('index.tsx', 'utf8').includes('confirm('), 'Updates must not interrupt editing with a native dialog');
assert.ok(sw.includes('try { importScripts('));
assert.ok(sw.indexOf('precacheAndRoute') < sw.indexOf('self.options ='));
assert.match(JSON.parse(fs.readFileSync('dist/app-version.json', 'utf8')).release, /^(?:[a-f0-9]{12}|quality-20261010)$/);
assert.match(fs.readFileSync('dist/_headers', 'utf8'), /\/app-version\.json\s+Cache-Control: no-store/);
console.log('Verified all 29 pages, metadata, internal links, structured data, assets and 404.');

function applicationPageName(route) {
  if (route.startsWith('/blog/')) return 'BlogPostPage';
  return {
    '/repetidor-de-texto': 'RepeaterPage', '/texto-glitch': 'GlitchPage',
    '/texto-invisible': 'InvisibleTextPage', '/texto-al-reves': 'FlipTextPage',
    '/letras-grandes': 'BigTextPage', '/blog': 'BlogIndexPage',
    '/sobre-nosotros': 'AboutPage', '/contacto': 'ContactPage',
    '/politica-de-privacidad': 'PrivacyPage', '/terminos-y-condiciones': 'TermsPage',
  }[route] || 'GeneratorPage';
}
