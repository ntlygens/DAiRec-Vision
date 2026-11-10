# Deploying DaiRec Vision to Cloudflare

The whole site runs as one Cloudflare Worker:

| Piece | Where |
|---|---|
| Static files (JS, CSS, images, favicon, robots.txt, sitemap) | Workers Static Assets, from `client/dist/client/browser` |
| Server-rendered pages | Angular SSR inside the Worker (`client/src/server.ts`, platform-neutral build) |
| Page content API (`GET /api/<collection>`) | The Worker, reading Cloudflare D1 (`dairec-content`) |
| Page content source | `content/content.json` (edit, then `npm run content:seed`) |

The public API is read-only. MongoDB and the Express servers are no longer used in production.

## One-time setup

All commands run on your Mac. Commands marked *(client)* run in `client/`.

1. **Move DNS for dairecvision.com to Cloudflare.**
   Add the domain in the Cloudflare dashboard and let it scan your records. Before switching nameservers,
   **check that the MX, SPF (TXT) and DKIM records for info@dairecvision.com were imported**, or email stops.
   Then change the nameservers at your registrar to the two Cloudflare gives you.
2. **(Done 2026-11-09: D1 `dairec-content` created and loaded from content/content.json.) To re-import from MongoDB instead:** (MongoDB still running locally):
   ```
   cd server && npm run copy:pages:update && npm run copy:export && cd ..
   node scripts/import-mongo-export.mjs
   ```
   This writes `content/content.json`. Commit it; it is now the source of truth for page content.
3. **Install Wrangler and log in** *(client)*:
   ```
   npm install
   npm install -D wrangler
   npx wrangler login
   ```
4. **Create the database** *(client)* (done: id is already in wrangler.jsonc):
   ```
   npx wrangler d1 create dairec-content
   ```
   Paste the printed `database_id` into `client/wrangler.jsonc`.
5. **Load the content** *(client)*:
   ```
   npm run db:schema
   npm run content:seed
   ```
6. **Test locally** *(client)*:
   ```
   npm run db:schema:local && npm run content:seed:local
   npm run preview          # builds, then serves the full site at http://localhost:8787
   ```
7. **Deploy** *(client)*:
   ```
   npm run deploy
   ```
   Wrangler attaches dairecvision.com and www.dairecvision.com (www redirects to the bare domain).

## Everyday use

- **Change page content:** edit `content/content.json`, then `npm run content:seed` *(client)*. No redeploy needed; pages are cached for up to an hour, so run `npm run deploy` too if you need the change live immediately.
- **Change code or design:** `npm run deploy` *(client)*.
- **Fast front-end work:** run `npx wrangler dev` (after one `npm run build`) in one terminal and `npm start` in another;
  `ng serve` forwards `/api` to the Wrangler server on port 8787.
