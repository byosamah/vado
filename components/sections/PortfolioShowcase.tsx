"use client";

/**
 * Portfolio Showcase Component
 * ============================
 * Split layout with an interactive title list and a Swiper carousel.
 *
 * Features:
 * - Sidebar: "Our work" label + clickable project titles
 * - Carousel: Swiper with portfolio images
 * - Hovering a title navigates to that slide
 * - Clicking a title or image opens the project detail page
 *
 * Animation (GSAP via useReveals on the section root):
 * - The sidebar label and each project title Link carry data-reveal and
 *   rise/fade in on scroll, with the title Links auto-staggering as a group.
 *   (The "View all projects" link is currently commented out: few projects for
 *   now. The /projects index it pointed to still exists and is linked in the footer.)
 * - The carousel column uses data-reveal="scale" to scale-fade in.
 * - Reduced-motion is honoured by the reveal system: content stays fully
 *   visible. Swiper (fade effect, loop/rewind, autoplay) and all
 *   interactivity are untouched by the animation layer.
 *
 * RTL: Swiper receives `dir`, and the category caption uses logical `start-6`
 * so it stays in the leading corner of the image in both directions.
 */

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Link from "next/link";
import Image from "next/image";
import { useReveals } from "@/lib/gsap/reveals";
import { getDirection, localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Project } from "@/lib/projects";

interface PortfolioShowcaseProps {
  lang: Locale;
  portfolio: Dictionary["home"]["portfolio"];
  projects: Project[];
}

export default function PortfolioShowcase({
  lang,
  portfolio,
  projects,
}: PortfolioShowcaseProps) {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  // Swiper's loop mode needs more than two slides to duplicate cleanly.
  // Below that, rewind gives the same endless feel without the blank frames.
  const useLoop = projects.length > 2;

  // Handle hovering a title - navigate to that slide
  const handleTitleHover = (index: number) => {
    if (swiperRef) {
      swiperRef.slideToLoop(index);
    }
  };

  return (
    <section ref={root} id="portfolio" className="section bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Sidebar - Project Titles */}
          <div className="lg:col-span-4">
            {/* Section Label */}
            <div data-reveal className="flex items-center gap-3 mb-12">
              <span className="w-2 h-2 bg-black rounded-full" />
              <span className="text-sm tracking-widest uppercase text-gray-600">
                {portfolio.kicker}
              </span>
            </div>

            {/* Project Titles List */}
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={project.slug}>
                  <Link
                    href={localePath(lang, `/projects/${project.slug}`)}
                    onMouseEnter={() => handleTitleHover(index)}
                    data-reveal
                    className={`
                      block text-start w-full py-2 -my-2
                      text-2xl md:text-3xl font-light
                      transition-colors duration-300
                      hover:text-black
                      ${activeIndex === index ? "text-black" : "text-gray-400"}
                    `}
                  >
                    {project.title}
                  </Link>
                </div>
              ))}
            </div>

            {/* View All Link - TEMPORARILY HIDDEN: only a few projects for now,
                so a "view all" link is redundant (the sidebar already lists them
                all). The /projects index page still exists and is linked from the
                footer. Uncomment to restore when there are more projects.
            <div className="mt-12">
              <Link
                href={localePath(lang, "/projects")}
                data-reveal
                className="
                  text-sm tracking-widest uppercase
                  underline-hover
                  text-gray-600 hover:text-black
                  transition-colors duration-300
                "
              >
                {portfolio.viewAll}
              </Link>
            </div>
            */}
          </div>

          {/* Image Carousel */}
          <div data-reveal="scale" className="lg:col-span-8">
            <Swiper
              key={lang}
              dir={getDirection(lang)}
              modules={[Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              loop={useLoop}
              rewind={!useLoop}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              onSwiper={setSwiperRef}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="w-full aspect-[4/3]"
            >
              {projects.map((project) => (
                <SwiperSlide key={project.slug}>
                  <Link
                    href={localePath(lang, `/projects/${project.slug}`)}
                    className="relative block w-full h-full overflow-hidden group"
                  >
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      loading="lazy"
                    />
                    {/* Category overlay */}
                    <div className="absolute bottom-6 start-6 z-10">
                      <span className="text-sm tracking-widest uppercase text-white/80">
                        {project.category}
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
