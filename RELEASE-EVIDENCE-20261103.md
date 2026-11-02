# Homepage release evidence — 2026-11-03

Approved scope: Spanish style search repair; homepage Cursivas/Góticas/Negritas shortcuts, Solo favoritos, mobile category-scroller hint; remove homepage title date suffix.

New homepage title: Conversor de Letras Bonitas y Chidas - Copiar y Pegar

PASS: type checking, 80 tests, production build, 32 page checks, 32 SEO baselines (only approved homepage title differs from prior release), Workbox offline URL matching, 32 local HTTP pages and three real 404 checks.
PASS: browser input/filter/copy with Spanish accents and joined emoji; empty favorites, adding/filtering/removing the final favorite, reset; keyboard shortcut; homepage-only controls.
PASS: visual checks at 360, 390, 768, 1024 and 1440 px; no document horizontal overflow; dark mode; native buttons and pressed/focus states.
PASS: initial and hydrated homepage title, Open Graph/Twitter title and WebPage schema name match; primary H1 and canonical unchanged. All other page titles unchanged.

No changes to font maps, source alphabet, public routes, primary keyword, H1, descriptions, canonical/robots policy, advertising configuration, diagnostics or saved-data keys. Existing approval-gated service-worker updates remain in place.

Evidence artifacts retained in workspace outputs/home-search-fix-20261103, outputs/home-controls-20261103 and outputs/home-title-20261103.

Production verification follows the owner-authorized merge. Ranking, traffic, revenue and field CWV outcomes are not established by these checks.
