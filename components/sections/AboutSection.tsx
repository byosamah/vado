"use client";

/**
 * About Section Component
 * =======================
 * Two-column layout with text content on left, image on right.
 *
 * Layout:
 * - Left: Subtitle with dot, H2 headline, description, button
 * - Right: Large image with scroll-triggered fade-in
 */

import { motion } from "framer-motion";
import { fadeInUp, fadeInRight, defaultViewport } from "@/lib/animations";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-8"
          >
            {/* Subtitle with dot indicator */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              {/* Dot indicator - matches original design */}
              <span className="w-2 h-2 bg-black rounded-full" />
              <span className="text-sm tracking-widest uppercase text-gray-600">
                About VADO
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2 variants={fadeInUp}>
              Where Vision
              <br />
              Becomes
              <br />
              Architecture.
            </motion.h2>

            {/* Description Paragraph */}
            <motion.p
              variants={fadeInUp}
              className="text-lg leading-relaxed max-w-md"
            >
              VADO (VISION Arch. & Engineering Consultants) is a multidisciplinary
              consultancy specialized in architecture, engineering, and project
              development. With decades of experience, VADO delivers innovative,
              functional, and sustainable solutions tailored to meet the evolving
              needs of communities and clients across Saudi Arabia.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={fadeInUp}>
              <Link
                href="#services"
                className="
                  inline-block
                  text-sm tracking-widest uppercase
                  border-b border-black pb-1
                  hover:text-gray-600 hover:border-gray-600
                  transition-colors duration-300
                "
              >
                View Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInRight}
            className="image-hover-scale"
          >
            <img
              src="/images/about.png"
              alt="Modern architecture interior"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
