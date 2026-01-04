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
 * - Clicking image opens project detail page
 */

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInLeft, fadeInRight, defaultViewport } from "@/lib/animations";
import { getAllProjects } from "@/lib/projects";

import "swiper/css";
import "swiper/css/effect-fade";

// Get projects from centralized data
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
                <div key={item.id}>
                  <Link
                    href={`/projects/${item.slug}`}
                    onMouseEnter={() => handleTitleClick(index)}
                    className={`
                      block text-left w-full
                      text-2xl md:text-3xl font-light
                      transition-colors duration-300
                      hover:text-black
                      ${activeIndex === index ? "text-black" : "text-gray-400"}
                    `}
                  >
                    {item.title}
                  </Link>
                </div>
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
                  <Link
                    href={`/projects/${item.slug}`}
                    className="relative block w-full h-full overflow-hidden group"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Category overlay */}
                    <div className="absolute bottom-6 left-6">
                      <span className="text-sm tracking-widest uppercase text-white/80">
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
