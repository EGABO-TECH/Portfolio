import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, GitFork, Star, Globe, BookOpen, User, Flame, Rocket } from 'lucide-react';
import { fadeUp, fadeIn, slideInLeft, slideInRight, scaleIn, staggerContainer, staggerItem, liftUp, viewport } from './lib/motionVariants';

import SkillsGrid from './components/SkillsGrid';
import SocialFeeds from './components/SocialFeeds';
import HeroSection from './components/HeroSection';
import egaboPhoto from './assets/EGABO-AARON.jpeg';
import eaLogo from './assets/ea-logo.png';
import esmsImage from './assets/esms-real.png';
import medswiftImage from './assets/medswift-real.png';
import accommodateMeImage from './assets/accommodate-me-real.png';

// Abstract Background
const AbstractBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/12 via-[#0d1624] to-[#050814]"></div>
    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-400/10 blur-[140px] rounded-full"></div>
    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-300/10 blur-[140px] rounded-full"></div>
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
    {/* Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
  </div>
);

const BeehiivNewsletter = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.querySelector('script[src*="beehiiv"]')) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js';
    script.setAttribute('data-beehiiv-form', '37aef124-d485-4ab8-8b9b-6ebfdfdbd529');
    container.appendChild(script);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-700/30 bg-slate-950/98 p-5 sm:p-6 md:p-8 shadow-[0_30px_110px_rgba(0,0,0,0.28)] mb-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.1),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_38%)] pointer-events-none" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] items-start">
        <div className="max-w-2xl">
          <p className="text-[10px] tracking-[0.3em] uppercase text-emerald-300/80 font-semibold mb-3">Official Newsletter</p>
          <h3 className="text-3xl md:text-[3.25rem] leading-[1.02] mb-4 text-slate-50 max-w-3xl">
            Join 500+ subscribers receiving the sharpest notes from my work.
          </h3>
          <p className="text-sm md:text-base text-slate-300/90 leading-8 max-w-xl">
            Be part of a thoughtful circle of readers who get software insights, product thinking, and the next builds I’m shipping.
          </p>
        </div>

        <div className="w-full">
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-700/40 bg-slate-900/95 shadow-[0_16px_48px_rgba(0,0,0,0.22)]">
            <div ref={containerRef} className="newsletter-embed min-h-[320px] md:min-h-[380px] w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

type PageView = 'home' | 'privacy' | 'terms';

const LegalPage = ({
  title,
  intro,
  sections,
  onBack,
}: {
  title: string;
  intro: string;
  sections: Array<{ title: string; content: string | string[] }>;
  onBack: () => void;
}) => (
  <div className="min-h-screen bg-[#040816] text-white">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-[#08132c] to-[#040816]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    <div className="relative z-10 mx-auto flex max-w-5xl flex-col px-6 py-20 md:px-10 lg:px-16">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:border-emerald-500/40 hover:text-white"
      >
        <span aria-hidden="true">←</span> Back to portfolio
      </button>

      <div className="rounded-[2rem] border border-white/10 bg-[#060b11]/80 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] md:p-10">
        <p className="mb-3 text-[10px] tracking-[0.25em] uppercase text-emerald-400/80">Legal</p>
        <h1 className="text-3xl font-heading italic text-white md:text-4xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">{intro}</p>

        <div className="mt-10 space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-6 md:p-8">
              <h2 className="mb-3 text-xl font-semibold text-white">{section.title}</h2>
              {Array.isArray(section.content) ? (
                <ul className="space-y-3 text-sm leading-7 text-white/70">
                  {section.content.map((item) => (
                    <li key={item} className="pl-4">• {item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-7 text-white/70">{section.content}</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// â”€â”€â”€ GitHub Repos Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
type RepoCategory = 'Popular' | 'Personal' | 'Study' | 'Fork' | 'Not Started';
interface Repo {
  name: string;
  description: string;
  language?: string;
  stars?: number;
  url: string;
  deployment?: string;
  tags: string[];
  category: RepoCategory;
  isFork?: boolean;
}

const REPOS: Repo[] = [
  // â”€â”€ Popular
  {
    name: 'ESMS',
    description: 'Scalable, multi-tenant University Management System with RBAC, automated academic workflows, and UGX-integrated financial services for Uganda.',
    language: 'TypeScript',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/ESMS',
    deployment: 'https://esms-beta.vercel.app',
    tags: ['TypeScript', 'Next.js 14', 'Supabase', 'EdTech'],
    category: 'Popular',
  },
  {
    name: 'MedSwift',
    description: 'AI-powered pharmaceutical auditing tool. Identify meds, verify authenticity, and extract dosage intelligence with a camera scan. Offline-first PWA.',
    language: 'JavaScript',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/MedSwift',
    deployment: 'https://med-swift-six.vercel.app',
    tags: ['Vanilla JS', 'PWA', 'Gemini AI', 'HealthTech'],
    category: 'Popular',
  },
  {
    name: 'ExFlo',
    description: 'Agentic AI tourism ecosystem â€” autonomously plans, books, and coordinates travel. Integrates MiniPay blockchain payments and an AI Pilot for emerging markets.',
    language: 'TypeScript',
    stars: 2,
    url: 'https://github.com/EGABO-TECH/ExFlo',
    deployment: 'https://egabo-tech.github.io/ExFlo/',
    tags: ['Vite', 'LangChain', 'MiniPay', 'Blockchain'],
    category: 'Popular',
  },
  {
    name: 'KUA',
    description: 'Command center for hyper-efficient social marketing. Generate pixel-perfect flyers and broadcast across platforms instantly â€” no heavy frameworks.',
    language: 'HTML',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/KUA',
    deployment: 'https://egabo-tech.github.io/KUA/',
    tags: ['JavaScript', 'HTML5 Canvas', 'SPA', 'MarTech'],
    category: 'Popular',
  },
  {
    name: 'RITAH-STYLES',
    description: 'Digital presence website for Ritah Styles â€” a fashion & beauty brand. Clean, modern brand site with full Vercel deployment.',
    language: 'HTML',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/RITAH-STYLES',
    deployment: 'https://ritah-styles-ug.vercel.app',
    tags: ['HTML', 'CSS', 'Client Work', 'Fashion'],
    category: 'Popular',
  },
  // â”€â”€ Personal
  {
    name: 'ACCOMMODATE-ME',
    description: 'Centralized housing platform connecting university students with verified, secure landlords in Uganda.',
    language: 'JavaScript',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/ACCOMMODATE-ME',
    deployment: 'https://accommodateme.vercel.app/',
    tags: ['Full-Stack', 'PostgreSQL', 'Civic Tech'],
    category: 'Personal',
  },
  {
    name: 'Resume-Builder',
    description: 'Interactive single-file portfolio & resume generator with live in-browser editing, multi-theme color engine, and pixel-perfect PDF printing.',
    language: 'HTML',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/Resume-Builder',
    tags: ['HTML', 'CSS', 'Vanilla JS', 'Dev Tools'],
    category: 'Personal',
  },
  {
    name: 'AMA-TUALU-FOUNDATION',
    description: 'Official digital infrastructure for the Ama-Tualu Foundation â€” empowering youth in West Nile, Uganda through digital literacy & mentorship.',
    language: 'HTML',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/AMA-TUALU-FOUNDATION',
    tags: ['Web', 'HTML/CSS', 'Nonprofit', 'Community'],
    category: 'Personal',
  },
  {
    name: 'EGABO-TECH (Profile)',
    description: 'GitHub profile README â€” "All about me." Personal developer brand and identity on GitHub.',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/EGABO-TECH',
    tags: ['Markdown', 'GitHub Profile'],
    category: 'Personal',
  },
  {
    name: 'odin-recipes',
    description: 'Final project for The Odin Project â€” HTML basics summarized in a recipe website. First steps into web development.',
    language: 'HTML',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/odin-recipes',
    deployment: 'https://egabo-tech.github.io/odin-recipes/',
    tags: ['HTML', 'The Odin Project', 'Beginner'],
    category: 'Personal',
  },
  // â”€â”€ Study
  {
    name: 'RUST-COHORT-2',
    description: 'Personal learning journal tracking Rust progress from absolute zero to systems proficiency. Active tracker for ongoing cohort.',
    language: 'Rust',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/RUST-COHORT-2',
    tags: ['Rust', 'Systems Programming', 'Learning'],
    category: 'Study',
  },
  {
    name: 'BD-WEEK1',
    description: 'Week 1 assignment for Backend Development â€” BeTechified Africa Cohort. Node.js fundamentals and server architecture.',
    language: 'JavaScript',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/BD-WEEK1',
    tags: ['JavaScript', 'Node.js', 'BeTechified Africa'],
    category: 'Study',
  },
  {
    name: 'BD-WEEK2',
    description: 'Week 2 assignment for Backend Development â€” BeTechified Africa Cohort. REST APIs and database integration.',
    language: 'JavaScript',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/BD-WEEK2',
    tags: ['JavaScript', 'REST API', 'BeTechified Africa'],
    category: 'Study',
  },
  {
    name: 'Simple-C-Calculator',
    description: 'First C project â€” a basic arithmetic calculator to practice control flow, switch statements, and user input handling in C.',
    language: 'C',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/Simple-C-Calculator',
    tags: ['C', 'Algorithms', 'Systems'],
    category: 'Study',
  },
  {
    name: 'Simple-C-Payroll-Calculator',
    description: 'Structured C programming project demonstrating a functional payroll processing system from algorithmic pseudocode to implementation.',
    language: 'C',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/Simple-C-Payroll-Calculator',
    tags: ['C', 'Algorithms', 'Payroll'],
    category: 'Study',
  },
  // â”€â”€ Forks
  {
    name: 'system-design-101',
    description: 'Explains complex systems using visuals and simple terms. Essential reference for system design interviews.',
    url: 'https://github.com/EGABO-TECH/system-design-101',
    tags: ['System Design', 'Reference', 'Interviews'],
    category: 'Fork',
    isFork: true,
  },
  {
    name: 'gstack',
    description: "Garry Tan's exact Claude Code setup â€” 23 opinionated tools serving as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA.",
    url: 'https://github.com/EGABO-TECH/gstack',
    tags: ['AI Engineering', 'Dev Workflow', 'Claude'],
    category: 'Fork',
    isFork: true,
  },
  {
    name: 'open-design',
    description: 'Local-first, open-source Claude Design alternative with 259+ Skills, 142+ Design Systems. Web/desktop/mobile prototypes and more.',
    stars: 1,
    url: 'https://github.com/EGABO-TECH/open-design',
    deployment: 'https://open-design.ai',
    tags: ['Design Tool', 'Open Source', 'AI'],
    category: 'Fork',
    isFork: true,
  },
  {
    name: 'maxun',
    description: 'Open-source no-code platform for web scraping, crawling, search and AI data extraction. Turn websites into structured APIs in minutes.',
    url: 'https://github.com/EGABO-TECH/maxun',
    deployment: 'https://www.maxun.dev',
    tags: ['Web Scraping', 'No-Code', 'AI', 'Data'],
    category: 'Fork',
    isFork: true,
  },
  {
    name: 'odoo',
    description: 'Odoo â€” Open Source Apps To Grow Your Business. Full ERP platform forked for business automation study.',
    url: 'https://github.com/EGABO-TECH/odoo',
    deployment: 'https://www.odoo.com',
    tags: ['ERP', 'Python', 'Business', 'Open Source'],
    category: 'Fork',
    isFork: true,
  },
  {
    name: 'claw-code',
    description: 'Better Harness Tools that make real things done. AI coding assistant written in Rust.',
    url: 'https://github.com/EGABO-TECH/claw-code',
    tags: ['AI Coding', 'Rust', 'Terminal'],
    category: 'Fork',
    isFork: true,
  },
  {
    name: 'free-claude-code',
    description: 'Use claude-code for free in the terminal, VSCode extension or Discord with voice support.',
    url: 'https://github.com/EGABO-TECH/free-claude-code',
    tags: ['Claude', 'Free Tools', 'Terminal'],
    category: 'Fork',
    isFork: true,
  },
  {
    name: 'OpenCluely',
    description: 'Free, open source Cluely alternative for technical interviews â€” DSA, OAs, CP. Invisible overlay with real-time AI help.',
    url: 'https://github.com/EGABO-TECH/OpenCluely',
    tags: ['Interviews', 'AI', 'Open Source'],
    category: 'Fork',
    isFork: true,
  },
  {
    name: 'Self-updating-repo',
    description: 'A self-updating GitHub profile repository for dynamic README generation.',
    url: 'https://github.com/EGABO-TECH/Self-updating-repo',
    tags: ['GitHub Actions', 'Automation', 'Profile'],
    category: 'Fork',
    isFork: true,
  },
  // â”€â”€ Not Started
  {
    name: 'RENOA',
    description: 'Startup venture â€” RENOA. Co-Founder & Technical Lead. Full platform coming soon.',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/RENOA',
    tags: ['Startup', 'In Progress', 'Coming Soon'],
    category: 'Not Started',
  },
  {
    name: 'MAMA-IANS-SHOP',
    description: 'Local e-commerce / shop website â€” initialized but work not yet begun.',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/MAMA-IANS-SHOP',
    tags: ['E-Commerce', 'Local Business', 'Coming Soon'],
    category: 'Not Started',
  },
];

const CATEGORY_CONFIG: Record<RepoCategory, { label: string; icon: React.ReactNode; color: string; accent: string }> = {
  Popular: { label: 'Popular', icon: <Flame className="w-3.5 h-3.5" />, color: 'text-amber-400', accent: 'bg-amber-400/10 border-amber-400/20' },
  Personal: { label: 'Personal', icon: <User className="w-3.5 h-3.5" />, color: 'text-emerald-400', accent: 'bg-emerald-400/10 border-emerald-400/20' },
  Study: { label: 'Study', icon: <BookOpen className="w-3.5 h-3.5" />, color: 'text-teal-400', accent: 'bg-teal-400/10 border-teal-400/20' },
  Fork: { label: 'Forks', icon: <GitFork className="w-3.5 h-3.5" />, color: 'text-lime-400', accent: 'bg-lime-400/10 border-lime-400/20' },
  'Not Started': { label: 'Not Started', icon: <Rocket className="w-3.5 h-3.5" />, color: 'text-white/40', accent: 'bg-white/5 border-white/10' },
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  HTML: '#e34c26',
  Rust: '#dea584',
  C: '#555555',
};

// â”€â”€â”€ GitHub Section Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const GitHubSection = () => {
  const [activeTab, setActiveTab] = useState<RepoCategory>('Popular');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filtered = REPOS.filter(r => r.category === activeTab);
  const counts = (Object.keys(CATEGORY_CONFIG) as RepoCategory[]).reduce((acc, cat) => {
    acc[cat] = REPOS.filter(r => r.category === cat).length;
    return acc;
  }, {} as Record<RepoCategory, number>);

  return (
    <section id="github" className="relative z-10 py-32 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="text-sm font-body text-gradient-emerald-gold font-semibold mb-4">// GITHUB REPOSITORIES</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="text-5xl md:text-6xl font-heading italic leading-tight tracking-[-2px]">
              Code in the Open
            </h2>
            <a
              href="https://github.com/EGABO-TECH"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors shrink-0"
            >
              <GithubIcon className="w-4 h-4" />
              View Profile <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>



        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {(Object.keys(CATEGORY_CONFIG) as RepoCategory[]).map(cat => {
            const cfg = CATEGORY_CONFIG[cat];
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                  ? `liquid-glass-strong ${cfg.color} border border-current/30`
                  : 'liquid-glass text-white/50 hover:text-white/80'
                  }`}
              >
                <span className={isActive ? cfg.color : 'text-white/40'}>{cfg.icon}</span>
                {cfg.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-current/20' : 'bg-white/10'}`}>
                  {counts[cat]}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Repo Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((repo, i) => {
              const cfg = CATEGORY_CONFIG[repo.category];
              return (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="liquid-glass rounded-[1.5rem] p-6 flex flex-col group hover:bg-white/[0.03] transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle glow on hover */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem] ${repo.category === 'Popular' ? 'bg-gradient-to-br from-amber-500/5 to-transparent' :
                    repo.category === 'Personal' ? 'bg-gradient-to-br from-emerald-500/5 to-transparent' :
                      repo.category === 'Study' ? 'bg-gradient-to-br from-teal-500/5 to-transparent' :
                        repo.category === 'Fork' ? 'bg-gradient-to-br from-lime-500/5 to-transparent' :
                          'bg-gradient-to-br from-white/3 to-transparent'
                    }`} />

                  {/* Top row */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded-full border ${cfg.accent} ${cfg.color}`}>
                      {cfg.icon}
                      {repo.isFork ? 'Fork' : repo.category}
                    </div>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/30 hover:text-white/80 transition-colors"
                      aria-label={`Open ${repo.name} on GitHub`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Name + description */}
                  <h4 className="text-xl font-heading italic mb-2 leading-tight">{repo.name}</h4>
                  <p className="text-sm text-white/60 font-light leading-relaxed mb-5 flex-1">
                    {repo.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {repo.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] text-white/60">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-xs text-white/50">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: LANG_COLORS[repo.language] ?? '#888' }}
                          />
                          {repo.language}
                        </span>
                      )}
                      {(repo.stars ?? 0) > 0 && (
                        <span className="flex items-center gap-1 text-xs text-yellow-400/80">
                          <Star className="w-3 h-3" /> {repo.stars}
                        </span>
                      )}
                    </div>
                    {repo.deployment && (
                      <a
                        href={repo.deployment}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
                      >
                        <Globe className="w-3 h-3" /> Live
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex justify-center mt-16"
        >
          <a
            href="https://github.com/EGABO-TECH?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass-strong rounded-full px-8 py-4 flex items-center gap-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            Browse All 30 Repositories on GitHub
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

function App() {
  const [activePage, setActivePage] = useState<PageView>('home');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activePage]);

  if (activePage === 'privacy') {
    return (
      <LegalPage
        title="Privacy Policy"
        intro="This Privacy Policy explains how Egabo Aaron collects, uses, stores, and protects information when you visit this portfolio website or interact with its content, newsletter, or contact forms."
        onBack={() => setActivePage('home')}
        sections={[
          {
            title: '1. Information We Collect',
            content: [
              'Information you voluntarily provide through the contact form, such as your name, email address, and project details.',
              'Newsletter subscription data if you join the mailing list, including your email address and subscription preferences.',
              'Technical information automatically collected through your browser, such as IP address, device type, browser version, referring pages, and interaction data.',
            ],
          },
          {
            title: '2. How We Use Your Information',
            content: [
              'To respond to inquiries, discuss collaboration opportunities, and provide project-related support.',
              'To send newsletter updates, product notes, and relevant portfolio content if you have subscribed.',
              'To improve website performance, understand visitor behavior, and maintain site security.',
            ],
          },
          {
            title: '3. Cookies and Analytics',
            content: 'This website may use cookies, local storage, or analytics tools to improve functionality and understand visitor engagement. You may disable cookies in your browser settings, though some features may be affected.',
          },
          {
            title: '4. Third-Party Services',
            content: [
              'Embedded content and external services may process data in accordance with their own privacy policies, including newsletter providers and analytics platforms.',
              'Links to GitHub, LinkedIn, X, and other external services are provided for convenience and are governed by those platforms’ own terms and privacy practices.',
            ],
          },
          {
            title: '5. Data Security',
            content: 'We take reasonable technical and organizational precautions to protect personal information from unauthorized access, misuse, alteration, or disclosure. No method of transmission over the internet is completely secure, however.',
          },
          {
            title: '6. Your Rights',
            content: [
              'You may request access to, correction of, or deletion of your personal data where applicable.',
              'You may unsubscribe from marketing communications at any time by using the unsubscribe link in emails or by contacting us directly.',
              'Depending on your location, you may have additional privacy rights under applicable law.',
            ],
          },
          {
            title: '7. Contact',
            content: 'For privacy-related questions or requests, please contact aaronegabo@gmail.com.',
          },
        ]}
      />
    );
  }

  if (activePage === 'terms') {
    return (
      <LegalPage
        title="Terms and Conditions"
        intro="These Terms and Conditions govern your use of this portfolio website and its content. By accessing or using the site, you agree to be bound by these terms."
        onBack={() => setActivePage('home')}
        sections={[
          {
            title: '1. Use of Website',
            content: 'You may use this website for lawful informational and professional purposes. You agree not to misuse the site, interfere with its operation, or attempt to gain unauthorized access to systems or data.',
          },
          {
            title: '2. Intellectual Property',
            content: [
              'All content on this website, including text, graphics, images, code snippets, branding, and design, is owned by Egabo Aaron unless otherwise noted.',
              'You may not copy, reproduce, distribute, or republish website content without prior written permission.',
            ],
          },
          {
            title: '3. Project and Service Information',
            content: 'Descriptions of projects, services, and technical capabilities are provided for informational purposes. They may be updated at any time and do not guarantee specific outcomes, availability, or performance.',
          },
          {
            title: '4. Links to Third-Party Websites',
            content: 'This website may contain links to third-party platforms such as GitHub, LinkedIn, X, or other external services. These links are provided for convenience, and their terms, privacy practices, and content are outside our control.',
          },
          {
            title: '5. Limitation of Liability',
            content: 'To the maximum extent permitted by law, Egabo Aaron shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or any linked content.',
          },
          {
            title: '6. Warranties and Disclosures',
            content: 'The website is provided on an “as is” and “as available” basis. While efforts are made to keep the site accurate and secure, no warranty is made that it will be error-free, uninterrupted, or fully compatible with every device or browser.',
          },
          {
            title: '7. Governing Law',
            content: 'These terms are governed by the laws of Uganda, without regard to conflict of law principles. Any dispute arising from these terms shall be resolved in a court of competent jurisdiction in Uganda.',
          },
          {
            title: '8. Changes to These Terms',
            content: 'We may update these Terms and Conditions from time to time. Continued use of the website after changes are posted means you accept the revised terms.',
          },
          {
            title: '9. Contact',
            content: 'For questions about these terms, please contact aaronegabo@gmail.com.',
          },
        ]}
      />
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-transparent font-body text-slate-200 selection:bg-emerald-500/30">
      <AbstractBackground />

      {/* â”€â”€ New Hero Section (includes its own self-contained navbar) â”€â”€ */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="relative z-10 py-32 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden">
        {/* Ambient floating orbs */}
        <div className="absolute top-1/4 left-[5%] w-72 h-72 bg-emerald-600/8 rounded-full blur-[100px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-[5%] w-64 h-64 bg-amber-500/8 rounded-full blur-[90px] pointer-events-none animate-float-lg" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          {/* Photo column */}
          <motion.div
            variants={slideInLeft} initial="hidden" whileInView="visible" viewport={viewport}
            className="w-full md:w-1/3 relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden liquid-glass-strong p-2">
              <img src={egaboPhoto} alt="Egabo Aaron" className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-700 hover:scale-[1.03]" />
            </div>
            <motion.div
              variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewport}
              transition={{ delay: 0.35 }}
              className="absolute -bottom-4 -right-2 sm:-right-4 md:-bottom-8 md:-right-8 liquid-glass p-5 md:p-6 rounded-[1.5rem] min-w-[15rem] md:min-w-[17rem] shadow-2xl border border-white/10 backdrop-blur-md animate-glow-border"
            >
              <div className="text-3xl font-heading italic tracking-wide">RENOA</div>
              <div className="text-xs text-white/80 mt-1.5 font-medium leading-relaxed">Co-Founder & Technical Project Manager</div>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <motion.div
            variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={viewport}
            className="w-full md:w-2/3"
          >
            <motion.div variants={staggerItem} className="text-sm font-body text-gradient-emerald-gold font-semibold mb-4">// ABOUT ME</motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-heading italic leading-tight tracking-[-1px] mb-8">
              "Tech, Innovation and Curiosity all curated in my pragmatic mind."
            </motion.h2>
            <motion.div variants={staggerContainer(0.12, 0.2)} initial="hidden" whileInView="visible" viewport={viewport} className="space-y-6 text-white/80 font-light text-lg leading-relaxed">
              <motion.p variants={staggerItem}>
                I spend most of my time learning and writing clean backend code whilst designing simple, clear layouts. I focus on building reliable software that stays up and running even when the internet or servers slow down.
              </motion.p>
              <motion.p variants={staggerItem}>
                Beyond code, I am a passionate advocate for community development and solving community problems in compliance with the SDGs. My interests in philosophy, psychology, and history inform how I think about user needs and product design.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-32 px-4 sm:px-8 md:px-16 lg:px-24 bg-[#020818]/50 overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute top-0 right-[10%] w-96 h-96 bg-emerald-600/6 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-0 left-[5%] w-80 h-80 bg-amber-500/6 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={staggerItem} className="text-sm font-body text-gradient-emerald-gold font-semibold mb-4">// FLAGSHIP PROJECTS</motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-heading italic leading-tight tracking-[-2px] mb-16">
              Engineering for Impact
            </motion.h2>
          </motion.div>

          <div className="space-y-24">
            {/* ESMS */}
            <motion.div
              variants={staggerContainer(0.15, 0)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              <motion.div variants={slideInLeft} className="w-full lg:w-1/2 order-2 lg:order-1">
                <motion.div variants={liftUp} className="liquid-glass rounded-full inline-flex px-4 py-1.5 text-xs font-medium mb-6">EdTech • Enterprise System</motion.div>
                <motion.h3 variants={fadeUp} className="text-4xl font-heading italic mb-4">ESMS</motion.h3>
                <motion.p variants={staggerItem} className="text-white/70 font-light leading-relaxed mb-6">
                  The definitive digital infrastructure for modern higher education in Uganda. A 4-layer decoupled architecture featuring multi-tenant RBAC, NCHE regulatory compliance, and native Ugandan Shilling financial workflows with local bank APIs (MTN MoMo, Airtel Money).
                </motion.p>
                <motion.div variants={staggerContainer(0.07, 0.1)} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-wrap gap-2 mb-8">
                  {['TypeScript', 'Next.js 14', 'Supabase', 'TailwindCSS'].map(tech => (
                    <motion.span key={tech} variants={staggerItem} className="liquid-glass px-3 py-1 rounded-full text-xs">{tech}</motion.span>
                  ))}
                </motion.div>
                <motion.a variants={fadeIn} href="https://esms-beta.vercel.app" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-emerald-400 transition-colors">
                  View Live Platform <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
              <motion.div variants={slideInRight} className="w-full lg:w-1/2 order-1 lg:order-2">
                <motion.div variants={scaleIn} className="aspect-[16/10] liquid-glass-strong rounded-[2rem] p-2 relative overflow-hidden group">
                  <img src={esmsImage} alt="ESMS Dashboard" className="w-full h-full object-contain bg-black rounded-[1.5rem] transition-all duration-700 group-hover:scale-[1.02] p-4" />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem]"></div>
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[1.5rem]" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* MedSwift */}
            <motion.div
              variants={staggerContainer(0.15, 0)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              <motion.div variants={slideInLeft} className="w-full lg:w-1/2">
                <motion.div variants={scaleIn} className="aspect-[16/10] liquid-glass-strong rounded-[2rem] p-2 relative overflow-hidden group">
                  <img src={medswiftImage} alt="MedSwift App" className="w-full h-full object-contain bg-white rounded-[1.5rem] transition-all duration-700 group-hover:scale-[1.02] p-4" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem]"></div>
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[1.5rem]" />
                </motion.div>
              </motion.div>
              <motion.div variants={slideInRight} className="w-full lg:w-1/2">
                <motion.div variants={liftUp} className="liquid-glass rounded-full inline-flex px-4 py-1.5 text-xs font-medium mb-6">HealthTech • Multimodal AI PWA</motion.div>
                <motion.h3 variants={fadeUp} className="text-4xl font-heading italic mb-4">MedSwift</motion.h3>
                <motion.p variants={staggerItem} className="text-white/70 font-light leading-relaxed mb-6">
                  Pharmaceutical intelligence engine turning a mobile camera into a medical auditing tool. Features a triple-tier AI resilience pipeline (Gemini 2.0 Flash → Gemini 1.5 Pro → Claude fallback) and an offline-first PWA architecture for low-connectivity environments.
                </motion.p>
                <motion.div variants={staggerContainer(0.07, 0.1)} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-wrap gap-2 mb-8">
                  {['Vanilla JS', 'PWA', 'Gemini AI', 'OCR.space'].map(tech => (
                    <motion.span key={tech} variants={staggerItem} className="liquid-glass px-3 py-1 rounded-full text-xs">{tech}</motion.span>
                  ))}
                </motion.div>
                <motion.a variants={fadeIn} href="https://med-swift-six.vercel.app" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-emerald-400 transition-colors">
                  View Live App <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Accommodate Me */}
            <motion.div
              variants={staggerContainer(0.15, 0)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              <motion.div variants={slideInLeft} className="w-full lg:w-1/2 order-2 lg:order-1">
                <motion.div variants={liftUp} className="liquid-glass rounded-full inline-flex px-4 py-1.5 text-xs font-medium mb-6">Civic Tech • Real Estate</motion.div>
                <motion.h3 variants={fadeUp} className="text-4xl font-heading italic mb-4">Accommodate-Me</motion.h3>
                <motion.p variants={staggerItem} className="text-white/70 font-light leading-relaxed mb-6">
                  Centralized housing platform connecting university students with verified, secure landlords in Uganda. Built to ensure safety, transparency, and seamless digital booking.
                </motion.p>
                <motion.div variants={staggerContainer(0.07, 0.1)} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-wrap gap-2 mb-8">
                  {['Full-Stack', 'PostgreSQL', 'Web'].map(tech => (
                    <motion.span key={tech} variants={staggerItem} className="liquid-glass px-3 py-1 rounded-full text-xs">{tech}</motion.span>
                  ))}
                </motion.div>
                <motion.a variants={fadeIn} href="https://accommodateme.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-purple-400 transition-colors">
                  View Live Website <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
              <motion.div variants={slideInRight} className="w-full lg:w-1/2 order-1 lg:order-2">
                <motion.div variants={scaleIn} className="aspect-[16/10] liquid-glass-strong rounded-[2rem] p-2 relative overflow-hidden group">
                  <img src={accommodateMeImage} alt="Accommodate Me Platform" className="w-full h-full object-cover object-top rounded-[1.5rem] transition-all duration-700 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem]"></div>
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[1.5rem]" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Other Notable Projects */}
          <div className="mt-32">
            <motion.div variants={staggerItem} className="text-sm font-body text-gradient-emerald-gold font-semibold mb-8">// OTHER NOTABLE WORK</motion.div>
            <motion.div
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >

              {/* KUA */}
              <motion.a
                variants={staggerItem}
                href="https://egabo-tech.github.io/KUA/"
                target="_blank"
                rel="noreferrer"
                className="liquid-glass rounded-[1.5rem] p-6 flex flex-col group hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="liquid-glass rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider">Web App</div>
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-2xl font-heading italic mb-2">KUA</h4>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-6 flex-1">
                  Premium client-side SPA for social marketing campaigns featuring an HTML5 canvas flyer generator engine.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['JavaScript', 'HTML5 Canvas', 'SPA'].map(tech => (
                    <span key={tech} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] text-white/70">{tech}</span>
                  ))}
                </div>
              </motion.a>

              {/* RITAH-STYLES (Replaces Accommodate Me) */}
              <motion.a
                variants={staggerItem}
                href="https://ritah-styles-ug.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="liquid-glass rounded-[1.5rem] p-6 flex flex-col group hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="liquid-glass rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider">Client Work</div>
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-2xl font-heading italic mb-2">RITAH-STYLES</h4>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-6 flex-1">
                  Digital presence website for Ritah Styles” a fashion & beauty brand. Clean, modern brand site with full Vercel deployment.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['HTML', 'CSS', 'Fashion'].map(tech => (
                    <span key={tech} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] text-white/70">{tech}</span>
                  ))}
                </div>
              </motion.a>

              {/* Resume Builder */}
              <motion.a
                variants={staggerItem}
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Deployment link coming soon!'); }}
                className="liquid-glass rounded-[1.5rem] p-6 flex flex-col group hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="liquid-glass rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider">Dev Tools</div>
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-2xl font-heading italic mb-2">Resume Builder</h4>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-6 flex-1">
                  Interactive single-file portfolio generator with live in-browser editing and dynamic print-ready theming.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['HTML', 'CSS', 'Vanilla JS'].map(tech => (
                    <span key={tech} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] text-white/70">{tech}</span>
                  ))}
                </div>
              </motion.a>

              {/* AMA-TUALU FOUNDATION */}
              <motion.a
                variants={staggerItem}
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Deployment link coming soon!'); }}
                className="liquid-glass rounded-[1.5rem] p-6 flex flex-col group hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="liquid-glass rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider">Nonprofit</div>
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-2xl font-heading italic mb-2">Ama-Tualu Foundation</h4>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-6 flex-1">
                  Official digital infrastructure and website for the registered youth empowerment nonprofit in West Nile.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['Web', 'HTML/CSS', 'Community'].map(tech => (
                    <span key={tech} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] text-white/70">{tech}</span>
                  ))}
                </div>
              </motion.a>

              {/* Simple C Calculator */}
              <motion.a
                variants={staggerItem}
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Deployment link coming soon!'); }}
                className="liquid-glass rounded-[1.5rem] p-6 flex flex-col group hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="liquid-glass rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider">Systems</div>
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-2xl font-heading italic mb-2">C Calculator</h4>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-6 flex-1">
                  Arithmetic calculator designed to practice control flow, switch statements, and user input handling in C.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['C Language', 'Algorithms'].map(tech => (
                    <span key={tech} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] text-white/70">{tech}</span>
                  ))}
                </div>
              </motion.a>

              {/* RUST COHORT */}
              <motion.a
                variants={staggerItem}
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Deployment link coming soon!'); }}
                className="liquid-glass rounded-[1.5rem] p-6 flex flex-col group hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="liquid-glass rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider">Learning</div>
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-2xl font-heading italic mb-2">Rust Learning Tracker</h4>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-6 flex-1">
                  Personal learning journal tracking progress through Rust programming from complete beginner to systems proficiency.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['Rust', 'Systems Programming'].map(tech => (
                    <span key={tech} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] text-white/70">{tech}</span>
                  ))}
                </div>
              </motion.a>

            </motion.div>
          </div>
        </div>
      </section>

      {/* GitHub Repositories Section */}
      <GitHubSection />

      {/* Skills Section */}
      <SkillsGrid />

      {/* Social Feeds Section */}
      <SocialFeeds />

      {/* Reviews / Testimonials Section */}
      {(() => {
        const track1 = [
          { name: 'Muawia Mohammad', role: 'Founder, EdTech Startup Â· Kampala', avatar: 'MM', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/20', quote: "Aaron delivered our student management system months ahead of schedule. The architecture he proposed ”multi-tenant with role-based access” was something our previous team couldn't crack in a year. He genuinely understands enterprise software." },
          { name: 'Guzu Prisca Nancy', role: 'Project Manager, HealthTech NGO', avatar: 'GPN', color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/20', quote: 'MedSwift was a game-changer for our pharmacy audit process. Aaron integrated offline-first capabilities so our field teams could still scan drugs even without internet. The AI fallback pipeline was genius” it never failed us.' },
          { name: 'Niwasiima Ashelycole', role: 'CTO, Startup, Co-Founder at RENOA· Uganda', avatar: 'NA', color: 'from-purple-500/20 to-violet-500/20', border: 'border-purple-500/20', quote: "Working with Aaron on Accommodate-Me was seamless. He doesn't just write code” he thinks through the product. His suggestion to implement verified landlord onboarding before launch prevented a serious trust problem. Sharp product instinct." },
          { name: 'Kabajungu Ritah', role: 'Business Owner, Fashion & Beauty Brand', avatar: 'KR', color: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500/20', quote: "He built my website from scratch in under a week. It looks more professional than anything I've seen from boutique agencies. My clients constantly ask who designed it. I send them straight to him." },

          { name: 'Prof. Alone Kimwise', role: 'Dean of FST, Cavendish University Uganda', avatar: 'AK', color: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/20', quote: 'Aaron represents the calibre of engineering talent Uganda is producing. His ESMS project addressed a genuine gap in how we manage institutional data. The NCHE compliance layer alone showed a depth of domain research that impressed the entire faculty.' },
        ];
        const track2 = [
          { name: 'Acen Lydia', role: 'Product Designer, Tech Startup', avatar: 'AL', color: 'from-violet-500/20 to-purple-500/20', border: 'border-violet-500/20', quote: 'Aaron is one of the rare engineers who genuinely cares about the design layer. He pushed back on my wireframes twice” and both times he was right. His frontend instinct is as sharp as his backend work.' },
          { name: 'Nakato Faith', role: 'Co-Founder, E-commerce Platform', avatar: 'NF', color: 'from-rose-500/20 to-pink-500/20', border: 'border-rose-500/20', quote: "The platform Aaron built handled our Black Friday peak traffic without a single downtime incident. He had recommended a caching strategy I didn't understand at first, but it saved us on the day. He thinks months ahead." },
          { name: 'Wasswa Daniel', role: 'Senior Engineer, Software Consultancy', avatar: 'WD', color: 'from-amber-500/20 to-yellow-500/20', border: 'border-amber-500/20', quote: "I have reviewed Aaron's code as part of our open-source contribution reviews. His commit messages, documentation, and code structure are production-grade. He writes code like someone who knows it will be maintained for years." },
          { name: 'Ababiku Brenda', role: 'Director, Founder of Ama Tualu Foundation· West Nile', avatar: 'AB', color: 'from-blue-500/20 to-indigo-500/20', border: 'border-indigo-500/20', quote: "Aaron volunteered his time to build our foundation's digital platform. What impressed me most was how he translated our community vision into something technically executable without losing the soul of what we were trying to do." },
          { name: 'Dr. Muhammad Kudu Muhammad', role: 'University Lecturer, CS Department', avatar: 'MKM', color: 'from-cyan-500/20 to-sky-500/20', border: 'border-cyan-500/20', quote: 'Aaron consistently goes beyond coursework. In my Advanced Databases module, his final project schema was the most normalised and well-indexed submission I have seen in five years of teaching. He is self-taught beyond the curriculum.' },
        ];

        const StarIcon = () => (
          <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );

        const ReviewCard = ({ r }: { r: typeof track1[0] }) => (
          <article className="min-w-0 rounded-[2rem] border border-white/10 bg-slate-950/85 backdrop-blur-xl p-7 shadow-[0_20px_70px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 hover:border-emerald-400/20 hover:shadow-[0_24px_82px_rgba(0,0,0,0.28)]">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map(i => <StarIcon key={i} />)}
              </div>
              <span className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Client review</span>
            </div>
            <p className="text-sm leading-7 text-slate-200 font-light mb-8">“{r.quote}”</p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${r.color} ${r.border} text-sm font-semibold text-white`}>{r.avatar}</div>
              <div>
                <div className="text-sm font-semibold text-white">{r.name}</div>
                <div className="text-sm text-slate-400">{r.role}</div>
              </div>
            </div>
          </article>
        );

        return (
          <section id="reviews" className="relative z-10 py-32 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 mb-14">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-2xl">
                  <div className="text-sm font-body text-gradient-emerald-gold font-semibold mb-4">// CLIENT REVIEWS</div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic leading-tight tracking-[-1px] text-white">What they say</h2>
                </div>
                <p className="max-w-md text-sm leading-7 text-slate-400 font-light">Trusted by founders, technical leaders, and product teams throughout East Africa. Every review reflects an engineered solution delivered with care, clarity, and long-term value.</p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[...track1, ...track2].map(r => <ReviewCard key={r.name} r={r} />)}
              </div>
            </div>
          </section>
        );
      })()}

      <section id="contact" className="relative z-10 pt-32 px-4 md:px-8 border-t border-white/10 bg-[#020818]/60 overflow-hidden">
        {/* Ambient orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.div variants={fadeIn} className="text-[10px] tracking-[0.2em] uppercase font-medium text-white/50 mb-6">Let's Build Together</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-heading mb-2">Start Your</motion.h2>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-heading italic text-emerald-500 mb-8">Project</motion.h2>
          <motion.p variants={staggerItem} className="text-white/60 text-sm max-w-md mx-auto leading-relaxed">
            Whether you have a clear vision or just a feeling, let's have a conversation. I'll help you bring your software product to life.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-2xl mx-auto mb-32 relative"
        >
          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] tracking-[0.15em] uppercase text-white/60 font-medium">First Name</label>
                <input type="text" placeholder="Your first name" className="bg-transparent border border-white/10 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-emerald-50 placeholder:text-emerald-50/20" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] tracking-[0.15em] uppercase text-white/60 font-medium">Last Name</label>
                <input type="text" placeholder="Your last name" className="bg-transparent border border-white/10 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-emerald-50 placeholder:text-emerald-50/20" />
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="flex flex-col gap-3">
              <label className="text-[10px] tracking-[0.15em] uppercase text-white/60 font-medium">Email Address</label>
              <input type="email" placeholder="your@email.com" className="bg-transparent border border-white/10 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-emerald-50 placeholder:text-emerald-50/20" />
            </motion.div>

            <motion.div variants={staggerItem} className="flex flex-col gap-3">
              <label className="text-[10px] tracking-[0.15em] uppercase text-white/60 font-medium">I'm Interested In</label>
              <div className="relative">
                <select className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-emerald-50/80 appearance-none">
                  <option className="bg-[#0a0014]">Select a service</option>
                  <option className="bg-[#0a0014]">Full-Stack Web Development</option>
                  <option className="bg-[#0a0014]">Systems Architecture</option>
                  <option className="bg-[#0a0014]">Agentic AI Integration</option>
                  <option className="bg-[#0a0014]">Technical Consultation</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="flex flex-col gap-3">
              <label className="text-[10px] tracking-[0.15em] uppercase text-white/60 font-medium">Tell Me About Your Vision</label>
              <textarea rows={5} placeholder="Describe the project, stack, or problem you want to solve..." className="bg-transparent border border-white/10 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-white placeholder:text-white/20 resize-none"></textarea>
            </motion.div>

            <motion.div variants={staggerItem} className="flex flex-col items-center mt-4">
              <button type="submit" className="liquid-glass rounded-full px-10 py-4 text-[10px] tracking-[0.2em] font-medium uppercase hover:bg-white/10 transition-all duration-300 flex items-center gap-2 mb-6 w-full md:w-auto justify-center border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] text-white/80 hover:text-white">
                Send My Request <ArrowUpRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-white/40 font-light">I'll reply within 24 hours to schedule a discovery call.</span>
            </motion.div>
          </form>
        </motion.div>

        {/* Footer Bottom Area */}
        <div className="w-full bg-[#05000a]/80 border-t border-white/5 py-20 px-4 sm:px-8 md:px-16 lg:px-24 rounded-t-[3rem] backdrop-blur-md">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16"
            >
              <motion.div variants={staggerItem} className="col-span-1 md:col-span-4 lg:col-span-4">
                <div className="flex items-center gap-3 mb-6">
                  <img src={eaLogo} alt="Egabo Aaron Logo" className="w-10 h-10 rounded-xl object-cover border border-white/10 shadow-lg" />
                  <h3 className="text-2xl font-heading italic text-white">Egabo Aaron</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-8 pr-4">
                  Pragmatic Software Engineer” crafting scalable solutions for businesses that deserve to feel extraordinary.
                </p>
                <div className="flex gap-4">
                  {/* GitHub */}
                  <a
                    href="https://github.com/EGABO-TECH"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="group w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#24292e] hover:border-[#24292e] transition-all duration-300 hover:shadow-[0_0_16px_rgba(36,41,46,0.6)]"
                  >
                    <GithubIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/in/egaboaaron"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="group w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-300 hover:shadow-[0_0_16px_rgba(0,119,181,0.5)]"
                  >
                    <LinkedinIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                  {/* X / Twitter */}
                  <a
                    href="https://x.com/WanEgabo"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X (Twitter)"
                    className="group w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#14171a] hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_16px_rgba(255,255,255,0.15)]"
                  >
                    <TwitterIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="col-span-1 md:col-span-2 lg:col-span-2">
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-8 font-medium">Navigate</h4>
                <ul className="flex flex-col gap-5 text-sm text-white/70 font-light">
                  <li><a href="#home" className="hover:text-emerald-400 transition-colors">Home</a></li>
                  <li><a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a></li>
                  <li><a href="#skills" className="hover:text-emerald-400 transition-colors">Technical Arsenal</a></li>
                  <li><a href="#github" className="hover:text-emerald-400 transition-colors">Open Source</a></li>
                </ul>
              </motion.div>

              <motion.div variants={staggerItem} className="col-span-1 md:col-span-3 lg:col-span-2">
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-8 font-medium">Services</h4>
                <ul className="flex flex-col gap-5 text-sm text-white/70 font-light">
                  <li>Full-Stack Web Dev</li>
                  <li>Systems Architecture</li>
                  <li>Agentic AI Integration</li>
                  <li>Technical Consultation</li>
                  <li>MVP Prototyping</li>
                </ul>
              </motion.div>

              <motion.div variants={staggerItem} className="col-span-1 md:col-span-3 lg:col-span-4 flex flex-col">
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-8 font-medium">Visit Me</h4>

                <div className="flex flex-col gap-6 text-sm text-white/70 font-light mb-8">
                  <div className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-white/30 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>Cavendish University Uganda<br />Kampala, Uganda<br />Opposite the American Embassy<br />Remote, Freelance and Global</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-white/30 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <a href="mailto:aaronegabo@gmail.com" className="hover:text-emerald-400 transition-colors">aaronegabo@gmail.com</a>
                  </div>
                </div>

                <div className="w-full rounded-xl overflow-hidden border border-white/10 opacity-80 hover:opacity-100 transition-all duration-500 relative group shadow-lg aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/9]">
                  <iframe
                    src="https://maps.google.com/maps?q=Cavendish%20University%20Uganda&t=m&z=15&output=embed&iwloc=near"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Cavendish University Uganda Map"
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>


            {/* ── Newsletter Strip ───────────────────────────────────────── */}
            <motion.div
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <BeehiivNewsletter />
            </motion.div>

            {/* ── Bottom copyright bar ───────────────────────────────────── */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 font-light">
              <div>© {new Date().getFullYear()} Egabo Aaron. All rights reserved.</div>
              <div className="flex gap-8">
                <button type="button" onClick={() => setActivePage('privacy')} className="text-left hover:text-white transition-colors">Privacy Policy</button>
                <button type="button" onClick={() => setActivePage('terms')} className="text-left hover:text-white transition-colors">Terms of Service</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
