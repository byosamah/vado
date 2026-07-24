"use client";

/**
 * Services Accordion Component
 * ============================
 * Vertical accordion showcasing VADO services, animated with the shared GSAP system.
 *
 * Design:
 * - 4 columns with vertical text titles
 * - +/− icons for expand/collapse (− turns black once a column is locked)
 * - Only one item expanded at a time (default: "site-supervision")
 * - Smooth CSS width transition on expand (flex-[4] / flex-[1])
 * - Portrait image + description in expanded state
 *
 * Desktop interaction — "hover to browse, click to lock":
 * - Hovering a column opens it (preview browsing).
 * - Clicking a column LOCKS onto it; hover is then ignored and it stays open
 *   even after the mouse leaves. Clicking a different column moves the lock;
 *   clicking the locked column again unlocks it (back to hover-browse).
 * - `activeId` = lockedId ?? hoveredId ?? DEFAULT — so something is always open.
 *
 * Mobile keeps a plain tap-to-toggle accordion (no hover on touch).
 *
 * Motion (GSAP):
 * - Section entrance: each desktop service column carries `data-reveal`, so the
 *   shared reveal engine (useReveals) rises them in on scroll.
 * - Desktop expanded panel: a bespoke useGSAP keyed to `activeId` fades + slides
 *   the active panel's image and description in (DUR.base, EASE.out).
 * - Mobile expand/collapse: pure CSS grid-rows technique (grid-rows-[1fr] ↔ [0fr]).
 * - Reduced motion: bespoke animation early-returns, leaving content fully visible.
 */

import { useRef, useState } from "react";
import Image from "next/image";
import { useReveals } from "@/lib/gsap/reveals";
import { gsap, useGSAP, EASE, DUR, prefersReducedMotion } from "@/lib/gsap/gsap";

const services = [
  {
    id: "architectural-design",
    label: "Architectural Design",
    image: "/images/projects/matal/gallery-12.webp",
    description:
      "Creative architectural solutions that balance aesthetics, function, and context turning vision into architecture.",
  },
  {
    id: "engineering-design",
    label: "Engineering Design",
    image: "/images/projects/tholal/gallery-10.webp",
    description:
      "Integrated structural and MEP engineering ensuring safety, efficiency, and sustainability in every project.",
  },
  {
    id: "project-management",
    label: "Project Management",
    image: "/images/projects/al-hamra-waterfront/gallery-04.webp",
    description:
      "Comprehensive project management from concept to completion, ensuring quality, schedule, and budget alignment.",
  },
  {
    id: "site-supervision",
    label: "Site Supervision",
    image: "/images/projects/matal/gallery-10.webp",
    description:
      "Dedicated on-site supervision delivering precision, consistency, and construction excellence.",
  },
];

/** The column that rests open on desktop when nothing is locked or hovered. */
const DEFAULT_ID = "site-supervision";

export default function ServicesTabs() {
  // Section root for the shared reveal engine.
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  // Scope for the bespoke desktop-panel animation.
  const desktopScope = useRef<HTMLDivElement>(null);

  // Desktop: the pinned column (click) and the previewed column (hover).
  const [lockedId, setLockedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Mobile: independent tap-to-toggle accordion (no hover on touch).
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(DEFAULT_ID);

  // A lock freezes hover; otherwise hover previews; otherwise the default rests open.
  const activeId = lockedId ?? hoveredId ?? DEFAULT_ID;

  // Click the locked column to unlock (return to hover-browse); else lock onto it.
  const handleColumnClick = (id: string) =>
    setLockedId((current) => (current === id ? null : id));

  const handleMobileToggle = (id: string) =>
    setMobileOpenId((current) => (current === id ? null : id));

  // Fade + slide the active desktop panel's image and description in whenever the
  // active item changes (hover preview or lock). Keyed to activeId so it fires on
  // every open.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const panel = desktopScope.current?.querySelector<HTMLElement>("[data-panel-content]");
      if (!panel) return;
      gsap.from(Array.from(panel.children), {
        autoAlpha: 0,
        x: 24,
        duration: DUR.base,
        ease: EASE.out,
        stagger: 0.08,
      });
    },
    { scope: desktopScope, dependencies: [activeId] }
  );

  return (
    <section id="services" ref={root} className="bg-white">
      {/* Top border */}
      <div className="border-t border-gray-200" />

      {/* Desktop: Horizontal accordion — hover to browse, click to lock.
          No onMouseLeave reset: the last hovered column stays open. */}
      <div
        ref={desktopScope}
        className="hidden md:flex h-[66vh] min-h-[500px]"
      >
        {services.map((service) => {
          const isExpanded = activeId === service.id;
          const isLocked = lockedId === service.id;

          return (
            <div
              key={service.id}
              data-reveal
              onMouseEnter={() => setHoveredId(service.id)}
              onClick={() => handleColumnClick(service.id)}
              className={`
                relative border-l border-gray-200 cursor-pointer
                transition-all duration-500 ease-out overflow-hidden
                ${isExpanded ? "flex-[4]" : "flex-[1]"}
              `}
            >
              {/* +/− Icon - Top Right. Black once locked, gray while previewing. */}
              <div className="absolute top-6 right-6 z-10">
                <span
                  className={`text-2xl font-light transition-colors duration-300 ${
                    isLocked ? "text-black" : "text-gray-400"
                  }`}
                >
                  {isExpanded ? "−" : "+"}
                </span>
              </div>

              {/* Content Container */}
              <div className="flex h-full">
                {/* Vertical Title - Always visible */}
                <div className="flex items-end justify-start p-6 min-w-[60px]">
                  <h3
                    className="whitespace-nowrap"
                    style={{
                      writingMode: "vertical-lr",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {service.label}
                  </h3>
                </div>

                {/* Expanded Content - Image + Description */}
                {isExpanded && (
                  <div
                    data-panel-content
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
                      <p className="text-base leading-relaxed text-gray-600">
                        {service.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: Vertical accordion */}
      <div className="md:hidden">
        {services.map((service) => {
          const isExpanded = mobileOpenId === service.id;

          return (
            <div
              key={service.id}
              className="border-b border-gray-200"
            >
              {/* Header */}
              <button
                onClick={() => handleMobileToggle(service.id)}
                aria-expanded={isExpanded}
                className="w-full flex items-center justify-between py-6 px-(--section-padding-x)"
              >
                <h3>{service.label}</h3>
                <span className="text-2xl font-light text-gray-400">
                  {isExpanded ? "−" : "+"}
                </span>
              </button>

              {/* Expandable Content - CSS grid-rows technique (smooth open + close) */}
              <div
                className={
                  "grid transition-[grid-template-rows] duration-500 ease-out " +
                  (isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
                }
              >
                <div className="overflow-hidden">
                  {/* Horizontal padding tracks --section-padding-x so the
                      full-bleed accordion's text aligns with .container
                      content at every breakpoint (24px -> 16px below 480). */}
                  <div className="px-(--section-padding-x) pb-6 space-y-4">
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
