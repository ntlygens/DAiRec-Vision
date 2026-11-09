/**
 * Plans & Pricing content.
 * Prices approved by the owner 2026-11-08 (see the Competitive Pricing & Acquisition Strategy doc).
 * Plan features, install 'from' prices, extra-camera pricing and lease-only equipment confirmed by the owner 2026-11-09.
 */
export type PlanAudience = 'private' | 'enterprise';

export interface PlanTier {
  id: string;
  name: string;
  audience: PlanAudience;
  forWho: string;
  price: string;
  per: string;
  install: string;
  features: string[];
  cta: string;
  badge?: string;
  /** Optional low-key upsell line shown under the feature list. */
  nudge?: string;
}

export interface PlanAddOn {
  name: string;
  detail: string;
  price: string;
}

export interface PlanFaq {
  q: string;
  a: string;
}

export const PLAN_TIERS: PlanTier[] = [
  // ---- Homes & private clients ----
  {
    id: 'home-essentials', audience: 'private', name: 'Home Essentials',
    forWho: 'Apartments, condos & smaller homes',
    price: '$24', per: '/mo', install: '+ installation from $599 (month-to-month)',
    features: [
      '3 HD IP cameras included',
      'Self-monitored: you watch and respond to alerts in the app',
      'Motion alerts with person detection',
      '7 days of on-site recording; cloud backup +$5.40/camera',
      'Annual system health check',
    ],
    nudge: 'Want us watching 24/7? Home Pro adds professional monitoring and $349 starter installation.',
    cta: 'Choose Home Essentials',
  },
  {
    id: 'home-pro', audience: 'private', name: 'Home Pro', badge: 'Most popular',
    forWho: 'Family homes that want full coverage',
    price: '$49', per: '/mo', install: '+ starter installation from $349 with a 24-month plan',
    features: [
      'Up to 8 4K cameras with night vision',
      'Smart lock & video doorbell access',
      'AI alerts for people, vehicles & packages',
      '30 days of on-site recording + cloud backup for 2 key cameras',
      '24/7 professional monitoring & dispatch',
      'Price locked for 24 months on the starter offer',
    ],
    cta: 'Choose Home Pro',
  },
  {
    id: 'estate-guardian', audience: 'private', name: 'Estate Guardian',
    forWho: 'Large properties, acreage & gated estates',
    price: '$129', per: '/mo', install: '+ installation from $4,500',
    features: [
      'Up to 16 4K & long-range cameras',
      'Gate, door & biometric access control',
      'Drone patrol add-on where permitted (by quote)',
      '60 days of on-site recording + cloud backup for 4 key cameras',
      '24/7 monitoring with priority response',
    ],
    cta: 'Choose Estate Guardian',
  },
  // ---- Business & enterprise ----
  {
    id: 'business-shield', audience: 'enterprise', name: 'Business Shield',
    forWho: 'Single-location offices, retail & restaurants',
    price: '$199', per: '/mo', install: '+ installation from $2,500',
    features: [
      'Includes 8 cameras with AI analytics + 2 access-controlled doors',
      '+$15/mo per extra camera · +$20/mo per extra door',
      'Employee & visitor access logs',
      '30 days of on-site recording + cloud backup for 2 key cameras',
      '24/7 monitoring & next-day service',
    ],
    cta: 'Choose Business Shield',
  },
  {
    id: 'enterprise-command', audience: 'enterprise', name: 'Enterprise Command', badge: 'Best for multi-site',
    forWho: 'Multi-site companies, campuses & property managers',
    price: 'From $499', per: '/mo per site', install: '+ custom installation quote',
    features: [
      'Volume pricing at 3+ sites; devices priced per unit',
      'One dashboard for every location',
      'Biometric, elevator & gate control',
      '90 days of on-site recording with redundant cloud backup',
      'Dedicated account manager & 4-hour SLA',
    ],
    cta: 'Talk to Sales',
  },
  {
    id: 'drone-patrol', audience: 'enterprise', name: 'Autonomous Drone Patrol',
    forWho: 'Industrial yards, construction, energy & large sites',
    price: 'By quote', per: '', install: 'per site · site survey required',
    features: [
      'Available where federal, state & local rules permit',
      'Drone, docking station & maintenance',
      'Scheduled & alarm-triggered flights',
      'HD + thermal live streaming',
      'Licensed remote pilot oversight',
      'Flight logs & monthly patrol reports',
    ],
    cta: 'Request a Site Survey',
  },
];

export const PLAN_ADDONS: PlanAddOn[] = [
  { name: 'Extra camera (home plans)', detail: 'Additional IP camera: $50 camera + $25 installation, configured to your plan', price: '$75 one-time' },
  { name: 'Cloud backup', detail: 'Off-site cloud recording per camera: 7 / 14 / 30 days', price: '$5.40 / $9 / $13.50 per camera/mo' },
  { name: 'Extra access point', detail: 'Additional door, gate, or elevator reader', price: '$20/mo' },
  { name: 'On-demand drone patrol', detail: 'Scheduled patrol flights for events or short-term needs, where permitted', price: 'By quote' },
];

export const PLAN_FAQS: PlanFaq[] = [
  { q: 'Is there a long-term contract?', a: 'No 3-year contracts. Every plan is month-to-month, or choose a 24-month agreement and get half off installation labor. Multi-site enterprise agreements can include volume pricing.' },
  { q: 'Do I own the equipment?', a: 'All equipment is leased as part of your plan. We maintain, update and replace it at no extra cost for as long as you are a customer.' },
  { q: "What's included in the free assessment?", a: 'A certified technician visits your property, reviews coverage, entry points and risks, and you receive a written recommendation and quote within 3–5 business days. See the assessment terms below.' },
  { q: 'Can I upgrade later?', a: 'Yes. Add cameras, doors, or drone coverage any time; your plan is adjusted from the next billing cycle.' },
  { q: 'Is drone surveillance legal on my property?', a: 'It depends on where your property is. Drone patrols are offered wherever federal, state and local rules permit them; many suburban, industrial and private sites qualify, while some areas, including much of New York City, currently restrict drone takeoff and landing. Your site survey reviews airspace, local rules and privacy, and we handle FAA requirements before any drone flies.' },
];

/** Free assessment terms, confirmed with the owner 2026-11-08. Shown on the Plans page (#assessment-terms). */
export const ASSESSMENT_TERMS: { label: string; text: string }[] = [
  { label: 'Who it\'s for', text: 'Residential and commercial properties within the Tri-State area. Enterprise and multi-site projects receive a scoped consultation.' },
  { label: 'No obligation', text: 'One free assessment per property, with no obligation to buy.' },
  { label: 'On-site', text: 'The property owner or an authorized representative must be present. A video call can help us identify and pre-screen the location, but an on-site visit is required before any job is accepted.' },
  { label: 'Scheduling', text: 'Visits are by appointment, generally within 2–3 business days of your request, depending on distance from our base and technician availability.' },
  { label: 'What you get', text: 'A written recommendation and quote within 3–5 business days of the visit. Quotes are valid for 15 days.' },
  { label: 'Rescheduling', text: 'Please give 48 hours\' notice to reschedule or cancel.' },
  { label: 'Drone site surveys', text: 'Scheduled separately, because they require an airspace and FAA review.' },
  { label: 'Privacy', text: 'Photos are taken only with your permission, and all findings are kept confidential.' },
];

export const CONTACT_EMAIL = 'info@dairecvision.com';

/** Referral credit, shown as a low-key note on the Plans page. */
export const REFERRAL_CREDIT = '$100';
