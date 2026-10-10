import { reportVital } from './diagnostics';

export function startPerformanceDiagnostics(): void {
  if (import.meta.env.VITE_DIAGNOSTICS_ENABLED !== 'true') return;
  // Use the official algorithms, loaded after the page's critical work.
  const start = () => {
    void import('web-vitals').then(({ onLCP, onINP, onCLS }) => {
      onLCP(reportVital);
      onINP(reportVital);
      onCLS(reportVital);
    }).catch(() => { /* Measurement must not interfere with the tools. */ });
  };
  if (document.readyState === 'complete') setTimeout(start, 0);
  else window.addEventListener('load', start, { once: true });
}
