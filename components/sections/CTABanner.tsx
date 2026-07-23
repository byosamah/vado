"use client";

/**
 * CTA Banner Component
 * ====================
 * Full-width call-to-action banner with a GSAP-driven parallax background.
 *
 * Motion:
 * - Bespoke parallax: the background image lives in an oversized, absolutely
 *   positioned layer INSIDE the section (taller than the section) and drifts
 *   vertically on a scrubbed ScrollTrigger (yPercent -12 -> 12, ease none) as
 *   the section travels through the viewport. This replaces the old
 *   background-attachment:fixed trick, which was janky/broken on mobile.
 *   Guards prefers-reduced-motion (the layer stays static).
 * - Declarative reveals (useReveals on the section root): the H2 does a
 *   SplitText masked line reveal (data-headline); the "Start Your Project"
 *   button fades + rises in (data-reveal).
 *
 * Content:
 * - H2: "Let's Build The Future."
 * - Button: "Start Your Project" -> #contact
 */

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReveals } from "@/lib/gsap/reveals";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap/gsap";

export default function CTABanner() {
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);

  // Declarative content reveals (headline + button) scoped to the section.
  useReveals(root);

  // Bespoke scrubbed parallax on the oversized background layer.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        bg.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative py-32 md:py-48 overflow-hidden">
      {/* Oversized background layer — parallaxed by GSAP. Taller than the
          section (h-130% / top -15%) so the vertical drift never exposes an
          edge. Replaces background-attachment:fixed, which broke on mobile. */}
      <div
        ref={bg}
        className="absolute inset-x-0 top-[-15%] h-[130%] will-change-transform"
      >
        <Image
          src="/images/cta-bg.png"
          alt=""
          fill
          sizes="100vw"
          priority={false}
          className="object-cover"
        />
      </div>

      {/* Dark Overlay — above the bg layer, below the content */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            data-headline
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8"
          >
            Let's Build The Future.
          </h2>

          <div data-reveal>
            <Link
              href="#contact"
              className="
                inline-block
                px-8 py-4
                text-sm tracking-widest uppercase
                border border-white
                hover:bg-white
                transition-all duration-300
              "
              style={{ color: "#ffffff" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
