import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Safety net: If any error occurs during rendering (e.g. inside JSDOM), 
// log it and force the render-event so the build doesn't hang forever.
window.addEventListener('error', (e) => {
  console.error('Runtime Error during render:', e.error);
  // Ensure the build process continues even if the app crashed
  setTimeout(() => {
    window.document.dispatchEvent(new Event('render-event'));
  }, 100);
});

// Polyfill scrollTo for JSDOM if missing to prevent crashes
if (!window.scrollTo) {
  window.scrollTo = () => {};
}

// Register PWA Service Worker (Only in browser, try/catch to be safe in JSDOM)
try {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const updateSW = registerSW({
      onNeedRefresh() {
        if (confirm('Nueva versión disponible. ¿Recargar?')) {
          updateSW(true);
        }
      },
      onOfflineReady() {
        console.log('App lista para trabajar offline.');
      },
    });
  }
} catch (e) {
  console.warn('Service Worker registration skipped/failed', e);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Hydrate if pre-rendered content exists, otherwise render
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Signal to Prerenderer that we are ready
// Use a small timeout to ensure Helmet updates and styles are computed
setTimeout(() => {
  window.document.dispatchEvent(new Event('render-event'));
}, 1000); // Increased timeout slightly to be safe