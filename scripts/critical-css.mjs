import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';

export function criticalCSS(source, html) {
  // Include the header, editor and first result card. Smaller tool/static pages
  // without result cards use their entire initial markup.
  const firstCardEnd = html.indexOf('</article>');
  const initial = firstCardEnd === -1 ? html : html.slice(0, firstCardEnd + 10);
  const classes = new Set(['dark', 'light', ...[...initial.matchAll(/class="([^"]*)"/g)].flatMap(match => match[1].split(/\s+/))]);
  const css = postcss.parse(source);
  css.walkRules(rule => {
    if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
    const selectors = selectorParser().astSync(rule.selector);
    selectors.each(selector => {
      let needed = true;
      selector.walkClasses(node => {
        let parent = node.parent;
        while (parent && parent.type !== 'pseudo') parent = parent.parent;
        // Keep conditional/negative pseudo selectors conservatively, including
        // Tailwind's dark-mode selectors, rather than guessing their state.
        if (!parent && !classes.has(node.value)) needed = false;
      });
      if (!needed) selector.remove();
    });
    if (selectors.nodes.length) rule.selector = selectors.toString();
    else rule.remove();
  });
  css.walkAtRules(rule => { if (rule.nodes && !rule.nodes.length) rule.remove(); });
  return css.toString();
}
