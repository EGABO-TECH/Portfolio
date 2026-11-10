import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowUpRight, ChevronLeft, ChevronRight, Monitor, RotateCw, ShieldAlert, Smartphone, X,
} from 'lucide-react';
import { FLAGSHIP_PROJECTS, type FlagshipProject } from '../data/projects';
import './FlagshipProjects.css';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const displayUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

// ─── Card ──────────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, onOpen }: { project: FlagshipProject; index: number; onOpen: () => void }) => (
  <button type="button" onClick={onOpen} className="fp-card group" aria-label={`Open live preview of ${project.name}`}>
    <div className="fp-card-frame">
      <div className="fp-chrome">
        <span className="fp-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="fp-chrome-url">{displayUrl(project.liveUrl)}</span>
      </div>
      <div className="fp-card-shot" style={{ background: project.imageBg ?? '#0b1220' }}>
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          loading="lazy"
          className={project.imageFit === 'contain' ? 'is-contain' : ''}
        />
        <span className="fp-card-cta">
          <span className="fp-live-dot" aria-hidden="true" /> Tap for live preview
        </span>
      </div>
    </div>

    <div className="fp-card-body">
      <div className="fp-card-meta">
        <span className="fp-card-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="fp-card-category">{project.category}</span>
      </div>
      <h3 className="fp-card-title">{project.name}</h3>
      <p className="fp-card-hook">{project.hook}</p>
      <div className="fp-card-stack">
        {project.stack.slice(0, 4).map(t => <span key={t}>{t}</span>)}
      </div>
    </div>
  </button>
);

// ─── Live preview modal ────────────────────────────────────────────────────
const LivePreview = ({
  project, onClose, onPrev, onNext,
}: { project: FlagshipProject; onClose: () => void; onPrev: () => void; onNext: () => void }) => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [reloadKey, setReloadKey] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const src = project.previewUrl ?? project.liveUrl;

  // Reset loading state whenever the project or reload changes
  useEffect(() => { setLoaded(false); }, [project.id, reloadKey]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onNext, onPrev]);

  return createPortal(
    <div className="fp-overlay" onClick={onClose}>
      <div
        className="fp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fp-modal-title"
        onClick={e => e.stopPropagation()}
      >
        {/* Browser area */}
        <div className="fp-browser">
          <div className="fp-browser-bar">
            <span className="fp-dots" aria-hidden="true"><i /><i /><i /></span>
            <div className="fp-browser-url" title={src}>
              <span className="fp-lock" aria-hidden="true">●</span>
              {displayUrl(src)}
            </div>
            <div className="fp-browser-tools">
              {project.embeddable && (
                <>
                  <button
                    type="button"
                    className={`fp-tool ${device === 'desktop' ? 'is-active' : ''}`}
                    onClick={() => setDevice('desktop')}
                    aria-label="Desktop view"
                    aria-pressed={device === 'desktop'}
                  >
                    <Monitor size={15} />
                  </button>
                  <button
                    type="button"
                    className={`fp-tool ${device === 'mobile' ? 'is-active' : ''}`}
                    onClick={() => setDevice('mobile')}
                    aria-label="Mobile view"
                    aria-pressed={device === 'mobile'}
                  >
                    <Smartphone size={15} />
                  </button>
                  <button type="button" className="fp-tool" onClick={() => setReloadKey(k => k + 1)} aria-label="Reload preview">
                    <RotateCw size={15} />
                  </button>
                </>
              )}
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="fp-tool" aria-label="Open live site in a new tab">
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className={`fp-viewport ${device === 'mobile' ? 'is-mobile' : ''}`}>
            {project.embeddable ? (
              <div className="fp-frame-wrap">
                {!loaded && (
                  <div className="fp-loading" aria-hidden="true">
                    <img src={project.image} alt="" />
                    <span className="fp-spinner" />
                  </div>
                )}
                <iframe
                  key={`${project.id}-${reloadKey}`}
                  src={src}
                  title={`${project.name} live preview`}
                  onLoad={() => setLoaded(true)}
                  allow="clipboard-write; fullscreen"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            ) : (
              <div className="fp-blocked">
                <img src={project.image} alt={`${project.name} screenshot`} />
                <div className="fp-blocked-card">
                  <ShieldAlert size={20} />
                  <p>
                    <strong>{project.name}</strong> refuses to load inside other websites. That is a deliberate
                    security setting, because it handles clinical data. Open it in its own tab to try it live.
                  </p>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="fp-btn-solid">
                    Open live app <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Story panel */}
        <aside className="fp-panel">
          <div className="fp-panel-top">
            <span className="fp-panel-category">{project.category}</span>
            <button type="button" className="fp-icon-btn" onClick={onClose} aria-label="Close preview">
              <X size={18} />
            </button>
          </div>

          <h3 id="fp-modal-title" className="fp-panel-title">{project.name}</h3>

          <div className="fp-panel-scroll">
            <p className="fp-panel-label">Why I built it</p>
            <p className="fp-panel-why">{project.why}</p>

            <p className="fp-panel-label">What it proves</p>
            <ul className="fp-panel-list">
              {project.highlights.map(h => <li key={h}>{h}</li>)}
            </ul>

            <p className="fp-panel-label">Built with</p>
            <div className="fp-card-stack">
              {project.stack.map(t => <span key={t}>{t}</span>)}
            </div>
          </div>

          <div className="fp-panel-actions">
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="fp-btn-solid">
              Visit live site <ArrowUpRight size={14} />
            </a>
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="fp-btn-ghost">
              <GithubIcon className="w-3.5 h-3.5" /> Source
            </a>
          </div>

          <div className="fp-panel-nav">
            <button type="button" onClick={onPrev} className="fp-nav-btn" aria-label="Previous project">
              <ChevronLeft size={16} /> Prev
            </button>
            <button type="button" onClick={onNext} className="fp-nav-btn" aria-label="Next project">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </aside>
      </div>
    </div>,
    document.body,
  );
};

// ─── Section ───────────────────────────────────────────────────────────────
const FlagshipProjects = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const total = FLAGSHIP_PROJECTS.length;

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => setOpenIndex(i => (i === null ? i : (i + 1) % total)), [total]);
  const prev = useCallback(() => setOpenIndex(i => (i === null ? i : (i - 1 + total) % total)), [total]);

  // Deep link: /#project-e-vote opens that project's live preview on load
  useEffect(() => {
    const match = window.location.hash.match(/^#project-(.+)$/);
    if (!match) return;
    const i = FLAGSHIP_PROJECTS.findIndex(p => p.id === decodeURIComponent(match[1]));
    if (i >= 0) setOpenIndex(i);
  }, []);

  return (
    <section id="projects" className="relative z-10 py-32 px-4 sm:px-8 md:px-16 lg:px-24 bg-[#020818]/50 overflow-hidden">
      <div className="absolute top-0 right-[10%] w-96 h-96 bg-emerald-600/6 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 left-[5%] w-80 h-80 bg-amber-500/6 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-sm font-body text-gradient-emerald-gold font-semibold mb-4">// FLAGSHIP PROJECTS</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic leading-tight tracking-[-2px]">
            Engineering for Impact
          </h2>
          <p className="max-w-md text-sm leading-7 text-white/60 font-light">
            Every project here started with a problem I saw around me. Tap any one to use the live product right
            here and read why I built it.
          </p>
        </div>

        <div className="fp-grid">
          {FLAGSHIP_PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <LivePreview project={FLAGSHIP_PROJECTS[openIndex]} onClose={close} onNext={next} onPrev={prev} />
      )}
    </section>
  );
};

export default FlagshipProjects;
