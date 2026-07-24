/**
 * Site Constants
 * ==============
 * Language-NEUTRAL brand facts: the canonical URL, contact channels, and the
 * share image. These read identically in every edition of the site, so they
 * live here rather than in a dictionary.
 *
 * Anything a visitor READS in their own language (legal name, street, city,
 * region, country, service names, descriptions) lives in
 * `lib/i18n/dictionaries/` under `brand` and `services`. Splitting it this way
 * means a new language cannot forget to translate an address, and a change of
 * phone number cannot silently apply to one language only.
 */

/** Public production URL. Update here if a custom domain is added later. */
export const SITE_URL = "https://vado.sa";

/*
 * NOTE: there is deliberately no SITE_NAME here.
 *
 * The wordmark is TRANSLATED ("VADO" / "فادو"), so it lives in the dictionaries
 * as `brand.shortName` and nowhere else. An earlier `SITE_NAME = "VADO"` in this
 * file competed with that as a second source of truth, and the footer wordmark
 * silently rendered English on every Arabic page as a result. One name, one home.
 */

export const FOUNDING_YEAR = "1994";

export const CONTACT_EMAIL = "info@vado.sa";
/**
 * Display-only addresses for the careers and suppliers pages. These are shown
 * to visitors so each audience sees a relevant address; the forms themselves
 * still deliver to CONTACT_EMAIL via Web3Forms (the key controls the inbox).
 * NOTE: for direct email to these to work, set them up as real inboxes or
 * aliases that forward to info@vado.sa.
 */
export const CAREERS_EMAIL = "careers@vado.sa";
export const SUPPLIERS_EMAIL = "suppliers@vado.sa";

/** E.164 form for tel: links and schema. */
export const CONTACT_PHONE = "+966542900447";
/** Grouped form for display. Latin digits in both editions. */
export const CONTACT_PHONE_DISPLAY = "+966 542 900 447";

/** ISO 3166-1 alpha-2. A machine value, never shown to a visitor. */
export const COUNTRY_CODE = "SA";

/**
 * Default social / share image. No dedicated OG asset exists, so the Al Hamra
 * Waterfront hero (a wide landscape render) stands in. Dimensions are the real
 * intrinsic pixels of the file. The alt text is translated, so it lives in the
 * dictionaries as `meta.ogImageAlt`.
 */
export const OG_IMAGE = {
  url: "/images/projects/al-hamra-waterfront/hero.webp",
  width: 1968,
  height: 1312,
} as const;
