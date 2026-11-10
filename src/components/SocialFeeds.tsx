import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Play, X } from 'lucide-react';
import youtubeLogo from '../assets/yinyangshadow-logo.svg';
import './SocialFeeds.css';

const YOUTUBE_CHANNEL_ID = 'UC5j2vAyKquVFx6dlHXngDvg';
const YOUTUBE_CHANNEL_LINK = 'https://www.youtube.com/@YinAndYangShadow';
const TOPICS = ['Dark psychology', 'Shadow work', 'Manipulation awareness', 'Self-mastery'];

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface Video {
  id: string;
  title: string;
  link: string;
  date: string;
  isShort: boolean;
}

const videoIdFrom = (link: string) =>
  link.match(/[?&]v=([\w-]{11})/)?.[1] ?? link.match(/(?:youtu\.be\/|shorts\/|embed\/)([\w-]{11})/)?.[1] ?? '';

const formatDate = (d: string) => {
  const date = new Date(d.replace(' ', 'T'));
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const thumb = (id: string, size: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'oar2') => `https://i.ytimg.com/vi/${id}/${size}.jpg`;

// ─── In-page player ────────────────────────────────────────────────────────
const PlayerModal = ({ video, onClose }: { video: Video; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="sf-player-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={video.title}>
      <div className={`sf-player ${video.isShort ? 'is-short' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="sf-player-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="sf-player-bar">
          <div className="min-w-0">
            <p className="sf-player-title">{video.title}</p>
            <p className="sf-player-date">{formatDate(video.date)}</p>
          </div>
          <div className="sf-player-actions">
            <a href={video.link} target="_blank" rel="noreferrer" className="sf-btn-ghost">
              YouTube <ArrowUpRight size={14} />
            </a>
            <button type="button" className="sf-icon-btn" onClick={onClose} aria-label="Close video">
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

// ─── Section ───────────────────────────────────────────────────────────────
const SocialFeeds = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState<Video | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`, { signal: controller.signal })
      .then(r => r.json())
      .then((data: { status?: string; items?: { title: string; link: string; pubDate: string }[] }) => {
        if (data.status !== 'ok' || !Array.isArray(data.items)) return;
        setVideos(
          data.items
            .map(i => ({ id: videoIdFrom(i.link), title: i.title, link: i.link, date: i.pubDate, isShort: i.link.includes('/shorts/') }))
            .filter(v => v.id)
            .slice(0, 4),
        );
      })
      .catch(() => { /* fall back to the channel card */ })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  const [featured, ...rest] = videos;
  const allShorts = videos.length > 0 && videos.every(v => v.isShort);

  return (
    <section id="content" className="sf-section relative z-10 py-32 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-white/5 overflow-hidden">
      <div className="sf-ambient" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-sm font-body text-gradient-emerald-gold font-semibold mb-4">// CONTENT CREATION AND EVENTS</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic leading-tight tracking-[-2px]">
            Ideas in Motion
          </h2>
          <p className="max-w-md text-sm leading-7 text-white/60 font-light">
            Away from the keyboard, I study how people think. On my channel I break down the psychology behind
            influence and behaviour, the same curiosity that shapes how I design for users.
          </p>
        </div>

        <div className="sf-grid">
          {/* Channel card */}
          <article className="sf-channel">
            <img src={youtubeLogo} alt="" aria-hidden="true" className="sf-channel-watermark" />

            <div className="sf-channel-head">
              <div className="sf-avatar">
                <img src={youtubeLogo} alt="YinAndYangShadow logo" />
              </div>
              <div className="min-w-0">
                <p className="sf-kicker"><YoutubeIcon className="w-3.5 h-3.5 text-[#ff3d3d]" /> YouTube channel</p>
                <h3 className="sf-channel-name">YinAndYangShadow</h3>
              </div>
            </div>

            <p className="sf-channel-desc">
              Dark psychology explained through short, sharp breakdowns of manipulation, shadow behaviour and mental
              influence. Every video shows how to spot the hidden patterns, protect your mind, and use psychological
              insight without losing your balance.
            </p>

            <div className="sf-topics">
              {TOPICS.map(t => <span key={t}>{t}</span>)}
            </div>

            <div className="sf-channel-actions">
              <a href={YOUTUBE_CHANNEL_LINK} target="_blank" rel="noreferrer" className="sf-btn-solid">
                <YoutubeIcon className="w-4 h-4 text-[#ff0033]" /> Watch on YouTube
              </a>
              <a href={`${YOUTUBE_CHANNEL_LINK}?sub_confirmation=1`} target="_blank" rel="noreferrer" className="sf-btn-ghost">
                Subscribe
              </a>
            </div>
          </article>

          {/* Videos */}
          <div className="sf-videos">
            {loading ? (
              <>
                <div className="sf-skeleton sf-featured-skeleton" />
                <div className="sf-list">
                  {[0, 1, 2].map(i => <div key={i} className="sf-skeleton sf-row-skeleton" />)}
                </div>
              </>
            ) : !featured ? (
              <div className="sf-empty">
                <YoutubeIcon className="w-10 h-10 text-white/20" />
                <p>New videos are on the way.</p>
                <a href={YOUTUBE_CHANNEL_LINK} target="_blank" rel="noreferrer" className="sf-btn-ghost">
                  Browse the channel <ArrowUpRight size={14} />
                </a>
              </div>
            ) : allShorts ? (
              <div className="sf-reel">
                {videos.map((v, i) => (
                  <button key={v.id} type="button" className="sf-short" onClick={() => setPlaying(v)} aria-label={`Play ${v.title}`}>
                    <img
                      src={thumb(v.id, 'oar2')}
                      onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = thumb(v.id, 'hqdefault'); }}
                      alt=""
                      loading="lazy"
                    />
                    <span className="sf-featured-shade" />
                    {i === 0 && <span className="sf-badge">Latest</span>}
                    <span className="sf-short-play"><Play size={16} fill="currentColor" /></span>
                    <span className="sf-short-text">
                      <span className="sf-short-title">{v.title}</span>
                      <span className="sf-featured-date">{formatDate(v.date)}</span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button type="button" className="sf-featured" onClick={() => setPlaying(featured)} aria-label={`Play ${featured.title}`}>
                  <img
                    src={thumb(featured.id, 'maxresdefault')}
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = thumb(featured.id, 'hqdefault'); }}
                    alt=""
                    loading="lazy"
                  />
                  <span className="sf-featured-shade" />
                  <span className="sf-badge">Latest upload</span>
                  <span className="sf-play"><Play size={22} fill="currentColor" /></span>
                  <span className="sf-featured-text">
                    <span className="sf-featured-title">{featured.title}</span>
                    <span className="sf-featured-date">{formatDate(featured.date)}</span>
                  </span>
                </button>

                {rest.length > 0 && (
                  <div className="sf-list">
                    {rest.map(v => (
                      <button key={v.id} type="button" className="sf-row" onClick={() => setPlaying(v)} aria-label={`Play ${v.title}`}>
                        <span className="sf-row-thumb">
                          <img src={thumb(v.id, 'mqdefault')} alt="" loading="lazy" />
                          <span className="sf-row-play"><Play size={14} fill="currentColor" /></span>
                        </span>
                        <span className="sf-row-text">
                          <span className="sf-row-title">{v.title}</span>
                          <span className="sf-row-date">{formatDate(v.date)}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {playing && <PlayerModal video={playing} onClose={() => setPlaying(null)} />}
    </section>
  );
};

export default SocialFeeds;
