/**
 * One-time migration: turns the MongoDB export into content/content.json.
 *
 *   cd server && npm run copy:export          # writes server/backups/content-export.json
 *   node scripts/import-mongo-export.mjs      # writes content/content.json
 *
 * content/content.json is then the source of truth for page content (edit it, then npm run content:seed).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.resolve(process.argv[2] ?? path.join(root, 'server', 'backups', 'content-export.json'));
const out = path.join(root, 'content', 'content.json');

const exported = JSON.parse(fs.readFileSync(src, 'utf8'));
const content = {};
for (const [key, records] of Object.entries(exported)) {
  const coll = key.includes('.') ? key.split('.').pop() : key;
  content[coll] = records.map((doc) => {
    const id = doc._id && typeof doc._id === 'object' ? doc._id.$oid ?? String(doc._id) : doc._id;
    return { ...doc, _id: String(id) };
  });
  console.log(`${coll}: ${content[coll].length} records`);
}
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(content, null, 2) + '\n');
console.log(`wrote ${path.relative(root, out)}`);
