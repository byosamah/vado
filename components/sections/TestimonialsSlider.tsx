"use client";

/**
 * Testimonials Slider Component
 * =============================
 * Carousel of client testimonials using Swiper.
 *
 * Features:
 * - Auto-play with 4 second intervals
 * - Loop enabled
 * - Quote + Author name + Role
 */

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { fadeInUp, defaultViewport } from "@/lib/animations";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    quote:
      "Working with Hiroshi was a transformative experience. They understood our vision and translated it into a stunning architectural reality that exceeded all our expectations.",
    author: "John Mitchell",
    role: "Homeowner",
  },
  {
    id: 2,
    quote:
      "The attention to detail and commitment to sustainability made Hiroshi the perfect partner for our urban development project. The results speak for themselves.",
    author: "Sarah Chen",
    role: "Property Developer",
  },
  {
    id: 3,
    quote:
      "From concept to completion, the team delivered exceptional work. Their innovative approach to interior design created spaces that truly inspire.",
    author: "Michael Torres",
    role: "CEO, Torres Industries",
  },
];

export default function TestimonialsSlider() {
  return (
    <section className="section bg-gray-900">
      <div className="container">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
        >
          {/* Section Label */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="w-2 h-2 bg-white rounded-full" />
            <span className="text-sm tracking-widest uppercase text-white/60">
              Testimonials
            </span>
          </div>

          {/* Testimonials Swiper */}
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="text-center px-4">
                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white mb-8">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <p className="text-lg text-white font-light">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-white/60">
                    {testimonial.role}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Custom styles for dark background pagination */}
      <style jsx global>{`
        .testimonials-swiper .swiper-pagination {
          margin-top: 40px;
          position: relative;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: white;
        }
      `}</style>
    </section>
  );
}
