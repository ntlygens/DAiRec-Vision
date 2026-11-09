/**
 * DaiRec Vision Cloudflare Worker.
 *
 *  - Static files (dist/client/browser) are served by Workers Static Assets before this code runs.
 *  - GET /api/<collection>[/<id>] returns page content from the D1 database (read-only).
 *  - Everything else is server-rendered by Angular (dist/client/server/server.mjs).
 *
 * During server rendering Angular fetches /api/... on this same site. A Worker can't make a
 * network request to itself, so those fetches are answered here, in-process, straight from D1.
 */
import { renderPage } from '../dist/client/server/server.mjs';

/** Content collections the public site may read. */
const COLLECTIONS = new Set([
  'userInterface', 'srvcscrnInterface', 'protectPgData', 'surveilPgData', 'accessPgData', 'dronePgData',
]);

const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' };

/** Answers /api requests from D1. Returns null for paths that aren't API paths. */
async function handleApi(request, env) {
  const url = new URL(request.url);
  const parts = url.pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean);
  if (!url.pathname.startsWith('/api/') && url.pathname !== '/api') return null;

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method not allowed', { status: 405, headers: { allow: 'GET, HEAD' } });
  }
  const [coll, id] = parts;
  if (!coll || !COLLECTIONS.has(coll) || parts.length > 2) {
    return new Response('Not found', { status: 404 });
  }

  try {
    if (id) {
      const row = await env.DB.prepare('SELECT doc FROM content WHERE coll = ?1 AND id = ?2').bind(coll, id).first();
      if (!row) return new Response('Not found', { status: 404 });
      return new Response(row.doc, { headers: { ...JSON_HEADERS, 'cache-control': 'public, max-age=60' } });
    }
    const { results } = await env.DB.prepare('SELECT doc FROM content WHERE coll = ?1 ORDER BY position, id').bind(coll).all();
    const body = '[' + results.map((r) => r.doc).join(',') + ']';
    return new Response(body, { headers: { ...JSON_HEADERS, 'cache-control': 'public, max-age=60' } });
  } catch (error) {
    console.error('[api]', error instanceof Error ? error.message : error);
    return new Response('Content service unavailable', { status: 502 });
  }
}

// ---- In-process answers for Angular's own /api fetches during server rendering ----
let apiEnv;
const siteHosts = new Set();
const networkFetch = globalThis.fetch.bind(globalThis);

globalThis.fetch = async (input, init) => {
  const request = input instanceof Request ? input : new Request(input, init);
  const url = new URL(request.url);
  if (apiEnv && siteHosts.has(url.host) && url.pathname.startsWith('/api/')) {
    const response = await handleApi(request, apiEnv);
    if (response) return response;
  }
  return networkFetch(input, init);
};

const SECURITY_HEADERS = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-frame-options': 'SAMEORIGIN',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
};

function withSecurityHeaders(response) {
  const out = new Response(response.body, response);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) out.headers.set(k, v);
  return out;
}

export default {
  async fetch(request, env) {
    apiEnv = env;
    const url = new URL(request.url);
    siteHosts.add(url.host);

    const api = await handleApi(request, env);
    if (api) return withSecurityHeaders(api);

    // One canonical host: www.dairecvision.com -> dairecvision.com
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }

    const page = await renderPage(request);
    if (page) return withSecurityHeaders(page);
    return new Response('Not found', { status: 404 });
  },
};
