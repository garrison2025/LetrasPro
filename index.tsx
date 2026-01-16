import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register PWA Service Worker
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

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// SEO OPTIMIZATION: Hydration Logic
// If the root element has children, it means vite-plugin-prerender has already 
// populated the HTML. We use hydrateRoot to attach event listeners to existing markup.
// If it's empty (dev mode or fallback), we use createRoot.
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