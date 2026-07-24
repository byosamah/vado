/**
 * SEO URL & hreflang Helpers
 * ==========================
 * One place that knows how a locale-prefixed URL is spelled, so canonicals,
 * hreflang annotations, the sitemap, and JSON-LD can never disagree.
 *
 * hreflang rules applied here:
 *  - Annotations are RECIPROCAL: every page lists every language edition of
 *    itself, including its own. A one-way annotation is ignored by Google.
 *  - Codes are bare language subtags (`en`, `ar`), NOT region-qualified
 *    (`en-SA`). A region-qualified tag would restrict the annotation to
 *    searchers in that country, which is the opposite of what a firm serving
 *    the whole Gulf wants.
 *  - `x-default` points at the default-locale edition, which is where `/`
 *    redirects, so crawlers and humans land in the same place.
 */

import { SITE_URL } from "@/lib/site";
import { LOCALES, DEFAULT_LOCALE, localePath, type Locale } from "@/lib/i18n/config";

/**
 * Site-relative, locale-prefixed path. `path` is the language-agnostic part
 * ("/about", "/projects/matal", or "/" for the homepage).
 */
export function localeHref(locale: Locale, path = "/"): string {
  return localePath(locale, path);
}

/** Fully qualified URL for a locale + path. Used by JSON-LD and the sitemap. */
export function absoluteUrl(locale: Locale, path = "/"): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/**
 * The `languages` map for Next's `alternates`, which renders one
 * `<link rel="alternate" hreflang="...">` per entry, plus `x-default`.
 */
export function languageAlternates(path = "/"): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = localePath(locale, path);
  }
  languages["x-default"] = localePath(DEFAULT_LOCALE, path);
  return languages;
}

/**
 * The complete `alternates` block for a page: its own canonical plus the
 * reciprocal hreflang set. Drop this straight into a Metadata object.
 */
export function buildAlternates(locale: Locale, path = "/") {
  return {
    canonical: localePath(locale, path),
    languages: languageAlternates(path),
  };
}

/** Every locale's absolute URL for one path. Used by the sitemap. */
export function allLocaleUrls(path = "/"): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, absoluteUrl(locale, path)])
  ) as Record<Locale, string>;
}
