"use client";

/**
 * ProjectGallery
 * ==============
 * Client island for the project detail page. Renders the gallery grid and,
 * on click, opens a full-screen lightbox to browse every gallery image.
 *
 * Kept as a small client component so the surrounding project page can stay a
 * server component (SEO + perf). The hero image is deliberately NOT part of
 * this set — only the gallery thumbnails open the popup.
 *
 * Design: light frosted backdrop to match VADO's airy white system. Browse
 * with on-screen arrows, ← / → keys, or a swipe on touch. Esc or the ✕ closes.
 * Respects prefers-reduced-motion (no fade) and locks background scroll (works
 * with Lenis and with native scroll in the reduced-motion path).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface ProjectGalleryProps {
  /** Gallery images to display (hero already excluded by the caller). */
  images: string[];
  title: string;
  category: string;
}

/** Swipe distance (px) that counts as a deliberate left/right flick. */
const SWIPE_THRESHOLD = 50;
/** Matches the CSS fade duration below so the exit animation finishes first. */
const FADE_MS = 250;

export default function ProjectGallery({
  images,
  title,
  category,
}: ProjectGalleryProps) {
  const count = images.length;

  // Which image is open in the lightbox (null = closed).
  const [index, setIndex] = useState<number | null>(null);
  // Drives the enter/exit fade. True once the overlay has mounted.
  const [entered, setEntered] = useState(false);
  const isOpen = index !== null;

  const reduceMotion = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  const close = useCallback(() => {
    // Return focus to the thumbnail that opened the lightbox.
    restoreFocus.current?.focus();
    if (reduceMotion.current) {
      setIndex(null);
      return;
    }
    setEntered(false); // fade out, then unmount once the transition ends
    window.setTimeout(() => setIndex(null), FADE_MS);
  }, []);

  const open = (i: number, trigger: HTMLElement) => {
    restoreFocus.current = trigger;
    setIndex(i);
  };

  // Wire up everything that only matters while the lightbox is open: the enter
  // fade, scroll lock, keyboard nav, and initial focus.
  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden"; // lock background scroll (also holds Lenis)

    const raf = requestAnimationFrame(() => {
      setEntered(true);
      dialogRef.current?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") setIndex((p) => (p === null ? p : ((p + 1) % count)));
      else if (e.key === "ArrowLeft") setIndex((p) => (p === null ? p : ((p - 1 + count) % count)));
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
    };
    // Only re-run when the open/closed state flips, not on each arrow press.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, count, close]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || index === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) goTo(index + (delta < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  const fadeClass = reduceMotion.current
    ? ""
    : "transition-opacity duration-[250ms] ease-out";

  return (
    <>
      {/* Gallery grid — each thumbnail opens the lightbox */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => open(i, e.currentTarget)}
            aria-label={`Open image ${i + 2} of ${title} in full screen`}
            className="group relative aspect-[4/3] overflow-hidden cursor-pointer bg-[var(--color-surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <Image
              src={image}
              alt={`${title} by VADO, ${category}, image ${i + 2}`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Subtle affordance so it reads as clickable */}
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/10 group-hover:opacity-100">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-black shadow-sm">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && index !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
          tabIndex={-1}
          onClick={close}
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-xl focus:outline-none ${fadeClass} ${
            entered ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close image viewer"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-black/5 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {/* Previous / Next (rendered only when there's more than one image) */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(index - 1);
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-black/5 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black md:left-6"
              >
                <ArrowLeft className="h-6 w-6" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(index + 1);
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-black/5 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black md:right-6"
              >
                <ArrowRight className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </>
          )}

          {/* Image — click is swallowed so it doesn't close the backdrop */}
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative h-[80vh] w-[90vw] max-w-6xl"
          >
            <Image
              key={index}
              src={images[index]}
              alt={`${title} by VADO, ${category}, image ${index + 2}`}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="90vw"
              priority
            />
          </div>

          {/* Counter */}
          {count > 1 && (
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm tracking-widest text-gray-500 tabular-nums">
              {index + 1} / {count}
            </span>
          )}
        </div>
      )}
    </>
  );
}
