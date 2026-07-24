import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Schibsted_Grotesk,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Arabic,
  Alexandria,
} from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import JsonLd from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/schema";
import { SITE_URL, OG_IMAGE } from "@/lib/site";
import { buildAlternates } from "@/lib/seo";
import {
  LOCALES,
  OG_LOCALES,
  getDirection,
  isLocale,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

/**
 * Root layout. There is deliberately NO `app/layout.tsx`: with a dynamic
 * `[lang]` segment at the top of the tree, THIS is the root layout, which is
 * the only way `<html lang>` and `<html dir>` can vary per locale.
 */

// Runs before the body paints: arms the FOUC guard so reveal targets start
// hidden — but only when JS is on and the visitor allows motion.
const ANIM_BOOT = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('anim-ready')}}catch(e){}`;

/*
 * FONT LOADING NOTE
 * -----------------
 * All four faces use `preload: false` on purpose. next/font emits preload links
 * for every font in a route's module graph, and this layout imports all four —
 * so preloading would make an English page download the Arabic faces it never
 * renders, and vice versa. With preload off, a face is fetched only once CSS
 * actually references it, so each edition pulls exactly the two families it
 * uses. `display: swap` keeps text visible during that fetch.
 */

// --- Latin edition -------------------------------------------------------
// Display face. Variable (wght 400-900), so weights are dialled in CSS.
const display = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Body face. Static on Google Fonts, so weights are enumerated explicitly.
const body = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

// --- Arabic edition ------------------------------------------------------
// Display face. Alexandria is variable (100-900), so it hits the site's native
// 500 heading weight with no synthetic bolding. Chosen over Almarai (which
// ships no 500 at all) and Noto Kufi Arabic (too wide and light at display
// sizes) because it carries the same dense, rationalist voice that Schibsted
// Grotesk gives the Latin edition.
const displayArabic = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  display: "swap",
  preload: false,
});

// Body face. The designed Arabic sibling of the Latin body font, so metrics and
// tone match across editions. Its Latin glyphs also cover the stray Latin runs
// on an Arabic page (emails, URLs, phone numbers).
const bodyArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

/** Prerender both editions at build time. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  const alternates = buildAlternates(lang, "/");

  return {
    // metadataBase makes every relative OG/Twitter image resolve to an absolute
    // URL, which also clears Next's build-time "metadataBase not set" warning.
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.siteTitle,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    applicationName: dict.brand.shortName,
    keywords: dict.meta.keywords,
    authors: [{ name: dict.brand.legalName }],
    creator: dict.brand.legalName,
    publisher: dict.brand.legalName,
    category: "Architecture and Engineering",
    // This edition's canonical plus the reciprocal hreflang set.
    alternates,
    openGraph: {
      type: "website",
      siteName: dict.brand.shortName,
      title: dict.meta.siteTitle,
      description: dict.meta.description,
      url: alternates.canonical,
      locale: OG_LOCALES[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map(
        (l) => OG_LOCALES[l]
      ),
      images: [
        {
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: dict.meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.siteTitle,
      description: dict.meta.description,
      images: [OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/favicon.svg",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  // A path like /de/about reaches this layout with lang="de". Without this
  // guard it would render an <html lang="de"> shell around a 404.
  if (!isLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      // All four font variables ride on <html>, never <body>: a :root token
      // referencing a next/font variable scoped to <body> computes to empty,
      // and text silently falls back to Tailwind's default sans. globals.css
      // selects the right pair off html[lang].
      className={`${display.variable} ${body.variable} ${displayArabic.variable} ${bodyArabic.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {/* Site-wide structured data: Organization (ProfessionalService) + WebSite */}
        <JsonLd data={siteGraph(locale, dict)} />
        <script dangerouslySetInnerHTML={{ __html: ANIM_BOOT }} />
        <a href="#main" className="skip-link">
          {dict.a11y.skipToContent}
        </a>
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
