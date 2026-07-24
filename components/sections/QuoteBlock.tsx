"use client";

/**
 * Vision Statement Component
 * ==========================
 * The VADO vision statement, introduced by a small section label and given a
 * signature read-along reveal. The statement is SplitText'd into words and, as
 * the section scrolls through the viewport, a scrubbed timeline lifts each word
 * from dim (autoAlpha 0.15) to full in sequence — a premium read-along effect
 * tied directly to scroll position (linear "none" ease, start "top 80%" → end
 * "center 55%"). The label rides the shared declarative reveal engine (data-reveal).
 *
 * The word-by-word split works unchanged in Arabic: SplitText segments on
 * whitespace, so it never cuts inside a cursive word and the joins stay intact.
 *
 * Under prefers-reduced-motion the bespoke read-along is skipped entirely, so
 * the statement stays fully visible with no split and no motion.
 */

import { useRef } from "react";
import { useReveals } from "@/lib/gsap/reveals";
import { useGSAP, gsap, SplitText, prefersReducedMotion } from "@/lib/gsap/gsap";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export default function QuoteBlock({
  quote,
}: {
  quote: Dictionary["home"]["quote"];
}) {
  const root = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  // Declarative reveals — attribution line fades + rises on scroll.
  useReveals(root);

  // Bespoke signature moment: scrubbed word-by-word brighten as the quote
  // scrolls through the viewport. Words start dimmed and settle to full opacity
  // in a staggered wave that follows the scrollbar.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const quoteEl = quoteRef.current;
      if (!quoteEl) return;

      const split = SplitText.create(quoteEl, { type: "words,lines" });
      gsap.set(split.words, { autoAlpha: 0.15 });
      gsap.to(split.words, {
        autoAlpha: 1,
        ease: "none",
        duration: 0.8,
        stagger: 0.4,
        scrollTrigger: {
          trigger: quoteEl,
          start: "top 80%",
          end: "center 55%",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [quote.statement] }
  );

  return (
    <section ref={root} className="section bg-gray-50">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section label */}
          <p
            data-reveal
            className="text-sm tracking-widest uppercase text-gray-500 mb-6"
          >
            {quote.kicker}
          </p>

          {/* Vision Statement */}
          <p
            ref={quoteRef}
            className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-gray-800"
          >
            {quote.statement}
          </p>
        </div>
      </div>
    </section>
  );
}
