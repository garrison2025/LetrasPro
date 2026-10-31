# LetrasPro — existing-site maintenance

## Design read and protected behavior

Spanish browser-local text tools for people preparing names and messages; retain the existing violet/slate identity and put input, results and copy controls first. This is a maintenance pass, not a redesign.

- References: the existing production site at https://conversordeletrasbonitas.org/ and its current generator/repeater components are the visual authority. Website-Starter-Standard supplies the task-first review process, not replacement styling.
- Preserve the 32 public routes, titles, H1s, descriptions, canonicals, keyword ownership, source content, branding, navigation, analytics and AdSense publisher identity.
- Proposed maintenance controls: structural variance 1/10, motion intensity unchanged, visual density unchanged except one missing separator button.

## Existing tokens and components

- Use the current Tailwind primary/secondary/slate tokens and existing Inter/Outfit typography; do not add fonts, dependencies or arbitrary colors.
- Reuse the repeater's two-column separator grid, padding, border, radius, hover and pressed-state styles for the Coma option.
- Keep visible keyboard focus, native buttons, `aria-pressed`, existing disabled states, dark mode and reduced-motion rules.
- Keep long Unicode text and emojis intact in generated/copied output. Keep output limits and stale-result protection.

## Scope of the 2026-11-01 changes

- Restore the comma separator already described by the existing worked example.
- Add Google's documented `google-anno-skip` marker to tool workspaces and the generator introduction; leave editorial sections outside those regions and preserve the AdSense loader. This marker excludes ad-intent annotations, not all Auto ads or global anchors.
- Wait for the initial document load before installing/updating the offline cache; retain the explicit application-update choice.
- Accept only compatible dependency fixes in this pass; do not downgrade the PWA stack or force dependency overrides.
- Batch input persistence after typing pauses and flush the latest draft on page hide, backgrounding and navigation; keep immediate copy independent of that timer.
- Optimize only independently verified single-code-point alphabet ranges; accents, flags, joined emoji and other complex graphemes retain Unicode segmentation.
- Bound long style previews to a keyboard-scrollable area; keep the entire generated text and full copy/export behavior.

## Acceptance

Test the real three-copy comma example and stale-result behavior; check 360/390/768/1024/1440px layouts, keyboard interaction, complete copy, production build, update/offline regressions and all 32 SEO baselines. Record exact measured performance separately from expected resource-scheduling benefits. Public rankings, revenue and field CWV are not proven by preview tests.
