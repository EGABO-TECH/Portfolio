import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, PlayCircle, Loader2 } from 'lucide-react';
import youtubeLogo from '../assets/yinyangshadow-logo.svg';

// YouTube icon
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface YouTubeVideo {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
}

type Platform = 'YouTube';

const SocialFeeds = () => {
  const [activeTab] = useState<Platform>('YouTube');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const YOUTUBE_CHANNEL_ID = 'UC5j2vAyKquVFx6dlHXngDvg';
  const YOUTUBE_CHANNEL_LINK = 'https://www.youtube.com/@YinAndYangShadow';

  useEffect(() => {
    const fetchYouTubeFeed = async () => {
      setLoading(true);
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'ok' && Array.isArray(data.items)) {
          setVideos(data.items.slice(0, 3));
        } else {
          console.warn('YouTube feed did not return valid data. Fallback channel card will be shown.');
          setVideos([]);
        }
      } catch (error) {
        console.error('Error fetching YouTube feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchYouTubeFeed();
  }, []);

  return (
    <section id="content" className="relative z-10 py-32 px-8 md:px-16 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="text-sm font-body text-gradient-emerald-gold font-semibold mb-4">// CONTENT CREATION AND EVENTS</div>
          <h2 className="text-5xl md:text-6xl font-heading italic leading-tight tracking-[-2px] mb-8">
            Ideas in Motion
          </h2>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            
            {/* YOUTUBE FEED */}
            {activeTab === 'YouTube' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-heading italic text-white/90">Latest from YinAndYangShadow</h3>
                  <a href={YOUTUBE_CHANNEL_LINK} target="_blank" rel="noreferrer" className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1">
                    Visit Channel <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="grid gap-6">
                  <div className="flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/85 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-3xl border border-amber-400/25 bg-slate-950/80 p-2 shadow-[0_15px_40px_rgba(250,204,21,0.08)]">
                        <img src={youtubeLogo} alt="YinAndYangShadow logo" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-amber-300/90">YinAndYangShadow</p>
                        <p className="mt-1 text-base font-semibold text-white">Dark psychology insights, shadow analysis, and manipulation awareness.</p>
                      </div>
                    </div>
                    <a href={YOUTUBE_CHANNEL_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/20">
                      Visit Channel
                    </a>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-sm text-slate-200/85 leading-7">
                    <p className="mb-2 font-semibold text-white">YinAndYangShadow</p>
                    <p>
                      Dark psychology explained through short, sharp breakdowns of manipulation, shadow behavior, and mental influence.
                      Every video shows how to see the hidden patterns, protect your mind, and use psychological insight without losing your balance.
                    </p>
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center h-64 liquid-glass rounded-[2rem]">
                    <Loader2 className="w-8 h-8 text-red-400 animate-spin" />
                  </div>
                ) : videos.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 liquid-glass rounded-[2rem] text-center px-8">
                    <YoutubeIcon className="w-12 h-12 text-amber-400/30 mb-4" />
                    <p className="text-white/50 text-sm">No videos found. Visit the channel directly.</p>
                    <a href={YOUTUBE_CHANNEL_LINK} target="_blank" rel="noreferrer" className="mt-4 text-amber-400 text-sm hover:text-amber-300 flex items-center gap-1">Visit Channel <ExternalLink className="w-3.5 h-3.5" /></a>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                      <a 
                        key={index} 
                        href={video.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group liquid-glass rounded-[1.5rem] overflow-hidden flex flex-col hover:border-amber-500/30 transition-colors"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <PlayCircle className="w-12 h-12 text-white" />
                          </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h4 className="font-medium text-white/90 line-clamp-2 mb-2 leading-snug">{video.title}</h4>
                          <span className="text-xs text-white/40 mt-auto">
                            {new Date(video.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}


          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SocialFeeds;
