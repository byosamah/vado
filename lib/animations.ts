/**
 * Framer Motion Animation Variants
 * ================================
 * Reusable animation configurations for the Hiroshi clone.
 * These match the subtle, elegant animations on the original site.
 */

import { Variants } from "framer-motion";

// ============================================
// FADE ANIMATIONS
// ============================================

/**
 * Fade in from bottom - Primary reveal animation
 * Used for: Text blocks, images, cards appearing on scroll
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40, // Start 40px below final position
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

/**
 * Simple fade in - No movement
 * Used for: Overlays, subtle appearances
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/**
 * Fade in from left
 * Used for: Left-aligned content reveals
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

/**
 * Fade in from right
 * Used for: Right-aligned content reveals
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// ============================================
// CONTAINER ANIMATIONS
// ============================================

/**
 * Stagger container - Parent wrapper for staggered children
 * Used for: Grid items, list items that reveal one after another
 */
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 100ms delay between each child
      delayChildren: 0.1,   // Initial delay before first child
    },
  },
};

/**
 * Slower stagger for larger sections
 * Used for: Hero content, major section reveals
 */
export const staggerContainerSlow: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// ============================================
// SCALE ANIMATIONS
// ============================================

/**
 * Scale up on hover
 * Used for: Image cards, portfolio items
 */
export const scaleOnHover = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
};

/**
 * Scale in - Grow from slightly smaller
 * Used for: Modal appearances, focus states
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// ============================================
// SLIDE ANIMATIONS
// ============================================

/**
 * Slide up - More dramatic vertical movement
 * Used for: Hero text, large headlines
 */
export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smooth feel
    },
  },
};

/**
 * Slide in from left (full entrance)
 * Used for: Side panels, navigation menus
 */
export const slideInLeft: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// ============================================
// VIEWPORT SETTINGS
// ============================================

/**
 * Default viewport settings for scroll-triggered animations
 * - once: true = animation only plays once (doesn't reverse on scroll up)
 * - amount: 0.2 = triggers when 20% of element is visible
 */
export const defaultViewport = {
  once: true,
  amount: 0.2,
};

/**
 * Viewport for larger elements that should trigger earlier
 */
export const largeElementViewport = {
  once: true,
  amount: 0.1,
};

// ============================================
// TRANSITION PRESETS
// ============================================

export const transitions = {
  fast: { duration: 0.15, ease: "easeOut" },
  base: { duration: 0.3, ease: "easeOut" },
  slow: { duration: 0.5, ease: "easeOut" },
  spring: { type: "spring", stiffness: 300, damping: 30 },
};
