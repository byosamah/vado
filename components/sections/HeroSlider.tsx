"use client";

/**
 * Hero Slider Component
 * =====================
 * Full-screen hero slider using Swiper.js with fade effect.
 *
 * Features:
 * - Fullscreen background images (100vh)
 * - Fade transition between slides
 * - Auto-play with 5 second intervals
 * - Bottom-left positioned title and category
 * - Gradient overlay for text readability
 */

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Hero slides data - VADO architecture projects
const slides = [
  {
    id: 1,
    image: "/images/hero-1.png",
    title: "Al Mashraq Strip Mall",
    category: "Commercial",
  },
  {
    id: 2,
    image: "/images/hero-2.png",
    title: "Urban Planning Excellence",
    category: "Design",
  },
  {
    id: 3,
    image: "/images/hero-3.png",
    title: "Residential Innovation",
    category: "Architecture",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative h-screen w-full">
      {/* VADO Tagline - Top Left */}
      <div className="absolute top-32 left-0 right-0 z-10">
        <div className="container">
          <span className="text-sm tracking-widest uppercase text-white/70">
            Est. 1994 — Al Khobar
          </span>
        </div>
      </div>

      <Swiper
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
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Slide Container */}
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Dark Gradient Overlay - for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Content Container - Bottom Left Position */}
              <motion.div
                className="absolute bottom-24 left-0 right-0"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <div className="container">
                  {/* Category Tag */}
                  <motion.span
                    variants={fadeInUp}
                    className="
                      inline-block mb-4
                      text-sm tracking-widest uppercase
                      text-white/80
                    "
                  >
                    {slide.category}
                  </motion.span>

                  {/* Title */}
                  <motion.h2
                    variants={fadeInUp}
                    className="
                      text-4xl md:text-5xl lg:text-6xl
                      font-light text-white
                      max-w-2xl
                    "
                  >
                    {slide.title}
                  </motion.h2>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styles - positioned bottom center */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 40px !important;
        }
      `}</style>
    </section>
  );
}
