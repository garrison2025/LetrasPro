# Client diagnostics

The endpoint is prepared but disabled by default. The frontend sends only one of five fixed categories (`render`, `browser`, `operation`, `offline`, `update`), at most once per category per page load. It does not send input, page URLs, query strings, error messages, stack traces, user IDs or cookies. Failed delivery is ignored without retrying.

Before enabling on Cloudflare Pages:

1. Verify `/api/diagnostics` on a preview deployment, with the runtime variable `DIAGNOSTICS_ENABLED=true`. A same-origin JSON POST with `{"code":"render"}` must return 204. Cross-origin requests must return 403; disabled endpoints return 404.
2. Configure the desired log retention, sampling and abuse limits in Cloudflare. `_routes.json` limits function invocation to this endpoint, keeping pages and static assets on static serving.
3. Check the site's privacy notice against the actual hosting and diagnostics configuration. Cloudflare may retain request metadata separately from the fixed application log.
4. Set the **build** variable `VITE_DIAGNOSTICS_ENABLED=true`, rebuild and validate one diagnostic from the preview site. Runtime and build flags are separate so collection cannot start accidentally.
5. Verify the selected log destination receives `letraspro_client_error`, and configure its error-count alerts. Pages real-time logs alone do not constitute persistent statistics or alerts.

To stop collection, remove the runtime flag immediately, then remove the build flag and rebuild. These controls do not change the converter's input, saved data or URLs.
