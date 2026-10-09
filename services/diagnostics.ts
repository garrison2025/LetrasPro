type DiagnosticCode = 'render' | 'browser' | 'operation' | 'offline' | 'update';
const sent = new Set<DiagnosticCode>();

// Enable only after the Pages endpoint and log retention are configured.
export function reportDiagnostic(code: DiagnosticCode): void {
  console.warn(`LetrasPro: ${code}`);
  if (import.meta.env.VITE_DIAGNOSTICS_ENABLED !== 'true' || typeof window === 'undefined' || sent.has(code)) return;
  sent.add(code);
  // Fixed categories only: no input, URL, message, stack trace or browser identifier.
  void fetch('/api/diagnostics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
    credentials: 'omit',
    keepalive: true,
  }).catch(() => { /* Diagnostics must never interrupt the tool or retry in a loop. */ });
}
