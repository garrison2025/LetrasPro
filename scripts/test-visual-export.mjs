import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const source = ts.transpileModule(fs.readFileSync(new URL('../services/visualExport.ts', import.meta.url), 'utf8'), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const { printSvg, escapeSvg } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

for (const first of ['load', 'fallback']) {
  test(`print opens only one dialog when ${first} completes first`, () => {
    const previousWindow = globalThis.window;
    let onLoad;
    let fallback;
    let prints = 0;
    let written = '';
    const popup = {
      closed: false,
      document: { open() {}, write(value) { written = value; }, close() {} },
      focus() {},
      print() { prints++; },
      addEventListener(type, callback) { assert.equal(type, 'load'); onLoad = callback; },
    };
    globalThis.window = { open: () => popup, setTimeout: callback => { fallback = callback; } };
    try {
      assert.equal(printSvg('<svg>Ñ</svg>'), true);
      assert.ok(written.includes('<svg>Ñ</svg>'));
      if (first === 'load') { onLoad(); fallback(); }
      else { fallback(); onLoad(); }
      assert.equal(prints, 1);
    } finally { globalThis.window = previousWindow; }
  });
}

test('blocked and already closed print windows are handled without printing', () => {
  const previousWindow = globalThis.window;
  let fallback;
  globalThis.window = { open: () => null };
  try {
    assert.equal(printSvg('<svg/>'), false);
    const popup = {
      closed: false,
      document: { open() {}, write() {}, close() {} },
      focus() {}, addEventListener() {}, print() { assert.fail('Closed windows must not print'); },
    };
    globalThis.window = { open: () => popup, setTimeout: callback => { fallback = callback; } };
    assert.equal(printSvg('<svg/>'), true);
    popup.closed = true;
    fallback();
  } finally { globalThis.window = previousWindow; }
});

test('SVG exports preserve Spanish and emoji while escaping user markup', () => {
  assert.equal(escapeSvg('Sofía Ñ 👩‍💻 <script>"&\'</script>'), 'Sofía Ñ 👩‍💻 &lt;script&gt;&quot;&amp;&apos;&lt;/script&gt;');
});
