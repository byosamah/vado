import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/layout/MotionProvider";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vado.sa";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "VADO Consultants | Architecture & Engineering Studio",
  description:
    "Khobar-based architecture and engineering consultants since 1994. Delivering excellence in urban, landscape, cultural, retail, hospitality, and residential projects across Saudi Arabia.",
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
    <html lang="en-SA">
      <body className={`${nunitoSans.variable} antialiased`}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
