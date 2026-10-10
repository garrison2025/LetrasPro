import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetServerState } from 'react-helmet-async';
import { PassThrough } from 'node:stream';
import App from './App';
export { workboxOptions } from './pwa.config';

export function render(url: string): Promise<{ html: string; head: string }> {
  return new Promise((resolve, reject) => {
    const context: { helmet?: HelmetServerState } = {};
    const output = new PassThrough();
    let html = '';
    const timer = setTimeout(() => { stream.abort(); reject(new Error(`Rendering timed out: ${url}`)); }, 30000);
    output.on('data', chunk => { html += chunk.toString(); });
    output.on('error', error => { clearTimeout(timer); reject(error); });
    output.on('end', () => {
      clearTimeout(timer);
      const { helmet } = context;
      if (!helmet) { reject(new Error(`Missing metadata: ${url}`)); return; }
      resolve({ html, head: [helmet.title, helmet.meta, helmet.link, helmet.script].map(item => item.toString()).join('\n') });
    });
    const stream = renderToPipeableStream(<StaticRouter location={url}><App isStatic helmetContext={context} /></StaticRouter>, {
      onAllReady() { stream.pipe(output); },
      onError(error) { clearTimeout(timer); reject(error); }
    });
  });
}
