type DiagnosticCode = 'render' | 'browser' | 'operation' | 'offline' | 'update'
  | 'browser_app' | 'browser_external' | 'browser_unknown' | 'hydration'
  | `perf_${'lcp' | 'inp' | 'cls'}_${'good' | 'needs' | 'poor'}`;
const sent = new Set<DiagnosticCode>();

export function reportBrowserError(event: Pick<ErrorEvent, 'filename'>): void {
  let code: DiagnosticCode = 'browser_unknown';
  try {
    const source = new URL(event.filename);
    if (source.protocol === 'https:' || source.protocol === 'http:') {
      code = source.origin === window.location.origin ? 'browser_app' : 'browser_external';
    }
  } catch { /* Cross-origin errors may hide their source. Keep them unknown. */ }
  reportDiagnostic(code);
}

// Enable only after the Pages endpoint and log retention are configured.
export function reportDiagnostic(code: DiagnosticCode): void {
  if (!code.startsWith('perf_')) console.warn(`LetrasPro: ${code}`);
  if (import.meta.env.VITE_DIAGNOSTICS_ENABLED !== 'true' || typeof window === 'undefined' || sent.has(code)) return;
  sent.add(code);
  // Fixed categories only: no input, URL, message, stack trace or browser identifier.
  void fetch('/api/diagnostics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, release: import.meta.env.VITE_APP_RELEASE || 'development', viewport: window.matchMedia?.('(max-width: 767px)').matches ? 'compact' : 'wide' }),
    credentials: 'omit',
    keepalive: true,
  }).catch(() => { /* Diagnostics must never interrupt the tool or retry in a loop. */ });
}

export function reportVital(metric: { name: string; rating: string }): void {
  if (!['LCP', 'INP', 'CLS'].includes(metric.name) || !['good', 'needs-improvement', 'poor'].includes(metric.rating)) return;
  reportDiagnostic(`perf_${metric.name.toLowerCase()}_${metric.rating === 'needs-improvement' ? 'needs' : metric.rating}` as DiagnosticCode);
}
