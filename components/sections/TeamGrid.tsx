"use client";

/**
 * Team Grid Component
 * ===================
 * Two-column grid showcasing the leadership team.
 *
 * Names and roles come from the dictionary (both are translated); the portrait
 * paths stay here and pair with the dictionary entries BY INDEX, since a
 * localized name cannot be used as a stable key.
 *
 * Animation (GSAP via useReveals):
 * - Root <section> ref drives all declarative reveals on scroll.
 * - Section header: "Leadership" subtitle fades + rises (data-reveal);
 *   the "Meet our people" heading plays a SplitText masked line reveal (data-headline).
 * - Each member card fades + rises and auto-staggers with its siblings (data-reveal).
 * - Each image wrapper (overflow-hidden) does a clip-path wipe while the inner
 *   image scales 1.25 -> 1 (data-img-reveal), then hands transform control back to
 *   CSS so group-hover:scale-105 keeps working.
 * - Reduced motion leaves all content fully visible.
 */

import { useRef } from "react";
import Image from "next/image";
import { useReveals } from "@/lib/gsap/reveals";
import { t, type Dictionary } from "@/lib/i18n/get-dictionary";

/** Portraits, in the same order as `dict.team`. */
const PORTRAITS = ["/images/team-khalid.webp", "/images/team-mutaz.webp"];

interface TeamGridProps {
  team: Dictionary["team"];
  copy: Dictionary["home"]["team"];
}

export default function TeamGrid({ team, copy }: TeamGridProps) {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} id="team" className="section bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6" data-reveal>
            <span className="w-2 h-2 bg-black rounded-full" />
            <span className="text-sm tracking-widest uppercase text-gray-600">
              {copy.kicker}
            </span>
          </div>
          <h2 data-headline>{copy.headline}</h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {team.map((member, index) => (
            <div key={PORTRAITS[index]} className="group" data-reveal>
              {/* Image Container with hover scale */}
              <div className="relative overflow-hidden mb-6 aspect-[3/4]" data-img-reveal>
                <Image
                  src={PORTRAITS[index]}
                  alt={t(copy.memberAlt, { name: member.name, role: member.role })}
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="
                    object-cover
                    grayscale group-hover:grayscale-0
                    transition-all duration-500 ease-out
                    group-hover:scale-105
                  "
                />
              </div>

              {/* Name & Role */}
              <h4 className="mb-1">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
