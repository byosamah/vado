# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
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

### Animations (`lib/animations.ts`)
Framer Motion variants for consistent animations:
- `fadeInUp`, `fadeIn`, `fadeInLeft`, `fadeInRight` — Reveal animations
- `staggerContainer`, `staggerContainerSlow` — Parent wrappers for staggered children
- `scaleIn`, `slideUp` — Alternative reveal effects
- `defaultViewport` — Standard scroll-trigger settings (`once: true, amount: 0.2`)

Usage pattern:
```tsx
<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={defaultViewport}>
  <motion.p variants={fadeInUp}>Content</motion.p>
</motion.div>
```

### Key Libraries
- **Swiper.js** — Carousels (HeroSlider, PortfolioShowcase, TestimonialsSlider)
- **Framer Motion** — Scroll-triggered animations
- **Lucide React** — Icons

## Patterns

**Client Components**: Any component using Swiper, Framer Motion, or React hooks needs `"use client"` directive.

**Section Structure**: Each section is self-contained with its own data, styling, and animations. No shared state between sections.

**Typography**: Global `h1`–`h6` styles defined in globals.css. Responsive sizes handled via media queries at 1200px, 768px, 480px breakpoints.

**Images**: Currently using local `/images/` paths. Background images use inline styles with `bg-cover bg-center`.
