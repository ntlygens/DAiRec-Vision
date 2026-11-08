/** Single source of truth for site navigation (header, mobile menu, footer). */
export interface NavLink {
  label: string;
  route?: string;     // internal Angular route
  href?: string;      // external / mailto link
  icon?: string;      // Material icon name
  desc?: string;      // short line shown in the Services dropdown
}

export const CONTACT_EMAIL = 'info@dairecvision.com';
export const CONTACT_PHONE = '(347) 601-4160';
export const ASSESSMENT_HREF =
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Free security assessment request')}`;

export const SERVICE_LINKS: NavLink[] = [
  { label: 'CCTV & IP Cameras',        route: '/protect', icon: 'videocam',        desc: '4K cameras, NVR systems & installation' },
  { label: 'Video Surveillance',       route: '/surveil', icon: 'monitor',         desc: '24/7 remote monitoring & alerts' },
  { label: 'Access Control',           route: '/access',  icon: 'key',             desc: 'Keyless, biometric & gate access' },
  { label: 'Drone Surveillance',       route: '/drone',   icon: 'flight',          desc: 'Automated aerial patrols' },
];

export const MAIN_LINKS: NavLink[] = [
  { label: 'Home',             route: '/home',  icon: 'home' },
  // "Services" dropdown is rendered between Home and Plans
  { label: 'Plans & Pricing',  route: '/plans', icon: 'sell' },
  { label: 'Contact',          href: `mailto:${CONTACT_EMAIL}`, icon: 'mail' },
];
