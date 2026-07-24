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
 *  - The border-left dividers, indices, and grid layout are untouched.
 *  - prefers-reduced-motion leaves every element fully visible, no transforms.
 */

import { useRef } from "react";
import { useReveals } from "@/lib/gsap/reveals";

const principles = [
  {
    id: "01",
    title: "Innovation",
    description:
      "We turn vision into architecture, pursuing creative, forward-thinking design that answers to context and purpose.",
  },
  {
    id: "02",
    title: "Sustainability",
    description:
      "We design responsibly, shaping functional environments built to serve communities and endure for generations.",
  },
  {
    id: "03",
    title: "Precision",
    description:
      "We hold to engineering rigor and disciplined execution, from the first concept to the final detail on site.",
  },
];

export default function GuidingPrinciples() {
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
            What guides us
          </span>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {principles.map((principle) => (
            <div
              key={principle.id}
              data-reveal
              className="md:pl-8 md:border-l md:border-white/15 md:first:border-l-0 md:first:pl-0"
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
