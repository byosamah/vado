/**
 * i18n Configuration
 * ==================
 * The locale list, the default, and the text direction each one reads in.
 * Everything else in the i18n layer derives from this file, so adding a third
 * language starts here.
 *
 * Kept free of imports so it can be pulled into middleware (edge runtime),
 * server components, and client components alike.
 */

/** Every locale the site serves, in the order they appear in a switcher. */
export const LOCALES = ["en", "ar"] as const;

/** A locale code known to the site. */
export type Locale = (typeof LOCALES)[number];

/**
 * The locale served when the URL carries no language segment. `/` redirects
 * here, and `x-default` hreflang points at this edition.
 */
export const DEFAULT_LOCALE: Locale = "en";

/** Text direction per locale, applied to <html dir>. */
export const DIRECTIONS: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

/**
 * How each language names itself. A language switcher should always label a
 * language in that language, never in the current one, so a visitor who cannot
 * read the current page can still find their way out.
 */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

/** Short switcher labels (the compact toggle in the header). */
export const LOCALE_SHORT_NAMES: Record<Locale, string> = {
  en: "EN",
  ar: "ع",
};

/**
 * BCP 47 tags for OpenGraph `locale` fields. Region-qualified here because
 * OpenGraph expects language_TERRITORY, unlike hreflang where the bare
 * language code deliberately keeps the annotation country-agnostic.
 */
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  ar: "ar_SA",
};

/** Narrowing guard for untrusted input (route params, path segments). */
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Text direction for a locale. */
export function getDirection(locale: Locale): "ltr" | "rtl" {
  return DIRECTIONS[locale];
}

/** True when the locale reads right to left. */
export function isRtl(locale: Locale): boolean {
  return DIRECTIONS[locale] === "rtl";
}

/**
 * A value that must exist in every language. Using this type on content fields
 * means the compiler rejects a project (or any other entity) that was only
 * filled in for one language.
 */
export type Localized<T> = Record<Locale, T>;

/** Resolve a `Localized<T>` for one locale. */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

/**
 * Prefix a site-relative path with its locale segment.
 * `localePath("en", "/about")` gives `/en/about`; the root gives `/en`.
 */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/**
 * Strip a leading locale segment from a pathname, returning the part that is
 * shared between languages. `/ar/projects/matal` gives `/projects/matal`.
 * Used by the language switcher to stay on the same page across a swap.
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isLocale(segments[0])) segments.shift();
  return segments.length ? `/${segments.join("/")}` : "/";
}
