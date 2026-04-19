"use client";

/**
 * Feature Cards Component
 * =======================
 * Two equal-width cards showcasing key features/services.
 *
 * Each card has:
 * - Large background image
 * - Overlay gradient
 * - Title and description text
 * - Hover scale effect
 */

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";

const features = [
  {
    id: 1,
    title: "Architectural Design",
    description:
      "Comprehensive architectural solutions that balance form, function, and identity, transforming concepts into refined, buildable spaces.",
    image: "/images/feature-1.png",
  },
  {
    id: 2,
    title: "Engineering Excellence",
    description:
      "Integrated engineering services across structural, mechanical, electrical, and plumbing disciplines to ensure safe and sustainable performance.",
    image: "/images/feature-2.png",
  },
];

export default function FeatureCards() {
  return (
    <section className="section bg-white">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={fadeInUp}
              className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
            >
              {/* Background Image */}
              <div
                className="
                  absolute inset-0
                  bg-cover bg-center bg-no-repeat
                  transition-transform duration-700 ease-out
                  group-hover:scale-105
                "
                style={{ backgroundImage: `url(${feature.image})` }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-base md:text-lg max-w-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
