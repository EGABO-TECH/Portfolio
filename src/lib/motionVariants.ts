// ─── Shared Motion Variants for Egabo Aaron Portfolio ─────────────────────────
// Single source of truth for all animations. Import from here across all
// components to ensure a cohesive, co-relating motion language.

export const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Transitions ─────────────────────────────────────────────────────────────
export const defaultTransition = { duration: 0 };
export const fastTransition    = { duration: 0 };
export const slowTransition    = { duration: 0 };

// ─── Core Variants ───────────────────────────────────────────────────────────

/** Standard headline reveal: lifts + de-blurs. Used for all section headers. */
export const fadeUp = {
  hidden:  { opacity: 1, y: 0, filter: 'none' },
  visible: { opacity: 1, y: 0,  filter: 'none', transition: defaultTransition },
};

/** Subtle fade only — overlays, captions, decorative elements. */
export const fadeIn = {
  hidden:  { opacity: 1 },
  visible: { opacity: 1, transition: defaultTransition },
};

/** Slides in from the left — used for left-column content in project rows. */
export const slideInLeft = {
  hidden:  { opacity: 1, x: 0, filter: 'none' },
  visible: { opacity: 1, x: 0,   filter: 'none', transition: defaultTransition },
};

/** Slides in from the right — used for right-column images in project rows. */
export const slideInRight = {
  hidden:  { opacity: 1, x: 0, filter: 'none' },
  visible: { opacity: 1, x: 0,  filter: 'none', transition: defaultTransition },
};

/** Scale + fade entry — used for images, cards, and key visual blocks. */
export const scaleIn = {
  hidden:  { opacity: 1, scale: 1, filter: 'none' },
  visible: { opacity: 1, scale: 1,    filter: 'none', transition: defaultTransition },
};

/** Lifts slightly from below — lighter version for smaller cards. */
export const liftUp = {
  hidden:  { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0,  transition: fastTransition },
};

// ─── Stagger Variants ─────────────────────────────────────────────────────────

/** Wrap a grid or list with this to orchestrate staggered children. */
export const staggerContainer = (_stagger = 0, _delay = 0) => ({
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
});

/** Each direct child of a staggerContainer uses this. */
export const staggerItem = {
  hidden:  { opacity: 1, y: 0, filter: 'none' },
  visible: { opacity: 1, y: 0,  filter: 'none', transition: fastTransition },
};

/** Horizontal stagger — for tag pills, skill badges, etc. */
export const staggerItemX = {
  hidden:  { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0,  transition: fastTransition },
};

// ─── Utility ─────────────────────────────────────────────────────────────────

/** Standard viewport config used with whileInView. */
export const viewport = { once: true, margin: '200px' } as const;
