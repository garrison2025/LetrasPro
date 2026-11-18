import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import UpdateNotice from './components/UpdateNotice';
import { reportDiagnostic, reportBrowserError } from './services/diagnostics';
import { startPerformanceDiagnostics } from './services/performance';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

window.addEventListener('error', reportBrowserError);
window.addEventListener('unhandledrejection', () => reportDiagnostic('operation'));
startPerformanceDiagnostics();

const app = (
  <>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <UpdateNotice />
  </>
);
if (rootElement.dataset.prerendered) {
  const earlyEvents = ['pointerdown', 'keydown', 'focusin', 'click'] as const;
  let firstFrame = 0;
  let secondFrame = 0;
  let deadline = 0;
  let started = false;

  function hydrate() {
    if (started) return;
    started = true;
    window.cancelAnimationFrame(firstFrame);
    window.cancelAnimationFrame(secondFrame);
    window.clearTimeout(deadline);
    for (const event of earlyEvents) document.removeEventListener(event, hydrate, true);
    ReactDOM.hydrateRoot(rootElement, app, { onRecoverableError(error) {
      reportDiagnostic('hydration');
      // Keep only React's numeric production code locally, never its message or input.
      const code = error instanceof Error ? error.message.match(/^Minified React error #(\d{1,3});/)?.[1] : undefined;
      console.warn(`LetrasPro: React recovery ${code || 'unknown'}`);
    } });
  }

  if (document.visibilityState === 'hidden') {
    hydrate();
  } else {
    // Allow the browser to paint the existing HTML before React starts work.
    // An early interaction starts hydration immediately, ahead of the event at the root.
    for (const event of earlyEvents) document.addEventListener(event, hydrate, true);
    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(hydrate);
    });
    deadline = window.setTimeout(hydrate, 120);
  }
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
