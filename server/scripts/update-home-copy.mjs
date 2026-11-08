/**
 * Replace the long "See Everything. Miss Nothing." home-page card text in MongoDB
 * (ODM.srvcscrnInterface) with the consolidated version.
 *
 *   node scripts/update-home-copy.mjs           # preview only, changes nothing
 *   node scripts/update-home-copy.mjs --apply   # back up the old text, then update
 *
 * The original text is saved to server/backups/ before anything is changed.
 */
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, '..', 'package.json'));
require('dotenv').config({ path: path.join(here, '..', '.env') });
const { MongoClient, ObjectId } = require('mongodb');

const APPLY = process.argv.includes('--apply');
const DB = 'ODM';
const COLLECTION = 'srvcscrnInterface';
const DOC_ID = '69105a4f29eadf85965e8a33';
const TITLE = 'See Everything. Miss Nothing. Protect What Matters.';

const NEW_CONTENT =
  'Your property deserves security that never takes a moment off. Our 4K CCTV and IP camera systems ' +
  'eliminate blind spots with crystal-clear coverage, day or night, for homes, businesses and commercial facilities.' +
  '\n\n' +
  'Watch live from your phone, tablet or computer, get instant alerts the moment something moves, and count on ' +
  'smart analytics, night vision and professional installation that grows with you.';

const words = (t) => String(t || '').trim().split(/\s+/).filter(Boolean).length;

const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
try {
  await client.connect();
  const coll = client.db(DB).collection(COLLECTION);
  // Match by id; fall back to the title in case the record was re-created.
  let doc = await coll.findOne({ _id: new ObjectId(DOC_ID) });
  if (!doc) doc = await coll.findOne({ title: TITLE });
  if (!doc) { console.error(`No record found in ${DB}.${COLLECTION} with that id or title.`); process.exit(1); }

  console.log(`${APPLY ? 'MODE: APPLY' : 'MODE: PREVIEW (add --apply to update)'}\n`);
  console.log(`Record: ${doc._id}  "${doc.title}"`);
  console.log(`\n--- CURRENT (${words(doc.content)} words) ---\n${doc.content}`);
  console.log(`\n--- NEW (${words(NEW_CONTENT)} words) ---\n${NEW_CONTENT}\n`);

  if (APPLY) {
    const dir = path.join(here, '..', 'backups');
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `srvcscrnInterface-${doc._id}-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(file, JSON.stringify(doc, null, 2));
    const res = await coll.updateOne({ _id: doc._id }, { $set: { content: NEW_CONTENT } });
    console.log(`Backup saved: ${path.relative(path.join(here, '..'), file)}`);
    console.log(res.modifiedCount ? 'Updated.' : 'No change (content was already up to date).');
  }
} catch (e) {
  console.error('Error:', e.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
