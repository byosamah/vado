"use client";

/**
 * Quote Block Component
 * =====================
 * Large typography quote section with elegant centered styling.
 */

import { motion } from "framer-motion";
import { fadeInUp, defaultViewport } from "@/lib/animations";

export default function QuoteBlock() {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
        >
          {/* Quote Text */}
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-gray-800">
            "To shape meaningful spaces through thoughtful design and engineering
            excellence—creating environments that inspire, serve, and sustain
            communities."
          </blockquote>

          {/* Attribution */}
          <div className="mt-8">
            <p className="text-sm tracking-widest uppercase text-gray-600">
              — VADO Vision Statement
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
