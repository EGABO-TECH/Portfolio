import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, BadgeCheck, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { CERTIFICATES, type Certificate } from '../data/certificates';
import './CertificatesShelf.css';

// Hardback spine colours, used when a certificate doesn't set its own.
const SPINE_COLORS = ['#14532d', '#7f1d1d', '#1e3a5f', '#0f172a', '#b45309', '#3f2a56', '#134e4a', '#e7dcc4'];

/** Pale spines need dark text. */
const isLight = (hex: string) => {
  const h = hex.replace('#', '');
  if (h.length !== 6) return false;
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
};

const yearOf = (date: string) => date.match(/\d{4}/)?.[0] ?? date;

// ─── One 3D book ───────────────────────────────────────────────────────────
const Book = ({
  cert, index, active, onSelect,
}: { cert: Certificate; index: number; active: boolean; onSelect: () => void }) => {
  const color = cert.color ?? SPINE_COLORS[index % SPINE_COLORS.length];
  const style = { '--spine': color, '--ink': isLight(color) ? '#1c1917' : '#f5efe2' } as CSSProperties;

  return (
    <button
      type="button"
      className={`cs-slot ${active ? 'is-active' : ''}`}
      style={style}
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`${cert.title}, ${cert.issuer}`}
      data-index={index}
    >
      <span className="cs-book">
        {/* Cover */}
        <span className="cs-face cs-cover">
          <span className="cs-cover-kicker">{cert.issuer}</span>
          <span className="cs-cover-title">{cert.title}</span>
          <span className="cs-cover-rule" />
          <span className="cs-cover-foot">Certificate · {yearOf(cert.date)}</span>
        </span>
        {/* Spine */}
        <span className="cs-face cs-spine">
          <span className="cs-spine-title">{cert.title}</span>
          <span className="cs-spine-issuer">{cert.issuer}</span>
        </span>
        {/* Page block and back */}
        <span className="cs-face cs-pages" />
        <span className="cs-face cs-back" />
      </span>
    </button>
  );
};

// ─── Full-size certificate viewer ──────────────────────────────────────────
const Lightbox = ({ cert, onClose }: { cert: Certificate; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="cs-lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={cert.title}>
      <button type="button" className="cs-icon-btn cs-lightbox-close" onClick={onClose} aria-label="Close">
        <X size={18} />
      </button>
      <img src={cert.image} alt={`${cert.title} certificate`} onClick={e => e.stopPropagation()} />
    </div>,
    document.body,
  );
};

// ─── Section ───────────────────────────────────────────────────────────────
const CertificatesShelf = () => {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const shelfRef = useRef<HTMLDivElement>(null);
  const count = CERTIFICATES.length;
  const current = CERTIFICATES[active];

  // Keep the open book in view while browsing
  useEffect(() => {
    const shelf = shelfRef.current;
    const slot = shelf?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    if (!shelf || !slot) return;
    const t = window.setTimeout(() => {
      const left = slot.offsetLeft - shelf.clientWidth / 2 + slot.offsetWidth / 2;
      shelf.scrollTo({ left, behavior: 'smooth' });
    }, 120);
    return () => window.clearTimeout(t);
  }, [active]);

  const go = (delta: number) => count && setActive(i => (i + delta + count) % count);

  const onShelfKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  return (
    <section id="certificates" className="relative z-10 py-32 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-sm font-body text-gradient-emerald-gold font-semibold mb-4">// CERTIFICATES</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic leading-tight tracking-[-2px]">
            The Learning Shelf
          </h2>
          <p className="max-w-md text-sm leading-7 text-white/60 font-light">
            {count
              ? 'Each book is a certificate I earned. Pull one off the shelf to see it and read what it taught me.'
              : 'Certificates are being added to the shelf. Check back soon.'}
          </p>
        </div>

        <div className="cs-stage">
          <div className="cs-glow" aria-hidden="true" />

          {count > 0 ? (
            <div
              ref={shelfRef}
              className="cs-shelf"
              tabIndex={0}
              onKeyDown={onShelfKey}
              aria-label="Certificate bookshelf. Use the left and right arrow keys to browse."
            >
              {CERTIFICATES.map((c, i) => (
                <Book key={c.id} cert={c} index={i} active={i === active} onSelect={() => setActive(i)} />
              ))}
            </div>
          ) : (
            <div className="cs-shelf is-empty" aria-hidden="true">
              {SPINE_COLORS.slice(0, 7).map(c => (
                <span key={c} className="cs-slot is-ghost" style={{ '--spine': c } as CSSProperties}>
                  <span className="cs-book"><span className="cs-face cs-spine" /></span>
                </span>
              ))}
            </div>
          )}

          <div className="cs-plank" aria-hidden="true" />
        </div>

        {current && (
          <div className="cs-detail" aria-live="polite">
            <button type="button" className="cs-detail-image" onClick={() => setZoomed(true)} aria-label={`View ${current.title} full size`}>
              <img src={current.image} alt={`${current.title} certificate`} loading="lazy" />
              <span className="cs-zoom"><Expand size={14} /> View full size</span>
            </button>

            <div className="cs-detail-text">
              <div className="cs-detail-meta">
                <BadgeCheck size={15} /> {current.issuer} · {current.date}
              </div>
              <h3 className="cs-detail-title">{current.title}</h3>
              <p className="cs-detail-desc">{current.description}</p>
              {current.skills && current.skills.length > 0 && (
                <div className="cs-detail-skills">
                  {current.skills.map(s => <span key={s}>{s}</span>)}
                </div>
              )}

              <div className="cs-detail-actions">
                {current.credentialUrl && (
                  <a href={current.credentialUrl} target="_blank" rel="noreferrer" className="cs-btn-solid">
                    Verify credential <ArrowUpRight size={14} />
                  </a>
                )}
                <div className="cs-pager">
                  <button type="button" className="cs-icon-btn" onClick={() => go(-1)} aria-label="Previous certificate">
                    <ChevronLeft size={18} />
                  </button>
                  <span>{active + 1} / {count}</span>
                  <button type="button" className="cs-icon-btn" onClick={() => go(1)} aria-label="Next certificate">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {zoomed && current && <Lightbox cert={current} onClose={() => setZoomed(false)} />}
    </section>
  );
};

export default CertificatesShelf;
