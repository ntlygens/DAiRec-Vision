import { CardItemInterface, CompSize, CompType } from '../../models/ui-x';

/**
 * Content for the Access Control page.
 * Used while the `accessPgData` MongoDB collection is empty or still holds placeholder records.
 */
export const ACCESS_FALLBACK_DATA: CardItemInterface[] = [
  // --- why-us panels ---
  {
    _id: 'access-a1', compType: CompType.ARTICLE, compSize: CompSize.MEDIUM,
    title: 'Every door, on your terms.', subtitle: 'Grant, schedule and revoke access in seconds',
    content: 'Lost and copied keys are an open door. DaiRec Vision replaces them with credentials you control from one dashboard: issue a keycard or mobile pass to a new hire in seconds, set hours by person, door and day, and shut off access the moment someone leaves. Every entry and every denied attempt is written to a real-time audit log you can search and export.\n\nWe plan each system around your doors, wiring and safe-exit requirements, install the readers, electric strikes and maglocks, and keep firmware and credentials up to date under your plan.',
  },
  {
    _id: 'access-a2', compType: CompType.ARTICLE, compSize: CompSize.MEDIUM,
    title: "See who's at the door, not just that it opened.", subtitle: 'Access control and cameras, together',
    content: 'Paired with DaiRec cameras, every door event comes with a video clip, so you know who actually used a badge. Forced or propped doors trigger instant alerts, and with a monitoring plan our operators verify and respond around the clock.',
  },
  // --- product cards: credentials and control ---
  {
    _id: 'access-p1', compType: CompType.PRODUCT, compSize: CompSize.SMALL, icon: 'badge',
    title: 'Keycards & Fobs', subtitle: 'Encrypted and hard to clone', name: 'Encrypted credentials',
    content: 'Encrypted cards and fobs that resist copying, and can be switched off in seconds if one goes missing.',
  },
  {
    _id: 'access-p2', compType: CompType.PRODUCT, compSize: CompSize.SMALL, icon: 'phonelink_lock',
    title: 'Mobile Credentials', subtitle: 'Your phone is the key', name: 'Phone as key',
    content: 'Tap or wave your phone to unlock. Send, update or revoke passes remotely, with no cards to print or collect.',
  },
  {
    _id: 'access-p3', compType: CompType.PRODUCT, compSize: CompSize.SMALL, icon: 'fingerprint',
    title: 'Biometric Readers', subtitle: 'For high-security areas', name: 'Biometric entry',
    content: "Fingerprint and face readers for server rooms, pharmacies and stockrooms, where a shared card isn't good enough.",
  },
  {
    _id: 'access-p4', compType: CompType.PRODUCT, compSize: CompSize.SMALL, icon: 'manage_history',
    title: 'Schedules & Audit Trail', subtitle: 'Who, where and when', name: 'Audit trail',
    content: 'Set access by person, door and time, lock down remotely, and search a complete log of every entry and denied attempt.',
  },
  // --- property types ---
  {
    _id: 'access-f1', compType: CompType.FEATURE, compSize: CompSize.SMALL, icon: 'home',
    name: 'Keyless home', title: 'Homes & Residences', subtitle: 'Keyless entry for the whole family',
    desc: 'Smart locks and keypads for front doors, garages and gates, with codes for family, sitters and contractors that expire when you say.',
    content: 'Get a notification when the kids get home, and unlock remotely for deliveries or guests.',
    img: '/assets/backgrounds/landing-Bnr.webp',
  },
  {
    _id: 'access-f2', compType: CompType.FEATURE, compSize: CompSize.SMALL, icon: 'storefront',
    name: 'Business access', title: 'Offices & Retail', subtitle: 'Doors that keep your hours',
    desc: 'Card and mobile access for entrances, stockrooms, offices and server rooms, unlocking for business hours and locking themselves after close.',
    content: 'Onboard or offboard staff in seconds and see exactly who opened which door, and when.',
    img: '/assets/backgrounds/access-Bnr.webp',
  },
  {
    _id: 'access-f3', compType: CompType.FEATURE, compSize: CompSize.SMALL, icon: 'apartment',
    name: 'Multi-site access', title: 'Multi-Tenant & Multi-Site', subtitle: 'One system, every building',
    desc: 'Lobbies, elevators, parking gates and amenity spaces for apartment buildings, campuses and companies with several locations.',
    content: 'Manage every site from one dashboard, with separate permissions for tenants, staff and property managers.',
    img: '/assets/backgrounds/surveil-Bnr.webp',
  },
];
