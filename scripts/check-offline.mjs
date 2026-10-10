import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const dataURL = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const transpile = file => ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const removeParams = dataURL(transpile('node_modules/workbox-precaching/src/utils/removeIgnoredSearchParams.ts').replace(/import ['"][^'"]+['"];?/g, ''));
const variations = transpile('node_modules/workbox-precaching/src/utils/generateURLVariations.ts').replace(/from ['"]\.\/removeIgnoredSearchParams.js['"]/g, `from '${removeParams}'`).replace(/import ['"][^'"]+['"];?/g, '');
const { generateURLVariations } = await import(dataURL(variations));
const { workboxOptions } = await import(dataURL(transpile('pwa.config.ts')));
globalThis.location = { href: 'https://conversordeletrasbonitas.org/sw.js' };
try {
  const sw = fs.readFileSync('dist/sw.js', 'utf8');
  assert.match(sw, /ignoreURLParametersMatching:/, 'Final worker must use the configured parameter matching');
  const manifest = JSON.parse(sw.match(/precacheAndRoute\((\[[\s\S]*?\]),/)[1].replace(/\b(url|revision):/g, '"$1":'));
  const cached = new Set(manifest.map(entry => new URL(entry.url, location.href).href));
  const matches = route => [...generateURLVariations(new URL(route, location.href).href, workboxOptions)].some(url => cached.has(url));
  const pages = JSON.parse(fs.readFileSync('scripts/fixtures/seo-baseline.json', 'utf8'));
  for (const page of pages) {
    assert.ok(matches(page.route), page.route);
    assert.ok(matches(`${page.route}?q=Elegante&utm_source=test`), `Offline query ${page.route}`);
  }
  for (const route of ['/favicon.ico?v=1', '/logo.svg?v=4', '/apple-touch-icon.png?v=1']) assert.ok(matches(route), route);
  assert.ok(!matches('/__missing_page__'), 'Do not turn unknown URLs into the homepage');
  assert.equal(workboxOptions.navigateFallback, undefined);
  console.log(`Verified actual Workbox URL matching for ${pages.length} pages with queries and versioned icons.`);
} finally { delete globalThis.location; }
