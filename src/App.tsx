import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, fadeIn, slideInLeft, scaleIn, staggerContainer, staggerItem, viewport } from './lib/motionVariants';

import SkillsGrid from './components/SkillsGrid';
import SocialFeeds from './components/SocialFeeds';
import HeroSection from './components/HeroSection';
import FlagshipProjects from './components/FlagshipProjects';
import CertificatesShelf from './components/CertificatesShelf';
import ContactForm from './components/ContactForm';
import egaboPhoto from './assets/EGABO-AARON.jpeg';
import eaLogo from './assets/ea-logo.png';

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
        intro="This Privacy Policy explains how Egabo Aaron collects, uses, stores, and protects information when you visit this portfolio website or interact with its content or contact form."
        onBack={() => setActivePage('home')}
        sections={[
          {
            title: '1. Information We Collect',
            content: [
              'Information you voluntarily provide through the contact form, such as your name, email address, and project details. Form submissions are delivered by Formspree.',
              'Technical information automatically collected through your browser, such as IP address, device type, browser version, referring pages, and interaction data.',
            ],
          },
          {
            title: '2. How We Use Your Information',
            content: [
              'To respond to inquiries, discuss collaboration opportunities, and provide project-related support.',
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
              'Embedded content and external services may process data in accordance with their own privacy policies, including form-handling providers and analytics platforms.',
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

      {/* Flagship Projects (tap for live preview) */}
      <FlagshipProjects />

      {/* Certificates bookshelf */}
      <CertificatesShelf />

      {/* Skills Section */}
      <SkillsGrid />

      {/* Social Feeds Section */}
      <SocialFeeds />

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
          <ContactForm />
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
                  <li><a href="#certificates" className="hover:text-emerald-400 transition-colors">Certificates</a></li>
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

                <div className="w-full rounded-xl overflow-hidden border border-white/10 relative shadow-lg aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/9]">
                  <iframe
                    src="https://maps.google.com/maps?q=Cavendish+University+Uganda,+Plot+1469+Ggaba+Road,+Kampala&t=m&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Map: Cavendish University Uganda, Ggaba Road, opposite the American Embassy"
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Cavendish+University+Uganda,+Plot+1469+Ggaba+Road,+Kampala"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 self-start text-xs text-white/50 hover:text-emerald-400 transition-colors"
                >
                  Siyani Campus, Ggaba Road · opposite the American Embassy · Get directions →
                </a>
              </motion.div>
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
