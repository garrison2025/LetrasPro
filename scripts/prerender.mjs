import fs from 'node:fs';
import path from 'node:path';
import { render } from '../.ssr/entry-server.js';
import { criticalCSS } from './critical-css.mjs';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite/manifest.json'), 'utf8'));
const toolPages = {
  '/repetidor-de-texto': 'RepeaterPage',
  '/texto-glitch': 'GlitchPage',
  '/texto-invisible': 'InvisibleTextPage',
  '/texto-al-reves': 'FlipTextPage',
  '/letras-grandes': 'BigTextPage',
  '/blog': 'BlogIndexPage',
  '/sobre-nosotros': 'AboutPage',
  '/contacto': 'ContactPage',
  '/politica-de-privacidad': 'PrivacyPage',
  '/terminos-y-condiciones': 'TermsPage',
  '/404': 'NotFoundPage',
};
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
if (new Set(routes).size !== routes.length || routes.length !== 29) throw new Error('Unexpected route list; check sitemap and routes together.');

for (const route of [...routes, '/404']) {
  const { html, head } = await render(route);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) throw new Error(`Expected one H1: ${route}`);
  let page = template.replace(/<title>[^]*?<\/title>/, '').replace(/<meta name="description"[^>]*>/, '');
  page = page.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="(\/assets\/[^\"]+\.css)"[^>]*>/g, (_, href) => {
    const css = criticalCSS(fs.readFileSync(path.join(dist, href), 'utf8'), html);
    if (/<\/style/i.test(css)) throw new Error('Unsafe inline stylesheet');
    return `<style data-critical-styles>${css}</style><link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${href}"></noscript>`;
  });
  page = page.replace('</head>', `${head}\n</head>`).replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${html}</div>`);
  const getMeta = key => page.match(new RegExp(`<meta[^>]+name="${key}"[^>]+content="([^"]*)"`))?.[1];
  const title = page.match(/<title[^>]*>([^]*?)<\/title>/)?.[1] || 'LetrasPro';
  const description = getMeta('description') || '';
  const canonical = `https://conversordeletrasbonitas.org${route === '/' ? '/' : route}`;
  const extras = [];
  const pageName = route.startsWith('/blog/') ? 'BlogPostPage' : toolPages[route] || 'GeneratorPage';
  const pageChunk = manifest[`pages/${pageName}.tsx`]?.file;
  if (!pageChunk || !fs.existsSync(path.join(dist, pageChunk))) throw new Error(`Missing page chunk: ${route}`);
  // Discover only this route's lazy module before the application starts hydrating.
  extras.push(`<link rel="modulepreload" crossorigin href="/${pageChunk}">`);
  for (const [property, value] of [['og:type','website'],['og:title',title],['og:description',description],['og:url',canonical],['og:image','https://conversordeletrasbonitas.org/og-image.png']]) {
    if (!page.includes(`property="${property}"`)) extras.push(`<meta data-rh="true" property="${property}" content="${value.replace(/"/g, '&quot;')}"/>`);
  }
  if (!page.includes('name="twitter:card"')) extras.push('<meta data-rh="true" name="twitter:card" content="summary_large_image"/>');
  page = page.replace('</head>', `${extras.join('\n')}\n</head>`);
  const target = route === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route}.html`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, page);
}
console.log(`Prerendered ${routes.length} existing pages and the 404 page.`);
