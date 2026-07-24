"use client";

/**
 * About Section Component
 * =======================
 * Two-column layout with text content first, image second.
 *
 * Layout:
 * - Text: Subtitle with dot, H2 headline, description
 * - Image: Large image with scroll-triggered reveal
 *
 * Animation (GSAP via useReveals):
 * - The root <section> registers the declarative reveal engine.
 * - Subtitle row (dot + "About VADO") fades and rises in (data-reveal).
 * - The H2 headline plays a SplitText masked line reveal, one line per
 *   entry in `headlineLines` (data-headline).
 * - The description paragraph fades and rises in (data-reveal).
 * - The image column does a clip-path wipe while its inner image
 *   scales 1.25 -> 1, then hands transform control back to CSS so the
 *   .image-hover-scale hover keeps working (data-img-reveal).
 * - Reduced motion leaves all content fully visible.
 *
 * The headline arrives as an array of lines rather than a string containing
 * <br>, so a translator controls where Arabic breaks without touching markup.
 * Rendering through Fragments keeps the DOM byte-identical to plain
 * text-with-<br>, which is what SplitText measures.
 */

import { Fragment, useRef } from "react";
import Image from "next/image";
import { useReveals } from "@/lib/gsap/reveals";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export default function AboutSection({
  about,
}: {
  about: Dictionary["home"]["about"];
}) {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} id="about" className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div>
            {/* Subtitle with dot indicator */}
            <div data-reveal className="flex items-center gap-3">
              {/* Dot indicator - matches original design */}
              <span className="w-2 h-2 bg-black rounded-full" />
              <span className="text-sm tracking-widest uppercase text-gray-600">
                {about.kicker}
              </span>
            </div>

            {/* Main Headline */}
            <h2 data-headline className="mt-6">
              {about.headlineLines.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </h2>

            {/* Description Paragraph */}
            <p data-reveal className="text-lg leading-relaxed max-w-lg mt-10">
              {about.body}
            </p>
          </div>

          {/* Image */}
          <div data-img-reveal className="image-hover-scale">
            <Image
              src="/images/projects/courtyard-villa/gallery-03.webp"
              alt={about.imageAlt}
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
