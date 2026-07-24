/**
 * Dictionary Loader
 * =================
 * Resolves a locale to its dictionary, plus the small `t()` helper that fills
 * `{placeholder}` slots in a translated string.
 *
 * IMPORTANT: import this from SERVER components only. Both dictionaries are
 * statically imported here, so pulling this into a client component would ship
 * every language's copy to the browser. The pattern everywhere in this codebase
 * is: a server page calls `getDictionary(lang)` and passes the slice each client
 * section needs down as a prop.
 */

import en, { type Dictionary } from "./dictionaries/en";
import ar from "./dictionaries/ar";
import type { Locale } from "./config";

const DICTIONARIES: Record<Locale, Dictionary> = { en, ar };

/** The full dictionary for a locale. Synchronous: these are plain modules. */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/**
 * Fill `{name}` placeholders in a translated string.
 *
 *   t("{title} by VADO in {location}", { title: "Matal", location: "Al Khobar" })
 *   // "Matal by VADO in Al Khobar"
 *
 * Placeholders let a translator move a variable to wherever the target language
 * needs it, which is exactly why the copy never concatenates fragments.
 * An unmatched placeholder is left intact rather than replaced with
 * "undefined", so a typo shows up loudly instead of shipping silently.
 */
export function t(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}

export type { Dictionary };
