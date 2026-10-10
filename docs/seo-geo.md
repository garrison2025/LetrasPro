# LetrasPro SEO / GEO operating baseline

Adapted for an existing site from [Website-Starter-Standard](https://github.com/chenmu2024/Website-Starter-Standard/tree/942537485ad329a96c592a669d63cf864566b141), especially its SEO/GEO quality gate, project brief and release evidence templates. Reviewed 2026-10-10. The starter is a reference, not a runtime dependency.

## Protected search architecture

This is a Spanish-language text utility for a global Spanish-speaking audience. The primary task is to generate, compare and copy decorative text. Preserve existing owner-approved keywords and all 29 public routes. `scripts/fixtures/seo-baseline.json` is the accepted exact baseline for titles, descriptions, H1, canonicals and route order. Never refresh that fixture merely to make a failed check pass.

The homepage owns the existing general conversion terms, including `conversor de letras bonitas`, `conversor de letras`, `letras bonitas` and `copiar y pegar`. Platform pages own specialized usage; do not automatically move queries away from the homepage because they mention a platform. Private Search Console measurements remain outside the public repository.

| Canonical path | Existing intent / page type | Crawl path |
| --- | --- | --- |
| `/` | General decorative-text conversion / generator | Primary hub |
| `/letras-cursivas` | Cursive Unicode text / generator | Navigation, footer, related tools |
| `/letras-goticas` | Gothic text / generator | Navigation, footer, related tools |
| `/letras-graffiti` | Graffiti-inspired blocks and bubbles / generator | Navigation, footer |
| `/letras-tatuajes` | Phrase composition for tattoo references / generator | Navigation, footer |
| `/letras-tattoo` | Initials, dates and style comparison / generator | Navigation |
| `/letras-amino` | Amino titles and separators / generator | Navigation |
| `/letras-facebook` | Facebook text decoration / generator | Navigation |
| `/letras-para-instagram` | Profile text preparation / generator | Navigation, footer, related tools |
| `/nicks-para-free-fire` | Game nickname preparation / generator | Navigation, footer, related tools |
| `/letras-para-whatsapp` | Message text preparation / generator | Navigation, footer |
| `/letras-para-tiktok` | TikTok text preparation / generator | Navigation, footer |
| `/letras-para-discord` | Discord names and text / generator | Navigation, footer |
| `/repetidor-de-texto` | Repeat text / utility | Navigation |
| `/texto-glitch` | Adjustable combining-mark distortion / utility | Navigation |
| `/texto-invisible` | Copy invisible characters / utility | Navigation, footer |
| `/texto-al-reves` | Reverse/flip text / utility | Navigation |
| `/letras-grandes` | Large text / utility | Navigation |
| `/blog` | Editorial guide hub | Navigation |
| `/blog/guia-definitiva-conversor-letras-bonitas-instagram-facebook` | General conversion workflow / article | Blog hub |
| `/blog/letras-para-tatuajes-guia-estilos-goticos-cursivos` | Tattoo style selection / article | Blog hub |
| `/blog/mejores-nicks-free-fire-pubg-graffiti` | Nickname ideas / article | Blog hub |
| `/blog/como-usar-fuentes-bonitas-canva-seguidores-instagram` | Canva design workflow / article | Blog hub |
| `/blog/como-crear-kit-marca-canva-letras-esteticas` | Canva brand-kit workflow / article | Blog hub |
| `/blog/guia-combinacion-tipografica-canva-emparejar-fuentes` | Font pairing / article | Blog hub |
| `/sobre-nosotros` | Project identity and editorial method / support | Navigation, footer, author links |
| `/contacto` | Corrections and contact / support | Navigation, footer |
| `/politica-de-privacidad` | Privacy policy / legal | Footer |
| `/terminos-y-condiciones` | Terms / legal | Footer |

The tattoo routes intentionally remain separate existing destinations. Their guidance distinguishes phrases from initials/date comparisons, but that alone is not proof that search intents cannot overlap. Review query-to-page data before any future consolidation; do not change their URLs or keywords automatically.

All listed routes remain indexable, self-canonical and in the generated sitemap. Only the homepage has a trailing slash. Query parameters do not create new sitemap entries; generator search `?q=` keeps the clean-page canonical. Missing routes and articles return actual 404s with `noindex, follow`. This release does not change redirects or parameter handling.

There are no translated equivalents: use Spanish `inLanguage: es`, with no invented hreflang alternatives. Sitemap dates reflect recorded content changes in `data/contentDates.json`, not the current clock.

## Evidence and extractable content

The 13 generator pages each retain their working tool before explanatory content. The existing usage section now contains a route-specific direct answer, input, an output calculated by `convertText`, the style name, limitations and source/author attribution. This is original tool output, not proof that an external platform accepts it. Do not pad pages to a word count or generate separate AI-query pages.

| Claim or decision | Source | Checked | Refresh / fallback |
| --- | --- | --- | --- |
| Characters and their visual glyphs/fonts are different | [Unicode Consortium font FAQ](https://www.unicode.org/faq/font_keyboard.html) | 2026-10-10 | Recheck when editing technical guidance; omit unsupported new claims if unavailable |
| Example conversion and accent handling | `services/fontMaps.ts`, font tests, initial HTML | Every affected release | Rebuild and test; reject examples that differ from tool behavior |
| Platform usage tips | Editorial recommendations, explicitly limited | 2026-10-10 | Any new claim about platform limits/acceptance requires that platform's current official documentation |
| Standard SEO applies to Google AI Search; no special AI text file/schema required | [Google AI features](https://developers.google.com/search/docs/appearance/ai-features) | 2026-10-10 | Recheck before changing search/crawler policy |
| Publisher identity and logo | Visible footer, About page, owned icon | Every affected release | Do not invent legal registration, address, social profiles or credentials |
| Article author/publisher relationships | [Google Article documentation](https://developers.google.com/search/docs/appearance/structured-data/article), visible author/review date | 2026-10-10 | Preserve publication dates; modified dates must match a substantive review |

## Entity and structured-data model

`data/siteIdentity.ts` defines shared public identities: LetrasPro (`/#organization`), the site Conversor de Letras Bonitas (`/#website`) and Equipo LetrasPro (`/sobre-nosotros#equipo-editorial`). The visible About section identifies the brand/team and describes its editorial process; article bylines link there. There are no fabricated individual authors or testimonials.

Every indexable page has a canonical `#webpage`, Spanish language, site membership and publisher. Generator pages link to their own `#application`; articles link to their own `#article`, author and publisher. About/Contact use their truthful page types. The shared graph stays consistent during client navigation.

Existing FAQ and HowTo describe visible content; their presence does not promise Google rich results. SearchAction describes the real style-search control, without promising a sitelinks search box. Automated graph validation checks syntax, identities, references and visible author/source/example content; it is not Google's Rich Results Test or a ranking guarantee.

## Search and AI policy

Keep existing `robots.txt` search-crawler policy unchanged. Training/product permissions are a separate owner decision. No AI-only duplicate pages, special schema, paid SEO services or new dependencies are introduced. `llms.txt` is optional interoperability metadata, not a prerequisite for Google AI Search, and is not added without a concrete consumer.

## Release gates and monitoring

Run `npm run typecheck`, `npm test`, `npm run build`, `npm run check:pages`, `npm run check:seo`, `npm run check:offline` and `npm run check:http`. The existing CI runs these gates. `check:pages` additionally validates the entity graph, initial-HTML examples/citations, author destinations and crawlable reachability of all 29 routes.

Before merging, visually review desktop/mobile explanation sections, author links and client navigation, and run `npm run check:deployment -- <preview-origin>`. After deployment verify the production release identifier, all 29 routes plus three missing-route cases, raw HTML/schema and referenced assets. Store the dated release evidence and private GSC export outside the public repository.

For subsequent audits compare settled GSC Web query/page periods with the saved private baseline; do not attribute same-day fluctuations to this release. Google AI features are included in overall Web reporting, so those totals alone do not isolate an AI citation effect. Use existing Cloudflare dashboard statistics for errors/performance. No new alerts or recurring automation are enabled here.

Field Core Web Vitals, Google indexing and actual AI citations are external observations, not local test results. Record unavailable measurements as unavailable. If a gate, canonical, route or core tool flow regresses, fix or revert the scoped release before expanding content.
