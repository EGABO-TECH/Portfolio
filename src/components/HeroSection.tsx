import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FluidBackground from './FluidBackground';
import './HeroSection.css';

// ─── Shared ease ───────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Social icons ──────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// ─── Logo SVG ──────────────────────────────────────────────────────────────
const LogoMark = () => (
  <svg viewBox="0 0 32 32" fill="none" className="hero-logo-svg" aria-hidden="true">
    <rect x="5" y="11" width="22" height="10" rx="4" fill="#fff" transform="rotate(-35 16 16)" />
    <rect x="5" y="11" width="22" height="10" rx="4" fill="#fff" opacity="0.4" transform="rotate(35 16 16)" />
  </svg>
);

// ─── Cinematic greeting text ────────────────────────────────────────────────
const GREETING_CHARS = "Hi, I'm Egabo Aaron".split('');

// ─── HeroSection ───────────────────────────────────────────────────────────
const HeroSection = () => {
  const [greetingVisible, setGreetingVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reveal greeting when the hand opens (~2.6 s into the video)
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current && videoRef.current.currentTime >= 2.6 && !greetingVisible) {
      setGreetingVisible(true);
    }
  }, [greetingVisible]);

  return (
    <section id="home" className="hero-section" aria-label="Hero">

      {/* ── Background Video & Fluid ─────────────────────────────────── */}
      <motion.div
        className="hero-video-wrapper"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay muted playsInline loop preload="auto"
          onTimeUpdate={handleTimeUpdate}
          aria-hidden="true"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
            type="video/mp4"
          />
        </video>

        {/* The interactive fluid background overlaid on the video */}
        <FluidBackground />

        {/* ── Cinematic greeting overlay ──────────────────────────── */}
        <AnimatePresence>
          {greetingVisible && (
            <motion.div
              className="hero-greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              aria-live="polite"
            >
              {/* Scan-line shimmer bar */}
              <motion.div
                className="hero-greeting-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
              />

              {/* Character-by-character reveal */}
              <p className="hero-greeting-text">
                {GREETING_CHARS.map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + i * 0.04,
                      ease: EASE,
                    }}
                    style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : undefined }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </p>

              {/* Sub-tagline */}
              <motion.p
                className="hero-greeting-sub"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
              >
                A Pragmatic Software Engineer <span className="hero-wave-emoji">👋</span>
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Navbar ───────────────────────────────────────────────────── */}
      <motion.nav
        className="hero-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        aria-label="Site navigation"
      >
        {/* LEFT — logo + "ea" brand */}
        <div className="hero-nav-left">
          <div className="hero-logo-wrap">
            <LogoMark />
            <span className="hero-brand-name">ea</span>
          </div>
        </div>

        {/* CENTER — nav links pill */}
        <div className="hero-nav-center">
          <nav className="hero-links-pill" aria-label="Sections">
            {[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Projects', href: '#projects' },
              { label: 'GitHub', href: '#github' },
              { label: 'Skills', href: '#skills' },
              { label: 'Content', href: '#content' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <a key={href} href={href} className="hero-nav-link">{label}</a>
            ))}
          </nav>
        </div>

        {/* RIGHT — social icons */}
        <div className="hero-nav-right">
          <div className="hero-right-pill">
            <a href="https://github.com/EGABO-TECH" target="_blank" rel="noreferrer" className="hero-social-icon" aria-label="GitHub"><GithubIcon /></a>
            <a href="https://linkedin.com/in/egaboaaron" target="_blank" rel="noreferrer" className="hero-social-icon" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href="https://x.com/WanEgabo" target="_blank" rel="noreferrer" className="hero-social-icon" aria-label="X/Twitter"><TwitterIcon /></a>
          </div>
        </div>
      </motion.nav>

      {/* ── Footer content ───────────────────────────────────────────── */}
      <motion.div
        className="hero-footer"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: EASE }}
      >
        {/* Left block */}
        <div className="hero-footer-left">
          <motion.div
            className="hero-subtitle-row"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          >
            <span className="hero-dot" aria-hidden="true" />
            <span className="hero-subtitle-text flex items-center gap-1.5">
              Software Engineer · Uganda
              <img src="https://flagcdn.com/ug.svg" alt="Uganda flag" className="w-3.5 h-[10px] rounded-[1px] object-cover" />
            </span>
          </motion.div>

          <motion.h1
            className="hero-heading"
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          >
            Open to&nbsp;Work,<br />
            <span className="hero-heading-accent">SDGs</span>
            &nbsp;&amp;&nbsp;
            <span className="hero-heading-accent">EdTech.</span>
          </motion.h1>

          <motion.div
            className="hero-btn-row"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
          >
            <a href="#projects" className="hero-btn-primary">
              Explore Projects
            </a>
            <a href="/Egabo_Aaron_Resume.pdf" target="_blank" rel="noreferrer" className="hero-btn-secondary">
              View Resume
            </a>
          </motion.div>
        </div>

        {/* Right tags */}
        <div className="hero-footer-right">
          {['SDGs', 'EdTech', 'Offline-First', 'AI'].map((tag, i) => (
            <motion.span
              key={tag}
              className="hero-tag-badge"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.05 + i * 0.07, ease: EASE }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
