"use client";

/**
 * Services Links Component
 * ========================
 * Three-column row of text links with underline hover effect.
 *
 * Each link has:
 * - Underline that expands left-to-right on hover
 * - Subtle color transition
 */

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";
import Link from "next/link";

const links = [
  {
    id: 1,
    text: "Explore our projects",
    href: "#portfolio",
  },
  {
    id: 2,
    text: "Learn about our vision",
    href: "#about",
  },
  {
    id: 3,
    text: "Start your project today",
    href: "#contact",
  },
];

export default function ServicesLinks() {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {links.map((link) => (
            <motion.div key={link.id} variants={fadeInUp}>
              <Link
                href={link.href}
                className="
                  text-xl md:text-2xl font-light
                  text-gray-800 hover:text-black
                  underline-hover
                  transition-colors duration-300
                "
              >
                {link.text}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
