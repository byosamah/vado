"use client";

/**
 * Reveal Engine
 * =============
 * A single hook that reads `data-*` attributes inside a scoped section and
 * wires up scroll-triggered animations. Sections stay declarative — they just
 * tag elements — so the whole site animates from one consistent vocabulary.
 *
 * Attribute vocabulary (add these in the section's JSX):
 *  - data-reveal            → fade + slide up on enter (default direction "up")
 *  - data-reveal="left"     → fade in from the left
 *  - data-reveal="right"    → fade in from the right
 *  - data-reveal="scale"    → fade + gentle scale up
 *  - data-headline          → SplitText masked line reveal (for h1/h2/h3)
 *  - data-img-reveal        → clip-path wipe + inner <img> scale settle
 *  - data-parallax="14"     → scrubbed vertical parallax (number = % drift)
 *
 * Reveals batch together, so siblings entering at once stagger naturally.
 * Respects prefers-reduced-motion by showing everything with no motion.
 */

import {
  useGSAP,
  gsap,
  ScrollTrigger,
  SplitText,
  EASE,
  DUR,
  prefersReducedMotion,
  directionSign,
} from "./gsap";
import type { RefObject } from "react";

export function useReveals(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      const headlines = gsap.utils.toArray<HTMLElement>("[data-headline]", root);
      const imgReveals = gsap.utils.toArray<HTMLElement>("[data-img-reveal]", root);
      const parallaxEls = gsap.utils.toArray<HTMLElement>("[data-parallax]", root);

      // Reduced motion: reveal everything instantly, no transforms, no splits.
      if (prefersReducedMotion()) {
        gsap.set([...reveals, ...headlines, ...imgReveals], {
          autoAlpha: 1,
          clearProps: "transform,clipPath,opacity,visibility",
        });
        return;
      }

      // 1) Fade / slide reveals — batched so neighbours stagger together.
      //    "left" and "right" are reader-relative, not screen-relative: in an
      //    RTL document the sign flips so content still enters from the side
      //    the layout put it on.
      const sign = directionSign();
      reveals.forEach((el) => {
        const dir = el.dataset.reveal || "up";
        const from: gsap.TweenVars = { autoAlpha: 0 };
        if (dir === "up" || dir === "") from.y = 30;
        else if (dir === "left") from.x = -40 * sign;
        else if (dir === "right") from.x = 40 * sign;
        else if (dir === "scale") from.scale = 0.96;
        gsap.set(el, from);
      });
      if (reveals.length) {
        ScrollTrigger.batch(reveals, {
          start: "top 86%",
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: DUR.base,
              ease: EASE.out,
              stagger: 0.12,
              overwrite: true,
            }),
        });
      }

      // 2) Headlines — masked line reveal via SplitText.
      headlines.forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "gsap-line",
        });
        gsap.set(el, { autoAlpha: 1 });
        gsap.set(split.lines, { yPercent: 115 });
        gsap.to(split.lines, {
          yPercent: 0,
          duration: DUR.slow,
          ease: EASE.out,
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // 3) Image reveals — clip-path wipe up + inner image scale settle.
      //    clearProps on completion hands transform control back to CSS so any
      //    `group-hover:scale-*` on the image keeps working after the reveal.
      imgReveals.forEach((el) => {
        const img = el.querySelector("img");
        gsap.set(el, { autoAlpha: 1, clipPath: "inset(0 0 100% 0)" });
        if (img) gsap.set(img, { scale: 1.25 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 84%" },
        });
        tl.to(el, {
          clipPath: "inset(0 0 0% 0)",
          duration: DUR.slow,
          ease: EASE.inOut,
          clearProps: "clipPath",
        });
        if (img)
          tl.to(
            img,
            { scale: 1, duration: DUR.slow + 0.3, ease: EASE.out, clearProps: "scale" },
            0
          );
      });

      // 4) Parallax — scrubbed drift as the element crosses the viewport.
      parallaxEls.forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "12");
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    },
    { scope }
  );
}
