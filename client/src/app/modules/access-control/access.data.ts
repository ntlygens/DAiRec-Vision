import { CardItemInterface, CompSize, CompType } from '../../models/ui-x';
import { JumbotronDataModel } from '../../core-comps/jumbo-tron';

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
];

/** Full-width banner panel (srvcDataDsply) on the Access Control page. */
export const ACCESS_SHOWCASE: JumbotronDataModel = {
  title: 'Access That Works the Way You Do',
  subtitle: 'Keyless entry for homes, offices and multi-site properties',
  description: 'From one smart lock on a front door to every lobby, elevator and parking gate across your buildings, DaiRec Vision designs, installs and maintains access control built around how your property runs.',
  content: 'Grant or revoke access in seconds, schedule entry by person, door and time, and review every entry from one dashboard, with video verification when paired with our cameras.',
  img: '/assets/backgrounds/access-Bnr.webp',
  imageAlt: 'Keyless access reader with live entry log',
  backgroundColor: '#424040',
  imagePosition: 'background',
  compSize: 'large',
  compType: 'banner',
  buttons: [
    { label: 'See Plans & Pricing', url: '/plans', action: 'start', icon: 'sell', style: 'raised', color: 'primary' },
    { label: 'Explore CCTV', url: '/protect', action: 'learn', icon: 'videocam', style: 'stroked', color: 'accent' },
  ],
  overlay: true,
};
