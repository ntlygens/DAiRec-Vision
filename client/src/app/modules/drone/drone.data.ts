import { CardItemInterface, CompSize, CompType } from '../../models/ui-x';

/**
 * Fallback content for the Drone Surveillance page.
 * Used only while the `dronePgData` MongoDB collection is empty or unreachable.
 * The same records live in server/seed/dronePgData.json — import those and edit in Mongo.
 */
export const DRONE_FALLBACK_DATA: CardItemInterface[] = [
  // --- product cards: what the system does ---
  {
    _id: 'drone-p1', compType: CompType.PRODUCT, compSize: CompSize.SMALL,
    title: 'Thermal & Night Imaging', subtitle: 'See what fixed cameras miss',
    content: 'Dual HD and thermal cameras detect people and vehicles in total darkness, fog, or across open ground where fixed cameras cannot reach.',
  },
  {
    _id: 'drone-p2', compType: CompType.PRODUCT, compSize: CompSize.SMALL,
    title: 'Alarm-Triggered Response', subtitle: 'Launches in seconds',
    content: 'Integrates with your CCTV and access control, so a fence breach or forced door sends the drone straight to the location.',
  },
  {
    _id: 'drone-p3', compType: CompType.PRODUCT, compSize: CompSize.SMALL,
    title: 'Geofenced Patrol Routes', subtitle: 'Your property only',
    content: 'Routes, altitudes, and no-fly areas are mapped to your property lines, so the drone covers your site and only your site.',
  },
  {
    _id: 'drone-p4', compType: CompType.PRODUCT, compSize: CompSize.SMALL,
    title: 'Logged Flight Records', subtitle: 'Evidence on demand',
    content: 'Every flight is recorded with time, route, and footage, giving you documented evidence and patrol reports for insurers and audits.',
  },
  // --- feature jumbotrons: where it fits ---
  {
    _id: 'drone-f1', compType: CompType.FEATURE, compSize: CompSize.SMALL,
    name: 'Industrial & Logistics', title: 'Industrial & Logistics', subtitle: 'Yards, warehouses & loading areas',
    desc: 'Sites too large for fixed cameras alone get fast aerial response across the whole property.',
    img: '/assets/backgrounds/surveil-Bnr.png', backgroundColor: '#d1eeff',
  },
  {
    _id: 'drone-f2', compType: CompType.FEATURE, compSize: CompSize.SMALL,
    name: 'Construction Sites', title: 'Construction Sites', subtitle: 'After-hours theft deterrence',
    desc: 'Deter equipment and material theft overnight and document daily site progress from the air.',
    img: '/assets/backgrounds/install-Bnr.png', backgroundColor: '#d1eeff',
  },
  {
    _id: 'drone-f3', compType: CompType.FEATURE, compSize: CompSize.SMALL,
    name: 'Energy & Utilities', title: 'Energy & Utilities', subtitle: 'Long fence lines, remote assets',
    desc: 'Solar farms, substations, and long perimeters patrolled on schedule without sending guards on foot.',
    img: '/assets/backgrounds/landing-Bnr.png', backgroundColor: '#d1eeff',
  },
  {
    _id: 'drone-f4', compType: CompType.FEATURE, compSize: CompSize.SMALL,
    name: 'Large Private Estates', title: 'Large Private Estates', subtitle: 'Acreage, ranches & gated estates',
    desc: 'Perimeter patrols that cover ground a camera network cannot, for private clients with large properties.',
    img: '/assets/backgrounds/home-Bnr.png', backgroundColor: '#d1eeff',
  },
];
