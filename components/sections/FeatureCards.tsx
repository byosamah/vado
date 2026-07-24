"use client";

/**
 * Feature Cards Component
 * =======================
 * Two equal-width cards showcasing key features/services.
 *
 * Each card has:
 * - Large background image
 * - Overlay gradient
 * - Title and description text
 * - Hover scale effect
 *
 * Animation (GSAP):
 * - The <section> is the reveal root (useReveals). On scroll-in, each card is
 *   tagged data-img-reveal: since the card wraps a bg-image DIV (no inner <img>),
 *   only the clip-path wipe plays, uncovering the card from the edge.
 * - The inner bg layer keeps its CSS group-hover:scale-105, the dark overlay
 *   keeps its hover color shift, and the title/description are untouched.
 * - Reduced motion: reveals leave all content fully visible.
 */

import { useRef } from "react";
import { useReveals } from "@/lib/gsap/reveals";

const features = [
  {
    id: 1,
    title: "Architectural Design",
    description:
      "Comprehensive architectural solutions that balance form, function, and identity, transforming concepts into refined, buildable spaces.",
    image: "/images/feature-1.png",
  },
  {
    id: 2,
    title: "Engineering Excellence",
    description:
      "Integrated engineering services across structural, mechanical, electrical, and plumbing disciplines to ensure safe and sustainable performance.",
    image: "/images/feature-2.png",
  },
];

export default function FeatureCards() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              data-img-reveal
              className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
            >
              {/* Background Image */}
              <div
                className="
                  absolute inset-0
                  bg-cover bg-center bg-no-repeat
                  transition-transform duration-700 ease-out
                  group-hover:scale-105
                "
                style={{ backgroundImage: `url(${feature.image})` }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <h3 className="text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-base md:text-lg max-w-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
