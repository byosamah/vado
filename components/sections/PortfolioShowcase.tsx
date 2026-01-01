"use client";

/**
 * Portfolio Showcase Component
 * ============================
 * Split layout with interactive sidebar and Swiper carousel.
 *
 * Features:
 * - Left sidebar: "Our work" label + clickable project titles
 * - Right: Swiper carousel with portfolio images
 * - Clicking title navigates to that slide
 */

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight, defaultViewport } from "@/lib/animations";

import "swiper/css";
import "swiper/css/effect-fade";

const portfolioItems = [
  {
    id: 1,
    title: "Al Mashraq Strip Mall",
    category: "Commercial",
    image: "/images/portfolio-almashraq.jpg",
  },
  {
    id: 2,
    title: "The Feel of Villa Yun",
    category: "Interiors",
    image: "/images/portfolio-1.png",
  },
  {
    id: 3,
    title: "Nomus Art House",
    category: "Exteriors",
    image: "/images/portfolio-2.png",
  },
];

export default function PortfolioShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  // Handle clicking on a title - navigate to that slide
  const handleTitleClick = (index: number) => {
    if (swiperRef) {
      swiperRef.slideToLoop(index);
    }
  };

  return (
    <section id="portfolio" className="section bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Sidebar - Project Titles */}
          <motion.div
            className="lg:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInLeft}
          >
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-12">
              <span className="w-2 h-2 bg-black rounded-full" />
              <span className="text-sm tracking-widest uppercase text-gray-600">
                Our work
              </span>
            </div>

            {/* Project Titles List */}
            <div className="space-y-6">
              {portfolioItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleTitleClick(index)}
                  className={`
                    block text-left w-full
                    text-2xl md:text-3xl font-light
                    transition-colors duration-300
                    ${activeIndex === index
                      ? "text-black"
                      : "text-gray-400 hover:text-gray-600"
                    }
                  `}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* View All Link */}
            <div className="mt-12">
              <a
                href="#"
                className="
                  text-sm tracking-widest uppercase
                  underline-hover
                  text-gray-600 hover:text-black
                  transition-colors duration-300
                "
              >
                View all projects
              </a>
            </div>
          </motion.div>

          {/* Right - Image Carousel */}
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
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              onSwiper={setSwiperRef}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="w-full aspect-[4/3]"
            >
              {portfolioItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Category overlay */}
                    <div className="absolute bottom-6 left-6">
                      <span className="text-sm tracking-widest uppercase text-white/80">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
