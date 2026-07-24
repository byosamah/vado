"use client";

/**
 * LanguageSwitcher
 * ================
 * Swaps between language editions of the CURRENT page rather than dumping the
 * visitor on the homepage, which is the single most common failure of a
 * bilingual site: reading /en/projects/matal, clicking Arabic, and landing on
 * /ar with your place lost.
 *
 * It does that by stripping the locale segment off the live pathname and
 * re-prefixing it with the target locale, so /en/projects/matal becomes
 * /ar/projects/matal. This works for every route because both editions share
 * one set of Latin slugs.
 *
 * The label is always written IN the target language ("العربية", "English"),
 * never in the current one. Someone who cannot read the page they landed on
 * must still be able to recognise the way out.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALES,
  LOCALE_NAMES,
  localePath,
  stripLocale,
  type Locale,
} from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  /** The locale currently being displayed. */
  lang: Locale;
  /** Accessible name for the control, in the CURRENT language. */
  label: string;
  className?: string;
}

export default function LanguageSwitcher({
  lang,
  label,
  className = "",
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  // The part of the path both editions share, e.g. "/projects/matal".
  const sharedPath = stripLocale(pathname ?? "/");

  // With exactly two locales this is a single link. Mapping over the list
  // (rather than hardcoding "the other one") means adding a third language
  // turns this into a row of links with no code change here.
  const targets = LOCALES.filter((locale) => locale !== lang);

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label={label}>
      {targets.map((target) => (
        <Link
          key={target}
          href={localePath(target, sharedPath)}
          // hrefLang tells assistive tech and crawlers what is on the other end.
          hrefLang={target}
          // The label is in the target language, so the element must declare
          // that language or a screen reader will pronounce it with the wrong
          // voice. dir keeps the glyphs ordered correctly either way.
          lang={target}
          dir={target === "ar" ? "rtl" : "ltr"}
          className="inline-flex items-center py-3 text-sm tracking-wide transition-colors duration-300"
        >
          <span className="underline-hover">{LOCALE_NAMES[target]}</span>
        </Link>
      ))}
    </div>
  );
}
