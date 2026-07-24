# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev         # Dev server on :3000 (if taken by another local app, use: npm run dev -- -p 3001)
npm run build       # i18n parity check, then production build
npm run lint        # Run ESLint
npm run typecheck   # tsc --noEmit
npm run i18n:check  # EN/AR dictionary parity (also runs as part of build)
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
Beyond the homepage there are real routes, each in both languages: `/[lang]/about`, `/[lang]/services`, `/[lang]/projects` (index), `/[lang]/projects/[slug]`, `/[lang]/careers`, `/[lang]/suppliers`. Subpages are **server components** (no `"use client"`) for SEO + perf; they reuse `<Header forceSolid />` + `<Footer />`. Interactive bits are small client islands so the page stays a server component: `ProjectGallery` (image lightbox) on project pages, `LeadForm` on careers/suppliers, `NotFoundContent` on the 404.
- `lib/site.ts` — single source of truth for the canonical URL (`https://vado.sa`) plus language-neutral contact facts. Consumed by page metadata, JSON-LD, `app/robots.ts`, `app/sitemap.ts`, and `app/llms.txt/route.ts`. Change the domain here in ONE place. Translated brand facts (legal name, address, services) live in the dictionaries.
- `lib/schema.ts` + `components/seo/JsonLd.tsx` — JSON-LD builders (Organization/ProfessionalService/WebSite/FAQ/AboutPage/Service, per-project CreativeWork), rendered via `<JsonLd data={...} />`. Every builder takes `(locale, dict)` and stamps `inLanguage`. Entity `@id`s stay locale-independent: VADO is ONE organization described twice, not two organizations.
- `lib/seo.ts` — locale-prefixed URL + hreflang helpers. `buildAlternates(locale, path)` returns the canonical plus the reciprocal language set; drop it straight into a page's `alternates`.
- Homepage `<h1>` is `sr-only` (the hero is an image slider with cycling `h2` titles); the short `meta.description` feeds the SERP while `meta.longDescription` feeds JSON-LD/llms.txt.

### Internationalization (EN / AR)

The site ships two editions: English at `/en/*` and Arabic at `/ar/*`. There is **no `app/layout.tsx`** — `app/[lang]/layout.tsx` is the root layout, which is the only way `<html lang>` and `<html dir>` can vary per locale.

- `proxy.ts` (Next 16.1 renamed the `middleware` convention to `proxy`) redirects unprefixed paths: `/` → `/en` with **307** (temporary, so switching to Accept-Language later isn't shadowed by cached redirects), everything else → `/en/...` with **308** (permanent, transfers ranking signals for already-indexed URLs).
- `lib/i18n/config.ts` — locales, default, direction, `Localized<T>`, and path helpers. Adding a language starts here.
- `lib/i18n/dictionaries/en.ts` — **every visible string**, and the source of truth for SHAPE. `ar.ts` is annotated `Dictionary` (= `typeof en`), so a key in one language and not the other **fails the build**, in both directions.
- **Never add `as const` to a dictionary.** Widening literals to `string` is what lets Arabic hold different text with an identical shape.
- `scripts/check-i18n.ts` covers what types cannot see: array-length drift, empty strings, values still identical to English, and `{placeholder}` mismatches. Runs on `npm run build`. It executes on Node's native TS stripping (hence the `.ts` extensions in its imports and `allowImportingTsExtensions` in tsconfig) — no extra dependency.
- Project copy lives in `lib/projects.ts` as `Localized<string>` fields; slug and images are shared, so both editions share one URL per project and the language switcher stays on the current page.
- `lib/site.ts` holds only language-NEUTRAL facts (URL, email, phone, country code). Anything a visitor reads (legal name, street, city, region, country) is in the dictionary under `brand`.
- **The logo is per-locale and sized by WIDTH.** `LOGOS` in `lib/i18n/config.ts` maps each locale to its file (`/logo.svg`, `/logo-ar.svg`). Both files are drawn in one coordinate space (identical V-mark path data) but the Arabic artboard is taller, so sizing by height would shrink the Arabic mark ~17%. `LOGO_SIZE_CLASSES` therefore sets width (`w-[90px] md:w-[112px] h-auto`), which is exactly what the Latin mark occupied at `h-8 md:h-10`. Both files are a single `#582f37`; `brightness-0 invert` handles the dark-header state for either. The favicon stays shared — it is the bare mark, which has no language.
- **The wordmark is translated.** `brand.shortName` is `"VADO"` / `"ڤادو"` and is the ONLY home for the brand name — there is deliberately no `SITE_NAME` constant. A second copy in `lib/site.ts` is what once made the footer wordmark render English on every Arabic page. The header keeps the Latin logo SVG (a graphic never translates); the footer sets the name as type, so it follows the locale.
- Dictionaries are loaded in **server** components only; pages pass slices down as props. Importing `get-dictionary` into a client component would ship every language's copy to the browser.
- SEO: `lib/seo.ts` builds reciprocal hreflang (bare `en`/`ar`, never `en-SA`, plus `x-default` → English) consumed by every page's `alternates`, the sitemap's `xhtml:link` annotations, and JSON-LD. `/llms.txt` is a generated route (`app/llms.txt/route.ts`) covering both editions, so it can't drift.

## Patterns

**Client Components**: Any component using Swiper, GSAP/`useGSAP`, or React hooks needs `"use client"` directive.

**Adding or changing content**: edit `en.ts` and `ar.ts` together. The build refuses anything else. Same for `lib/projects.ts`.

**RTL**: use logical utilities (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`, `border-s`, `border-e`, `text-start`, `text-end`) instead of `pl-*`/`left-*`/`text-left`. Directional arrow glyphs get `rtl:rotate-180`. Swiper instances take `dir` plus a `key={lang}`. GSAP horizontal motion multiplies its x offset by `directionSign()` from `lib/gsap/gsap.ts`. Latin runs inside Arabic copy (email, phone, URLs) need `dir="ltr"`.

**Section Structure**: Each section is self-contained with its own data, styling, and animations. No shared state between sections.

**Spacing rhythm**: 24px kicker→headline (`mt-6`), 40px headline→body/CTA (`mt-10`). Interactive elements get ≥44px hit areas: `py-* -my-*` hit-slop on inline links, flush `py-2` stacks (no `space-y`) in link lists.

**Typography**: Two-face system: **Schibsted Grotesk** (display/headings, wght 500) plus **IBM Plex Sans** (body/labels), loaded via `next/font/google` in `app/layout.tsx`; tokens `--font-display`/`--font-body` in globals.css. IBM Plex Sans Arabic is the intended RTL sibling. Global `h1`–`h6` styles in globals.css; responsive at 1200/768/480px.

**Images**: Optimized `.webp` via `next/image` (not raw `<img>` or CSS backgrounds). Project images in `public/images/projects/<slug>/` as `hero.webp` plus `gallery-NN.webp`; project data centralized in `lib/projects.ts` (drives the homepage carousel and `/projects/[slug]` pages). Convert sources: `cwebp -resize <w> 0 -q 82 -m 6 in.png -o out.webp`.

## Gotchas

- **Turbopack panic** (Next 16): dev can crash with "Failed to write app endpoint" / ChunkLoadError. Fix: `rm -rf .next` then restart.
- **Pre-existing lint**: one `react-hooks/refs` error in HeroSlider's `contextSafe` slide handler (GSAP wiring; don't chase it casually). That is the entire baseline — a clean `npm run lint` should show exactly 1 error and 0 warnings. The old `<img>` warnings in Header/BlogGrid now carry explicit `eslint-disable-next-line @next/next/no-img-element` comments (both are deliberate: an SVG wordmark and placeholder blog art).
- **No styled-jsx** (`<style jsx>`): under Turbopack SSR it rewrites multi-line `className` strings on host elements into invalid JS, causing a `SyntaxError`/500 that `tsc` does NOT catch. Keep global CSS in `app/globals.css`.
- `npx tsc --noEmit` checks types only. Confirm SSR by loading the dev server; a real render catches runtime/SSR errors tsc misses.
- `<html>` uses `suppressHydrationWarning` because the inline `ANIM_BOOT` script adds `.anim-ready` client-side only.
- **`next/font` variables go on `<html>`, not `<body>`**: type tokens (`--font-display`/`--font-body`) live in `:root`, and a `:root` var referencing a next/font var scoped to `<body>` computes to empty, so text silently falls back to Tailwind's default sans. Verify in-browser: `getComputedStyle(document.documentElement).getPropertyValue('--font-display')` must be non-empty (tsc won't catch this).
- **Mobile Lighthouse ~92 is a Lantern-simulation artifact, not real slowness** (observed LCP ~80ms, CLS 0, desktop 100). The hero's Swiper + GSAP client JS gates the LCP text under the throttled-mobile model; changing/removing the hero animation and deferring below-fold JS do NOT move it. Only a server-rendered hero would. Don't re-chase 95 without that rework.
- **AVIF regressed mobile LCP** (heavier decode on throttled CPUs, measured 99→95). `next.config.ts` stays WebP-only; do not re-add `formats: ['image/avif', ...]`.
- **Tailwind v4 cascade layers**: element `margin` resets AND the `p { color }` / `a { color; transition }` defaults live in `@layer base` (`globals.css`) so utilities can override them. Any UN-layered element rule beats EVERY layered utility (un-layered always wins) — this once made the mobile menu's `text-white` links render black-on-black and silently ignored ~35 paragraph color utilities site-wide. Font-size/weight rules stay un-layered on purpose — the global type scale is not overridable by `text-*`/`font-*` utilities, so don't put those on `h1–h6` (dead code that misleads readers).
- **`space-y-*` + child `-my-*` don't mix**: v4 compiles `space-y` with a `:where()` selector (specificity 0), so a child's `-my-*` (0-1-0) overrides both space-y margins — the spacing class goes dead and hit-slop margins collapse into overlapping tap targets. For stacked link lists, use flush children with `py-2` and no `space-y` (see Footer).
- **CSS comment `*/`**: never write `*/` inside a comment (e.g. `mt-*/mb-*`) — it ends the comment early and 500s the CSS build. tsc/lint miss it; only a real render catches it.
- **A dynamic API in `not-found.tsx` de-optimizes the WHOLE `[lang]` segment.** Calling `headers()` there turned all 20 prerendered pages from `●` (SSG) into `ƒ` (server-rendered on demand). A not-found gets no route params, so to stay locale-aware it hands both editions' 404 strings to `NotFoundContent`, a client component that picks one from `usePathname()`. Check the build output for `●` vs `ƒ` after touching anything in that segment.
- **Never put `<br>` inside a `<span>` in a `data-headline`.** The span's inline box then covers two lines, so SplitText's `mask: "lines"` wrapper renders at double height and tears a gap open in the headline (observed: a 2-line h2 at 196px instead of 131px). Map `headlineLines` through `<Fragment>` so the DOM is bare `text<br>text`.
- **Arabic must not have letter-spacing.** It is a cursive script, and `tracking-*` inserts gaps that sever the joins between letters, turning words into loose glyphs. `html[lang="ar"] *{ letter-spacing: 0 }` in globals.css neutralises every tracking utility site-wide. It is un-layered on purpose so it beats Tailwind's layered utilities.
- **`writing-mode: vertical-lr` is SAFE for Arabic** (ServicesTabs column titles). The default `text-orientation: mixed` rotates a horizontal-script run as a whole unit and preserves shaping; only `text-orientation: upright` would isolate glyphs and break the joins. Verified in-browser — do not "fix" this with a rotation hack.
- **In vertical writing-mode, `line-height` is the line box WIDTH** — the only room glyphs get across the stem. Arabic ink for the service titles needs ~1.40em and its descenders fell outside the 1.45 Arabic heading leading by up to 6.6px, and the column's `overflow-hidden` sheared them. Hence `html[lang="ar"] .service-vtitle { line-height: 2 }` in globals.css. Do NOT remove that column's `overflow-hidden` instead: it clips the expanding panel mid-transition. Latin ink is ~0.90em and clears its 1.2 leading, so English is deliberately untouched.
- **All four fonts use `preload: false`.** next/font emits preload links for every font in a route's module graph, and the locale layout imports all four, so preloading would make each edition download the other's faces. With preload off, CSS demand decides, and `html[lang]` selects the pair.
- **Arabic headings need more leading**: `--heading-leading` is 1.2 for Latin, 1.45 under `html[lang="ar"]`. Arabic has deeper descenders and stacked marks that the Latin value clips.
