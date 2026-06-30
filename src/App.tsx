import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Download, Eye } from 'lucide-react';

// Reusable BlurText Component
const BlurText = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.1em' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={isInView ? { filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'], opacity: [0, 0.5, 1], y: [50, -5, 0] } : {}}
          transition={{ duration: 0.7, times: [0, 0.5, 1], ease: "easeOut", delay: (i * 100) / 1000 }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

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

// RAF-based fading video — hero background only
const FadingVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rAFRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  const fadeTo = (targetOpacity: number, durationMs = 500) => {
    const video = videoRef.current;
    if (!video) return;
    const startOpacity = parseFloat(video.style.opacity) || 0;
    const startTime = performance.now();
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      if (videoRef.current) {
        videoRef.current.style.opacity = String(
          startOpacity + (targetOpacity - startOpacity) * progress
        );
      }
      if (progress < 1) rAFRef.current = requestAnimationFrame(animate);
    };
    rAFRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoadedData = () => {
      video.style.opacity = '0';
      video.play().catch(console.error);
      fadeTo(1);
    };
    const onTimeUpdate = () => {
      const timeLeft = video.duration - video.currentTime;
      if (!fadingOutRef.current && timeLeft <= 0.55 && timeLeft > 0) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };
    const onEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(console.error);
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
      className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
      style={{ opacity: 0 }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
};

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

function App() {
  return (
    <div className="relative w-full min-h-screen bg-black font-body text-white selection:bg-blue-500/30">
      <AbstractBackground />

      {/* Navbar */}
      <nav className="fixed top-6 left-0 w-full px-8 lg:px-16 z-50 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto w-12 h-12 liquid-glass rounded-full flex items-center justify-center">
          <span className="font-heading italic lowercase text-white text-2xl">ea</span>
        </div>

        <div className="hidden lg:flex pointer-events-auto liquid-glass rounded-full px-2 py-2 items-center gap-2">
          <a href="#about" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">About</a>
          <a href="#projects" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">Skills</a>
          <a href="#contact" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">Contact</a>
        </div>

        <div className="pointer-events-auto liquid-glass rounded-full px-4 py-2 flex items-center gap-4">
          <a href="https://github.com/EGABO-TECH" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors"><GithubIcon className="w-5 h-5" /></a>
          <a href="https://linkedin.com/in/egaboaaron" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors"><LinkedinIcon className="w-4 h-4" /></a>
          <a href="https://x.com/WanEgabo" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors"><TwitterIcon className="w-4 h-4" /></a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen bg-black flex flex-col items-center justify-center pt-24 px-4 text-center">
        {/* Cinematic video background */}
        <FadingVideo />
        {/* Gradient vignette so text stays legible over video */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
        {/* Hero content */}
        <div className="relative z-[2] flex flex-col items-center">
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="liquid-glass rounded-full flex items-center p-1 pr-4 gap-3 mb-8"
          >
            <span className="bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Available
            </span>
            <span className="text-sm text-white/90 font-body">Open to opportunities in HealthTech &amp; EdTech</span>
          </motion.div>

          <BlurText
            text="Egabo Aaron"
            className="text-5xl md:text-7xl lg:text-[6rem] font-heading italic text-white leading-[0.9] max-w-4xl tracking-[-2px] md:tracking-[-4px]"
          />

          <motion.p
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="mt-6 text-lg md:text-xl text-blue-100/80 max-w-2xl font-body font-light leading-relaxed"
          >
            Software Engineer building reliable, community-focused software for Africa. Specializing in offline-resilient architecture and AI integration.
          </motion.p>

          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-10"
          >
            <a href="#projects" className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 text-sm font-medium text-white hover:bg-white/10 transition-colors w-full sm:w-auto justify-center">
              Explore Projects <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-4">
              <a href="/Egabo_Aaron_Resume.pdf" target="_blank" className="flex items-center gap-2 text-white/80 text-sm font-medium font-body hover:text-white transition-colors">
                <Eye className="h-4 w-4" /> View Resume
              </a>
              <span className="text-white/30">•</span>
              <a href="/Egabo_Aaron_Resume.pdf" download className="flex items-center gap-2 text-white/80 text-sm font-medium font-body hover:text-white transition-colors">
                <Download className="h-4 w-4" /> Download
              </a>
            </div>
          </motion.div>
        </div>
      </section>

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
              <img src="/assets/EGABO-AARON.jpeg" alt="Egabo Aaron" className="w-full h-full object-cover rounded-[1.5rem] grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-6 -right-6 liquid-glass p-6 rounded-[1.5rem] w-48">
              <div className="text-3xl font-heading italic">RENOA</div>
              <div className="text-xs text-white/70 mt-1">Co-Founder & Technical Lead</div>
            </div>
          </motion.div>

          <div className="w-full md:w-2/3">
            <div className="text-sm font-body text-blue-400 mb-4">// THE MISSION</div>
            <h2 className="text-4xl md:text-5xl font-heading italic leading-tight tracking-[-1px] mb-8">
              "Tech, Innovation and Curiosity all curated in my pragmatic mind."
            </h2>
            <div className="space-y-6 text-white/80 font-light text-lg leading-relaxed">
              <p>
                I spend most of my time writing clean backend code and designing simple, clear layouts. I focus on building reliable software that stays up and running even when the internet or servers slow down.
              </p>
              <p>
                Beyond code, I lead the Ama-Tualu Foundation, a registered nonprofit empowering youth in West Nile, Uganda. My interests in philosophy, psychology, and history inform how I think about user needs and product design.
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

      {/* Skills & Stats Section */}
      <section id="skills" className="relative z-10 py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="liquid-glass rounded-[1.5rem] p-8 flex flex-col justify-between col-span-1 md:col-span-2 lg:col-span-2">
            <div>
              <h3 className="text-2xl font-heading italic mb-2">Technical Mastery</h3>
              <p className="text-sm text-white/60 mb-8 max-w-sm">Comfortable across frontend, backend, systems programming, and AI tooling.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'JavaScript', 'Next.js', 'Node.js', 'C', 'Rust', 'PostgreSQL', 'Tailwind CSS'].map(skill => (
                <span key={skill} className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>

          <div className="liquid-glass rounded-[1.5rem] p-8 flex flex-col justify-between">
            <svg className="w-8 h-8 text-blue-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
            <div>
              <div className="font-heading italic text-4xl mb-1">AI / ML</div>
              <div className="text-sm text-white/60">Gemini 2.0, Claude, LangChain, OCR.space</div>
            </div>
          </div>

          <div className="liquid-glass rounded-[1.5rem] p-8 flex flex-col justify-between">
            <svg className="w-8 h-8 text-emerald-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <div className="font-heading italic text-4xl mb-1">Impact</div>
              <div className="text-sm text-white/60">Offline-first, NCHE compliant, Localized</div>
            </div>
          </div>
        </div>
      </section>

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
