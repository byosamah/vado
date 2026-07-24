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
 *
 * RTL: everything directional mirrors. "Previous" sits on the leading side
 * (start), "next" on the trailing side (end). The arrow keys swap meaning,
 * because on an Arabic page the RIGHT arrow moves backwards through a
 * right-to-left sequence. Swipe direction flips for the same reason. The
 * "3 / 12" counter is pinned to dir="ltr" so the numbers do not reorder.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { isRtl as localeIsRtl, type Locale } from "@/lib/i18n/config";
import { t, type Dictionary } from "@/lib/i18n/get-dictionary";

interface ProjectGalleryProps {
  /** Gallery images to display (hero already excluded by the caller). */
  images: string[];
  title: string;
  category: string;
  lang: Locale;
  gallery: Dictionary["gallery"];
}

/** Swipe distance (px) that counts as a deliberate left/right flick. */
const SWIPE_THRESHOLD = 50;
/** Matches the CSS fade duration below so the exit animation finishes first. */
const FADE_MS = 250;

/*
 * prefers-reduced-motion as an external store. Defined at module scope so the
 * subscribe/snapshot functions keep stable identities across renders, which is
 * what useSyncExternalStore needs to avoid resubscribing every render.
 */
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onStoreChange: () => void): () => void {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

const getMotionSnapshot = (): boolean => window.matchMedia(MOTION_QUERY).matches;

/** There is no media query on the server; assume motion is allowed. */
const getMotionServerSnapshot = (): boolean => false;

export default function ProjectGallery({
  images,
  title,
  category,
  lang,
  gallery,
}: ProjectGalleryProps) {
  const count = images.length;
  const rtl = localeIsRtl(lang);

  // Which image is open in the lightbox (null = closed).
  const [index, setIndex] = useState<number | null>(null);
  // Drives the enter/exit fade. True once the overlay has mounted.
  const [entered, setEntered] = useState(false);
  const isOpen = index !== null;

  // The motion preference is read DURING render (it picks the fade class), so
  // it is subscribed to as an external store rather than held in a ref. A ref
  // read during render never triggers a re-render, and a useEffect + setState
  // pair would cascade an extra render on mount. useSyncExternalStore is the
  // primitive built for exactly this, and its server snapshot keeps SSR and
  // the first client render in agreement.
  const reduceMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionSnapshot,
    getMotionServerSnapshot
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  const close = useCallback(() => {
    // Return focus to the thumbnail that opened the lightbox.
    restoreFocus.current?.focus();
    if (reduceMotion) {
      setIndex(null);
      return;
    }
    setEntered(false); // fade out, then unmount once the transition ends
    window.setTimeout(() => setIndex(null), FADE_MS);
  }, [reduceMotion]);

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

    // In RTL the sequence advances leftwards, so the LEFT arrow means "next"
    // and the RIGHT arrow means "previous". Mapping the physical key to a
    // step of +1 or -1 keeps that one decision in a single place.
    const step = (delta: number) =>
      setIndex((p) => (p === null ? p : (p + delta + count) % count));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      else if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
    };
    // `setIndex` is stable and the rest are listed, so this re-runs only when the
    // lightbox opens or closes, not on every arrow press.
  }, [isOpen, count, close, rtl]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || index === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      // Dragging content leftwards advances in LTR; in RTL it goes back.
      const forward = rtl ? delta > 0 : delta < 0;
      goTo(index + (forward ? 1 : -1));
    }
    touchStartX.current = null;
  };

  const fadeClass = reduceMotion
    ? ""
    : "transition-opacity duration-[250ms] ease-out";

  return (
    <>
      {/* Gallery grid — each thumbnail opens the lightbox */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, i) => (
          <button
            key={image}
            type="button"
            onClick={(e) => open(i, e.currentTarget)}
            aria-label={t(gallery.openImage, { n: i + 2, title })}
            className="group relative aspect-[4/3] overflow-hidden cursor-pointer bg-[var(--color-surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <Image
              src={image}
              alt={t(gallery.imageAlt, { title, category, n: i + 2 })}
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
          aria-label={t(gallery.viewerLabel, { title })}
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
            aria-label={gallery.close}
            className="absolute end-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-black/5 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {/* Previous / Next (rendered only when there's more than one image).
              "Previous" sits on the leading side in both directions. */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(index - 1);
                }}
                aria-label={gallery.previous}
                className="absolute start-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-black/5 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black md:start-6"
              >
                <ArrowLeft className="h-6 w-6 rtl:rotate-180" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(index + 1);
                }}
                aria-label={gallery.next}
                className="absolute end-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-black/5 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black md:end-6"
              >
                <ArrowRight className="h-6 w-6 rtl:rotate-180" strokeWidth={1.5} />
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
              alt={t(gallery.imageAlt, { title, category, n: index + 2 })}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="90vw"
              priority
            />
          </div>

          {/* Counter — dir="ltr" so "3 / 12" keeps its order on an Arabic page */}
          {count > 1 && (
            <span
              dir="ltr"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm tracking-widest text-gray-500 tabular-nums"
            >
              {index + 1} / {count}
            </span>
          )}
        </div>
      )}
    </>
  );
}
