"use client";

/**
 * NotFoundContent
 * ===============
 * The visible body of the 404, split out as a CLIENT component so it can read
 * the current pathname and answer in the language the visitor was browsing.
 *
 * Why this shape:
 *
 * A `not-found.tsx` receives no route params, so it cannot see `[lang]`. The
 * obvious fix is `headers()` in the server component, but any dynamic API there
 * opts the ENTIRE `[lang]` segment out of static generation, turning every
 * prerendered page into an on-demand render. That is a real performance
 * regression to pay for a page almost nobody sees.
 *
 * Instead the server passes BOTH editions of the handful of strings a 404 needs,
 * and this component picks one from `usePathname()`. The extra payload is a few
 * dozen short strings on the 404 route only, and every other page stays static.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

import Header from "./Header";
import Footer from "./Footer";
import {
  DEFAULT_LOCALE,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** The slice of a dictionary a 404 needs. Small on purpose. */
export interface NotFoundEdition {
  nav: Dictionary["nav"];
  langSwitcher: Dictionary["langSwitcher"];
  footer: Dictionary["footer"];
  title: string;
  homeLabel: string;
}

export default function NotFoundContent({
  editions,
}: {
  editions: Record<Locale, NotFoundEdition>;
}) {
  const pathname = usePathname() ?? "";
  const first = pathname.split("/").filter(Boolean)[0];
  const lang: Locale = isLocale(first) ? first : DEFAULT_LOCALE;
  const copy = editions[lang];

  return (
    <>
      <Header
        lang={lang}
        nav={copy.nav}
        langSwitcher={copy.langSwitcher}
        forceSolid
      />

      <main id="main" className="pt-24">
        <section className="section">
          <div className="container">
            <div className="max-w-2xl">
              <span className="text-sm tracking-widest uppercase text-gray-500">
                404
              </span>
              <h1 className="mt-6">{copy.title}</h1>
              <Link
                href={localePath(lang, "/")}
                className="inline-flex items-center gap-3 mt-10 text-sm tracking-widest uppercase underline-hover"
              >
                {copy.homeLabel}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} footer={copy.footer} nav={copy.nav} />
    </>
  );
}
