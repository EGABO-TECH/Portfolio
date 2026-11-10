import esmsImage from '../assets/esms-real.png';
import medswiftImage from '../assets/medswift-real.png';
import accommodateMeImage from '../assets/accommodate-me-real.png';
import evoteImage from '../assets/evote-preview.webp';
import daktariImage from '../assets/daktariscribe-preview.webp';
import ieeeSiteImage from '../assets/ieee-cuu-preview.webp';
import ieeeBadgeImage from '../assets/ieee-badge-preview.webp';
import bookwormImage from '../assets/bookworm-preview.webp';

export interface FlagshipProject {
  id: string;
  name: string;
  category: string;
  /** One line shown on the card. */
  hook: string;
  /** "Why I built it", written for recruiters. First person. */
  why: string;
  /** What building it proved: concrete, verifiable things. */
  highlights: string[];
  stack: string[];
  liveUrl: string;
  /** URL loaded in the live preview (defaults to liveUrl). */
  previewUrl?: string;
  repoUrl: string;
  image: string;
  /** Background behind the screenshot on the card. */
  imageBg?: string;
  imageFit?: 'cover' | 'contain';
  /**
   * false when the site forbids being shown inside another page
   * (X-Frame-Options / frame-ancestors). The preview then shows the
   * screenshot and a button to open the site in a new tab.
   */
  embeddable: boolean;
}

export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: 'daktariscribe',
    name: 'DaktariScribe',
    category: 'HealthTech · AI Medical Scribe',
    hook: 'Voice and text field notes, turned into signed clinical reports, even with weak internet.',
    why: "Health workers at medical camps and rural clinics spend nearly as much time writing notes as treating patients, usually on paper and often with no reliable internet. I built DaktariScribe so a clinician can dictate or type an encounter, in English or a Ugandan language, and get back a clean, structured record. I set one hard rule: the tool never invents anything. Every line links back to what the clinician actually said, and nothing is final until they review and sign it.",
    highlights: [
      'Voice, text or upload capture designed for low-connectivity field work',
      'Structured records with every line traceable to the source note',
      'Clinician sign-off, then export to PDF, Word or slides',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Clerk'],
    liveUrl: 'https://daktariscribe.vercel.app',
    repoUrl: 'https://github.com/EGABO-TECH/DaktariScribe',
    image: daktariImage,
    embeddable: false,
  },
  {
    id: 'e-vote',
    name: 'e-Vote',
    category: 'Civic Tech · Elections',
    hook: 'An offline-first voting system for academic and institutional elections.',
    why: "Campus elections still run on paper ballots: long queues, slow counting, and results that are easy to dispute. I built e-Vote to show a student election can be fast and verifiable. Voters sign in with their institutional identity, each person gets exactly one ballot, and every vote leaves an audit trail. Because campus Wi-Fi isn't something you can count on, the system is designed to queue votes offline and sync them once the connection comes back.",
    highlights: [
      'Institutional sign-in with role-based access for voters, candidates, EC and auditors',
      'Duplicate-vote protection backed by Supabase Row Level Security',
      'Offline vote queueing with sync, plus vote receipts for verification',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Clerk'],
    liveUrl: 'https://e-vote-self.vercel.app',
    repoUrl: 'https://github.com/EGABO-TECH/e-Vote',
    image: evoteImage,
    embeddable: true,
  },
  {
    id: 'esms',
    name: 'ESMS',
    category: 'EdTech · Enterprise System',
    hook: 'A multi-tenant university management system built for Ugandan institutions.',
    why: "Ugandan universities still run admissions, fees, results and staff records across disconnected spreadsheets and paper forms, and students pay for it in queues. I built ESMS to see whether one system could hold all of it while meeting NCHE requirements and working with how people here actually pay, through MTN MoMo, Airtel Money and local banks. It is the project where I learned to design layers and data models before writing screens.",
    highlights: [
      'Layered architecture: UI, services, payment integrations and a 3NF PostgreSQL core',
      'Automated GPA/CGPA, course registration and transcript workflows',
      'UGX fee tracking designed around mobile money and local bank APIs',
    ],
    stack: ['TypeScript', 'Next.js 14', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://esms-beta.vercel.app/login',
    repoUrl: 'https://github.com/EGABO-TECH/ESMS',
    image: esmsImage,
    imageBg: '#000',
    imageFit: 'contain',
    embeddable: true,
  },
  {
    id: 'medswift',
    name: 'MedSwift',
    category: 'HealthTech · Multimodal AI PWA',
    hook: 'Turns a phone camera into a medicine verification tool.',
    why: "Counterfeit and substandard medicines are a real risk in East African markets, and most people have no way to check the packet in their hand. I built MedSwift so anyone with a phone camera can identify a medicine, check it against public regulatory datasets, and read its dosage and warnings in plain language. It taught me to design for failure: if one AI provider is down or unsure, the next one takes over, and previously verified medicines still work offline.",
    highlights: [
      'Three-tier AI fallback (Gemini 2.0 Flash, Gemini 1.5 Pro, OpenRouter)',
      'Cross-checks against openFDA, EMA, WHO EML and other datasets',
      'Offline-first PWA with a local IndexedDB store of past scans',
    ],
    stack: ['Vanilla JS', 'PWA', 'Gemini AI', 'Dexie.js', 'OCR.space'],
    liveUrl: 'https://med-swift-app.vercel.app/',
    repoUrl: 'https://github.com/EGABO-TECH/MedSwift',
    image: medswiftImage,
    imageBg: '#fff',
    imageFit: 'contain',
    embeddable: true,
  },
  {
    id: 'bookworm',
    name: 'The Bookworm',
    category: 'E-Commerce · Digital Books',
    hook: 'A digital bookstore built for the Ugandan market, paid for with mobile money.',
    why: "Buying a digital book in Uganda usually means needing a card most students don't have, or a long WhatsApp back-and-forth. I built The Bookworm so students and lifelong learners can pay per book with MTN or Airtel Mobile Money and download it immediately. Getting the payment-to-download flow right was the real problem: files are only released after payment, through signed links that expire.",
    highlights: [
      'Mobile money checkout (MTN and Airtel) per book',
      'Secure, expiring download links served from Cloudflare R2',
      'Installable PWA with search, filters and recommendations',
    ],
    stack: ['Next.js 16', 'TypeScript', 'MongoDB', 'Cloudflare R2', 'PWA'],
    liveUrl: 'https://the-book-worm.app/',
    repoUrl: 'https://github.com/EGABO-TECH/thebookworm',
    image: bookwormImage,
    embeddable: true,
  },
  {
    id: 'ieee-cuu-website',
    name: 'IEEE CUU Student Branch',
    category: 'Community · Official Website',
    hook: 'The official platform for the IEEE Student Branch at Cavendish University Uganda.',
    why: "Student branch websites usually die when the committee that built them graduates: stale event dates, broken links, and nobody left who knows how to update them. I built ours to outlive me. Event statuses move from upcoming to open, closed, live and ended on their own, calculated in Kampala time on the server, so the site never shows an expired countdown. All content is schema-validated, and the next committee gets a written handover guide.",
    highlights: [
      'Self-updating event state machine (Africa/Kampala time)',
      'Zod-validated content and a passing automated test suite',
      'Unifies IEEE CUU SB and CUUCSA, with a documented student handover',
    ],
    stack: ['Next.js 14', 'TypeScript (strict)', 'Tailwind CSS', 'Zod'],
    liveUrl: 'https://ieee-cuu-website.vercel.app',
    repoUrl: 'https://github.com/EGABO-TECH/ieee-cuu-website',
    image: ieeeSiteImage,
    embeddable: true,
  },
  {
    id: 'ieee-badge-generator',
    name: 'IEEE Launch Badge Generator',
    category: 'Community · Event Tooling',
    hook: 'Branded "I\'m attending" badges for the IEEE CUU SB × CUUCSA launch.',
    why: "For our branch's official launch on 4 November 2026, we wanted attendees to tell their networks they were coming. I built a badge generator that anyone can use in under a minute: add a photo, pick a role, download, share. It runs entirely in the browser, with no server, database or upload, so people's photos never leave their phones. It also had to work on the cheapest phones in the room, down to 360px screens.",
    highlights: [
      'Canvas renderer: the preview and the downloaded PNG are pixel-identical',
      'Zero backend: photos are processed only on the user\'s device',
      'Square and story formats, native share sheet, keyboard accessible',
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Canvas API', 'Tailwind CSS'],
    liveUrl: 'https://ieee-cuucsa-badge-generator.vercel.app',
    repoUrl: 'https://github.com/EGABO-TECH/ieee-cuucsa-badge-generator',
    image: ieeeBadgeImage,
    embeddable: true,
  },
  {
    id: 'accommodate-me',
    name: 'Accommodate-Me',
    category: 'Civic Tech · Student Housing',
    hook: 'Connecting university students with verified, trustworthy landlords.',
    why: "Moving for university is stressful enough without fake listings and unreliable landlords, and many students in Kampala run into both. Our team of fifteen, The Rule of 15, built Accommodate-Me to replace that chaos with verified listings and direct connections to landlords students can trust. It was my first real lesson in building with a large team: agreeing on scope, splitting the work, and shipping together.",
    highlights: [
      'Verified listings and direct landlord connections',
      'Built and shipped by a 15-person student team',
      'Designed around student safety and a smooth move to campus',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://accommodateme.vercel.app/',
    repoUrl: 'https://github.com/EGABO-TECH/ACCOMMODATE-ME',
    image: accommodateMeImage,
    imageBg: '#2c3b3a',
    imageFit: 'contain',
    embeddable: true,
  },
];
