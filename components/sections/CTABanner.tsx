"use client";

/**
 * CTA Banner Component
 * ====================
 * Full-width call-to-action banner with background image.
 *
 * Content:
 * - H2: "Let's make something beautiful together"
 * - Button: "contact us"
 */

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section
      id="contact"
      className="relative py-32 md:py-48"
      style={{
        backgroundImage: `url(/images/cta-bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8"
          >
            Let's Build The Future.
          </motion.h2>

          <motion.div variants={fadeInUp}>
            <Link
              href="#contact"
              className="
                inline-block
                px-8 py-4
                text-sm tracking-widest uppercase
                text-white
                border border-white
                hover:bg-white hover:text-black
                transition-all duration-300
              "
            >
              Start Your Project
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
