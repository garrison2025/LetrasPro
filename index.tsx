import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import UpdateNotice from './components/UpdateNotice';
import { reportDiagnostic } from './services/diagnostics';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

window.addEventListener('error', () => reportDiagnostic('browser'));
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
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
