"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer } from "@/lib/animations";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  { id: 1, image: "/images/hero-1.webp", title: "Modern Villa Design", category: "Residential" },
  { id: 2, image: "/images/hero-2.webp", title: "Sculptural Excellence", category: "Art & Design" },
  { id: 3, image: "/images/hero-3.webp", title: "Sunset Serenity", category: "Sculpture" },
  { id: 4, image: "/images/hero-4.webp", title: "Contemporary Living", category: "Architecture" },
];

export default function HeroSlider() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative h-[100svh] w-full dark-surface" aria-label="Featured projects">
      <div className="absolute top-32 left-0 right-0 z-10">
        <div className="container">
          <span className="text-sm tracking-widest uppercase text-[var(--color-on-dark-muted)]">
            Est. 1994 — Al Khobar
          </span>
        </div>
      </div>

      {/* Visually hidden H1 keeps document outline correct while
          preserving the editorial look (per-slide titles are H2). */}
      <h1 className="sr-only">VADO — Architecture & Engineering Consultants</h1>

      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={
          prefersReducedMotion
            ? false
            : { delay: 5000, disableOnInteraction: false }
        }
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        a11y={{
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt=""
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-overlay-strong)] via-[var(--color-overlay-soft)] to-transparent" />
              <motion.div
                className="absolute bottom-24 left-0 right-0"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <div className="container">
                  <motion.span
                    variants={fadeInUp}
                    className="inline-block mb-4 text-sm tracking-widest uppercase text-white/80"
                  >
                    {slide.category}
                  </motion.span>
                  <motion.h2
                    variants={fadeInUp}
                    className="text-4xl md:text-5xl lg:text-6xl font-light text-white max-w-2xl"
                  >
                    {slide.title}
                  </motion.h2>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination {
          bottom: 40px !important;
        }
      `}</style>
    </section>
  );
}
