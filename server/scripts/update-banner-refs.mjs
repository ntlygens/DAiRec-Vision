/**
 * Find (and optionally update) MongoDB content that still points at the old
 * PNG page banners, switching them to the optimized WebP versions.
 *
 *   node scripts/update-banner-refs.mjs           # preview only, changes nothing
 *   node scripts/update-banner-refs.mjs --apply   # write the changes
 *
 * Uses MONGODB_URI from server/.env. Scans every collection in the
 * "drvdata" and "ODM" databases, including nested fields and arrays.
 */
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, '..', 'package.json'));
require('dotenv').config({ path: path.join(here, '..', '.env') });
const { MongoClient } = require('mongodb');

const APPLY = process.argv.includes('--apply');
const DATABASES = ['drvdata', 'ODM'];
const PATTERN = /(landing|home|install|access|surveil)-Bnr\.png/g;

/** Walk a document; return [{ path, before, after }] for every string that matches. */
function findMatches(value, prefix = '') {
  const out = [];
  if (typeof value === 'string') {
    PATTERN.lastIndex = 0;
    if (PATTERN.test(value)) out.push({ path: prefix, before: value, after: value.replace(PATTERN, '$1-Bnr.webp') });
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => out.push(...findMatches(v, `${prefix}.${i}`)));
  } else if (value && typeof value === 'object' && !(value._bsontype)) {
    for (const [k, v] of Object.entries(value)) {
      if (k === '_id') continue;
      out.push(...findMatches(v, prefix ? `${prefix}.${k}` : k));
    }
  }
  return out;
}

const uri = process.env.MONGODB_URI;
if (!uri) { console.error('MONGODB_URI is not set (server/.env).'); process.exit(1); }

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
let found = 0, updated = 0;
try {
  await client.connect();
  console.log(APPLY ? 'MODE: APPLY (writing changes)\n' : 'MODE: PREVIEW (no changes written; add --apply to update)\n');
  for (const dbName of DATABASES) {
    const db = client.db(dbName);
    for (const { name } of await db.listCollections().toArray()) {
      const coll = db.collection(name);
      let scanned = 0;
      for await (const doc of coll.find({})) {
        scanned++;
        const matches = findMatches(doc);
        if (!matches.length) continue;
        for (const m of matches) {
          found++;
          console.log(`${dbName}.${name}  _id=${doc._id}  ${m.path}\n    ${m.before}\n -> ${m.after}`);
        }
        if (APPLY) {
          const $set = Object.fromEntries(matches.map(m => [m.path, m.after]));
          const res = await coll.updateOne({ _id: doc._id }, { $set });
          updated += res.modifiedCount;
        }
      }
      console.log(`  scanned ${dbName}.${name}: ${scanned} docs`);
    }
  }
  console.log(`\n${found} reference(s) found${APPLY ? `, ${updated} document(s) updated` : ''}.`);
} catch (e) {
  console.error('Error:', e.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
