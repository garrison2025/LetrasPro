import test from 'node:test';
import assert from 'node:assert/strict';
import { criticalCSS } from './critical-css.mjs';

test('critical CSS preserves first-screen responsive, escaped and conditional rules in cascade order', () => {
  const source = '@font-face{font-family:Inter;src:url(font.woff2)}*{box-sizing:border-box}.editor{color:red}.unused{color:blue}@media(min-width:640px){.sm\\:p-8{padding:2rem}}.editor:not(.disabled){color:green}:is(.dark .dark\\:text-white){color:white}.editor:hover{color:purple}.editor{color:black}';
  const html = '<div class="editor sm:p-8"><article>first</article><section class="unused">later</section></div>';
  const css = criticalCSS(source, html);
  assert.ok(css.includes('@font-face{font-family:Inter;src:url(font.woff2)}'));
  assert.ok(css.includes('*{box-sizing:border-box}'));
  assert.ok(css.includes('@media(min-width:640px){.sm\\:p-8{padding:2rem}}'));
  assert.ok(css.includes('.editor:not(.disabled){color:green}'));
  assert.ok(css.includes(':is(.dark .dark\\:text-white){color:white}'));
  assert.ok(css.includes('.editor:hover{color:purple}'));
  assert.ok(!css.includes('.unused'));
  assert.ok(css.indexOf('.editor{color:red}') < css.indexOf('.editor{color:black}'));
});

test('critical CSS retains global rules and animations while pruning unused selector alternatives', () => {
  const source = 'body{margin:0}.used,.unused{display:flex}@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@media(min-width:900px){.unused{margin:1rem}}';
  const css = criticalCSS(source, '<main class="used">No result cards</main>');
  assert.ok(css.includes('body{margin:0}.used{display:flex}'));
  assert.ok(css.includes('@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}'));
  assert.ok(!css.includes('.unused'));
  assert.ok(!css.includes('@media'));
});
