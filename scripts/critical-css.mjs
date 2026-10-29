import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';

export function criticalCSS(source, html) {
  // Style all prerendered content before the async stylesheet arrives, so later
  // cards and sections do not trigger layout transitions during initial load.
  const classes = new Set(['dark', 'light', ...[...html.matchAll(/class="([^"]*)"/g)].flatMap(match =>
    match[1].replace(/&(?:amp|lt|gt|quot|#x27);/g, entity => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'" })[entity]).split(/\s+/))]);
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
