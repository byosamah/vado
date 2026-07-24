"use client";

/**
 * Guiding Principles Component
 * ============================
 * The values that guide VADO's work, shown as a dark full-width band.
 * Replaces the former testimonials slider — the firm has no client
 * quotes to show yet, so this leads with what the practice stands for.
 *
 * Copy is drawn from VADO's own About and Vision statements, so nothing
 * here is fabricated.
 *
 * Motion (GSAP via the declarative reveal engine, useReveals on the root):
 *  - The "What guides us" subtitle fades and rises in on scroll (data-reveal).
 *  - Each principle column (index, title, description) reveals as a unit;
 *    the three siblings batch together so they stagger naturally.
 *  - prefers-reduced-motion leaves every element fully visible, no transforms.
 *
 * RTL: the column dividers use logical border-s / first:border-s-0, so the
 * hairline sits between columns in both directions instead of stranding
 * itself on the outer edge when the grid mirrors.
 */

import { useRef } from "react";
import { useReveals } from "@/lib/gsap/reveals";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

interface GuidingPrinciplesProps {
  principles: Dictionary["principles"];
  copy: Dictionary["home"]["principles"];
}

export default function GuidingPrinciples({
  principles,
  copy,
}: GuidingPrinciplesProps) {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} className="section bg-gray-900">
      <div className="container">
        {/* Section Label */}
        <div
          className="flex items-center justify-center gap-3 mb-16"
          data-reveal
        >
          <span className="w-2 h-2 bg-white rounded-full" />
          <span className="text-sm tracking-widest uppercase text-white/60">
            {copy.kicker}
          </span>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {principles.map((principle) => (
            <div
              key={principle.id}
              data-reveal
              className="md:ps-8 md:border-s md:border-white/15 md:first:border-s-0 md:first:ps-0"
            >
              {/* Index */}
              <span className="block text-sm tracking-widest text-white/40 mb-6">
                {principle.id}
              </span>

              {/* Title */}
              <h3 className="text-white mb-4">
                {principle.title}
              </h3>

              {/* Description */}
              <p className="text-base leading-relaxed text-white/60 max-w-xs">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
