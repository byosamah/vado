"use client";

/**
 * About Section Component
 * =======================
 * Two-column layout with text content on left, image on right.
 *
 * Layout:
 * - Left: Subtitle with dot, H2 headline, description
 * - Right: Large image with scroll-triggered reveal
 *
 * Animation (GSAP via useReveals):
 * - The root <section> registers the declarative reveal engine.
 * - Subtitle row (dot + "About VADO") fades and rises in (data-reveal).
 * - The H2 headline plays a SplitText masked line reveal, one line per
 *   <br>-delimited fragment (data-headline).
 * - The description paragraph fades and rises in (data-reveal).
 * - The right image column does a clip-path wipe while its inner image
 *   scales 1.25 -> 1, then hands transform control back to CSS so the
 *   .image-hover-scale hover keeps working (data-img-reveal).
 * - Reduced motion leaves all content fully visible.
 */

import { useRef } from "react";
import Image from "next/image";
import { useReveals } from "@/lib/gsap/reveals";

export default function AboutSection() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} id="about" className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Subtitle with dot indicator */}
            <div data-reveal className="flex items-center gap-3">
              {/* Dot indicator - matches original design */}
              <span className="w-2 h-2 bg-black rounded-full" />
              <span className="text-sm tracking-widest uppercase text-gray-600">
                About VADO
              </span>
            </div>

            {/* Main Headline */}
            <h2 data-headline>
              Where Vision
              <br />
              Becomes
              <br />
              Architecture.
            </h2>

            {/* Description Paragraph */}
            <p data-reveal className="text-lg leading-relaxed max-w-md">
              VADO (VISION Arch. & Engineering Consultants) is a multidisciplinary
              consultancy specialized in architecture, engineering, and project
              development. With decades of experience, VADO delivers innovative,
              functional, and sustainable solutions tailored to meet the evolving
              needs of communities and clients across Saudi Arabia.
            </p>
          </div>

          {/* Right Column - Image */}
          <div data-img-reveal className="image-hover-scale">
            <Image
              src="/images/projects/courtyard-villa/gallery-03.webp"
              alt="Courtyard Villa by VADO, an arched loggia in warm evening light"
              width={1800}
              height={1007}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
