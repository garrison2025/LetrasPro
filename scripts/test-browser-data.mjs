import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const moduleURL = (path, imports = {}) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(new URL(path, import.meta.url), 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.React }
  });
  const resolved = outputText.replace(/from ['"]([^'"]+)['"]/g, (_, name) =>
    `from ${JSON.stringify(imports[name] || pathToFileURL(require.resolve(name)).href)}`);
  return `data:text/javascript;base64,${Buffer.from(resolved).toString('base64')}`;
};

const storageURL = moduleURL('../services/storage.ts');
const { readStorage, writeStorage, readStoredArray } = await import(storageURL);
const commentsURL = moduleURL('../data/staticComments.ts');
const { USAGE_TIPS } = await import(commentsURL);
const { default: CommentsSection } = await import(moduleURL('../components/CommentsSection.tsx', {
  '../services/storage': storageURL,
  '../data/staticComments': commentsURL
}));

test('storage reads and writes existing values without changing their keys', () => {
  const values = new Map();
  globalThis.localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  try {
    assert.equal(readStorage('missing'), null);
    writeStorage('let_pro_input', '¡Hola ñ ü!');
    assert.equal(readStorage('let_pro_input'), '¡Hola ñ ü!');
  } finally {
    delete globalThis.localStorage;
  }
});

test('disabled storage, full storage and a blocked storage getter do not crash', () => {
  globalThis.localStorage = { getItem: () => { throw new Error('SecurityError'); }, setItem: () => { throw new Error('QuotaExceededError'); } };
  try {
    assert.equal(readStorage('theme'), null);
    assert.doesNotThrow(() => writeStorage('theme', 'dark'));
    assert.deepEqual(readStoredArray('let_pro_favs', value => typeof value === 'string'), []);
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, get: () => { throw new Error('SecurityError'); } });
    assert.equal(readStorage('theme'), null);
    assert.doesNotThrow(() => writeStorage('theme', 'light'));
  } finally {
    delete globalThis.localStorage;
  }
  assert.equal(readStorage('theme'), null);
});

test('corrupted JSON and non-array saved data fall back to an empty list', () => {
  try {
    for (const saved of ['{broken', 'null', '{}', '42', '"text"']) {
      globalThis.localStorage = { getItem: () => saved };
      assert.deepEqual(readStoredArray('let_pro_favs', value => typeof value === 'string'), []);
    }
  } finally {
    delete globalThis.localStorage;
  }
});

test('mixed saved arrays retain valid entries and reject invalid entries', () => {
  globalThis.localStorage = { getItem: () => '["pro-sans",null,{},7,"pro-script-bold"]' };
  try {
    assert.deepEqual(readStoredArray('let_pro_favs', value => typeof value === 'string'), ['pro-sans', 'pro-script-bold']);
  } finally {
    delete globalThis.localStorage;
  }
});

test('comment rendering preserves the existing keyword text and bold formatting', () => {
  const html = renderToStaticMarkup(React.createElement(CommentsSection));
  assert.ok(html.includes('<strong class="text-primary-600 dark:text-primary-400">conversor de letras góticas</strong>'));
  assert.ok(html.includes('Consejos de uso'));
  assert.ok(html.includes('No se publican'));
});

test('comment HTML, event handlers and scripts render as inert text, including inside bold markup', () => {
  const original = [...USAGE_TIPS];
  try {
    USAGE_TIPS.splice(0, USAGE_TIPS.length, '<img src=x onerror="alert(1)"> **<svg onload="alert(2)">** <script>alert(3)</script> & ñ ü');
    const html = renderToStaticMarkup(React.createElement(CommentsSection));
    assert.ok(!html.includes('<img src=x'));
    assert.ok(!html.includes('<script>'));
    assert.ok(!html.includes('<svg onload='));
    assert.ok(html.includes('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;'));
    assert.ok(html.includes('<strong class="text-primary-600 dark:text-primary-400">&lt;svg onload=&quot;alert(2)&quot;&gt;</strong>'));
    assert.ok(html.includes('&amp; ñ ü'));
  } finally {
    USAGE_TIPS.splice(0, USAGE_TIPS.length, ...original);
  }
});
