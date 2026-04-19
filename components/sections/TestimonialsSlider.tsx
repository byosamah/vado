"use client";

/**
 * Testimonials Slider
 * Quotes attributed to the project clients shown in PortfolioShowcase.
 * Replace attributions with verified client statements before production.
 */

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { fadeInUp, defaultViewport } from "@/lib/animations";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    quote:
      "VADO’s architectural judgment stayed steady from concept through handover. Al Mashraq feels like it belonged here before we broke ground.",
    author: "Al Mashraq Development Co.",
    role: "Al Khobar — Commercial",
  },
  {
    id: 2,
    quote:
      "We asked for a home that felt calm rather than performative. Every detail of Villa Yun honors that brief.",
    author: "Private Commission",
    role: "Dhahran — Residential",
  },
  {
    id: 3,
    quote:
      "A gallery that is itself a gallery piece is a difficult ask. VADO carried the architectural language, the engineering, and the neighborhood conversations to a finished building that speaks for itself.",
    author: "Nomus Cultural Foundation",
    role: "Dammam — Cultural",
  },
];

export default function TestimonialsSlider() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section bg-[var(--color-surface-inverse)] dark-surface">
      <div className="container">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
        >
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="w-2 h-2 bg-[var(--color-on-dark)] rounded-full" aria-hidden="true" />
            <span className="text-sm tracking-widest uppercase text-[var(--color-on-dark-subtle)]">
              Testimonials
            </span>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            autoplay={
              prefersReducedMotion
                ? false
                : { delay: 6000, disableOnInteraction: false }
            }
            pagination={{ clickable: true }}
            a11y={{
              prevSlideMessage: "Previous testimonial",
              nextSlideMessage: "Next testimonial",
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <figure className="text-center px-4">
                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-[var(--color-on-dark)] mb-8">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption>
                    <p className="text-lg text-[var(--color-on-dark)] font-normal">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-[var(--color-on-dark-subtle)]">{testimonial.role}</p>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-pagination {
          margin-top: 40px;
          position: relative;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          background: var(--color-on-dark-subtle);
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: var(--color-on-dark);
        }
      `}</style>
    </section>
  );
}
