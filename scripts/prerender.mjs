import fs from 'node:fs';
import path from 'node:path';
import { render } from '../.ssr/entry-server.js';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
if (new Set(routes).size !== routes.length || routes.length !== 29) throw new Error('Unexpected route list; check sitemap and routes together.');

for (const route of [...routes, '/404']) {
  const { html, head } = await render(route);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) throw new Error(`Expected one H1: ${route}`);
  let page = template.replace(/<title>[^]*?<\/title>/, '').replace(/<meta name="description"[^>]*>/, '');
  page = page.replace('</head>', `${head}\n</head>`).replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${html}</div>`);
  const getMeta = key => page.match(new RegExp(`<meta[^>]+name="${key}"[^>]+content="([^"]*)"`))?.[1];
  const title = page.match(/<title[^>]*>([^]*?)<\/title>/)?.[1] || 'LetrasPro';
  const description = getMeta('description') || '';
  const canonical = `https://conversordeletrasbonitas.org${route === '/' ? '/' : route}`;
  const extras = [];
  for (const [property, value] of [['og:type','website'],['og:title',title],['og:description',description],['og:url',canonical],['og:image','https://conversordeletrasbonitas.org/og-image.png']]) {
    if (!page.includes(`property="${property}"`)) extras.push(`<meta data-rh="true" property="${property}" content="${value.replace(/"/g, '&quot;')}"/>`);
  }
  if (!page.includes('name="twitter:card"')) extras.push('<meta data-rh="true" name="twitter:card" content="summary_large_image"/>');
  page = page.replace('</head>', `${extras.join('\n')}\n</head>`);
  const target = route === '/404' ? path.join(dist, '404.html') : path.join(dist, route, 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, page);
}
console.log(`Prerendered ${routes.length} existing pages and the 404 page.`);
