/**
 * Page copy for database-driven content (CCTV, Surveillance, Home and Landing pages).
 * Home/Landing service panels: wide card ~103 words, narrow card ~55 words, balanced for 1100-1920px screens.
 * Replaces template placeholders ("title here", "content here", "name here"), broken image paths
 * ("image here", "http://assets/...") and leftover test values with finished copy.
 *
 *   node scripts/update-page-copy.mjs            # preview: shows current -> new for every field (changes nothing)
 *   node scripts/update-page-copy.mjs --apply    # backs up every touched record, then updates
 *   node scripts/update-page-copy.mjs --export   # writes all page content to backups/content-export.json
 *
 * npm run copy:pages:check | copy:pages:update | copy:export
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
const EXPORT = process.argv.includes('--export');
const BACKUPS = path.join(here, '..', 'backups');
const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');

// --------------------------------------------------------------------------------------------
// Copy changes. `set` replaces fields, `unset` removes leftover test fields.
// --------------------------------------------------------------------------------------------
const CHANGES = [
  // ===== CCTV page (drvdata.protectPgData) =====
  { db: 'drvdata', coll: 'protectPgData', id: '69c157a2879d8ef9052e0745', label: 'CCTV card: High-Definition Clarity',
    set: { name: '4K camera clarity', desc: '4K Ultra HD cameras', img: '' } },
  { db: 'drvdata', coll: 'protectPgData', id: '69c15b41879d8ef9052e075a', label: 'CCTV card: Smart Integration',
    set: { name: 'Recorder and network integration', desc: 'NVR and DVR integration', img: '' } },
  { db: 'drvdata', coll: 'protectPgData', id: '69c15b53879d8ef9052e075b', label: 'CCTV card: Weather Any Condition',
    set: { name: 'Weatherproof cameras', desc: 'Weatherproof indoor and outdoor cameras', img: '',
           content: 'Indoor or outdoor, our weatherproof IP cameras withstand heat, cold, rain and snow, delivering reliable performance 24/7/365.' },
    unset: ['buttons'] },
  { db: 'drvdata', coll: 'protectPgData', id: '69c15b63879d8ef9052e075c', label: 'CCTV card: Intelligent Detection',
    set: { name: 'Intelligent detection', desc: 'Motion detection and video analytics', img: '',
           content: 'Motion-activated recording, perimeter alerts and AI video analytics cut false alarms while catching real threats as they happen.' } },
  { db: 'drvdata', coll: 'protectPgData', id: '69c51e7f291ae0b3c3d8489b', label: 'CCTV article: eyes that never blink',
    set: { title: 'Your property deserves eyes that never blink.', subtitle: 'Complete visibility, day or night',
           name: 'Complete visibility', desc: 'Professionally installed CCTV and IP camera systems',
           content: 'DaiRec Vision Security transforms blind spots into complete visibility with professionally installed CCTV and IP camera systems. We map every entrance, driveway and loading area, choose the right lens and night vision for each view, and connect it all to one app, so you get clear, usable footage day or night.' } },
  { db: 'drvdata', coll: 'protectPgData', id: '69c51fa2291ae0b3c3d8489c', label: 'CCTV article: (was "title / content here")',
    set: { title: 'Installed Right the First Time', subtitle: 'Certified design and installation',
           name: 'Professional installation', desc: 'Certified camera installation', img: '',
           content: 'Before we drill a single hole, we walk your property, plan coverage and lighting, and confirm your network can handle the video. Certified technicians run clean, concealed cabling, configure every camera and recorder, and walk you through the app before we leave.' } },

  // ===== Surveillance page (drvdata.surveilPgData) =====
  { db: 'drvdata', coll: 'surveilPgData', id: '69cda80c27fba9fa6182ae5d', label: 'Surveillance article: Live Streaming Access',
    set: { subtitle: 'Your property, live, on any screen', name: 'Live streaming', desc: 'Live camera streaming on any device',
           content: "View multiple camera feeds at once from your smartphone, tablet or computer. Check in while you're on vacation, see who's at the door before you answer, or respond to an alert in real time, with smooth, encrypted streaming wherever you are." } },
  { db: 'drvdata', coll: 'surveilPgData', id: '69cda80e27fba9fa6182ae5e', label: 'Surveillance article: (was "title here 2")',
    set: { title: '24/7 Professional Monitoring', subtitle: "We watch so you don't have to",
           name: 'Professional monitoring', desc: 'Round-the-clock monitoring and dispatch',
           content: "Trained operators watch over your property around the clock, verify every alarm against live video, and dispatch police, fire or medical help when it's real. The result is fewer false alarms and faster response, available with a monitoring plan." } },
  { db: 'drvdata', coll: 'surveilPgData', id: '69cda80527fba9fa6182ae5a', label: 'Surveillance card 1: (was "title here")',
    set: { title: 'Live View Anywhere', subtitle: 'Phone, tablet or computer', name: 'Live view', desc: 'Live view on any device',
           content: 'Watch every camera in real time and switch between feeds instantly, whether you are across town or across the globe.' } },
  { db: 'drvdata', coll: 'surveilPgData', id: '69cda80727fba9fa6182ae5b', label: 'Surveillance card 2: (was "title here")',
    set: { title: 'Smart Alerts', subtitle: "Know what matters, skip what doesn't", name: 'Smart alerts', desc: 'AI-filtered motion alerts',
           content: 'AI detection separates people and vehicles from pets, shadows and weather, so every alert you get is worth opening.' } },
  { db: 'drvdata', coll: 'surveilPgData', id: '69cda80927fba9fa6182ae5c', label: 'Surveillance card 3: (was "title here")',
    set: { title: 'Recording You Can Trust', subtitle: 'On-site plus cloud backup', name: 'Secure recording', desc: 'On-site recording with cloud backup',
           content: 'Every camera records to a secure on-site recorder, with encrypted cloud backup for your most important views.' } },
  { db: 'drvdata', coll: 'surveilPgData', id: '69cda68c27fba9fa6182ae4e', label: 'Property type 1: (was "title here 1")',
    set: { img: '', title: 'Homes & Families', subtitle: 'Peace of mind, wherever you are', name: 'Home surveillance',
           desc: 'Cover entrances, driveways and backyards with 4K cameras, smart doorbells and alerts that tell a delivery from a stranger.',
           content: 'Check in on kids, pets and packages from your phone, and let our monitoring team keep watch overnight or while you travel.' } },
  { db: 'drvdata', coll: 'surveilPgData', id: '69cda81127fba9fa6182ae5f', label: 'Property type 2: (was "title here 2")',
    set: { img: '', title: 'Businesses & Retail', subtitle: 'Protect staff, stock and customers', name: 'Business surveillance',
           desc: 'Cover registers, stockrooms, entrances and parking with AI analytics that flag loitering and after-hours movement.',
           content: 'Find incidents in seconds, share clips with police or insurers, and manage every camera from one dashboard.' } },
  { db: 'drvdata', coll: 'surveilPgData', id: '69cda81327fba9fa6182ae60', label: 'Property type 3: (was "title here 3")',
    set: { img: '', title: 'Multi-Site & Industrial', subtitle: 'One view across every location', name: 'Multi-site surveillance',
           desc: 'Monitor warehouses, yards, construction sites and campuses from a single platform, with role-based access for your team.',
           content: 'Add thermal cameras, perimeter analytics and drone patrols, where permitted, for large or remote sites.' } },
  { db: 'drvdata', coll: 'surveilPgData', id: '69cda7fa27fba9fa6182ae59', label: 'Surveillance banner: (was "title here")',
    set: { title: 'Stop Wondering. Start Watching.', subtitle: 'Free on-site security assessment', name: 'Free assessment',
           desc: 'Free on-site assessment', img: '',
           content: 'Book a free assessment and get a written surveillance plan and quote within 3–5 business days.' } },

  // ===== Home service records (ODM.srvcscrnInterface): descriptions show when a service button is clicked =====
  { db: 'ODM', coll: 'srvcscrnInterface', id: '69105a4f29eadf85965e8a33', label: 'Home service: CCTV',
    set: { name: 'CCTV & IP Cameras', desc: '4K CCTV and IP camera systems, professionally designed and installed.',
           subtitle: 'Professionally designed CCTV and IP camera systems',
           content: 'Your property deserves security that never takes a moment off. Our 4K CCTV and IP camera systems eliminate blind spots with crystal-clear coverage, day or night, for homes, businesses and commercial facilities.' +
             '\n\n' +
             'Watch live from your phone, tablet or computer, get instant alerts the moment something moves, and count on smart analytics, night vision and professional installation that grows with you.' +
             '\n\n' +
             'Every system starts with a free on-site assessment. We map entrances, driveways and blind spots, recommend the right camera for each view, and deliver a written plan and quote within 3–5 business days, with leased equipment we maintain and update for you.' },
    unset: ['buttons'] },
  { db: 'ODM', coll: 'srvcscrnInterface', id: '69107d9c1e38b009915e8a33', label: 'Home service: Surveillance',
    set: { name: 'Video Surveillance', desc: 'Live video, smart alerts and optional 24/7 professional monitoring.',
           subtitle: '24/7 remote monitoring with cloud storage and real-time alerts to keep you connected.',
           content: 'See every camera live from your phone, tablet or computer, with encrypted cloud recording and instant alerts for motion or perimeter breaches.' +
             '\n\n' +
             'AI analytics tell people, vehicles and animals apart to cut false alarms, and optional 24/7 professional monitoring verifies threats and dispatches help. Start with the app and upgrade to professional monitoring anytime.' } },
  { db: 'ODM', coll: 'srvcscrnInterface', id: '69107dbb1e38b009915e8a34', label: 'Home service: Access Control',
    set: { name: 'Access Control', desc: 'Keycards, mobile credentials and biometrics with a real-time audit trail.' } },
  { db: 'ODM', coll: 'srvcscrnInterface', id: '69107ddf1e38b009915e8a35', label: 'Home service 4: (was untitled placeholder)',
    set: { title: 'Eyes in the Sky. Always on Patrol.', subtitle: 'Automated drone surveillance, where the law allows',
           name: 'Drone Surveillance', desc: 'Automated drone patrols for large and remote sites.', rte: '/drone',
           content: 'Docked drones launch on schedule or on alarm, patrol your perimeter and stream live aerial video to your team.' } },

  // ===== Home service buttons (ODM.userInterface): broken image paths + test descriptions =====
  { db: 'ODM', coll: 'userInterface', id: '69093ef14f41a8e6648a4b91', label: 'Home button: CCTV',
    set: { name: 'CCTV & Cameras', content: 'CCTV & Cameras', desc: 'See our CCTV and IP camera systems', img: '' } },
  { db: 'ODM', coll: 'userInterface', id: '69094a584f41a8e6648a4b92', label: 'Home button: Surveillance',
    set: { name: 'Video Surveillance', content: 'Video Surveillance', desc: 'See our surveillance and monitoring services', img: '' } },
  { db: 'ODM', coll: 'userInterface', id: '6909e2604f41a8e6648a4b93', label: 'Home button: Access Control',
    set: { name: 'Access Control', content: 'Access Control', desc: 'See our access control systems', img: '' } },
];

const EXPORT_SET = [
  ['ODM', 'userInterface'], ['ODM', 'srvcscrnInterface'],
  ['drvdata', 'protectPgData'], ['drvdata', 'surveilPgData'], ['drvdata', 'accessPgData'], ['drvdata', 'dronePgData'],
];

const show = (v) => (v === undefined ? '(none)' : JSON.stringify(v));
const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
try {
  await client.connect();
  fs.mkdirSync(BACKUPS, { recursive: true });

  if (EXPORT) {
    const out = {};
    for (const [db, coll] of EXPORT_SET) out[`${db}.${coll}`] = await client.db(db).collection(coll).find({}).toArray();
    const file = path.join(BACKUPS, 'content-export.json');
    fs.writeFileSync(file, JSON.stringify(out, null, 2));
    console.log(`Exported ${Object.values(out).reduce((n, a) => n + a.length, 0)} records to backups/content-export.json`);
    process.exit(0);
  }

  console.log(APPLY ? 'MODE: APPLY\n' : 'MODE: PREVIEW (run with --apply to update)\n');
  const backup = [];
  let updated = 0, missing = 0;
  for (const c of CHANGES) {
    const coll = client.db(c.db).collection(c.coll);
    const doc = await coll.findOne({ _id: new ObjectId(c.id) });
    if (!doc) { console.log(`SKIPPED (not found): ${c.label} [${c.db}.${c.coll} ${c.id}]\n`); missing++; continue; }
    console.log(`${c.label}  [${c.db}.${c.coll}]`);
    for (const [k, v] of Object.entries(c.set || {})) {
      if (doc[k] !== v) console.log(`  ${k}: ${show(doc[k])}\n     -> ${show(v)}`);
    }
    for (const k of c.unset || []) if (k in doc) console.log(`  ${k}: ${show(doc[k])}\n     -> (removed)`);
    console.log('');
    if (APPLY) {
      backup.push({ db: c.db, coll: c.coll, doc });
      const update = {};
      if (c.set) update.$set = c.set;
      if (c.unset?.length) update.$unset = Object.fromEntries(c.unset.map((k) => [k, '']));
      const res = await coll.updateOne({ _id: doc._id }, update);
      updated += res.modifiedCount;
    }
  }
  if (APPLY) {
    const file = path.join(BACKUPS, `page-copy-${stamp()}.json`);
    fs.writeFileSync(file, JSON.stringify(backup, null, 2));
    console.log(`Updated ${updated} record(s). Originals backed up to backups/${path.basename(file)}`);
  }
  if (missing) console.log(`${missing} record(s) not found; run --export and share backups/content-export.json.`);
} catch (e) {
  console.error('Error:', e.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
