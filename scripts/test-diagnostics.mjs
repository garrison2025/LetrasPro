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
    for (const code of ['render', 'browser', 'operation', 'offline', 'update']) {
      const response = await send(JSON.stringify({ code }));
      assert.equal(response.status, 204);
      assert.equal(response.headers.get('Cache-Control'), 'no-store');
      assert.deepEqual(JSON.parse(logged.at(-1)), { event: 'letraspro_client_error', code });
    }
    for (const payload of ['null', '[]', '{}', '{broken', '{"code":"private text"}', '{"code":"render","text":"secret"}', '{"code":"render","url":"/?text=secret"}']) {
      assert.equal((await send(payload)).status, 400);
    }
    assert.equal(logged.length, 5);
  } finally {
    console.warn = originalWarn;
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
    assert.deepEqual(points, [{ indexes: ['render'], blobs: ['render', 'production'], doubles: [1] }]);
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
  }).outputText;
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
    assert.deepEqual(calls.map(call => JSON.parse(call[1].body)), [{ code: 'render' }, { code: 'offline' }]);
    assert.ok(calls.every(call => call[0] === '/api/diagnostics' && call[1].credentials === 'omit'));
  } finally {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
    delete globalThis.window;
  }
});
