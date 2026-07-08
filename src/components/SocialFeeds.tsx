import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, PlayCircle, Loader2 } from 'lucide-react';

// YouTube icon
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// TikTok Icon SVG
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-2.61.94-5.22 3.02-6.73 1.63-1.19 3.8-1.57 5.71-1.07v4.06c-1.12-.33-2.42-.3-3.43.34-1.25.75-1.92 2.27-1.72 3.73.19 1.48 1.25 2.77 2.66 3.18 1.47.45 3.13.2 4.29-.83 1.12-1.02 1.62-2.58 1.6-4.13.01-4.99-.02-9.98.02-14.96-.02-.27.02-.54 0-.8z" />
  </svg>
);

// LinkedIn Icon SVG
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

interface YouTubeVideo {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
}

type Platform = 'YouTube' | 'TikTok' | 'LinkedIn';

const SocialFeeds = () => {
  const [activeTab, setActiveTab] = useState<Platform>('YouTube');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // YouTube Channel ID (Replace with your actual ID, e.g., UC...)
  // Since we don't have the exact ID for YinandYangShadow yet, we use a fallback fetch strategy.
  const YOUTUBE_CHANNEL_ID = 'UC_x5XG1OV2P6uZZ5FSM9Ttw'; // Placeholder Google Developers ID for demo. Please replace!

  useEffect(() => {
    const fetchYouTubeFeed = async () => {
      setLoading(true);
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 'ok') {
          setVideos(data.items.slice(0, 3));
        } else {
          // Fallback mock data if API fails or ID is wrong
          setVideos([
            {
              title: "Welcome to YinandYangShadow",
              link: "https://youtube.com/@YinandYangShadow",
              pubDate: new Date().toISOString(),
              thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop"
            },
            {
              title: "Latest Content Update",
              link: "https://youtube.com/@YinandYangShadow",
              pubDate: new Date().toISOString(),
              thumbnail: "https://images.unsplash.com/photo-1540656247947-f5c71d6006f1?q=80&w=600&auto=format&fit=crop"
            }
          ]);
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

        {/* Platform Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {[
            { id: 'YouTube' as const, icon: <YoutubeIcon className="w-4 h-4" />, color: 'hover:text-amber-500', activeClass: 'border-amber-500/30 text-amber-400 bg-amber-500/10' },
            { id: 'TikTok' as const, icon: <TikTokIcon className="w-4 h-4" />, color: 'hover:text-emerald-400', activeClass: 'border-emerald-400/30 text-emerald-400 bg-emerald-400/10' },
            { id: 'LinkedIn' as const, icon: <LinkedinIcon className="w-4 h-4" />, color: 'hover:text-teal-400', activeClass: 'border-teal-400/30 text-teal-400 bg-teal-400/10' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`liquid-glass rounded-full px-6 py-3 flex items-center gap-2 text-sm font-medium transition-all duration-300 border border-transparent ${
                activeTab === tab.id ? tab.activeClass : `text-white/60 ${tab.color}`
              }`}
            >
              {tab.icon} {tab.id}
            </button>
          ))}
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
                  <h3 className="text-2xl font-heading italic text-white/90">Latest from YinandYangShadow</h3>
                  <a href="https://www.youtube.com/@YinandYangShadow" target="_blank" rel="noreferrer" className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1">
                    Subscribe <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center h-64 liquid-glass rounded-[2rem]">
                    <Loader2 className="w-8 h-8 text-red-400 animate-spin" />
                  </div>
                ) : videos.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 liquid-glass rounded-[2rem] text-center px-8">
                    <YoutubeIcon className="w-12 h-12 text-amber-400/30 mb-4" />
                    <p className="text-white/50 text-sm">No videos found. Visit the channel directly.</p>
                    <a href="https://www.youtube.com/@YinandYangShadow" target="_blank" rel="noreferrer" className="mt-4 text-amber-400 text-sm hover:text-amber-300 flex items-center gap-1">Visit Channel <ExternalLink className="w-3.5 h-3.5" /></a>
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

            {/* TIKTOK FEED */}
            {activeTab === 'TikTok' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-heading italic text-white/90">TikTok Vibes</h3>
                  <a href="https://www.tiktok.com/@EGABO" target="_blank" rel="noreferrer" className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                    Follow @EGABO <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="liquid-glass-strong rounded-[2rem] p-8 flex flex-col justify-center items-center text-center">
                    <TikTokIcon className="w-16 h-16 text-emerald-400/20 mb-6" />
                    <h4 className="text-xl font-medium mb-3">Auto-Updating Grid Support</h4>
                    <p className="text-sm text-white/60 mb-6 max-w-sm">
                      To display an auto-updating grid of your TikTok videos without a backend, we recommend embedding a free widget like Elfsight or Tagembed here.
                    </p>
                    <a href="https://elfsight.com/tiktok-feed-widget/" target="_blank" rel="noreferrer" className="text-xs px-4 py-2 liquid-glass rounded-full hover:bg-white/10 transition-colors">
                      Get Embed Code
                    </a>
                  </div>
                  
                  {/* Stylized Profile Card Placeholder */}
                  <div className="liquid-glass rounded-[2rem] overflow-hidden relative group cursor-pointer" onClick={() => window.open('https://www.tiktok.com/@EGABO', '_blank')}>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
                    <div className="p-8 h-full flex flex-col items-center justify-center relative z-10">
                       <div className="w-24 h-24 rounded-full liquid-glass flex items-center justify-center mb-4 border border-emerald-400/30">
                          <span className="font-heading italic text-3xl">ea</span>
                       </div>
                       <h4 className="text-2xl font-bold">@EGABO</h4>
                       <p className="text-white/50 mt-2 text-sm">Tech, Innovation & Philosophy</p>
                       <div className="mt-6 flex gap-4 text-sm font-medium">
                          <span className="text-emerald-400">View on TikTok &rarr;</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LINKEDIN FEED */}
            {activeTab === 'LinkedIn' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-heading italic text-white/90">Professional Network</h3>
                  <a href="https://linkedin.com/in/egaboaaron" target="_blank" rel="noreferrer" className="text-sm text-teal-400 hover:text-teal-300 flex items-center gap-1">
                    Connect <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="liquid-glass-strong rounded-[2rem] p-8 flex flex-col justify-center items-center text-center">
                    <LinkedinIcon className="w-16 h-16 text-teal-400/20 mb-6" />
                    <h4 className="text-xl font-medium mb-3">LinkedIn Posts Feed</h4>
                    <p className="text-sm text-white/60 mb-6 max-w-sm">
                      Embed your latest professional milestones here. You can paste the official LinkedIn embed code for a featured post, or use a widget for an auto-updating wall.
                    </p>
                    <a href="https://www.linkedin.com/help/linkedin/answer/a561111/embed-a-post" target="_blank" rel="noreferrer" className="text-xs px-4 py-2 liquid-glass rounded-full hover:bg-white/10 transition-colors">
                      How to embed posts
                    </a>
                  </div>

                  <div className="liquid-glass rounded-[2rem] overflow-hidden relative group cursor-pointer" onClick={() => window.open('https://linkedin.com/in/egaboaaron', '_blank')}>
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent"></div>
                    <div className="p-8 h-full flex flex-col justify-center relative z-10">
                       <h4 className="text-2xl font-bold mb-1">Egabo Aaron</h4>
                       <p className="text-teal-300/80 text-sm mb-4">Software Engineer | Co-Founder RENOA</p>
                       <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                         Specializing in offline-resilient architecture, AI integration, and building reliable, community-focused software for Africa.
                       </p>
                       <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                          <span className="text-white/40 text-xs">Uganda</span>
                          <span className="text-teal-400 text-sm font-medium">View Profile &rarr;</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SocialFeeds;
