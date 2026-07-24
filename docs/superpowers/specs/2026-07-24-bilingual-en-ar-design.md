# VADO Bilingual (EN / AR) Design

Date: 2026-07-24
Status: approved, implementing

## Goal

Serve the whole VADO site in English at `/en/*` and Arabic at `/ar/*`, following SEO
best practice for multilingual sites, and make it structurally impossible for one
language to drift ahead of the other.

## Decisions

| Question | Decision |
|---|---|
| Default locale | English. `/` redirects to `/en`. |
| Old URL handling | `/about` and friends 308-redirect to `/en/about` so existing search equity transfers. |
| Arabic slugs | Latin. `/ar/about`, `/ar/projects/matal`. One slug set, no percent-encoding. |
| Arabic copy | Written now in professional Modern Standard Arabic, reviewed by the owner afterwards. |
| Arabic display face | Alexandria (variable 100-900, native 500). |
| Arabic body face | IBM Plex Sans Arabic (the designed sibling of the Latin body font). |

### Why that type pairing

The Latin system pairs a rationalist display face (Schibsted Grotesk) with a humanist
body face (IBM Plex Sans). Alexandria over IBM Plex Sans Arabic reproduces that exact
relationship in Arabic, so the two language editions read as one design system.

Rejected, with reasons measured in a live specimen:

- **Almarai** ships no 500 weight (400 and 700 only). At 700 it rendered visibly heavier
  than the Latin reference, breaking the page's tonal balance.
- **Noto Kufi Arabic** rendered wide and airy at 500. Conceptually apt for architecture,
  but it loses the dense, tight texture of the Schibsted headline.
- **Readex Pro** and **Tajawal** are competent but read softer and less authoritative
  than a practice founded in 1994 should.

Both chosen faces are on Google Fonts, so `next/font/google` self-hosts them at build
time. No external requests, no change to the performance profile.

## Architecture

### Routing

```
app/
  layout.tsx              root shell, no locale knowledge
  [lang]/
    layout.tsx            html lang + dir, fonts, JSON-LD
    page.tsx              homepage
    about/ services/ careers/ suppliers/
    projects/ projects/[slug]/
  sitemap.ts  robots.ts  llms.txt/route.ts
middleware.ts
```

`middleware.ts` inspects the first path segment. When it is neither `en` nor `ar` the
request is redirected to the same path under the default locale.

- `/` to `/en` with **307** (temporary), leaving room to add Accept-Language detection
  later without a permanently cached redirect in visitors' browsers.
- `/about` to `/en/about` with **308** (permanent), which is what transfers ranking
  signals for URLs already in the index.

`generateStaticParams` returns both locales on every route, so both editions prerender.

### The synchronization guarantee

```
lib/i18n/
  config.ts                locales, default, direction, types
  dictionaries/en.ts       source of truth for the shape
  dictionaries/ar.ts       typed as Dictionary, must match exactly
  get-dictionary.ts        server-side loader
```

`en.ts` exports a deeply nested `as const` object. `Dictionary` is derived as
`typeof en`. `ar.ts` is annotated `const ar: Dictionary`, which makes the compiler
enforce parity in both directions:

- a key added to English but missing in Arabic fails the build,
- a key present in Arabic but not in English fails the build.

Because `next build` type-checks, neither language can ship ahead of the other.

Types cannot catch everything, so `npm run i18n:check` covers the remainder:

1. array length drift (three principles in English, two in Arabic),
2. empty strings,
3. Arabic values still byte-identical to their English source, which means untranslated.

### Content entities

`lib/projects.ts` keeps one record per project. Slug, hero image, and gallery are
shared and untranslated. `title`, `category`, `type`, `client`, `location`, and
`description` become `Localized<string>` (`{ en, ar }`). A `getProjects(lang)` helper
resolves them, so components keep receiving flat strings.

This means adding a project forces both languages inside a single edit.

Service names and descriptions move out of `lib/site.ts` into the dictionaries, which
also resolves a pre-existing drift where `lib/site.ts` and `ServicesTabs.tsx` carried
two slightly different wordings of the same four descriptions.

`lib/site.ts` keeps only language-neutral brand facts: URL, email, phone, address,
founding year.

### Wiring

Explicit props, no context provider. `Header`, `Footer`, and each section accept `lang`
plus their slice of the dictionary. Pages are server components that await the
dictionary and pass slices down. Greppable, with no hidden data flow.

### RTL

- `<html lang={lang} dir={dir}>` from the locale layout.
- Directional Tailwind utilities become logical: `ps-*`, `pe-*`, `ms-*`, `me-*`,
  `start-*`, `end-*`, `border-s`, `border-e`, `text-start`, `text-end`.
- Swiper receives `dir` and a `key` so it re-initialises when direction changes.
- The reveal engine flips the sign of `data-reveal="left"` and `"right"` under RTL.
- `.underline-hover` flips its `transform-origin` under `[dir="rtl"]`.
- Directional arrow icons flip.

**`ServicesTabs` needs special handling.** Its desktop columns use
`writing-mode: vertical-lr`, which breaks Arabic: the script is cursive, and vertical
writing mode isolates each glyph and severs the joins. The fix is to rotate a normal
horizontal text block with `transform: rotate()` instead, which preserves both the
joins and the interaction. Rotated elements do not reserve layout space, so the
column needs an explicit width. Verified in-browser.

### SEO

- Reciprocal `hreflang` on every route through Next's `alternates.languages`, using
  bare `en` and `ar` (not `en-SA`) so the annotations are not restricted to one country,
  plus `x-default` pointing at the English edition.
- Per-locale canonical URLs.
- `sitemap.xml` lists both editions with alternate annotations.
- JSON-LD carries `inLanguage` and localized names and descriptions.
- `llms.txt` becomes a generated route composed from `lib/site.ts` and the
  dictionaries, so it cannot drift from the site copy.

### Language switcher

Lives in the header on desktop and inside the mobile menu. Preserves the current path
when switching, and carries `hreflang` on the link.

## Out of scope

`BlogGrid` holds placeholder posts with invented 2023 dates and is commented out of the
homepage. It is translated for completeness but its content remains placeholder.
