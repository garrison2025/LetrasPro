import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import test from 'node:test';
import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import ts from 'typescript';

const dataURL = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const registrationURL = dataURL(`
  export let callbacks;
  export const updates = [];
  export let rejectUpdate = false;
  export function failNextUpdate(value) { rejectUpdate = value; }
  export function registerSW(options) {
    callbacks = options;
    return async reload => { updates.push(reload); if (rejectUpdate) throw new Error('offline'); };
  }
`);
const diagnosticsURL = dataURL('export const events = []; export function reportDiagnostic(code) { events.push(code); }');
const registration = await import(registrationURL);
const diagnostics = await import(diagnosticsURL);
const require = createRequire(import.meta.url);
const source = ts.transpileModule(fs.readFileSync(new URL('../components/UpdateNotice.tsx', import.meta.url), 'utf8'), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.React },
}).outputText.replace(/from ['"]([^'"]+)['"]/g, (_, name) => `from ${JSON.stringify(
  name === 'virtual:pwa-register' ? registrationURL : name === '../services/diagnostics' ? diagnosticsURL : pathToFileURL(require.resolve(name)).href
)}`);
const { default: UpdateNotice } = await import(dataURL(source));

test('an available update waits for a user choice and can be dismissed', async () => {
  let renderer;
  await act(async () => { renderer = TestRenderer.create(React.createElement(UpdateNotice)); });
  try {
    assert.equal(renderer.toJSON(), null);
    assert.equal(registration.callbacks.immediate, true);
    await act(async () => { registration.callbacks.onNeedRefresh(); });
    assert.equal(registration.updates.length, 0);
    assert.equal(renderer.root.findByType('aside').props['aria-label'], 'Actualización de la aplicación');
    const later = renderer.root.findAllByType('button').find(button => button.children.includes('Más tarde'));
    await act(async () => { later.props.onClick(); });
    assert.equal(renderer.toJSON(), null);
    assert.equal(registration.updates.length, 0);
  } finally {
    await act(async () => { renderer.unmount(); });
  }
});

test('update runs only after clicking and a failed update remains retryable', async () => {
  let renderer;
  await act(async () => { renderer = TestRenderer.create(React.createElement(UpdateNotice)); });
  try {
    await act(async () => { registration.callbacks.onNeedRefresh(); });
    registration.failNextUpdate(true);
    await act(async () => { await renderer.root.findAllByType('button')[0].props.onClick(); });
    assert.equal(registration.updates.at(-1), true);
    assert.ok(renderer.root.findByProps({ role: 'status' }).children.join('').includes('No se pudo actualizar'));
    assert.equal(renderer.root.findAllByType('button')[0].props.disabled, false);
    assert.equal(diagnostics.events.at(-1), 'update');
    registration.failNextUpdate(false);
    await act(async () => { await renderer.root.findAllByType('button')[0].props.onClick(); });
    assert.ok(!renderer.root.findByProps({ role: 'status' }).children.join('').includes('No se pudo actualizar'));
    registration.callbacks.onRegisterError(new Error('private details'));
    assert.equal(diagnostics.events.at(-1), 'offline');
  } finally {
    registration.failNextUpdate(false);
    await act(async () => { renderer.unmount(); });
  }
});
