"use client";

/**
 * Services Accordion Component
 * ============================
 * Vertical accordion showcasing VADO services, animated with the shared GSAP system.
 *
 * Service copy comes from the dictionary; the paired imagery is keyed here by
 * service id, so the two never fall out of step when a name is translated.
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
 * - Section entrance: each desktop service column carries `data-reveal`.
 * - Desktop expanded panel: a bespoke useGSAP keyed to `activeId` fades + slides
 *   the active panel's image and description in. The x offset is multiplied by
 *   directionSign(), so in Arabic the panel slides in from the matching side.
 * - Mobile expand/collapse: pure CSS grid-rows technique (grid-rows-[1fr] ↔ [0fr]).
 * - Reduced motion: bespoke animation early-returns, leaving content visible.
 *
 * RTL: the vertical column titles keep `writing-mode`. With the default
 * `text-orientation: mixed`, a horizontal-script run (Arabic included) is
 * rotated sideways as a WHOLE RUN, so the cursive joins survive. Only
 * `text-orientation: upright` would isolate glyphs, and that is not used here.
 * Column rules and paddings use logical properties so they mirror correctly.
 */

import { useRef, useState } from "react";
import Image from "next/image";
import { useReveals } from "@/lib/gsap/reveals";
import {
  gsap,
  useGSAP,
  EASE,
  DUR,
  prefersReducedMotion,
  directionSign,
} from "@/lib/gsap/gsap";
import { isRtl, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Project imagery paired with each discipline, keyed by the service id. */
const SERVICE_IMAGES: Record<string, string> = {
  "architectural-design": "/images/projects/matal/gallery-12.webp",
  "engineering-design": "/images/projects/tholal/gallery-10.webp",
  "project-management": "/images/projects/al-hamra-waterfront/gallery-04.webp",
  "site-supervision": "/images/projects/matal/gallery-10.webp",
};

/** The column that rests open on desktop when nothing is locked or hovered. */
const DEFAULT_ID = "site-supervision";

export default function ServicesTabs({
  lang,
  services,
}: {
  lang: Locale;
  services: Dictionary["services"];
}) {
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
        x: 24 * directionSign(),
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
                relative border-s border-gray-200 cursor-pointer
                transition-all duration-500 ease-out overflow-hidden
                ${isExpanded ? "flex-[4]" : "flex-[1]"}
              `}
            >
              {/* +/− Icon - trailing top corner. Black once locked, gray while previewing. */}
              <div className="absolute top-6 end-6 z-10">
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
                {/* shrink-0: min-w-[60px] overrides a flex item's automatic
                    min-content floor, so without this the wrapper could be
                    squeezed narrower than the title in a tight column. */}
                <div className="flex items-end justify-start p-6 min-w-[60px] shrink-0">
                  {/* The whole vertical treatment lives here, inline, as one
                      unit. In vertical writing-mode `line-height` stops being
                      leading and becomes the line box WIDTH: the only room the
                      glyphs get across the stem. Latin ink needs ~0.90em and
                      clears 1.2; Arabic ink needs ~1.40em and its descenders
                      fall outside the 1.45 Arabic heading leading, so the
                      column's overflow-hidden shears them. Inline rather than a
                      CSS class so it cannot drift from the writing-mode it
                      belongs to, and cannot be beaten by the un-layered global
                      h1-h6 line-height rule. */}
                  <h3
                    className="whitespace-nowrap"
                    style={{
                      writingMode: "vertical-lr",
                      transform: "rotate(180deg)",
                      lineHeight: isRtl(lang) ? 2 : undefined,
                    }}
                  >
                    {service.name}
                  </h3>
                </div>

                {/* Expanded Content - Image + Description */}
                {isExpanded && (
                  <div
                    data-panel-content
                    className="flex flex-1 gap-8 p-6 pe-12 pt-12"
                  >
                    {/* Image */}
                    <div className="w-1/2 h-full relative">
                      <Image
                        src={SERVICE_IMAGES[service.id]}
                        alt={service.name}
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
                <h3 className="text-start">{service.name}</h3>
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
                        src={SERVICE_IMAGES[service.id]}
                        alt={service.name}
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
