"use client";

/**
 * Services Links Component
 * ========================
 * Three-column row of text links with underline hover effect.
 *
 * Animation (GSAP):
 * - Root <section> ref is wired to useReveals, which scans for reveal tags.
 * - Each of the three link items is tagged data-reveal, so they fade + rise
 *   in on scroll and auto-stagger together as sibling reveals.
 * - The underline-hover class still drives the left-to-right underline and
 *   colour transition on hover.
 * - Respects prefers-reduced-motion via the shared reveal system (content
 *   stays fully visible when motion is disabled).
 */

import { useRef } from "react";
import { useReveals } from "@/lib/gsap/reveals";
import Link from "next/link";

const links = [
  {
    id: 1,
    text: "Explore our projects",
    href: "#portfolio",
  },
  {
    id: 2,
    text: "Learn about our vision",
    href: "#about",
  },
  {
    id: 3,
    text: "Start your project today",
    href: "#contact",
  },
];

export default function ServicesLinks() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  // Deliberately compact band (py-16/24), not the full .section rhythm:
  // this is a slim strip of three links, not a content section.
  return (
    <section ref={root} className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {links.map((link) => (
            <div key={link.id} data-reveal>
              <Link
                href={link.href}
                className="
                  inline-flex items-center min-h-11
                  text-xl md:text-2xl font-light
                  text-gray-800 hover:text-black
                  transition-colors duration-300
                "
              >
                {/* underline-hover lives on an inner span: its ::after hangs at
                    bottom:-2px of the element box, so padding the link directly
                    would drop the underline far below the text. */}
                <span className="underline-hover">{link.text}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
