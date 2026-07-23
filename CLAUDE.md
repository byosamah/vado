# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server on :3000 (if taken by another local app, use: npm run dev -- -p 3001)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Project Overview

VADO is a single-page architecture firm website built on Next.js 16 (App Router) with Tailwind CSS 4. The design is based on the Hiroshi theme—minimal, elegant, with subtle scroll animations.

## Architecture

### Page Composition
The entire site is a single page (`app/page.tsx`) composed of 13 section components rendered in sequence:

```
Header (sticky, transparent→white on scroll)
  └── HeroSlider (fullscreen, Swiper with fade)
  └── AboutSection
  └── ServicesLinks
  └── FeatureCards
  └── PortfolioShowcase (interactive sidebar + carousel)
  └── ServicesTabs
  └── QuoteBlock
  └── TeamGrid
  └── TestimonialsSlider
  └── BlogGrid
  └── ContactSection
  └── CTABanner
Footer
```

### Component Organization
```
components/
├── layout/          # Header, Footer (site-wide)
└── sections/        # Page sections (each self-contained)
```

### Design System (`app/globals.css`)
CSS variables define the design tokens:
- `--color-*` — Color palette
- `--spacing-*` — Spacing scale (xs→5xl)
- `--section-padding-*` — Responsive section padding
- `--transition-*` — Animation timing

Utility classes: `.container`, `.section`, `.underline-hover`, `.image-hover-scale`

### Animations (GSAP + Lenis)
GSAP + Lenis smooth scroll (Framer Motion was removed). Foundation in `lib/gsap/`:
- `lib/gsap/gsap.ts`: single plugin registration + `EASE`/`DUR` tokens + `prefersReducedMotion()`
- `lib/gsap/reveals.ts`: `useReveals(ref)` reveal engine (declarative, data-attribute driven)
- `SmoothScroll` (Lenis + gsap.ticker) and `ScrollProgress`, both wired in `app/layout.tsx`

Usage: put a ref on the section root, call `useReveals(root)`, then tag elements:
```tsx
<section ref={root}>
  <span data-reveal>Label</span>       {/* fade+rise; ="left"|"right"|"scale" */}
  <h2 data-headline>Headline</h2>       {/* SplitText masked line reveal */}
  <div data-img-reveal><img/></div>     {/* clip-wipe + inner scale */}
</section>
```
Bespoke moments (Hero, Quote, CTA, ServicesTabs) use `useGSAP` scoped to a ref; always early-return on `prefersReducedMotion()`.

### Key Libraries
- **Swiper.js**: Carousels (HeroSlider, PortfolioShowcase)
- **GSAP + ScrollTrigger + SplitText**: Scroll animations (`@gsap/react` `useGSAP`)
- **Lenis**: Smooth scroll
- **Lucide React**: Icons
- **Web3Forms**: ContactSection form → emails info@vado.sa. Needs `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` (restart dev to load). Testable only in a real browser; server-side/curl posts are rejected (free-plan block + Cloudflare challenge).

## Patterns

**Client Components**: Any component using Swiper, GSAP/`useGSAP`, or React hooks needs `"use client"` directive.

**Section Structure**: Each section is self-contained with its own data, styling, and animations. No shared state between sections.

**Typography**: Two-face system: **Schibsted Grotesk** (display/headings, wght 500) plus **IBM Plex Sans** (body/labels), loaded via `next/font/google` in `app/layout.tsx`; tokens `--font-display`/`--font-body` in globals.css. IBM Plex Sans Arabic is the intended RTL sibling. Global `h1`–`h6` styles in globals.css; responsive at 1200/768/480px.

**Images**: Optimized `.webp` via `next/image` (not raw `<img>` or CSS backgrounds). Project images in `public/images/projects/<slug>/` as `hero.webp` plus `gallery-NN.webp`; project data centralized in `lib/projects.ts` (drives the homepage carousel and `/projects/[slug]` pages). Convert sources: `cwebp -resize <w> 0 -q 82 -m 6 in.png -o out.webp`.

## Gotchas

- **Turbopack panic** (Next 16): dev can crash with "Failed to write app endpoint" / ChunkLoadError. Fix: `rm -rf .next` then restart.
- **Pre-existing lint**: a few `react/no-unescaped-entities` errors (apostrophes/quotes in CTABanner, QuoteBlock) predate current work, not introduced by your changes.
- **No styled-jsx** (`<style jsx>`): under Turbopack SSR it rewrites multi-line `className` strings on host elements into invalid JS, causing a `SyntaxError`/500 that `tsc` does NOT catch. Keep global CSS in `app/globals.css`.
- `npx tsc --noEmit` checks types only. Confirm SSR by loading the dev server; a real render catches runtime/SSR errors tsc misses.
- `<html>` uses `suppressHydrationWarning` because the inline `ANIM_BOOT` script adds `.anim-ready` client-side only.
- **`next/font` variables go on `<html>`, not `<body>`**: type tokens (`--font-display`/`--font-body`) live in `:root`, and a `:root` var referencing a next/font var scoped to `<body>` computes to empty, so text silently falls back to Tailwind's default sans. Verify in-browser: `getComputedStyle(document.documentElement).getPropertyValue('--font-display')` must be non-empty (tsc won't catch this).
