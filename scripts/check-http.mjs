import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

const local = process.argv[2] === '--local';
let server;
let base;
try {
  if (local) {
    server = spawn(process.execPath, ['scripts/preview-pages.mjs', '--port', '0'], { stdio: ['ignore', 'pipe', 'inherit'] });
    const ready = await Promise.race([
      once(server.stdout, 'data').then(([chunk]) => chunk.toString().match(/http:\/\/127\.0\.0\.1:\d+/)?.[0]),
      once(server, 'exit').then(([code]) => { throw new Error(`Preview exited: ${code}`); }),
      new Promise((_, reject) => { const timer = setTimeout(() => reject(new Error('Preview startup timed out')), 10000); timer.unref(); }),
    ]);
    assert.ok(ready, 'Preview startup URL');
    base = new URL(ready);
  } else {
    base = new URL(process.argv[2]);
    assert.equal(base.protocol, 'https:', 'Use HTTPS for deployed checks');
    assert.ok(base.hostname === 'conversordeletrasbonitas.org' || base.hostname === 'letraspro.pages.dev' || base.hostname.endsWith('.letraspro.pages.dev'), 'Expected LetrasPro deployment');
    assert.ok(!base.username && !base.password && base.pathname === '/' && !base.search && !base.hash, 'Pass only the deployment origin');
  }

  const urls = [...fs.readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  const results = [];
  const check = async (route, expectedStatus, expectedHTML) => {
    try {
      const response = await fetch(new URL(route, base), { signal: AbortSignal.timeout(15000), redirect: 'manual' });
      assert.equal(new URL(response.url).origin, base.origin, 'Unexpected redirect to another site');
      assert.equal(response.status, expectedStatus, 'HTTP status');
      const html = await response.text();
      if (expectedHTML) {
        for (const expression of [/<title[^>]*>([^]*?)<\/title>/, /<h1[^>]*>([^]*?)<\/h1>/, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/]) {
          assert.equal(html.match(expression)?.[1], expectedHTML.match(expression)?.[1], `Page metadata: ${expression}`);
        }
        assert.ok(html.includes('data-prerendered="true"'), 'Missing prerendered content');
      }
      if (!local) {
        assert.equal(response.headers.get('x-content-type-options'), 'nosniff', 'Security headers');
        assert.ok(response.headers.get('strict-transport-security')?.includes('max-age='), 'HTTPS policy');
      }
      results.push({ route, status: response.status, passed: true });
    } catch (error) {
      results.push({ route, passed: false, error: error.message });
    }
  };
  for (const url of urls) {
    const route = new URL(url).pathname;
    await check(route, 200, fs.readFileSync(route === '/' ? 'dist/index.html' : `dist${route}.html`, 'utf8'));
  }
  for (const route of ['/__letraspro_missing_page__', '/blog/__letraspro_missing_article__', '/assets/__letraspro_missing_asset__.js']) await check(route, 404);
  console.log(JSON.stringify({ origin: base.origin, checks: results }, null, 2));
  assert.ok(results.every(result => result.passed), 'One or more HTTP checks failed');
} finally {
  server?.kill();
}
