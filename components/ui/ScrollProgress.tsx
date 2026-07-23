"use client";

/**
 * ScrollProgress
 * ==============
 * A hairline bar pinned to the top of the viewport that fills left→right as the
 * page scrolls. `mix-blend-difference` keeps it legible over both the dark hero
 * and the light sections without any per-section theming.
 */

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap/gsap";

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.set(bar.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  });

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[60] h-[2px] w-full bg-white mix-blend-difference"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
