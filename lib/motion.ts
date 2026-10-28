import { Variants, Transition } from "framer-motion";
import { EntranceAnimation, MotionIntensity } from "@/types/builder";

// ── PREMIUM MOTION DESIGN SYSTEM (CBS COLLECTIVE 2026) ──────────────────────
// Academic, restrained, cinematic easing curves and spring physics.

export const EASINGS = {
  // Ultra-refined quintic ease-out: starts with natural momentum, slows gracefully
  smoothOut: [0.16, 1, 0.3, 1] as const,
  // Snappy ease for micro-interactions (buttons, tags, icons)
  snappy: [0.2, 0.8, 0.2, 1] as const,
  // Gentle ease for long-travel elements
  gentle: [0.25, 0.1, 0.25, 1] as const,
  // Classical editorial reveal ease
  editorial: [0.33, 1, 0.68, 1] as const,
  // Expo ease-out for cinematic entrances
  expo: [0.19, 1, 0.22, 1] as const,
  // Back ease for subtle overshoot
  back: [0.34, 1.56, 0.64, 1] as const,
  // Circ ease-out for masked reveals
  circ: [0, 0.55, 0.45, 1] as const,
};

export const SPRINGS = {
  subtle: { type: "spring" as const, stiffness: 260, damping: 25 },
  card: { type: "spring" as const, stiffness: 220, damping: 22 },
  tilt: { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.5 },
  bouncy: { type: "spring" as const, stiffness: 350, damping: 15 },
  magnetic: { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.1 },
  navbar: { type: "spring" as const, stiffness: 400, damping: 35 },
};

// ── ENTRANCE REVEAL VARIANTS ─────────────────────────────────────────────────

export function getEntranceVariants(
  type: EntranceAnimation = "fade-up",
  intensity: MotionIntensity = "balanced"
): Variants {
  const distanceMultiplier =
    intensity === "minimal" ? 0.5 : intensity === "expressive" ? 1.5 : 1.0;

  const yDist = 28 * distanceMultiplier;
  const xDist = 32 * distanceMultiplier;

  switch (type) {
    case "fade-in":
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { ease: EASINGS.smoothOut },
        },
      };

    case "fade-up":
      return {
        hidden: { opacity: 0, y: yDist },
        visible: {
          opacity: 1,
          y: 0,
          transition: { ease: EASINGS.smoothOut },
        },
      };

    case "fade-left":
      return {
        hidden: { opacity: 0, x: -xDist },
        visible: {
          opacity: 1,
          x: 0,
          transition: { ease: EASINGS.smoothOut },
        },
      };

    case "fade-right":
      return {
        hidden: { opacity: 0, x: xDist },
        visible: {
          opacity: 1,
          x: 0,
          transition: { ease: EASINGS.smoothOut },
        },
      };

    case "scale-in":
      return {
        hidden: { opacity: 0, scale: 0.94 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { ease: EASINGS.smoothOut },
        },
      };

    case "mask-reveal":
      return {
        hidden: { opacity: 0, clipPath: "inset(10% 0% 10% 0%)" },
        visible: {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          transition: { ease: EASINGS.editorial },
        },
      };

    case "none":
    default:
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      };
  }
}

// ── CONTAINER STAGGER VARIANTS ───────────────────────────────────────────────

export function staggerContainer(
  staggerChildren = 0.08,
  delayChildren = 0.05
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

// ── MASKED LINE REVEAL (for headings) ────────────────────────────────────────
// Each line is wrapped in overflow-hidden; the text slides up from below the clip

export const maskedLineVariants: Variants = {
  hidden: {
    y: "105%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: EASINGS.expo,
    },
  },
};

export const maskedLineContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// ── HERO HEADLINE WORD/LINE STAGGER ─────────────────────────────────────────

export const heroWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "110%",
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.75,
      ease: EASINGS.smoothOut,
    },
  },
};

export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

// ── CARD HOVER VARIANTS ──────────────────────────────────────────────────────

export const cardInteractiveVariants = {
  rest: {
    y: 0,
    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.35)",
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  hover: {
    y: -5,
    boxShadow:
      "0 18px 36px -6px rgba(0, 0, 0, 0.55), 0 0 24px rgba(212, 175, 55, 0.12)",
    borderColor: "rgba(212, 175, 55, 0.35)",
    transition: {
      duration: 0.28,
      ease: EASINGS.smoothOut,
    },
  },
};

// ── DEFAULT VIEWPORT TRIGGER ─────────────────────────────────────────────────
export const VIEWPORT_ONCE = {
  once: true,
  margin: "-60px",
  amount: 0.15 as const,
};

export const VIEWPORT_EAGER = {
  once: true,
  margin: "-40px",
  amount: 0.1 as const,
};

// ── STAGGER CHILDREN (each child gets a fade-up) ────────────────────────────
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASINGS.smoothOut },
  },
};

// ── IMAGE REVEAL VARIANTS ────────────────────────────────────────────────────
export const imageRevealVariants: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 1.1, ease: EASINGS.expo },
  },
};

// ── WIPE FROM LEFT ───────────────────────────────────────────────────────────
export const wipeFromLeft: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 0.9, ease: EASINGS.expo },
  },
};

// ── SECTION BACKGROUND TRANSITION ───────────────────────────────────────────
export const sectionBgTransition: Transition = {
  duration: 0.7,
  ease: EASINGS.gentle,
};

// ── TIMELINE NODE VARIANTS ───────────────────────────────────────────────────
export const timelineNodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASINGS.back },
  },
};

export const timelineLineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: EASINGS.smoothOut },
  },
};

// ── CURSOR LABEL VARIANTS ────────────────────────────────────────────────────
export const cursorLabelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: EASINGS.snappy },
  },
};
