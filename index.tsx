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
  onRegisterError() {
    console.warn('LetrasPro: offline cache unavailable');
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

window.addEventListener('error', () => console.warn('LetrasPro: browser error'));
window.addEventListener('unhandledrejection', () => console.warn('LetrasPro: unhandled operation'));

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if (rootElement.dataset.prerendered) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
