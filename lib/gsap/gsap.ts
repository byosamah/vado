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

export { gsap, ScrollTrigger, SplitText, useGSAP };
