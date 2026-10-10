import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import ts from 'typescript';
import { onRequest } from '../functions/api/diagnostics.js';

const endpoint = 'https://conversordeletrasbonitas.org/api/diagnostics';
const send = (body, options = {}, env = { DIAGNOSTICS_ENABLED: 'true' }) => onRequest({
  request: new Request(endpoint, {
    method: 'POST',
    headers: { Origin: new URL(endpoint).origin, 'Content-Type': 'application/json', ...options.headers },
    body,
    ...Object.fromEntries(Object.entries(options).filter(([key]) => key !== 'headers')),
  }),
  env,
});

test('diagnostics remain disabled until the hosting configuration is enabled', async () => {
  assert.equal((await send('{"code":"render"}', {}, {})).status, 404);
});

test('only fixed diagnostic categories are logged, with no input or URL', async () => {
  const logged = [];
  const originalWarn = console.warn;
  console.warn = value => logged.push(value);
  try {
    for (const code of ['render', 'browser', 'operation', 'offline', 'update', 'browser_app', 'browser_external', 'browser_unknown', 'hydration']) {
      const response = await send(JSON.stringify({ code }));
      assert.equal(response.status, 204);
      assert.equal(response.headers.get('Cache-Control'), 'no-store');
      assert.deepEqual(JSON.parse(logged.at(-1)), { event: 'letraspro_client_error', code, release: 'legacy', viewport: 'unknown' });
    }
    for (const payload of ['null', '[]', '{}', '{broken', '{"code":"private text"}', '{"code":"render","text":"secret"}', '{"code":"render","url":"/?text=secret"}']) {
      assert.equal((await send(payload)).status, 400);
    }
    assert.equal(logged.length, 9);
  } finally {
    console.warn = originalWarn;
  }
});

test('browser source is reduced locally to fixed categories without transmitting URLs or error text', async () => {
  const source = ts.transpileModule(fs.readFileSync(new URL('../services/diagnostics.ts', import.meta.url), 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText.replaceAll('import.meta.env.VITE_APP_RELEASE', '"quality-20261010"').replaceAll('import.meta.env.VITE_DIAGNOSTICS_ENABLED', '"true"');
  const client = await import(`data:text/javascript;base64,${Buffer.from(source + '\n// source classification test').toString('base64')}`);
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  const originalWindow = globalThis.window;
  const calls = [];
  globalThis.window = { location: { origin: 'https://conversordeletrasbonitas.org' } };
  globalThis.fetch = async (url, options) => { calls.push({ url, options }); return new Response(null, { status: 204 }); };
  console.warn = () => {};
  try {
    for (const filename of ['', 'not a URL', 'data:text/javascript,secret', 'https://conversordeletrasbonitas.org/assets/app.js?private=secret', 'https://ads.example/script.js?private=secret']) {
      client.reportBrowserError({ filename, message: 'private input' });
    }
    await Promise.resolve();
    assert.deepEqual(calls.map(call => JSON.parse(call.options.body)), [
      { code: 'browser_unknown', release: 'quality-20261010', viewport: 'wide' }, { code: 'browser_app', release: 'quality-20261010', viewport: 'wide' }, { code: 'browser_external', release: 'quality-20261010', viewport: 'wide' },
    ]);
    assert.ok(calls.every(call => call.url === '/api/diagnostics' && call.options.credentials === 'omit'));
    assert.ok(!JSON.stringify(calls).includes('secret'));
    assert.ok(!JSON.stringify(calls).includes('private input'));
  } finally {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
    if (originalWindow === undefined) delete globalThis.window; else globalThis.window = originalWindow;
  }
});

test('cross-site requests, wrong methods and unsupported formats are rejected', async () => {
  assert.equal((await send('{}', { headers: { Origin: 'https://unrelated.example' } })).status, 403);
  assert.equal((await send('{}', { headers: { Origin: '' } })).status, 403);
  assert.equal((await send('{}', { headers: { 'Content-Type': 'text/plain' } })).status, 415);
  assert.equal((await send(undefined, { method: 'GET' })).status, 405);
  assert.equal((await send(undefined)).status, 400);
});

test('oversized bodies are bounded even without a content-length header', async () => {
  assert.equal((await send(' '.repeat(129))).status, 413);
  assert.equal((await send('ñ'.repeat(65))).status, 413);
});

test('persistent statistics contain only a fixed category, environment and count', async () => {
  const points = [];
  const originalWarn = console.warn;
  console.warn = () => {};
  try {
    const env = { DIAGNOSTICS_ENABLED: 'true', DIAGNOSTICS_STATS: { writeDataPoint: value => points.push(value) } };
    assert.equal((await send('{"code":"render"}', {}, env)).status, 204);
    assert.deepEqual(points, [{ indexes: ['render'], blobs: ['render', 'production', 'legacy', 'unknown'], doubles: [1] }]);
    assert.equal((await send('{"code":"render","text":"secret"}', {}, env)).status, 400);
    assert.equal(points.length, 1);
    env.DIAGNOSTICS_STATS.writeDataPoint = () => { throw new Error('Storage unavailable'); };
    assert.equal((await send('{"code":"browser"}', {}, env)).status, 204);
  } finally {
    console.warn = originalWarn;
  }
});

test('client diagnostics are opt-in, deduplicated and ignore delivery failures', async () => {
  const source = ts.transpileModule(fs.readFileSync(new URL('../services/diagnostics.ts', import.meta.url), 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText.replaceAll('import.meta.env.VITE_APP_RELEASE', '"quality-20261010"');
  const loadClient = enabled => import(`data:text/javascript;base64,${Buffer.from(source.replaceAll('import.meta.env.VITE_DIAGNOSTICS_ENABLED', JSON.stringify(enabled))).toString('base64')}`);
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  const calls = [];
  globalThis.window = {};
  globalThis.fetch = async (...args) => { calls.push(args); throw new Error('network unavailable'); };
  console.warn = () => {};
  try {
    const disabled = await loadClient('false');
    disabled.reportDiagnostic('render');
    assert.equal(calls.length, 0);
    const enabled = await loadClient('true');
    enabled.reportDiagnostic('render');
    enabled.reportDiagnostic('render');
    enabled.reportDiagnostic('offline');
    await Promise.resolve();
    assert.equal(calls.length, 2);
    assert.deepEqual(calls.map(call => JSON.parse(call[1].body)), [{ code: 'render', release: 'quality-20261010', viewport: 'wide' }, { code: 'offline', release: 'quality-20261010', viewport: 'wide' }]);
    assert.ok(calls.every(call => call[0] === '/api/diagnostics' && call[1].credentials === 'omit'));
  } finally {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
    delete globalThis.window;
  }
});

test('performance ratings accept only fixed categories and bounded public release metadata', async () => {
  const originalWarn = console.warn;
  console.warn = () => {};
  const points = [];
  const env = { DIAGNOSTICS_ENABLED: 'true', DIAGNOSTICS_STATS: { writeDataPoint: point => points.push(point) } };
  try {
    for (const name of ['lcp', 'inp', 'cls']) for (const rating of ['good', 'needs', 'poor']) {
      const body = JSON.stringify({ code: `perf_${name}_${rating}`, release: 'a'.repeat(40), viewport: 'compact' });
      assert.ok(new TextEncoder().encode(body).length <= 128);
      assert.equal((await send(body, {}, env)).status, 204);
    }
    assert.equal(points.length, 9);
    assert.deepEqual(points[0].blobs, ['perf_lcp_good', 'production', 'a'.repeat(40), 'compact']);
    for (const event of [
      { code: 'perf_lcp_secret' }, { code: 'perf_lcp_good', value: 123 },
      { code: 'render', release: 'private input' }, { code: 'render', release: {} },
      { code: 'render', viewport: 'my-phone-id' }, { code: 'render', release: 'a'.repeat(41) },
    ]) assert.equal((await send(JSON.stringify(event), {}, env)).status, 400);
    assert.equal(points.length, 9);
  } finally { console.warn = originalWarn; }
});

test('vitals discard attribution, raw values and metric IDs before sending', async () => {
  const source = ts.transpileModule(fs.readFileSync(new URL('../services/diagnostics.ts', import.meta.url), 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText.replaceAll('import.meta.env.VITE_DIAGNOSTICS_ENABLED', '"true"').replaceAll('import.meta.env.VITE_APP_RELEASE', '"quality-20261010"');
  const client = await import(`data:text/javascript;base64,${Buffer.from(source + '\n// vitals privacy').toString('base64')}`);
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;
  const calls = [];
  globalThis.window = { matchMedia: () => ({ matches: true }) };
  globalThis.fetch = async (_, options) => { calls.push(JSON.parse(options.body)); return new Response(null, { status: 204 }); };
  try {
    client.reportVital({ name: 'LCP', rating: 'good', value: 1234, id: 'private-id', entries: [{ url: 'private-input' }] });
    client.reportVital({ name: 'LCP', rating: 'good' });
    client.reportVital({ name: 'INP', rating: 'needs-improvement' });
    client.reportVital({ name: 'CLS', rating: 'poor' });
    client.reportVital({ name: 'PRIVATE', rating: 'good' });
    assert.deepEqual(calls.map(call => call.code), ['perf_lcp_good', 'perf_inp_needs', 'perf_cls_poor']);
    assert.ok(calls.every(call => call.viewport === 'compact' && Object.keys(call).length === 3));
    assert.ok(!JSON.stringify(calls).includes('private'));
    assert.ok(!JSON.stringify(calls).includes('1234'));
  } finally { globalThis.fetch = originalFetch; if (originalWindow === undefined) delete globalThis.window; else globalThis.window = originalWindow; }
});
