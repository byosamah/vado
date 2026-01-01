"use client";

/**
 * Services Tabs Component
 * =======================
 * Interactive tabbed section showcasing different services.
 *
 * Features:
 * - Four tabs: Urban Planning, Exterior, Residential, Interior
 * - Each tab shows: Large image + description + read more link
 * - Fade transition on content swap
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, fadeInUp, defaultViewport } from "@/lib/animations";

const services = [
  {
    id: "project-management",
    label: "Project Management",
    image: "/images/service-urban.png",
    description:
      "Full-cycle project management ensures seamless coordination, cost control, time efficiency, and strict adherence to quality standards. We oversee every phase from concept to completion.",
  },
  {
    id: "architectural-design",
    label: "Architectural Design",
    image: "/images/service-exterior.png",
    description:
      "Comprehensive architectural solutions that balance form, function, and identity, transforming concepts into refined, buildable spaces that inspire and endure.",
  },
  {
    id: "site-supervision",
    label: "Site Supervision",
    image: "/images/service-residential.png",
    description:
      "Dedicated on-site supervision guarantees precise execution, compliance, and construction excellence. Our team ensures every detail meets the highest standards.",
  },
  {
    id: "engineering-design",
    label: "Engineering Design",
    image: "/images/service-interior.png",
    description:
      "Integrated engineering services across structural, mechanical, electrical, and plumbing disciplines to ensure safe, efficient, and sustainable building performance.",
  },
];

export default function ServicesTabs() {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const activeService = services.find((s) => s.id === activeTab)!;

  return (
    <section id="services" className="section bg-white">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-black rounded-full" />
            <span className="text-sm tracking-widest uppercase text-gray-600">
              Services
            </span>
          </div>
          <h2>What we do</h2>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          className="flex flex-wrap gap-4 md:gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
        >
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`
                text-lg md:text-xl font-light
                pb-2 border-b-2
                transition-all duration-300
                ${activeTab === service.id
                  ? "text-black border-black"
                  : "text-gray-400 border-transparent hover:text-gray-600"
                }
              `}
            >
              {service.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <div className="image-hover-scale">
              <img
                src={activeService.image}
                alt={activeService.label}
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-600">
                {activeService.description}
              </p>
              <a
                href="#"
                className="
                  inline-block
                  text-sm tracking-widest uppercase
                  underline-hover
                  text-gray-800 hover:text-black
                  transition-colors duration-300
                "
              >
                Read more
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
