"use client";

/**
 * SmoothScroll Provider
 * =====================
 * Drives Lenis smooth scrolling through GSAP's ticker so Lenis and every
 * ScrollTrigger stay on the exact same clock (no jitter between the scroll
 * position and scroll-linked animations).
 *
 * - Reduced motion → skip Lenis entirely, use native scrolling.
 * - Anchor links (#about, #portfolio…) scroll smoothly via Lenis, offset for
 *   the fixed header.
 * - Recomputes ScrollTrigger once webfonts settle so measured positions are
 *   accurate.
 */

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: { offset: -96 }, // clear the fixed header on #hash jumps
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Fonts change line heights → refresh once they're ready.
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
