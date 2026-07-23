"use client";

/**
 * Team Grid Component
 * ===================
 * Four-column grid showcasing team members.
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

const teamMembers = [
  {
    id: 1,
    name: "Arch. Khalid Al Mulla",
    role: "President",
    image: "/images/team-khalid.webp",
  },
  {
    id: 2,
    name: "Arch. Mutaz Al Mulla",
    role: "Vice President & Chief Architect",
    image: "/images/team-mutaz.webp",
  },
];

export default function TeamGrid() {
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
              Leadership
            </span>
          </div>
          <h2 data-headline>Meet our people</h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.id} className="group" data-reveal>
              {/* Image Container with hover scale */}
              <div className="relative overflow-hidden mb-6 aspect-[3/4]" data-img-reveal>
                <Image
                  src={member.image}
                  alt={member.name}
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
              <h4 className="text-xl font-light mb-1">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
