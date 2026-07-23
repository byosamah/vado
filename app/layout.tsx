import type { Metadata } from "next";
import { Schibsted_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

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
  title: "VADO Consultants | Architecture & Engineering Studio",
  description: "Khobar-based architecture and engineering consultants since 1994. Delivering excellence in urban, landscape, cultural, retail, hospitality, and residential projects across Saudi Arabia.",
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
        <script dangerouslySetInnerHTML={{ __html: ANIM_BOOT }} />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
