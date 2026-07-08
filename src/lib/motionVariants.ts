// ─── Shared Motion Variants for Egabo Aaron Portfolio ─────────────────────────
// Single source of truth for all animations. Import from here across all
// components to ensure a cohesive, co-relating motion language.

export const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Transitions ─────────────────────────────────────────────────────────────
export const defaultTransition = { duration: 0.7, ease: EASE };
export const fastTransition    = { duration: 0.45, ease: EASE };
export const slowTransition    = { duration: 1.0,  ease: EASE };

// ─── Core Variants ───────────────────────────────────────────────────────────

/** Standard headline reveal: lifts + de-blurs. Used for all section headers. */
export const fadeUp = {
  hidden:  { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: defaultTransition },
};

/** Subtle fade only — overlays, captions, decorative elements. */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: defaultTransition },
};

/** Slides in from the left — used for left-column content in project rows. */
export const slideInLeft = {
  hidden:  { opacity: 0, x: -60, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: defaultTransition },
};

/** Slides in from the right — used for right-column images in project rows. */
export const slideInRight = {
  hidden:  { opacity: 0, x: 60, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,  filter: 'blur(0px)', transition: defaultTransition },
};

/** Scale + fade entry — used for images, cards, and key visual blocks. */
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.93, filter: 'blur(6px)' },
  visible: { opacity: 1, scale: 1,    filter: 'blur(0px)', transition: defaultTransition },
};

/** Lifts slightly from below — lighter version for smaller cards. */
export const liftUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,  transition: fastTransition },
};

// ─── Stagger Variants ─────────────────────────────────────────────────────────

/** Wrap a grid or list with this to orchestrate staggered children. */
export const staggerContainer = (stagger = 0.08, delay = 0.1) => ({
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

/** Each direct child of a staggerContainer uses this. */
export const staggerItem = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: fastTransition },
};

/** Horizontal stagger — for tag pills, skill badges, etc. */
export const staggerItemX = {
  hidden:  { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0,  transition: fastTransition },
};

// ─── Utility ─────────────────────────────────────────────────────────────────

/** Standard viewport config used with whileInView. */
export const viewport = { once: true, margin: '-80px' } as const;
