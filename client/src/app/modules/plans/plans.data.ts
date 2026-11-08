/**
 * Plans & Pricing content.
 * ⚠️ PLACEHOLDER PRICES — replace every price below with your real pricing before launch.
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
    price: '$39', per: '/mo', install: '+ installation from $499',
    features: [
      'Up to 4 HD IP cameras',
      'Live view & playback on your phone',
      'Motion alerts with person detection',
      '7 days of cloud video storage',
      'Annual system health check',
    ],
    cta: 'Choose Home Essentials',
  },
  {
    id: 'home-pro', audience: 'private', name: 'Home Pro', badge: 'Most popular',
    forWho: 'Family homes that want full coverage',
    price: '$79', per: '/mo', install: '+ installation from $1,199',
    features: [
      'Up to 8 4K cameras with night vision',
      'Smart lock & video doorbell access',
      'AI alerts for people, vehicles & packages',
      '30 days of cloud video storage',
      '24/7 professional monitoring & dispatch',
    ],
    cta: 'Choose Home Pro',
  },
  {
    id: 'estate-guardian', audience: 'private', name: 'Estate Guardian',
    forWho: 'Large properties, acreage & gated estates',
    price: '$249', per: '/mo', install: '+ installation from $4,500',
    features: [
      'Up to 16 4K & long-range cameras',
      'Gate, door & biometric access control',
      'Automated drone perimeter patrols',
      '60 days of cloud video storage',
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
      'Up to 16 cameras with AI analytics',
      'Card & mobile access for up to 8 doors',
      'Employee & visitor access logs',
      '30 days of cloud video storage',
      '24/7 monitoring & next-day service',
    ],
    cta: 'Choose Business Shield',
  },
  {
    id: 'enterprise-command', audience: 'enterprise', name: 'Enterprise Command', badge: 'Best for multi-site',
    forWho: 'Multi-site companies, campuses & property managers',
    price: '$899', per: '/mo per site', install: '+ custom installation quote',
    features: [
      'Unlimited cameras & access points',
      'One dashboard for every location',
      'Biometric, elevator & gate control',
      '90-day storage with redundant backup',
      'Dedicated account manager & 4-hour SLA',
    ],
    cta: 'Talk to Sales',
  },
  {
    id: 'drone-patrol', audience: 'enterprise', name: 'Autonomous Drone Patrol',
    forWho: 'Industrial yards, construction, energy & large sites',
    price: '$2,499', per: '/mo', install: 'per docked drone · site survey required',
    features: [
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
  { name: 'Extra camera', detail: 'Additional 4K IP camera, installed and configured', price: '$15/mo' },
  { name: 'Extended storage', detail: 'Increase cloud retention by 30 days', price: '$10/mo' },
  { name: 'Extra access point', detail: 'Additional door, gate, or elevator reader', price: '$20/mo' },
  { name: 'On-demand drone patrol', detail: 'Scheduled patrol flights for events or short-term needs', price: 'from $350/day' },
  { name: 'License plate recognition', detail: 'LPR camera and alerts at gates and entrances', price: '$35/mo' },
];

export const PLAN_FAQS: PlanFaq[] = [
  { q: 'Is there a long-term contract?', a: 'Private plans are month-to-month after a 12-month minimum. Enterprise plans are typically 24- or 36-month agreements with volume pricing.' },
  { q: 'Do I own the equipment?', a: 'You can buy equipment outright or lease it as part of your plan. Leased equipment is maintained and replaced by us at no extra cost.' },
  { q: 'Can I upgrade later?', a: 'Yes. Add cameras, doors, or drone coverage any time; your plan is adjusted from the next billing cycle.' },
  { q: 'Is drone surveillance legal on my property?', a: 'In most cases, yes, with the right setup. We review airspace, local rules, and privacy considerations during your site survey and handle FAA requirements before any drone flies.' },
];

export const CONTACT_EMAIL = 'info@dairecvision.com';
