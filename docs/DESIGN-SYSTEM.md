# VADO Architecture Studio - Design System

## Overview

This document defines the visual language of the VADO landing page including colors, typography, spacing, and animations.

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Burgundy** | `#582f37` | Primary accent, text, footer background, borders, hover states |
| **Light Background** | `#F8F8F8` | Page background, section backgrounds |
| **White** | `#FFFFFF` | Cards, navigation background (scrolled), contrast elements |

### Usage in Code

```html
<!-- Light background -->
bg-[#F8F8F8]

<!-- Burgundy text/accents -->
text-[#582f37]
bg-[#582f37]
border-[#582f37]

<!-- White -->
bg-white
text-white
```

### Neutral Grays (Tailwind defaults)

| Class | Usage |
|-------|-------|
| `neutral-200` | Subtle borders, dividers |
| `neutral-300` | Section borders |
| `neutral-400` | Secondary text, muted labels |
| `neutral-500` | Tertiary text |
| `neutral-600` | Body text |
| `neutral-800` | Strong secondary text |

---

## Typography

### Font Families

| Font | Family | Usage |
|------|--------|-------|
| **Inter** | Sans-serif | Body text, UI elements, labels |
| **Playfair Display** | Serif | Headlines accent, quotes, elegant emphasis |

### Font Loading (in index.html)

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

### Weight Reference

**Inter Weights:**
- 300 (Light)
- 400 (Regular)
- 500 (Medium)
- 600 (Semibold)

**Playfair Display:**
- 400 (Regular + Italic)
- 600 (Semibold)

### Typography Scale

| Element | Size (Mobile) | Size (Desktop) | Weight | Notes |
|---------|---------------|----------------|--------|-------|
| Hero Headline | `text-5xl` | `text-9xl` | `font-semibold` | Tight tracking |
| Section Title | `text-4xl` | `text-5xl` | `font-semibold` | |
| Card Title | `text-2xl` | `text-3xl` | `font-medium` | |
| Body Text | `text-base` | `text-lg` | Regular | `leading-relaxed` |
| Labels | `text-xs` | `text-sm` | `font-medium` | `uppercase tracking-widest` |
| Nav Links | `text-sm` | `text-sm` | `font-medium` | `uppercase tracking-widest` |

### Using Serif Font

```html
<span class="serif italic">Future</span>
```

### Letter Spacing

All headings have tight tracking:
```css
h1, h2, h3, h4, h5, h6 {
  letter-spacing: -0.02em;
}
```

---

## Spacing System

### Standard Spacing (Tailwind)

| Size | Value | Usage |
|------|-------|-------|
| `px-6` | 24px | Mobile horizontal padding |
| `px-12` | 48px | Tablet horizontal padding |
| `px-24` | 96px | Desktop horizontal padding |
| `py-24` | 96px | Section vertical padding |
| `py-32` | 128px | Large section vertical padding |
| `gap-8` | 32px | Standard component gap |
| `gap-12` | 48px | Section gap |

### Container Max Width

```html
<div class="max-w-[1920px] mx-auto">
```

---

## Animation System

### Framer Motion Spring Configs

**Standard Spring (for most transitions):**
```javascript
{ damping: 40, stiffness: 100 }
```

**Cursor Spring (smooth tracking):**
```javascript
{ damping: 25, stiffness: 300 }
```

**Hover Transitions:**
```javascript
{ stiffness: 500, damping: 28 }
```

### Stagger Pattern

```javascript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const item = {
  hidden: { y: 100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 40,
      stiffness: 100,
    },
  },
};
```

### whileInView Pattern

```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
/>
```

### CSS Transitions

| Duration | Usage |
|----------|-------|
| `duration-300` | Fast transitions (hover states) |
| `duration-500` | Standard transitions |
| `duration-700` | Slow transitions (team images) |

---

## Cursor States

### Visual Reference

| State | Size | Background | Border | Blend Mode |
|-------|------|------------|--------|------------|
| `default` | 32x32px | transparent | 1px solid `#582f37` | - |
| `hover` | 64x64px | white | none | difference |
| `text` | 64x64px | `#582f37` | none | difference |
| `hidden` | - | - | - | opacity: 0 |

### Implementation

```javascript
// In any component
const { setCursorState } = useCursor();

// On interactive elements
onMouseEnter={() => setCursorState('hover')}
onMouseLeave={() => setCursorState('default')}
```

---

## Responsive Breakpoints

| Breakpoint | Min Width | Common Usage |
|------------|-----------|--------------|
| (default) | 0px | Mobile styles |
| `md:` | 768px | Tablet, show desktop nav |
| `lg:` | 1024px | Desktop, 3-column grids |

### Pattern Examples

```html
<!-- Typography scaling -->
<h1 class="text-5xl md:text-7xl lg:text-9xl">

<!-- Padding scaling -->
<div class="px-6 md:px-12 lg:px-24">

<!-- Grid columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

<!-- Show/hide elements -->
<div class="hidden md:block">  <!-- Hide on mobile -->
<div class="md:hidden">         <!-- Show only on mobile -->
```

---

## Interactive Patterns

### Button Style

```html
<button class="
  px-8 py-4
  border border-[#582f37]
  rounded-full
  uppercase text-sm tracking-widest
  hover:bg-[#582f37] hover:text-white
  transition-all duration-300
">
  Button Text
</button>
```

### Link Hover Underline

```html
<a class="relative group">
  Link Text
  <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#582f37] transition-all duration-300 group-hover:w-full" />
</a>
```

### Card Hover (Services pattern)

```html
<div class="
  hover:bg-[#582f37] hover:text-white
  transition-colors duration-500
">
```

---

## Z-Index Scale

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Content | `z-10` | Floating elements |
| Project Preview | `z-20` | Floating image |
| Mobile Menu | `z-40` | Overlay |
| Navigation | `z-50` | Fixed header |
| Cursor | `z-[9999]` | Always on top |

---

## Selection Styling

```css
selection:bg-[#582f37] selection:text-white
```

---

## Component Patterns

### Section Structure

```html
<section id="section-id" class="py-24 md:py-32 px-6 md:px-12 bg-[#F8F8F8]">
  <div class="max-w-[1920px] mx-auto">
    <!-- Content -->
  </div>
</section>
```

### Grid Layout (12-column)

```html
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
  <div class="lg:col-span-4">Left content</div>
  <div class="lg:col-span-7 lg:col-start-6">Right content</div>
</div>
```

---

## File Quick Reference

**Where colors are defined:**
- `index.html` - Body text color, selection
- All components - Individual usage

**Where animations are defined:**
- Each component has its own animation variants
- `CustomCursor.tsx` - Cursor animations
- `App.tsx` - Lenis smooth scroll config

**Where typography is loaded:**
- `index.html` - Google Fonts link + CSS
