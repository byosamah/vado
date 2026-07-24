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
  └── GuidingPrinciples
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
- **Web3Forms**: the ContactSection, `/careers`, and `/suppliers` forms all post via `lib/web3forms.ts` with the one `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (`.env.local`, restart dev to load) → all mail lands in info@vado.sa, told apart by each form's `subject`. Careers/suppliers render the reusable `components/forms/LeadForm.tsx` (config-driven fields) and display `careers@`/`suppliers@` from `lib/site.ts` (display-only; the key controls the real inbox). Testable only in a real browser; server-side/curl posts are rejected (free-plan block + Cloudflare challenge).

### SEO & Metadata Layer
Beyond the homepage there are real routes: `/about`, `/services`, `/projects` (index), `/projects/[slug]`, `/careers`, `/suppliers`. Subpages are **server components** (no `"use client"`) for SEO + perf; they reuse `<Header forceSolid />` + `<Footer />`. Interactive bits are small client islands so the page stays a server component: `ProjectGallery` (image lightbox) on project pages, `LeadForm` on careers/suppliers.
- `lib/site.ts` — single source of truth for the canonical URL (`https://vado.sa`) plus brand facts (NAP, services). Consumed by page metadata, JSON-LD, `app/robots.ts`, `app/sitemap.ts`, and `public/llms.txt`. Change the domain here in ONE place.
- `lib/schema.ts` + `components/seo/JsonLd.tsx` — JSON-LD builders (Organization/ProfessionalService/WebSite/FAQ, per-project CreativeWork), rendered via `<JsonLd data={...} />`.
- Homepage `<h1>` is `sr-only` (the hero is an image slider with cycling `h2` titles); the short `META_DESCRIPTION` feeds the SERP while the long `SITE_DESCRIPTION` feeds JSON-LD/llms.txt.

## Patterns

**Client Components**: Any component using Swiper, GSAP/`useGSAP`, or React hooks needs `"use client"` directive.

**Section Structure**: Each section is self-contained with its own data, styling, and animations. No shared state between sections.

**Spacing rhythm**: 24px kicker→headline (`mt-6`), 40px headline→body/CTA (`mt-10`). Interactive elements get ≥44px hit areas: `py-* -my-*` hit-slop on inline links, flush `py-2` stacks (no `space-y`) in link lists.

**Typography**: Two-face system: **Schibsted Grotesk** (display/headings, wght 500) plus **IBM Plex Sans** (body/labels), loaded via `next/font/google` in `app/layout.tsx`; tokens `--font-display`/`--font-body` in globals.css. IBM Plex Sans Arabic is the intended RTL sibling. Global `h1`–`h6` styles in globals.css; responsive at 1200/768/480px.

**Images**: Optimized `.webp` via `next/image` (not raw `<img>` or CSS backgrounds). Project images in `public/images/projects/<slug>/` as `hero.webp` plus `gallery-NN.webp`; project data centralized in `lib/projects.ts` (drives the homepage carousel and `/projects/[slug]` pages). Convert sources: `cwebp -resize <w> 0 -q 82 -m 6 in.png -o out.webp`.

## Gotchas

- **Turbopack panic** (Next 16): dev can crash with "Failed to write app endpoint" / ChunkLoadError. Fix: `rm -rf .next` then restart.
- **Pre-existing lint**: one `react-hooks/refs` error in HeroSlider's `contextSafe` slide handler (GSAP wiring; don't chase it casually) plus `<img>` warnings in Header/BlogGrid. Not introduced by your changes.
- **No styled-jsx** (`<style jsx>`): under Turbopack SSR it rewrites multi-line `className` strings on host elements into invalid JS, causing a `SyntaxError`/500 that `tsc` does NOT catch. Keep global CSS in `app/globals.css`.
- `npx tsc --noEmit` checks types only. Confirm SSR by loading the dev server; a real render catches runtime/SSR errors tsc misses.
- `<html>` uses `suppressHydrationWarning` because the inline `ANIM_BOOT` script adds `.anim-ready` client-side only.
- **`next/font` variables go on `<html>`, not `<body>`**: type tokens (`--font-display`/`--font-body`) live in `:root`, and a `:root` var referencing a next/font var scoped to `<body>` computes to empty, so text silently falls back to Tailwind's default sans. Verify in-browser: `getComputedStyle(document.documentElement).getPropertyValue('--font-display')` must be non-empty (tsc won't catch this).
- **Mobile Lighthouse ~92 is a Lantern-simulation artifact, not real slowness** (observed LCP ~80ms, CLS 0, desktop 100). The hero's Swiper + GSAP client JS gates the LCP text under the throttled-mobile model; changing/removing the hero animation and deferring below-fold JS do NOT move it. Only a server-rendered hero would. Don't re-chase 95 without that rework.
- **AVIF regressed mobile LCP** (heavier decode on throttled CPUs, measured 99→95). `next.config.ts` stays WebP-only; do not re-add `formats: ['image/avif', ...]`.
- **Tailwind v4 cascade layers**: element `margin` resets AND the `p { color }` / `a { color; transition }` defaults live in `@layer base` (`globals.css`) so utilities can override them. Any UN-layered element rule beats EVERY layered utility (un-layered always wins) — this once made the mobile menu's `text-white` links render black-on-black and silently ignored ~35 paragraph color utilities site-wide. Font-size/weight rules stay un-layered on purpose — the global type scale is not overridable by `text-*`/`font-*` utilities, so don't put those on `h1–h6` (dead code that misleads readers).
- **`space-y-*` + child `-my-*` don't mix**: v4 compiles `space-y` with a `:where()` selector (specificity 0), so a child's `-my-*` (0-1-0) overrides both space-y margins — the spacing class goes dead and hit-slop margins collapse into overlapping tap targets. For stacked link lists, use flush children with `py-2` and no `space-y` (see Footer).
- **CSS comment `*/`**: never write `*/` inside a comment (e.g. `mt-*/mb-*`) — it ends the comment early and 500s the CSS build. tsc/lint miss it; only a real render catches it.
