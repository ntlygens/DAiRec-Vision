import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.disable('x-powered-by');

/**
 * Read-only pass-through to the private content API.
 * Browsers (and server-side rendering) fetch /api/* from this server; only GET is forwarded,
 * so the public site can read content but never change it.
 * API_ORIGIN: where the content API runs (default http://127.0.0.1:5200).
 */
const API_ORIGIN = (process.env['API_ORIGIN'] || 'http://127.0.0.1:5200').replace(/\/$/, '');

app.all('/api/{*path}', async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).set('Allow', 'GET, HEAD').send('Method not allowed');
    return;
  }
  try {
    const upstream = await fetch(API_ORIGIN + req.originalUrl, {
      method: req.method,
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(10_000),
    });
    res.status(upstream.status);
    const type = upstream.headers.get('content-type');
    if (type) res.type(type);
    res.set('Cache-Control', upstream.ok ? 'public, max-age=60' : 'no-store');
    res.send(Buffer.from(await upstream.arrayBuffer()));
  } catch (error) {
    console.error('[api proxy]', error instanceof Error ? error.message : error);
    res.status(502).send('Content service unavailable');
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
