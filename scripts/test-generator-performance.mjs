import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import test from 'node:test';
import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const modules = new Map();
const dataURL = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
function loadSource(filename) {
  if (modules.has(filename)) return modules.get(filename);
  let source = fs.readFileSync(filename, 'utf8');
  if (filename.endsWith('.json')) return dataURL(`export default ${source}`);
  if (filename.endsWith('FontCard.tsx')) source = source.replace('const [justCopied', 'globalThis.fontCardRenders++; const [justCopied');
  let output = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.React },
  }).outputText;
  output = output.replace(/from ['"]([^'"]+)['"]/g, (_, name) => {
    if (name === 'react-helmet-async') return `from '${dataURL('export const Helmet = () => null;')}'`;
    if (!name.startsWith('.')) return `from '${pathToFileURL(require.resolve(name)).href}'`;
    const base = path.resolve(path.dirname(filename), name);
    const target = [base, `${base}.ts`, `${base}.tsx`].find(candidate => fs.existsSync(candidate));
    assert.ok(target, `Module ${name}`);
    return `from '${loadSource(target)}'`;
  });
  const url = dataURL(output);
  modules.set(filename, url);
  return url;
}
const root = fileURLToPath(new URL('..', import.meta.url));
const { default: GeneratorPage } = await import(loadSource(path.join(root, 'pages/GeneratorPage.tsx')));
const { PAGE_CONFIGS } = await import(loadSource(path.join(root, 'constants.ts')));

test('typing skips unchanged cards while immediate copy, case changes and preview updates stay correct', async () => {
  const previousWindow = globalThis.window;
  const previousStorage = globalThis.localStorage;
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  const copied = [];
  const nodes = new Map();
  globalThis.fontCardRenders = 0;
  globalThis.window = { scrollTo() {}, addEventListener() {}, removeEventListener() {} };
  globalThis.localStorage = { getItem() { return null; }, setItem() {} };
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { clipboard: { async writeText(text) { copied.push(text); } } } });
  let renderer;
  try {
    await act(async () => {
      renderer = TestRenderer.create(React.createElement(MemoryRouter, null, React.createElement(GeneratorPage, { config: PAGE_CONFIGS.home })), {
        createNodeMock(element) {
          const node = { value: element.props.value || '', getBoundingClientRect: () => ({ bottom: 200 }) };
          if (element.props['aria-label']) nodes.set(element.props['aria-label'], node);
          return node;
        },
      });
    });
    const beforeTyping = globalThis.fontCardRenders;
    assert.equal(renderer.root.findAll(node => node.type === 'button' && node.props['aria-label']?.startsWith('Copiar estilo de letra ')).length, 24);
    assert.ok(beforeTyping >= 24);
    const input = renderer.root.findByProps({ 'aria-label': 'Texto para convertir' });
    const latest = 'Último ñ 👨‍👩‍👧‍👦🇪🇸';
    for (const value of ['U', 'Último', latest]) {
      nodes.get('Texto para convertir').value = value;
      await act(async () => { input.props.onChange({ target: { value } }); });
    }
    assert.equal(globalThis.fontCardRenders, beforeTyping, 'No card rerender on each keystroke before debounce');
    const clickCopy = async () => {
      const card = renderer.root.findByProps({ 'aria-label': 'Copiar estilo de letra Normal Sans' });
      await act(async () => { await card.props.onClick({ stopPropagation() {} }); });
    };
    await clickCopy();
    assert.equal(copied.at(-1).normalize('NFC'), latest, 'Copy uses the current input before the preview catches up');
    await act(async () => { renderer.root.findByProps({ 'aria-label': 'Convertir a mayúsculas' }).props.onClick(); });
    await clickCopy();
    assert.equal(copied.at(-1).normalize('NFC'), latest.toUpperCase());
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 330)); });
    const preview = renderer.root.findAllByProps({ role: 'img' }).find(node => node.props['aria-label'] === latest.toUpperCase());
    assert.ok(preview, 'Preview eventually renders the latest text');
    await act(async () => { renderer.root.findByProps({ 'aria-label': 'Añadir Normal Sans a favoritos' }).props.onClick({ stopPropagation() {} }); });
    assert.ok(renderer.root.findByProps({ 'aria-label': 'Quitar Normal Sans de favoritos' }));
  } finally {
    if (renderer) await act(async () => { renderer.unmount(); });
    if (previousWindow === undefined) delete globalThis.window; else globalThis.window = previousWindow;
    if (previousStorage === undefined) delete globalThis.localStorage; else globalThis.localStorage = previousStorage;
    if (navigatorDescriptor) Object.defineProperty(globalThis, 'navigator', navigatorDescriptor); else delete globalThis.navigator;
    delete globalThis.fontCardRenders;
  }
});
