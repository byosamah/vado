"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const services = [
  {
    id: "architectural-design",
    label: "Architectural Design",
    image: "/images/service-exterior.webp",
    description:
      "Creative architectural solutions that balance aesthetics, function, and context — turning vision into architecture.",
  },
  {
    id: "engineering-design",
    label: "Engineering Design",
    image: "/images/service-urban.webp",
    description:
      "Integrated structural and MEP engineering ensuring safety, efficiency, and sustainability in every project.",
  },
  {
    id: "project-management",
    label: "Project Management",
    image: "/images/service-interior.webp",
    description:
      "Comprehensive project management from concept to completion, ensuring quality, schedule, and budget alignment.",
  },
  {
    id: "site-supervision",
    label: "Site Supervision",
    image: "/images/service-residential.webp",
    description:
      "Dedicated on-site supervision delivering precision, consistency, and construction excellence.",
  },
];

export default function ServicesTabs() {
  const [expandedId, setExpandedId] = useState<string | null>("site-supervision");
  const uid = useId();
  const toggle = (id: string) =>
    setExpandedId((curr) => (curr === id ? null : id));

  return (
    <section id="services" className="bg-background">
      <div className="border-t border-[var(--color-border)]" />

      {/* Accessible label for the section — visually hidden keeps design */}
      <h2 className="sr-only">Services</h2>

      {/* Desktop: horizontal accordion.
          Header is its own <button> strip on the left; content is a sibling region —
          no more absolute-overlay button / pointer-events juggling. */}
      <div className="hidden md:grid h-[min(66vh,640px)] min-h-[500px] grid-flow-col auto-cols-fr">
        {services.map((service) => {
          const isExpanded = expandedId === service.id;
          const panelId = `${uid}-${service.id}-panel`;
          const btnId = `${uid}-${service.id}-button`;
          return (
            <div
              key={service.id}
              className={`relative border-l border-[var(--color-border)] overflow-hidden flex transition-[grid-column] duration-500 ease-out ${
                isExpanded ? "col-span-4" : "col-span-1"
              }`}
              style={{ gridColumn: isExpanded ? "span 4" : "span 1", willChange: "grid-column" }}
            >
              <button
                id={btnId}
                type="button"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => toggle(service.id)}
                className="relative flex items-end p-6 min-w-[72px] cursor-pointer text-left hover:bg-[var(--color-surface)]/50 transition-colors"
              >
                <span className="sr-only">
                  {isExpanded ? "Collapse" : "Expand"} {service.label}
                </span>
                <h3
                  className="text-2xl font-light tracking-wide whitespace-nowrap"
                  style={{
                    writingMode: "vertical-lr",
                    transform: "rotate(180deg)",
                  }}
                  aria-hidden="true"
                >
                  {service.label}
                </h3>
                <span
                  className="absolute top-6 right-6 text-2xl font-light text-[var(--color-text-muted)]"
                  aria-hidden="true"
                >
                  {isExpanded ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="flex-1 flex gap-8 p-6 pt-12 pr-12"
                  >
                    <div className="w-1/2 h-full relative">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 40vw, 30vw"
                      />
                    </div>
                    <div className="w-1/2 flex flex-col justify-center">
                      <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical accordion */}
      <div className="md:hidden">
        {services.map((service) => {
          const isExpanded = expandedId === service.id;
          const panelId = `${uid}-m-${service.id}-panel`;
          const btnId = `${uid}-m-${service.id}-button`;
          return (
            <div key={service.id} className="border-b border-[var(--color-border)]">
              <button
                id={btnId}
                type="button"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => toggle(service.id)}
                className="w-full flex items-center justify-between p-6 min-h-[var(--touch-target)]"
              >
                <h3 className="text-xl font-light">{service.label}</h3>
                <span className="text-2xl font-light text-[var(--color-text-muted)]" aria-hidden="true">
                  {isExpanded ? "−" : "+"}
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out"
                style={{
                  gridTemplateRows: isExpanded ? "1fr" : "0fr",
                  opacity: isExpanded ? 1 : 0,
                }}
              >
                <div className="min-h-0">
                  <div className="px-6 pb-6 space-y-4">
                    <div className="relative w-full h-48">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                    <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
