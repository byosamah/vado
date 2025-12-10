# VADO Architecture Studio - Project Guide

## Quick Links

- **[UI Components](./docs/UI.md)** - All components, their props, and behaviors
- **[Design System](./docs/DESIGN-SYSTEM.md)** - Colors, typography, spacing, animations

---

## Project Overview

**VADO** is a landing page for an architecture studio based in Al Khobar, Saudi Arabia (Est. 1994).

**Tech Stack:**
- React 19 + TypeScript
- Vite (dev server on port 3000)
- Tailwind CSS (via CDN)
- Framer Motion (animations)
- Lenis (smooth scroll)

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## File Structure

```
vado/
├── index.html          # Entry + fonts + Tailwind CDN
├── index.tsx           # React mount point
├── App.tsx             # Main layout
├── constants.ts        # All content data
├── types.ts            # TypeScript interfaces
│
├── components/
│   ├── Navigation.tsx  # Fixed header
│   ├── Hero.tsx        # Landing section
│   ├── Projects.tsx    # Portfolio
│   ├── About.tsx       # Company info
│   ├── Team.tsx        # Leadership
│   ├── Services.tsx    # Services grid
│   ├── Footer.tsx      # Contact
│   └── CustomCursor.tsx # Animated cursor
│
├── context/
│   └── CursorContext.tsx # Cursor state
│
└── docs/
    ├── UI.md           # Component docs
    └── DESIGN-SYSTEM.md # Design docs
```

---

## How to Make Changes

### Updating Content

**Project/Team/Services data:** Edit `constants.ts`
```javascript
// Example: Change a project title
export const PROJECTS = [
  {
    id: '1',
    title: 'New Project Name',  // Change this
    category: 'Category',
    image: '/images/projects/image.jpg',
  },
  // ...
];
```

**Section text:** Edit the specific component file
- Hero text: `components/Hero.tsx`
- About tabs: `components/About.tsx` (TABS array at top)
- Footer contact: `components/Footer.tsx`

### Adding Images

1. Place images in `/public/images/`
2. Reference them in constants.ts: `/images/projects/filename.jpg`

---

## Design System Quick Reference

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Burgundy** | `#582f37` | Primary accent, text, footer bg |
| **Light BG** | `#F8F8F8` | Page background |
| **White** | `#FFFFFF` | Cards, nav |

### Typography

- **Body:** Inter (sans-serif)
- **Accents:** Playfair Display (serif italic)

### Cursor States

```javascript
setCursorState('default')  // Normal
setCursorState('hover')    // On buttons/links
setCursorState('text')     // On headlines
setCursorState('hidden')   // Hide cursor
```

---

## Common Tasks

### Add a new project

1. Open `constants.ts`
2. Add to PROJECTS array:
```javascript
{
  id: '9',
  title: 'Project Name',
  category: 'Category',
  image: '/images/projects/your-image.jpg',
}
```

### Change a color

1. Search for the hex code (e.g., `#582f37`)
2. Replace all instances
3. Update `/docs/DESIGN-SYSTEM.md`

### Add cursor interaction to an element

```javascript
import { useCursor } from '../context/CursorContext';

const { setCursorState } = useCursor();

<button
  onMouseEnter={() => setCursorState('hover')}
  onMouseLeave={() => setCursorState('default')}
>
  Click me
</button>
```

### Add a new component

1. Create file in `/components/`
2. Import and add to `App.tsx`
3. Document in `/docs/UI.md`

---

## Important Notes

- **Custom Cursor:** Hidden on touch devices automatically
- **Smooth Scroll:** Handled by Lenis library in App.tsx
- **Animations:** Use Framer Motion patterns from existing components
- **Responsive:** Mobile-first, use `md:` and `lg:` breakpoints
