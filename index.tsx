import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import UpdateNotice from './components/UpdateNotice';
import { reportDiagnostic, reportBrowserError } from './services/diagnostics';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

window.addEventListener('error', reportBrowserError);
window.addEventListener('unhandledrejection', () => reportDiagnostic('operation'));

const app = (
  <>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <UpdateNotice />
  </>
);
if (rootElement.dataset.prerendered) {
  ReactDOM.hydrateRoot(rootElement, app, { onRecoverableError(error) {
    reportDiagnostic('hydration');
    // Keep only React's numeric production code locally, never its message or input.
    const code = error instanceof Error ? error.message.match(/^Minified React error #(\d{1,3});/)?.[1] : undefined;
    console.warn(`LetrasPro: React recovery ${code || 'unknown'}`);
  } });
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
