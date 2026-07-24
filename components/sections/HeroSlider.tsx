"use client";

/**
 * Hero Slider Component
 * =====================
 * Full-screen hero slider using Swiper.js with fade effect, choreographed with GSAP.
 *
 * Slide COPY is not duplicated here: each slide names a project slug and its own
 * hero crop, then reads the title and category off the resolved project list.
 * That way a project renamed in lib/projects.ts renames itself in the hero, in
 * both languages, with no second edit.
 *
 * Motion (GSAP, bespoke via useGSAP scoped to the <section> root):
 * - Intro-on-load timeline (once): the tagline reveals, then the ACTIVE slide's
 *   category (fade + y), then its title as a SplitText masked LINE reveal.
 *   All intro targets live inside ".swiper-slide-active".
 * - Slide change (onSlideChangeTransitionStart): the NEW active slide's category +
 *   title re-animate as whole BLOCKS (fade + y). SplitText is NOT re-run per change,
 *   keeping the handler robust. Wired through a contextSafe callback.
 * - Ken Burns: the active slide's <Image> drifts scale 1.08 → 1 over ~6s (ease none),
 *   retriggered for the new active image on every slide change.
 * - Scroll hand-off: a scrubbed ScrollTrigger drifts the slide content up + fades it
 *   out as the hero leaves the viewport (yPercent + autoAlpha, top top → bottom top).
 * - prefers-reduced-motion: all GSAP is skipped and every element stays fully visible;
 *   Swiper still autoplays.
 *
 * All hero motion is vertical (y) or scale, so none of it needs mirroring; only
 * Swiper's own direction does, via the `dir` prop.
 */

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";
import {
  useGSAP,
  gsap,
  SplitText,
  EASE,
  DUR,
  prefersReducedMotion,
} from "@/lib/gsap/gsap";
import { getDirection, type Locale } from "@/lib/i18n/config";
import { t, type Dictionary } from "@/lib/i18n/get-dictionary";
import type { Project } from "@/lib/projects";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

/**
 * Which project each hero slide shows, and which crop of it. Deliberately not
 * the project's own heroImage: these are wide, atmospheric frames chosen to
 * work full-bleed behind the title.
 */
const HERO_SLIDES = [
  {
    slug: "al-hamra-waterfront",
    image: "/images/projects/al-hamra-waterfront/gallery-01.webp",
  },
  { slug: "matal", image: "/images/projects/matal/gallery-07.webp" },
  {
    slug: "courtyard-villa",
    image: "/images/projects/courtyard-villa/gallery-01.webp",
  },
  { slug: "tholal", image: "/images/projects/tholal/gallery-08.webp" },
];

interface HeroSliderProps {
  lang: Locale;
  hero: Dictionary["home"]["hero"];
  projects: Project[];
}

export default function HeroSlider({ lang, hero, projects }: HeroSliderProps) {
  const root = useRef<HTMLElement>(null);

  // Pair each slide with its project. A slide whose project was deleted from
  // lib/projects.ts drops out rather than rendering an empty title.
  const slides = HERO_SLIDES.map((slide) => {
    const project = projects.find((p) => p.slug === slide.slug);
    return project ? { ...slide, project } : null;
  }).filter((slide): slide is NonNullable<typeof slide> => slide !== null);

  const { contextSafe } = useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const rootEl = root.current;
      if (!rootEl) return;

      const active = rootEl.querySelector(".swiper-slide-active");
      const tagline = rootEl.querySelector<HTMLElement>("[data-hero-tagline]");
      const cat = active?.querySelector<HTMLElement>("[data-hero-cat]");
      const title = active?.querySelector<HTMLElement>("[data-hero-title]");
      const activeImg = rootEl.querySelector<HTMLElement>(".swiper-slide-active img");

      // --- Intro-on-load timeline: tagline → category → title (masked lines) ---
      const intro = gsap.timeline({ defaults: { ease: EASE.out } });

      if (tagline) {
        gsap.set(tagline, { autoAlpha: 0, y: 20 });
        intro.to(tagline, { autoAlpha: 1, y: 0, duration: DUR.base });
      }

      if (cat) {
        gsap.set(cat, { autoAlpha: 0, y: 24 });
        intro.to(cat, { autoAlpha: 1, y: 0, duration: DUR.base }, "-=0.45");
      }

      if (title) {
        const split = SplitText.create(title, {
          type: "lines",
          mask: "lines",
          linesClass: "gsap-line",
        });
        gsap.set(title, { autoAlpha: 1 });
        gsap.set(split.lines, { yPercent: 115 });
        intro.to(
          split.lines,
          { yPercent: 0, duration: DUR.slow, stagger: 0.12 },
          "-=0.55"
        );
      }

      // --- Ken Burns on the first active image ---
      if (activeImg) {
        gsap.fromTo(
          activeImg,
          { scale: 1.08 },
          { scale: 1, duration: 6, ease: "none" }
        );
      }

      // --- Scroll hand-off: content drifts up + fades as the hero leaves ---
      const contents = gsap.utils.toArray<HTMLElement>("[data-hero-content]", rootEl);
      if (contents.length) {
        gsap.to(contents, {
          yPercent: -30,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: rootEl,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: root, dependencies: [lang] }
  );

  // Re-animate the NEW active slide's category + title as blocks (no re-split),
  // and retrigger Ken Burns on the new active image. Wrapped so its tweens join
  // the useGSAP context for automatic cleanup.
  const handleSlideChange = contextSafe(() => {
    if (prefersReducedMotion()) return;
    const rootEl = root.current;
    if (!rootEl) return;

    const active = rootEl.querySelector(".swiper-slide-active");
    if (!active) return;

    const cat = active.querySelector<HTMLElement>("[data-hero-cat]");
    const title = active.querySelector<HTMLElement>("[data-hero-title]");
    const img = active.querySelector<HTMLElement>("img");

    const blocks = [cat, title].filter(Boolean) as HTMLElement[];
    if (blocks.length) {
      gsap.fromTo(
        blocks,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: DUR.base,
          ease: EASE.out,
          stagger: 0.08,
          overwrite: true,
        }
      );
    }

    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.08 },
        { scale: 1, duration: 6, ease: "none", overwrite: true }
      );
    }
  });

  // h-dvh (not h-screen/100vh): on mobile the browser toolbar shrinks the
  // visible viewport, and 100vh would push the bottom-anchored slide text
  // and pagination below the fold on load.
  return (
    <section ref={root} className="relative h-dvh w-full">
      {/* VADO Tagline - top of the hero */}
      <div className="absolute top-32 left-0 right-0 z-10">
        <div className="container">
          <span
            data-hero-tagline
            className="text-sm tracking-widest uppercase text-white/70"
          >
            {hero.tagline}
          </span>
        </div>
      </div>

      <Swiper
        // Swiper caches direction at init, so the key forces a clean re-init
        // if the tree is ever reused across a locale change.
        key={lang}
        dir={getDirection(lang)}
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        onSlideChangeTransitionStart={handleSlideChange}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.slug}>
            {/* Slide Container */}
            <div className="relative h-full w-full">
              {/* Background Image - Optimized with Next.js Image */}
              <Image
                src={slide.image}
                alt={t(hero.slideAlt, {
                  title: slide.project.title,
                  category: slide.project.category,
                })}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />

              {/* Dark Gradient Overlay - for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Content Container - anchored to the bottom */}
              <div data-hero-content className="absolute bottom-24 left-0 right-0">
                <div className="container">
                  {/* Category Tag */}
                  <span
                    data-hero-cat
                    className="
                      inline-block mb-4
                      text-sm tracking-widest uppercase
                      text-white/80
                    "
                  >
                    {slide.project.category}
                  </span>

                  {/* Title */}
                  <h2
                    data-hero-title
                    className="text-white max-w-2xl"
                  >
                    {slide.project.title}
                  </h2>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
