import { motion } from 'framer-motion';

const skillsRow1 = [
  { name: 'Python', icon: 'python' },
  { name: 'JS', icon: 'javascript' },
  { name: 'TS', icon: 'typescript' },
  { name: 'C', icon: 'c' },
  { name: 'HTML', icon: 'html5' },
  { name: 'CSS', icon: 'css3' },
  { name: 'Bash', icon: 'gnubash' },
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'nextdotjs' }
];

const skillsRow2 = [
  { name: 'Node', icon: 'nodedotjs' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Clerk', icon: 'clerk' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Git', icon: 'git' },
  { name: 'Github', icon: 'github' }
];

const skillsRow3 = [
  { name: 'VS Code', icon: 'visualstudiocode' },
  { name: 'Cursor', icon: 'cursor' },
  { name: 'Claude Code', icon: 'anthropic' },
  { name: 'Antigravity', icon: 'spacex' },
  { name: 'Z.AI', icon: 'openai' },
  { name: 'Vercel', icon: 'vercel' },
  { name: 'Netlify', icon: 'netlify' }
];

const skillsRow4 = [
  { name: 'Figma', icon: 'figma' },
  { name: 'CMD', icon: 'windowsterminal' },
  { name: 'MS Office', icon: 'microsoftoffice' },
  { name: 'MS Access', icon: 'microsoftaccess' },
  { name: 'Powerpoint', icon: 'microsoftpowerpoint' }
];

const skillsRow5 = [
  { name: 'Google Stitch', icon: 'googlecloud' },
  { name: 'Speechma', icon: 'googlepodcasts' },
  { name: 'Google Vids', icon: 'google' }
];

const allRows = [skillsRow1, skillsRow2, skillsRow3, skillsRow4, skillsRow5];

const CustomIcon = ({ name, className }: { name: string, className?: string }) => {
  switch (name) {
    case 'Antigravity':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path 
            d="M 3 20 C 8 20, 9 4, 12 4 C 15 4, 16 20, 21 20" 
            stroke="url(#agGradLogo)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            fill="none" 
          />
          <defs>
            <linearGradient id="agGradLogo" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="35%" stopColor="#22c55e" />
              <stop offset="60%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'CSS':
      return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" className={className} alt="CSS" />;
    case 'VS Code':
      return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" className={className} alt="VS Code" />;
    case 'CMD':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2" fill="#0c0c0c" stroke="#ffffff"/>
          <path d="M6 8L10 12L6 16" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16H18" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'Claude Code':
      return (
        <div className={`${className} bg-[#D27357] rounded-xl flex items-center justify-center p-1.5`}>
          <img src="https://cdn.simpleicons.org/anthropic/white" alt="Claude Code" className="w-full h-full object-contain" />
        </div>
      );
    case 'Google Stitch':
      return <img src="https://cdn.worldvectorlogo.com/logos/google-cloud-2.svg" className={className} alt="Google Stitch" onError={(e) => (e.currentTarget.src = "https://cdn.simpleicons.org/googlecloud")} />;
    case 'Z.AI':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#111" stroke="#333"/>
          <path d="M7 8h10L7 16h10" stroke="#00d8ff" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="7" cy="8" r="1.5" fill="#fff"/>
          <circle cx="17" cy="16" r="1.5" fill="#fff"/>
        </svg>
      );
    case 'Speechma':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="#ff4757" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 10v4m3-6v8m3-5v2" stroke="#fff" strokeLinecap="round"/>
        </svg>
      );
    case 'MS Office':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 6L11 4V20L4 18V6Z" fill="#d83b01"/>
          <path d="M12 3.5L20 2V22L12 20.5V3.5Z" fill="#ea4300"/>
        </svg>
      );
    case 'MS Access':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 6L11 4V20L4 18V6Z" fill="#a4373a"/>
          <path d="M12 3.5L20 2V22L12 20.5V3.5Z" fill="#b7472a"/>
          <path d="M13 13l2-5h2l2 5M14.5 15h3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'Powerpoint':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 6L11 4V20L4 18V6Z" fill="#c43e1c"/>
          <path d="M12 3.5L20 2V22L12 20.5V3.5Z" fill="#d04423"/>
          <path d="M14 10a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM14 10v6" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="#fff"/>
        </svg>
      );
    default:
      return null;
  }
};

// Names that have a hand-crafted custom icon defined in CustomIcon
const CUSTOM_ICON_NAMES = new Set([
  'Antigravity', 'CSS', 'VS Code', 'CMD', 'Claude Code', 'Google Stitch', 'Z.AI', 'Speechma',
  'MS Office', 'MS Access', 'Powerpoint'
]);

const ICON_CLASS = 'w-8 h-8 sm:w-10 sm:h-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]';

const SkillCard = ({ skill, index, rowIndex }: { skill: { name: string; icon: string }, index: number, rowIndex: number }) => {
  const hasCustom = CUSTOM_ICON_NAMES.has(skill.name);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: rowIndex * 0.1 + index * 0.05 }}
      className="liquid-glass group rounded-2xl p-4 w-20 h-24 sm:w-24 sm:h-28 flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer border border-white/5 hover:border-white/20 shadow-lg"
    >
      {hasCustom ? (
        <CustomIcon name={skill.name} className={ICON_CLASS} />
      ) : (
        <img
          src={`https://cdn.simpleicons.org/${skill.icon}`}
          alt={skill.name}
          className={ICON_CLASS}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>';
          }}
        />
      )}
      <span className="text-[10px] sm:text-xs text-white/70 group-hover:text-white font-medium text-center leading-tight">
        {skill.name}
      </span>
    </motion.div>
  );
};

const SkillsGrid = () => {
  return (
    <section id="skills" className="relative z-10 py-32 px-4 md:px-8 overflow-hidden min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-[#0a0014] to-black -z-20"></div>
      
      <div 
        className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2.5)',
          transformOrigin: 'top center'
        }}
      />
      
      <div className="absolute right-[10%] top-1/2 w-32 h-32 bg-purple-400/20 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
      <div className="absolute right-[15%] top-[55%] w-16 h-16 bg-white/10 rounded-full blur-[20px] shadow-[0_0_50px_rgba(216,180,254,0.6)] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-heading italic leading-tight tracking-[-1px] mb-16 text-center">
          Technical Arsenal
        </h2>

        <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
          {allRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
              {row.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} rowIndex={rowIndex} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsGrid;
