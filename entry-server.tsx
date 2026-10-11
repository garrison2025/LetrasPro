import React from 'react';
import { createRequire } from 'node:module';
import { StaticRouter } from 'react-router-dom';
import { HelmetServerState } from 'react-helmet-async';
import App from './App';
export { workboxOptions } from './pwa.config';

// React 18's Node writer can insert NUL padding at multibyte character boundaries.
// Its Web Streams writer preserves the same completed HTML without that defect.
const { renderToReadableStream }: typeof import('react-dom/server') = createRequire(import.meta.url)('react-dom/server.browser');

export async function render(url: string): Promise<{ html: string; head: string }> {
  const context: { helmet?: HelmetServerState } = {};
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error(`Rendering timed out: ${url}`)), 30000);
  let renderError: unknown;
  try {
    const stream = await renderToReadableStream(<StaticRouter location={url}><App isStatic helmetContext={context} /></StaticRouter>, {
      signal: controller.signal,
      onError(error) { renderError = error; }
    });
    await stream.allReady;
    if (renderError !== undefined) throw renderError;
    const html = await new Response(stream).text();
    const { helmet } = context;
    if (!helmet) throw new Error(`Missing metadata: ${url}`);
    return { html, head: [helmet.title, helmet.meta, helmet.link, helmet.script].map(item => item.toString()).join('\n') };
  } finally {
    clearTimeout(timer);
  }
}
