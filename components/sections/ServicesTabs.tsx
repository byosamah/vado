"use client";

/**
 * Services Accordion Component
 * ============================
 * Vertical accordion showcasing VADO services.
 *
 * Design:
 * - 4 columns with vertical text titles
 * - +/− icons for expand/collapse
 * - Only one item expanded at a time
 * - Smooth width animation on expand
 * - Portrait image + description in expanded state
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const services = [
  {
    id: "architectural-design",
    label: "Architectural Design",
    image: "/images/service-exterior.png",
    description:
      "Creative architectural solutions that balance aesthetics, function, and context turning vision into architecture.",
  },
  {
    id: "engineering-design",
    label: "Engineering Design",
    image: "/images/service-urban.png",
    description:
      "Integrated structural and MEP engineering ensuring safety, efficiency, and sustainability in every project.",
  },
  {
    id: "project-management",
    label: "Project Management",
    image: "/images/service-interior.png",
    description:
      "Comprehensive project management from concept to completion, ensuring quality, schedule, and budget alignment.",
  },
  {
    id: "site-supervision",
    label: "Site Supervision",
    image: "/images/service-residential.png",
    description:
      "Dedicated on-site supervision delivering precision, consistency, and construction excellence.",
  },
];

export default function ServicesTabs() {
  // Track which service is expanded (default: last one like vado.sa)
  const [expandedId, setExpandedId] = useState<string | null>("site-supervision");

  const handleToggle = (id: string) => {
    // If clicking the expanded one, collapse it; otherwise expand the clicked one
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="bg-white">
      {/* Top border */}
      <div className="border-t border-gray-200" />

      {/* Desktop: Horizontal accordion */}
      <div className="hidden md:flex h-[66vh] min-h-[500px]">
        {services.map((service) => {
          const isExpanded = expandedId === service.id;

          return (
            <div
              key={service.id}
              onClick={() => handleToggle(service.id)}
              className={`
                relative border-l border-gray-200 cursor-pointer
                transition-all duration-500 ease-out overflow-hidden
                ${isExpanded ? "flex-[4]" : "flex-[1]"}
              `}
            >
              {/* +/− Icon - Top Right */}
              <div className="absolute top-6 right-6 z-10">
                <span className="text-2xl font-light text-gray-400">
                  {isExpanded ? "−" : "+"}
                </span>
              </div>

              {/* Content Container */}
              <div className="flex h-full">
                {/* Vertical Title - Always visible */}
                <div className="flex items-end justify-start p-6 min-w-[60px]">
                  <h3
                    className="text-2xl font-light tracking-wide whitespace-nowrap"
                    style={{
                      writingMode: "vertical-lr",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {service.label}
                  </h3>
                </div>

                {/* Expanded Content - Image + Description */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="flex flex-1 gap-8 p-6 pr-12 pt-12"
                    >
                      {/* Image */}
                      <div className="w-1/2 h-full relative">
                        <Image
                          src={service.image}
                          alt={service.label}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>

                      {/* Description */}
                      <div className="w-1/2 flex flex-col justify-center">
                        <p className="text-base leading-relaxed text-gray-600 mb-6">
                          {service.description}
                        </p>
                        <a
                          href="#"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm tracking-wide underline text-gray-800 hover:text-black transition-colors"
                        >
                          read more
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: Vertical accordion */}
      <div className="md:hidden">
        {services.map((service) => {
          const isExpanded = expandedId === service.id;

          return (
            <div
              key={service.id}
              className="border-b border-gray-200"
            >
              {/* Header */}
              <button
                onClick={() => handleToggle(service.id)}
                className="w-full flex items-center justify-between p-6"
              >
                <h3 className="text-xl font-light">{service.label}</h3>
                <span className="text-2xl font-light text-gray-400">
                  {isExpanded ? "−" : "+"}
                </span>
              </button>

              {/* Expandable Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4">
                      <div className="relative w-full h-48">
                        <Image
                          src={service.image}
                          alt={service.label}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                      <p className="text-base leading-relaxed text-gray-600">
                        {service.description}
                      </p>
                      <a
                        href="#"
                        className="inline-block text-sm tracking-wide underline text-gray-800"
                      >
                        read more
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
