# VADO Architecture Studio - UI Documentation

## Overview

This document describes all UI components, their purposes, and how they work together to create the VADO landing page.

---

## Page Flow (Top to Bottom)

```
Navigation (fixed)
    |
    v
Hero Section
    |
    v
Projects Section
    |
    v
About Section
    |
    v
Team Section
    |
    v
Services Section
    |
    v
Footer
```

---

## Components Reference

### 1. Navigation (`/components/Navigation.tsx`)

**Purpose:** Fixed header with logo and navigation links

**Features:**
- Fixed position at top (`z-50`)
- Background changes on scroll (transparent → white with blur)
- Mobile hamburger menu (full-screen overlay)
- Custom cursor integration

**Key States:**
- `isScrolled` - Changes background when user scrolls past 50px
- `isMobileMenuOpen` - Controls mobile menu overlay

**Responsive Behavior:**
- Desktop: Horizontal nav links visible
- Mobile: Hamburger icon, full-screen overlay menu

---

### 2. Hero (`/components/Hero.tsx`)

**Purpose:** Main landing section with headline and tagline

**Features:**
- Full viewport height (`min-h-screen`)
- Staggered text animations on load
- Mixed typography (sans-serif + serif italic)

**Animation Pattern:**
```javascript
container: {
  staggerChildren: 0.1,
  delayChildren: 0.5
}
item: {
  spring: { damping: 40, stiffness: 100 }
}
```

**Layout:**
- 12-column grid on desktop
- Supporting text in columns 8-12

---

### 3. Projects (`/components/Projects.tsx`)

**Purpose:** Portfolio showcase with hover image preview

**Features:**
- Numbered counter (e.g., "05 / 08")
- Floating image preview follows cursor (desktop only)
- "View All Works" expands list
- Text slides right on hover

**Key States:**
- `activeImage` - Currently hovered project's image
- `cursorPos` - Mouse position for floating image
- `visibleCount` - Number of projects shown (default: 5)

**Responsive Behavior:**
- Desktop: Floating image preview visible
- Mobile: No floating preview (`hidden md:block`)

---

### 4. About (`/components/About.tsx`)

**Purpose:** Company information with tabbed content

**Features:**
- Tab system (History, Vision, Mission)
- Animated underline indicator
- Quote section with attribution

**Key State:**
- `activeTab` - Currently selected tab object

**Content Structure:**
```javascript
TABS = [
  { id, label, title, content }
]
```

**Layout:**
- Left column (4/12): Heading + quote
- Right column (7/12): Tabs + content

---

### 5. Team (`/components/Team.tsx`)

**Purpose:** Leadership showcase with horizontal scroll

**Features:**
- Horizontal scrolling carousel
- Snap scrolling for mobile
- Grayscale → color on hover
- Scale up on hover

**Responsive Behavior:**
- Mobile: 85vw card width, snap scrolling
- Desktop: 400px card width, scroll hint text visible

**Image Effects:**
```
Default: grayscale filter
Hover: grayscale-0, scale-105
Duration: 700ms
```

---

### 6. Services (`/components/Services.tsx`)

**Purpose:** Grid display of 8 service offerings

**Features:**
- 3-column grid (desktop)
- Hover: background inverts (white → black)
- Corner accent decorations on hover
- Description reveals on hover

**Grid Layout:**
- Title block in first cell
- 8 service cards
- Filler divs maintain grid lines

**Hover Animation:**
```
background: transparent → black
text: black → white
description: opacity 0 → 80%, translateY 4 → 0
duration: 500ms
```

---

### 7. Footer (`/components/Footer.tsx`)

**Purpose:** Contact information and call-to-action

**Features:**
- Dark background (`#582f37` burgundy)
- Large "VADO" watermark (5% opacity)
- Social media links
- Careers section

**Sections:**
1. Main CTA headline
2. Email link
3. Headquarters address
4. Phone number
5. Social icons (Twitter, Instagram, LinkedIn, YouTube)
6. Copyright + Careers

---

### 8. CustomCursor (`/components/CustomCursor.tsx`)

**Purpose:** Custom animated cursor replacing default

**Cursor States:**

| State | Size | Background | Border | Blend |
|-------|------|------------|--------|-------|
| `default` | 32x32 | transparent | 1px solid burgundy | - |
| `hover` | 64x64 | white | none | difference |
| `text` | 64x64 | burgundy | none | difference |
| `hidden` | - | - | - | opacity: 0 |

**Features:**
- Spring physics for smooth movement
- Disabled on touch devices
- "View" text appears in hover state

**Spring Config:**
```javascript
{ damping: 25, stiffness: 300 }
```

---

## Context

### CursorContext (`/context/CursorContext.tsx`)

**Purpose:** Global state for cursor appearance

**Exports:**
- `CursorProvider` - Wrap app with this
- `useCursor()` - Hook to get/set cursor state

**Usage:**
```javascript
const { setCursorState } = useCursor();
setCursorState('hover'); // on mouse enter
setCursorState('default'); // on mouse leave
```

---

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Default | < 768px | Mobile styles |
| `md:` | >= 768px | Tablet styles |
| `lg:` | >= 1024px | Desktop styles |

---

## File Map

```
/components/
├── Navigation.tsx   # Fixed nav, mobile menu
├── Hero.tsx         # Landing headline
├── Projects.tsx     # Portfolio with hover preview
├── About.tsx        # Tabbed company info
├── Team.tsx         # Horizontal scroll carousel
├── Services.tsx     # 3-column grid services
├── Footer.tsx       # Contact, social, CTA
└── CustomCursor.tsx # Animated cursor

/context/
└── CursorContext.tsx # Cursor state provider
```

---

## Adding New Components

When creating new components, follow these patterns:

1. **Import cursor hook:**
   ```javascript
   import { useCursor } from '../context/CursorContext';
   const { setCursorState } = useCursor();
   ```

2. **Add cursor interactions to clickable elements:**
   ```javascript
   onMouseEnter={() => setCursorState('hover')}
   onMouseLeave={() => setCursorState('default')}
   ```

3. **Use Framer Motion for animations:**
   ```javascript
   import { motion } from 'framer-motion';
   <motion.div
     initial={{ opacity: 0 }}
     whileInView={{ opacity: 1 }}
     viewport={{ once: true }}
   />
   ```

4. **Follow responsive pattern:**
   ```javascript
   className="text-base md:text-lg lg:text-xl"
   ```
