const CODES = new Set(['render', 'browser', 'operation', 'offline', 'update']);
const headers = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', 'X-Content-Type-Options': 'nosniff' };

export async function onRequest({ request, env }) {
  if (env.DIAGNOSTICS_ENABLED !== 'true') return new Response(null, { status: 404, headers });
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { ...headers, Allow: 'POST' } });
  if (request.headers.get('Origin') !== new URL(request.url).origin) return new Response(null, { status: 403, headers });
  if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'application/json') return new Response(null, { status: 415, headers });
  if (!request.body) return new Response(null, { status: 400, headers });

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let body = '';
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 128) {
        await reader.cancel();
        return new Response(null, { status: 413, headers });
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    const event = JSON.parse(body);
    if (!event || typeof event !== 'object' || Object.keys(event).length !== 1 || !CODES.has(event.code)) return new Response(null, { status: 400, headers });
    // Log only a validated fixed category; never echo or log a rejected payload.
    console.warn(JSON.stringify({ event: 'letraspro_client_error', code: event.code }));
    try {
      env.DIAGNOSTICS_STATS?.writeDataPoint({
        indexes: [event.code],
        blobs: [event.code, ['conversordeletrasbonitas.org', 'www.conversordeletrasbonitas.org', 'letraspro.pages.dev'].includes(new URL(request.url).hostname) ? 'production' : 'preview'],
        doubles: [1],
      });
    } catch {
      // Statistics must never turn an accepted diagnostic into an application error.
      console.warn('LetrasPro: diagnostic statistics unavailable');
    }
    return new Response(null, { status: 204, headers });
  } catch {
    return new Response(null, { status: 400, headers });
  } finally {
    reader.releaseLock();
  }
}
