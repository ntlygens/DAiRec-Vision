/**
 * Privacy Policy and Terms of Service content.
 * Written from owner-confirmed business terms (see Plans page data). Have counsel review before launch,
 * and update LEGAL_UPDATED whenever the text changes.
 */
export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}
export interface LegalDoc {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export const LEGAL_UPDATED = 'November 9, 2026';
const COMPANY = 'DaiRec Vision Security';
const EMAIL = 'info@dairecvision.com';
const PHONE = '(347) 601-4160';

export const PRIVACY_POLICY: LegalDoc = {
  title: 'Privacy Policy',
  intro: `${COMPANY} ("DaiRec Vision", "we", "us") designs, installs, monitors and maintains security systems for homes and businesses in the New York, New Jersey and Connecticut Tri-State area. This policy explains what information we collect through dairecvision.com and in providing our services, how we use it, and the choices you have.`,
  sections: [
    {
      heading: 'Information we collect',
      list: [
        'Contact details you give us, such as your name, email address, phone number and property address, when you email, call or request an assessment.',
        'Property and project details, such as the layout, entry points and existing equipment we note during an assessment. Photos are taken only with your permission.',
        'Account and service records, such as your plan, installed equipment, service history, credentials issued through an access-control system, and billing details handled by our payment processor.',
        'Video, images and event logs produced by systems we install and monitor, including cameras, access-control readers and drone patrols.',
        'Basic technical information your browser sends when you visit our website, such as IP address, browser type and the pages requested, which our hosting provider records in standard server logs.',
      ],
    },
    {
      heading: 'How we use information',
      list: [
        'To respond to your requests, schedule assessments and prepare quotes.',
        'To design, install, maintain, update and support your system.',
        'To provide monitoring, including verifying alarms against live video and contacting you, your designated contacts or emergency services.',
        'To bill for services and manage referral credits.',
        'To keep our website and systems secure and to meet legal obligations.',
      ],
      paragraphs: ['We do not sell your personal information, and we do not use your video or access logs for advertising.'],
    },
    {
      heading: 'Video, access and drone data',
      paragraphs: [
        'Recordings from your system belong to you. Footage is stored on equipment at your property and, where your plan includes it, backed up to secure cloud storage for the retention period you select (for example 7, 14 or 30 days), after which it is overwritten.',
        'Our staff and monitoring operators view live or recorded video only to install, maintain or troubleshoot your system, to verify and respond to alarms under a monitoring plan, or when you ask us to. Drone patrols are flown only over the property you authorize and only where the law allows.',
        'You are responsible for using your system lawfully, including where cameras are placed and any notices or consents required where you live or operate (see our Terms of Service).',
      ],
    },
    {
      heading: 'Cookies and website technology',
      paragraphs: [
        'Our website does not use advertising or tracking cookies. Pages load fonts and icons from Google Fonts, which receives your IP address in order to deliver them, under Google\'s own privacy policy.',
      ],
    },
    {
      heading: 'When we share information',
      list: [
        'Service providers who help us operate, such as cloud storage, hosting, monitoring, payment and email providers, under obligations to protect it and use it only for our services.',
        'Emergency services, when an alarm is verified under your monitoring plan or you ask us to contact them.',
        'Law enforcement, insurers or others when you direct us to share footage, or when we are required to by law, subpoena or court order.',
        'A buyer or successor if our business is sold or reorganized, subject to this policy.',
      ],
    },
    {
      heading: 'How long we keep information',
      paragraphs: [
        'We keep contact and service records for as long as you are a customer and as needed afterwards for legal, tax and warranty purposes. Cloud video is kept only for the retention period of your plan. Assessment notes and photos for properties that do not become customers are deleted within 12 months unless you ask us to keep them.',
      ],
    },
    {
      heading: 'How we protect information',
      paragraphs: [
        'We use administrative, technical and physical safeguards appropriate to the sensitivity of the information, including encrypted connections, access limited to staff who need it, and current firmware on the equipment we maintain. No system is perfectly secure; if a breach affects your personal information, we will notify you as required by New York law and other applicable law.',
      ],
    },
    {
      heading: 'Your choices and rights',
      paragraphs: [
        `You can ask us to access, correct or delete your personal information, or to stop sending you non-essential messages, by emailing ${EMAIL}. We may need to verify your identity, and some records must be kept to meet legal obligations or complete your service.`,
      ],
    },
    {
      heading: 'Children',
      paragraphs: ['Our website and services are intended for adults. We do not knowingly collect personal information from children under 13 through this website.'],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: ['We may update this policy from time to time. The "Last updated" date above shows when it last changed, and significant changes will be communicated to customers directly.'],
    },
    {
      heading: 'Contact us',
      paragraphs: [`Questions about this policy or your information: ${EMAIL} or ${PHONE}.`],
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDoc = {
  title: 'Terms of Service',
  intro: `These terms govern your use of dairecvision.com and the security services provided by ${COMPANY} ("DaiRec Vision", "we", "us"). When you sign up for a plan, your written service agreement and quote also apply; if they conflict with these terms, your service agreement controls.`,
  sections: [
    {
      heading: 'Our services',
      paragraphs: [
        'We design, install, maintain and support CCTV and IP camera systems, video surveillance, remote monitoring, access control and, where the law allows, automated drone surveillance, for residential and commercial properties in the Tri-State area. Information on this website is general and may change; your quote describes exactly what you will receive.',
      ],
    },
    {
      heading: 'Free assessments and quotes',
      list: [
        'One free, no-obligation on-site assessment per property. The owner or an authorized representative must be present.',
        'Written quotes are provided within 3–5 business days of the visit and are valid for 15 days.',
        'Please give 48 hours\' notice to reschedule or cancel an assessment.',
        'Drone site surveys are scheduled separately because they require airspace and FAA review.',
        'We may decline any job, including after an assessment.',
      ],
    },
    {
      heading: 'Plans, pricing and payment',
      list: [
        'Plans are billed monthly in advance, either month-to-month or on a 24-month agreement. A 24-month agreement includes half off installation labor, and qualifying starter offers include a 24-month price lock.',
        'Installation is billed as quoted. Installation financing is available with a plan (excluding drone programs) on the terms set out in your agreement.',
        'Prices exclude applicable sales tax. Add-ons, such as extra cameras and cloud backup, are billed as listed when added.',
        'If an early end to a 24-month agreement involves any charge, it is stated in your service agreement before you sign.',
      ],
    },
    {
      heading: 'Leased equipment',
      paragraphs: [
        'All equipment we install is leased as part of your plan and remains the property of DaiRec Vision. We maintain, update and replace it at no extra cost while you are a customer, except for damage caused by misuse, tampering, unauthorized moves or modifications, or events outside normal use. Please give us reasonable access to service the equipment, and return or allow us to collect it when your service ends, as described in your agreement.',
      ],
    },
    {
      heading: 'Monitoring',
      paragraphs: [
        '24/7 professional monitoring is available with a monitoring plan. When an alarm is verified, our operators will attempt to contact you or your designated contacts and may request emergency services. We do not control emergency-service response times. Keep your contact list current, and follow any local alarm-permit or false-alarm rules that apply to your property.',
      ],
    },
    {
      heading: 'Drone surveillance',
      paragraphs: [
        'Drone programs are operated by FAA Part 107 certified pilots, only over property you are authorized to cover, and only where federal, state and local law allows. Some areas, including much of New York City, currently restrict drone takeoff and landing, and we may limit, pause or decline flights for legal, safety or weather reasons.',
      ],
    },
    {
      heading: 'Your responsibilities',
      list: [
        'Use your system lawfully. Do not place cameras where people have a reasonable expectation of privacy, such as restrooms or changing areas, and do not record conversations without the consent the law requires.',
        'Post any notices required where you live or operate, for example signage for video surveillance or biometric readers at a business.',
        'Keep your account credentials, access codes and mobile credentials secure, and tell us promptly if any are lost or misused.',
        'Make sure you have authority to install equipment at the property, including landlord or association approval where needed.',
      ],
    },
    {
      heading: 'Referral credits',
      paragraphs: [
        'When someone you refer becomes a customer and their system is installed, you and the new customer each receive a $100 service credit. Credits have no cash value, cannot be transferred, and may be changed or ended at any time without affecting credits already earned.',
      ],
    },
    {
      heading: 'No guarantee and limitation of liability',
      paragraphs: [
        'Security systems and monitoring reduce risk but cannot prevent every loss, intrusion or emergency. DaiRec Vision is not an insurer, and you should keep appropriate insurance. Services can be interrupted by power, internet, carrier, weather or equipment failures outside our control.',
        'To the fullest extent permitted by law, DaiRec Vision is not liable for indirect, incidental or consequential damages, or for losses resulting from theft, fire, intrusion or other events our services are designed to help detect, and our total liability for any claim is limited to the amount you paid us in the 12 months before the claim. Nothing in these terms limits liability that cannot be limited by law.',
      ],
    },
    {
      heading: 'Website use',
      paragraphs: [
        'The content, logos and images on this website belong to DaiRec Vision or its licensors. You may view and share it for personal, non-commercial purposes. Do not attempt to disrupt, probe or gain unauthorized access to the website or our systems.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: ['These terms are governed by the laws of the State of New York, without regard to conflict-of-law rules. Disputes will be handled in the state or federal courts located in New York, unless your service agreement provides otherwise.'],
    },
    {
      heading: 'Changes to these terms',
      paragraphs: ['We may update these terms from time to time. The "Last updated" date above shows when they last changed. Changes do not alter a signed service agreement during its term unless you agree.'],
    },
    {
      heading: 'Contact us',
      paragraphs: [`Questions about these terms: ${EMAIL} or ${PHONE}.`],
    },
  ],
};
