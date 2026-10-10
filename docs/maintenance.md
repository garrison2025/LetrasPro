# Website maintenance and release checks

## Preserve search traffic

The current 29 public URLs, titles, descriptions, H1 text and canonicals are captured in `scripts/fixtures/seo-baseline.json`. Run `npm run check:seo` against the final build. Do not refresh this fixture simply to make an unexpected change pass. Deliberate search metadata changes require a separate review of the affected page and its existing queries. Homepage and platform-page keywords remain unchanged in this quality release.

When adding a page, update its App route, navigation where applicable, sitemap route, content date and the reviewed SEO fixture together. Blog slugs remain permanent. `check:pages`, `check:seo` and the sitemap-based HTTP checks catch omitted or extra URLs. Do not merge Tattoo and Tatuajes without a separate query and traffic review.

## Required checks

Run `npm run typecheck`, `npm test`, `npm run build`, `npm run check:pages`, `npm run check:seo`, `npm run check:offline` and `npm run check:http`. Verify a diagnostics-enabled preview build as well as the normal build. For the deployed version, run `npm run check:deployment -- https://conversordeletrasbonitas.org`.

Browser checks: all available style filters; empty search/reset; query navigation and browser history; input with accents and emoji; immediate copy and PNG export; keyboard focus; dark pages; local notes deletion; manual invisible-character copy; stale repeater result. Use a new preview origin when an older local service worker controls a test port. Do not clear a user's saved data to get a clean test.

For PWA release verification, install once, keep two tabs open, edit text, deploy a newer version, dismiss the prompt, then explicitly update and check saved input. Also test known URLs with `q`, UTM and versioned icon parameters offline. Unknown online URLs must keep returning 404, never the generator. Workbox matching tests are not a substitute for a physical device offline test.

## Performance decisions

The existing full-page precache is retained to preserve established offline access. Measure actual compressed network cost and representative compact-viewport field ratings before removing cached pages. Initial HTML and indexable page content must remain present. No advertising provider, placement or worker is removed in this release. Fonts already use display=swap and resource hints; blog images have responsive sizes and dimensions. Use measured evidence before changing external resource loading.

See diagnostics.md for release-separated LCP, INP and CLS rating queries. These ratings need real traffic and do not prove a rank or traffic improvement. No email alerts are configured.

## Dependency risk tracking

2026-10-10: npm's complete audit reports five high alerts in the development-only braces/chokidar/micromatch/fast-glob/Tailwind chain. The upstream braces advisory GHSA-vfj7-8cjw-p6xm lists no patched version. `npm audit fix` cannot resolve it compatibly; `--force` proposes Tailwind 4, which is a breaking migration. Runtime dependency audit is clean at this checkpoint.

Keep builds isolated, use locked dependencies with npm ci, and never pass visitor-controlled glob patterns to the build tooling. Existing glob patterns come from repository configuration, not HTTP requests. Save the complete audit in CI and revisit when an upstream compatible fix appears. Do not suppress the issue or claim all vulnerabilities are fixed. A Tailwind migration needs a separate visual regression review.

Reference: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm

## Scope and rollback

No framework, domain, canonical, redirect, robots indexing policy or ad account changes are part of this release. Contact email validation is excluded at the user's request. Revert the quality release commit and deploy the previous successful build if a verified functional regression appears. Ordinary search variation alone is not evidence that this release caused it.
