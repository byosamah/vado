"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fadeInLeft, fadeInRight, defaultViewport } from "@/lib/animations";
import { getAllProjects } from "@/lib/projects";

import "swiper/css";
import "swiper/css/effect-fade";

const portfolioItems = getAllProjects().map((project, index) => ({
  id: index + 1,
  slug: project.slug,
  title: project.title,
  category: project.category,
  image: project.heroImage,
}));

export default function PortfolioShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleTitleClick = (index: number) => {
    swiperRef?.slideToLoop(index);
  };

  return (
    <section id="portfolio" className="section bg-[var(--color-surface)]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <motion.div
            className="lg:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInLeft}
          >
            {/* Line indicator instead of the dot pattern used on other sections. */}
            <div className="flex items-center gap-4 mb-12">
              <span className="h-px w-10 bg-[var(--color-accent)]" aria-hidden="true" />
              <h2 className="text-sm tracking-widest uppercase font-semibold text-[var(--color-text-secondary)]">
                Our work
              </h2>
            </div>

            <ul className="space-y-6 list-none p-0 m-0" role="list">
              {portfolioItems.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <li key={item.id}>
                    <Link
                      href={`/projects/${item.slug}`}
                      onMouseEnter={() => handleTitleClick(index)}
                      onFocus={() => handleTitleClick(index)}
                      aria-current={isActive ? "true" : undefined}
                      className={`group relative flex items-center gap-3 text-left w-full text-2xl md:text-3xl transition-colors duration-300 hover:text-[var(--color-text-primary)] ${
                        isActive
                          ? "font-normal text-[var(--color-text-primary)]"
                          : "font-light text-[var(--color-text-muted)]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`inline-block h-px transition-all duration-300 ${
                          isActive
                            ? "w-6 bg-[var(--color-accent)]"
                            : "w-0 bg-transparent"
                        }`}
                      />
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            className="lg:col-span-8"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInRight}
          >
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              loop={true}
              autoplay={
                prefersReducedMotion
                  ? false
                  : { delay: 5000, disableOnInteraction: false }
              }
              onSwiper={setSwiperRef}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              a11y={{
                prevSlideMessage: "Previous project",
                nextSlideMessage: "Next project",
              }}
              className="w-full aspect-[4/3]"
            >
              {portfolioItems.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <Link
                    href={`/projects/${item.slug}`}
                    className="relative block w-full h-full overflow-hidden group"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority={index === 0}
                    />
                    <span
                      className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-overlay-strong)] to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-6 left-6 z-10">
                      <span className="text-sm tracking-widest uppercase text-white">
                        {item.category}
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
