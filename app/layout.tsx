import type { Metadata } from "next";
import { Schibsted_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import JsonLd from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/schema";
import { SITE_URL, META_DESCRIPTION, OG_IMAGE } from "@/lib/site";

// Runs before the body paints: arms the FOUC guard so reveal targets start
// hidden — but only when JS is on and the visitor allows motion.
const ANIM_BOOT = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('anim-ready')}}catch(e){}`;

// Display face (headlines, big quotes, the wordmark). Schibsted Grotesk is a
// variable font (wght 400 to 900); loading it variable lets us dial weights in CSS.
// Its lightest cut is 400, so it can't do Nunito's soft hairline look. Good.
const display = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

// Body face (running text, labels, nav, buttons). IBM Plex Sans is static on
// Google Fonts, so its weights are enumerated explicitly.
const body = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase makes every relative OG/Twitter image resolve to an absolute
  // URL, which also clears Next's build-time "metadataBase not set" warning.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VADO | Architecture & Engineering Consultants in Al Khobar",
    template: "%s | VADO",
  },
  description: META_DESCRIPTION,
  applicationName: "VADO",
  keywords: [
    "VADO",
    "VISION Arch. & Engineering Consultants",
    "architecture firm Saudi Arabia",
    "engineering consultants Al Khobar",
    "architecture consultancy Khobar",
    "master planning Saudi Arabia",
    "urban design",
    "landscape architecture",
    "project management",
    "site supervision",
  ],
  authors: [{ name: "VISION Arch. & Engineering Consultants" }],
  creator: "VISION Arch. & Engineering Consultants",
  publisher: "VISION Arch. & Engineering Consultants",
  category: "Architecture and Engineering",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "VADO",
    title: "VADO | Architecture & Engineering Consultants in Al Khobar",
    description: META_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VADO | Architecture & Engineering Consultants in Al Khobar",
    description: META_DESCRIPTION,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {/* Site-wide structured data: Organization (ProfessionalService) + WebSite */}
        <JsonLd data={siteGraph()} />
        <script dangerouslySetInnerHTML={{ __html: ANIM_BOOT }} />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
