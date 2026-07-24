"use client";

/**
 * GSAP Singleton + Motion Tokens
 * ==============================
 * One place that registers GSAP plugins (client-side only) and exposes the
 * shared animation vocabulary for the whole site. Every animated component
 * imports gsap / ScrollTrigger / SplitText / useGSAP from here so plugin
 * registration happens exactly once and the eases/durations stay consistent.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register on the client only. Registration is idempotent, but guard against
// touching browser-only plugin internals during SSR.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

// ============================================
// MOTION TOKENS — the site's shared "feel"
// ============================================

/** Easing curves. `out` for entrances, `inOut` for clip/parallax sweeps. */
export const EASE = {
  out: "power3.out",
  inOut: "power3.inOut",
  expo: "expo.out",
} as const;

/** Durations in seconds. Slow + confident = premium. */
export const DUR = {
  fast: 0.5,
  base: 0.9,
  slow: 1.2,
} as const;

/** True when the visitor asked the OS for reduced motion. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * True when the document reads right to left.
 *
 * Read off the live DOM rather than passed down as a prop, because motion is a
 * client-side concern and <html dir> is already the single source of truth the
 * locale layout sets. Guarded for SSR.
 */
export const isDocumentRtl = (): boolean =>
  typeof document !== "undefined" &&
  document.documentElement.getAttribute("dir") === "rtl";

/**
 * Sign multiplier for horizontal motion: +1 in LTR, -1 in RTL.
 *
 * Any animation that slides content in "from the left" means "from the side
 * the reader starts on". Multiplying the x offset by this keeps that intent
 * intact when the page mirrors, instead of having content fly in from the
 * wrong edge.
 */
export const directionSign = (): number => (isDocumentRtl() ? -1 : 1);

export { gsap, ScrollTrigger, SplitText, useGSAP };
