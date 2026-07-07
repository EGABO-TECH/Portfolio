import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, GitFork, Star, Globe, BookOpen, User, Flame, Rocket } from 'lucide-react';

import SkillsGrid from './components/SkillsGrid';
import SocialFeeds from './components/SocialFeeds';
import HeroSection from './components/HeroSection';
import egaboPhoto from './assets/EGABO-AARON.jpeg';

// Abstract Background
const AbstractBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"></div>
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
    {/* Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
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

// ─── GitHub Repos Data ────────────────────────────────────────────────────────
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
  // ── Popular
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
    description: 'Agentic AI tourism ecosystem — autonomously plans, books, and coordinates travel. Integrates MiniPay blockchain payments and an AI Pilot for emerging markets.',
    language: 'TypeScript',
    stars: 2,
    url: 'https://github.com/EGABO-TECH/ExFlo',
    deployment: 'https://egabo-tech.github.io/ExFlo/',
    tags: ['Vite', 'LangChain', 'MiniPay', 'Blockchain'],
    category: 'Popular',
  },
  {
    name: 'KUA',
    description: 'Command center for hyper-efficient social marketing. Generate pixel-perfect flyers and broadcast across platforms instantly — no heavy frameworks.',
    language: 'HTML',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/KUA',
    deployment: 'https://egabo-tech.github.io/KUA/',
    tags: ['JavaScript', 'HTML5 Canvas', 'SPA', 'MarTech'],
    category: 'Popular',
  },
  {
    name: 'RITAH-STYLES',
    description: 'Digital presence website for Ritah Styles — a fashion & beauty brand. Clean, modern brand site with full Vercel deployment.',
    language: 'HTML',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/RITAH-STYLES',
    deployment: 'https://ritah-styles-ug.vercel.app',
    tags: ['HTML', 'CSS', 'Client Work', 'Fashion'],
    category: 'Popular',
  },
  // ── Personal
  {
    name: 'ACCOMMODATE-ME',
    description: 'Centralized housing platform connecting university students with verified, secure landlords in Uganda.',
    language: 'JavaScript',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/ACCOMMODATE-ME',
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
    description: 'Official digital infrastructure for the Ama-Tualu Foundation — empowering youth in West Nile, Uganda through digital literacy & mentorship.',
    language: 'HTML',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/AMA-TUALU-FOUNDATION',
    tags: ['Web', 'HTML/CSS', 'Nonprofit', 'Community'],
    category: 'Personal',
  },
  {
    name: 'EGABO-TECH (Profile)',
    description: 'GitHub profile README — "All about me." Personal developer brand and identity on GitHub.',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/EGABO-TECH',
    tags: ['Markdown', 'GitHub Profile'],
    category: 'Personal',
  },
  {
    name: 'odin-recipes',
    description: 'Final project for The Odin Project — HTML basics summarized in a recipe website. First steps into web development.',
    language: 'HTML',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/odin-recipes',
    deployment: 'https://egabo-tech.github.io/odin-recipes/',
    tags: ['HTML', 'The Odin Project', 'Beginner'],
    category: 'Personal',
  },
  // ── Study
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
    description: 'Week 1 assignment for Backend Development — BeTechified Africa Cohort. Node.js fundamentals and server architecture.',
    language: 'JavaScript',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/BD-WEEK1',
    tags: ['JavaScript', 'Node.js', 'BeTechified Africa'],
    category: 'Study',
  },
  {
    name: 'BD-WEEK2',
    description: 'Week 2 assignment for Backend Development — BeTechified Africa Cohort. REST APIs and database integration.',
    language: 'JavaScript',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/BD-WEEK2',
    tags: ['JavaScript', 'REST API', 'BeTechified Africa'],
    category: 'Study',
  },
  {
    name: 'Simple-C-Calculator',
    description: 'First C project — a basic arithmetic calculator to practice control flow, switch statements, and user input handling in C.',
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
  // ── Forks
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
    description: "Garry Tan's exact Claude Code setup — 23 opinionated tools serving as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA.",
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
    description: 'Odoo — Open Source Apps To Grow Your Business. Full ERP platform forked for business automation study.',
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
    description: 'Free, open source Cluely alternative for technical interviews — DSA, OAs, CP. Invisible overlay with real-time AI help.',
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
  // ── Not Started
  {
    name: 'RENOA',
    description: 'Startup venture — RENOA. Co-Founder & Technical Lead. Full platform coming soon.',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/RENOA',
    tags: ['Startup', 'In Progress', 'Coming Soon'],
    category: 'Not Started',
  },
  {
    name: 'MAMA-IANS-SHOP',
    description: 'Local e-commerce / shop website — initialized but work not yet begun.',
    stars: 0,
    url: 'https://github.com/EGABO-TECH/MAMA-IANS-SHOP',
    tags: ['E-Commerce', 'Local Business', 'Coming Soon'],
    category: 'Not Started',
  },
];

const CATEGORY_CONFIG: Record<RepoCategory, { label: string; icon: React.ReactNode; color: string; accent: string }> = {
  Popular: { label: 'Popular', icon: <Flame className="w-3.5 h-3.5" />, color: 'text-orange-400', accent: 'bg-orange-400/10 border-orange-400/20' },
  Personal: { label: 'Personal', icon: <User className="w-3.5 h-3.5" />, color: 'text-blue-400', accent: 'bg-blue-400/10 border-blue-400/20' },
  Study: { label: 'Study', icon: <BookOpen className="w-3.5 h-3.5" />, color: 'text-emerald-400', accent: 'bg-emerald-400/10 border-emerald-400/20' },
  Fork: { label: 'Forks', icon: <GitFork className="w-3.5 h-3.5" />, color: 'text-purple-400', accent: 'bg-purple-400/10 border-purple-400/20' },
  'Not Started': { label: 'Not Started', icon: <Rocket className="w-3.5 h-3.5" />, color: 'text-white/40', accent: 'bg-white/5 border-white/10' },
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  HTML: '#e34c26',
  Rust: '#dea584',
  C: '#555555',
};

// ─── GitHub Section Component ─────────────────────────────────────────────────
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
    <section id="github" className="relative z-10 py-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="text-sm font-body text-blue-400 mb-4">// GITHUB REPOSITORIES</div>
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

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {(Object.keys(CATEGORY_CONFIG) as RepoCategory[]).map(cat => {
            const cfg = CATEGORY_CONFIG[cat];
            return (
              <div key={cat} className={`liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-xs border ${cfg.accent}`}>
                <span className={cfg.color}>{cfg.icon}</span>
                <span className="text-white/60">{cfg.label}</span>
                <span className={`font-semibold ${cfg.color}`}>{counts[cat]}</span>
              </div>
            );
          })}
          <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-xs border border-white/10">
            <Star className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-white/60">Starred</span>
            <span className="font-semibold text-yellow-400">38</span>
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
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem] ${repo.category === 'Popular' ? 'bg-gradient-to-br from-orange-500/5 to-transparent' :
                    repo.category === 'Personal' ? 'bg-gradient-to-br from-blue-500/5 to-transparent' :
                      repo.category === 'Study' ? 'bg-gradient-to-br from-emerald-500/5 to-transparent' :
                        repo.category === 'Fork' ? 'bg-gradient-to-br from-purple-500/5 to-transparent' :
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
  return (
    <div className="relative w-full min-h-screen bg-black font-body text-white selection:bg-blue-500/30">
      <AbstractBackground />

      {/* ── New Hero Section (includes its own self-contained navbar) ── */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="relative z-10 py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/3 relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden liquid-glass-strong p-2">
              <img src={egaboPhoto} alt="Egabo Aaron" className="w-full h-full object-cover rounded-[1.5rem]" />
            </div>
            <div className="absolute -bottom-6 -right-6 liquid-glass p-6 rounded-[1.5rem] w-48">
              <div className="text-3xl font-heading italic">RENOA</div>
              <div className="text-xs text-white/70 mt-1">Co-Founder & Technical Project Manager</div>
            </div>
          </motion.div>

          <div className="w-full md:w-2/3">
            <div className="text-sm font-body text-blue-400 mb-4">// MY MISSION</div>
            <h2 className="text-4xl md:text-5xl font-heading italic leading-tight tracking-[-1px] mb-8">
              "Tech, Innovation and Curiosity all curated in my pragmatic mind."
            </h2>
            <div className="space-y-6 text-white/80 font-light text-lg leading-relaxed">
              <p>
                I spend most of my time learning and writing clean backend code whilst designing simple, clear layouts. I focus on building reliable software that stays up and running even when the internet or servers slow down.
              </p>
              <p>
                Beyond code, I am a passionate advocate for community development and solving community problems in compliance with the SDGs. My interests in philosophy, psychology, and history inform how I think about user needs and product design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-32 px-8 md:px-16 lg:px-24 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm font-body text-blue-400 mb-4">// FLAGSHIP PROJECTS</div>
          <h2 className="text-5xl md:text-6xl font-heading italic leading-tight tracking-[-2px] mb-16">
            Engineering for Impact
          </h2>

          <div className="space-y-24">
            {/* ESMS */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              <div className="w-full lg:w-1/2 order-2 lg:order-1">
                <div className="liquid-glass rounded-full inline-flex px-4 py-1.5 text-xs font-medium mb-6">EdTech • Enterprise System</div>
                <h3 className="text-4xl font-heading italic mb-4">ESMS</h3>
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  The definitive digital infrastructure for modern higher education in Uganda. A 4-layer decoupled architecture featuring multi-tenant RBAC, NCHE regulatory compliance, and native Ugandan Shilling financial workflows with local bank APIs (MTN MoMo, Airtel Money).
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['TypeScript', 'Next.js 14', 'Supabase', 'TailwindCSS'].map(tech => (
                    <span key={tech} className="liquid-glass px-3 py-1 rounded-full text-xs">{tech}</span>
                  ))}
                </div>
                <a href="https://esms-beta.vercel.app" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-blue-400 transition-colors">
                  View Live Platform <ArrowUpRight className="w-4 h-4" />
                </a>
                <a href="https://github.com/EGABO-TECH/ESMS" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white/80 transition-colors ml-6">
                  Source <GithubIcon className="w-4 h-4" />
                </a>
              </div>
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <div className="aspect-[16/10] liquid-glass-strong rounded-[2rem] p-4 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h4 className="text-5xl font-heading italic text-white/20 select-none">ESMS Architecture</h4>
                </div>
              </div>
            </motion.div>

            {/* MedSwift */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              <div className="w-full lg:w-1/2">
                <div className="aspect-[16/10] liquid-glass-strong rounded-[2rem] p-4 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h4 className="text-5xl font-heading italic text-white/20 select-none">MedSwift Vision</h4>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="liquid-glass rounded-full inline-flex px-4 py-1.5 text-xs font-medium mb-6">HealthTech • Multimodal AI PWA</div>
                <h3 className="text-4xl font-heading italic mb-4">MedSwift</h3>
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  Pharmaceutical intelligence engine turning a mobile camera into a medical auditing tool. Features a triple-tier AI resilience pipeline (Gemini 2.0 Flash → Gemini 1.5 Pro → Claude fallback) and an offline-first PWA architecture for low-connectivity environments.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Vanilla JS', 'PWA', 'Gemini AI', 'OCR.space'].map(tech => (
                    <span key={tech} className="liquid-glass px-3 py-1 rounded-full text-xs">{tech}</span>
                  ))}
                </div>
                <a href="https://med-swift-six.vercel.app" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-emerald-400 transition-colors">
                  View Live App <ArrowUpRight className="w-4 h-4" />
                </a>
                <a href="https://github.com/EGABO-TECH/MedSwift" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white/80 transition-colors ml-6">
                  Source <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* ExFlo */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              <div className="w-full lg:w-1/2 order-2 lg:order-1">
                <div className="liquid-glass rounded-full inline-flex px-4 py-1.5 text-xs font-medium mb-6">TravelTech • Agentic AI</div>
                <h3 className="text-4xl font-heading italic mb-4">ExFlo</h3>
                <p className="text-white/70 font-light leading-relaxed mb-6">
                  A revolutionary autonomous orchestration layer for the global tourism industry. Replaces static search with an AI Pilot that plans, books, and coordinates journeys with real-time monitoring and native blockchain/cryptocurrency payments.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Vite', 'LangChain', 'MiniPay', 'Blockchain'].map(tech => (
                    <span key={tech} className="liquid-glass px-3 py-1 rounded-full text-xs">{tech}</span>
                  ))}
                </div>
                <a href="https://github.com/EGABO-TECH/ExFlo" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-purple-400 transition-colors">
                  View Source <GithubIcon className="w-4 h-4" />
                </a>
              </div>
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <div className="aspect-[16/10] liquid-glass-strong rounded-[2rem] p-4 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h4 className="text-5xl font-heading italic text-white/20 select-none">ExFlo Orchestration</h4>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Other Notable Projects */}
          <div className="mt-32">
            <div className="text-sm font-body text-blue-400 mb-8">// OTHER NOTABLE WORK</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* KUA */}
              <motion.a
                href="https://github.com/EGABO-TECH/KUA"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
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

              {/* ACCOMMODATE-ME */}
              <motion.a
                href="https://github.com/EGABO-TECH/ACCOMMODATE-ME"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="liquid-glass rounded-[1.5rem] p-6 flex flex-col group hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="liquid-glass rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider">Civic Tech</div>
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-2xl font-heading italic mb-2">Accommodate-Me</h4>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-6 flex-1">
                  Centralized housing platform connecting university students with verified, secure landlords in Uganda.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['Full-Stack', 'PostgreSQL', 'Web'].map(tech => (
                    <span key={tech} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] text-white/70">{tech}</span>
                  ))}
                </div>
              </motion.a>

              {/* Resume Builder */}
              <motion.a
                href="https://github.com/EGABO-TECH/Resume-Builder"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
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
                href="https://github.com/EGABO-TECH/AMA-TUALU-FOUNDATION"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
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
                href="https://github.com/EGABO-TECH/Simple-C-Calculator"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
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
                href="https://github.com/EGABO-TECH/RUST-COHORT-2"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.6 }}
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

            </div>
          </div>
        </div>
      </section>

      {/* GitHub Repositories Section */}
      <GitHubSection />

      {/* Skills Section */}
      <SkillsGrid />

      {/* Social Feeds Section */}
      <SocialFeeds />

      {/* Footer / Newsletter */}
      <section id="contact" className="relative z-10 py-24 px-8 md:px-16 lg:px-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-heading italic mb-4">The Intellectual Curiosities</h2>
            <p className="text-white/60 text-sm mb-8 max-w-md">
              Join my newsletter to receive curated thoughts on software engineering, philosophy, history, and how they intersect to build better products for Africa.
            </p>
            <form className="flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="email@example.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                required
              />
              <button type="submit" className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors">
                Subscribe
              </button>
            </form>
          </div>

          <div className="w-full md:w-1/2 flex flex-col md:items-end text-left md:text-right">
            <div className="text-2xl font-heading italic mb-6">Let's Build Something</div>
            <a href="mailto:aaronegabo@gmail.com" className="text-lg text-white/80 hover:text-white mb-8 inline-block transition-colors border-b border-transparent hover:border-white">
              aaronegabo@gmail.com
            </a>
            <div className="flex gap-6">
              <a href="https://github.com/EGABO-TECH" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm">
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
              <a href="https://linkedin.com/in/egaboaaron" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm">
                <LinkedinIcon className="w-4 h-4" /> LinkedIn
              </a>
              <a href="https://x.com/WanEgabo" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm">
                <TwitterIcon className="w-4 h-4" /> X (Twitter)
              </a>
            </div>
          </div>
        </div>
        <div className="mt-24 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Egabo Aaron. All rights reserved.
        </div>
      </section>
    </div>
  );
}

export default App;
