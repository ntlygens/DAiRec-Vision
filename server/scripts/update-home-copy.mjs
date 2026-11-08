/**
 * Update the home-page service card copy in MongoDB (ODM.srvcscrnInterface).
 *
 *   node scripts/update-home-copy.mjs --apply   # back up current text, then update (npm run copy:home:update)
 *   node scripts/update-home-copy.mjs           # preview only, changes nothing   (npm run copy:home:check)
 *
 * Original text is saved to server/backups/ (git-ignored) before anything changes.
 * Each record is matched by its id, falling back to its title.
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

const UPDATES = [
  {
    id: '69105a4f29eadf85965e8a33',
    title: 'See Everything. Miss Nothing. Protect What Matters.',
    content:
      'Your property deserves security that never takes a moment off. Our 4K CCTV and IP camera systems ' +
      'eliminate blind spots with crystal-clear coverage, day or night, for homes, businesses and commercial facilities.' +
      '\n\n' +
      'Watch live from your phone, tablet or computer, get instant alerts the moment something moves, and count on ' +
      'smart analytics, night vision and professional installation that grows with you.',
  },
  {
    id: '69107d9c1e38b009915e8a33',
    title: 'Never In The Dark. Always Be In Control.',
    content:
      'See every camera live from your phone, tablet or computer, with encrypted cloud recording and instant alerts ' +
      'for motion or perimeter breaches.' +
      '\n\n' +
      'AI analytics tell people, vehicles and animals apart to cut false alarms, and optional 24/7 professional ' +
      'monitoring verifies threats and dispatches help.',
  },
  {
    id: '69107dbb1e38b009915e8a34',
    title: 'Control Who Enters. Track Who Leaves. Secure Every Access Point.',
    content:
      'Replace keys that can be copied with keycards, mobile credentials, PINs or biometrics, and grant or revoke ' +
      'access instantly.' +
      '\n\n' +
      'Schedule access by person, door and time, and see every entry in a real-time audit log, with video ' +
      'verification and alerts for forced or unauthorized attempts.',
  },
];

const words = (t) => String(t || '').trim().split(/\s+/).filter(Boolean).length;

const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
try {
  await client.connect();
  const coll = client.db(DB).collection(COLLECTION);
  console.log(APPLY ? 'MODE: APPLY\n' : 'MODE: PREVIEW (run with --apply to update)\n');
  let backupDir;
  for (const u of UPDATES) {
    let doc = await coll.findOne({ _id: new ObjectId(u.id) });
    if (!doc) doc = await coll.findOne({ title: u.title });
    if (!doc) { console.log(`SKIPPED - not found: "${u.title}"\n`); continue; }

    console.log(`"${doc.title}"  (${doc._id})`);
    console.log(`  current: ${words(doc.content)} words  ->  new: ${words(u.content)} words`);
    if (!APPLY) { console.log(`\n${u.content}\n`); continue; }

    backupDir ??= (() => { const d = path.join(here, '..', 'backups'); fs.mkdirSync(d, { recursive: true }); return d; })();
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const file = path.join(backupDir, `srvcscrnInterface-${doc._id}-${stamp}.json`);
    fs.writeFileSync(file, JSON.stringify(doc, null, 2));
    const res = await coll.updateOne({ _id: doc._id }, { $set: { content: u.content } });
    console.log(`  ${res.modifiedCount ? 'UPDATED' : 'already up to date'}  (backup: backups/${path.basename(file)})\n`);
  }
} catch (e) {
  console.error('Error:', e.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
