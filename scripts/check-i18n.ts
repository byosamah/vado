/**
 * i18n Parity Check
 * =================
 * TypeScript already guarantees that every locale dictionary has identical
 * KEYS: `ar.ts` is annotated `Dictionary` (= typeof en), so a missing key or an
 * extra key fails `next build`. This script covers the three failure modes the
 * type system structurally cannot see:
 *
 *   1. ARRAY LENGTH DRIFT — `Foo[]` accepts any length, so three principles in
 *      English and two in Arabic type-checks fine but ships a broken page.
 *   2. EMPTY STRINGS — `""` satisfies `string`. A blank translation is a hole.
 *   3. UNTRANSLATED VALUES — a string byte-identical to its English source is
 *      almost always a copy-paste that never got translated. A short allowlist
 *      covers the handful that are legitimately identical (placeholders like
 *      "your@email.com", the "https://" hint, the " *" required marker).
 *
 * Run with `npm run i18n:check`. Exits non-zero on any finding, so it works in
 * CI as well as by hand.
 */

// Explicit .ts extensions: this file runs on Node's native type stripping
// (`node scripts/check-i18n.ts`), which resolves ESM specifiers literally.
// tsconfig sets allowImportingTsExtensions so tsc accepts them too.
import en from "../lib/i18n/dictionaries/en.ts";
import ar from "../lib/i18n/dictionaries/ar.ts";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "../lib/i18n/config.ts";

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

/**
 * Dotted paths whose value is ALLOWED to match English exactly. These are
 * technical strings, not prose: format hints a translator should not localize,
 * and identifiers that key into code.
 */
const IDENTICAL_ALLOWED = new Set<string>([
  "forms.emailPlaceholder",
  "forms.phonePlaceholder",
  "forms.requiredMark",
  "pages.suppliers.supplierEmailPlaceholder",
  "pages.suppliers.websitePlaceholder",
  "meta.titleTemplate",
]);

/** Path prefixes whose values are code identifiers, never user-facing prose. */
const IDENTIFIER_PATHS = [/^services\.\d+\.id$/, /^principles\.\d+\.id$/];

interface Finding {
  locale: Locale;
  path: string;
  kind: "array-length" | "empty" | "untranslated" | "placeholder-drift";
  detail: string;
}

const findings: Finding[] = [];

/** Extract the set of {placeholder} names used in a string. */
function placeholders(value: string): Set<string> {
  return new Set(Array.from(value.matchAll(/\{(\w+)\}/g), (m) => m[1]));
}

function isIdentifier(path: string): boolean {
  return IDENTIFIER_PATHS.some((re) => re.test(path));
}

/**
 * Walk the English tree and compare the same position in the target tree.
 * Keys are already guaranteed to match by the compiler, so this only inspects
 * shape and content.
 */
function walk(source: Json, target: Json, locale: Locale, path: string): void {
  if (Array.isArray(source)) {
    if (!Array.isArray(target)) return;
    if (source.length !== target.length) {
      findings.push({
        locale,
        path,
        kind: "array-length",
        detail: `${DEFAULT_LOCALE} has ${source.length} item(s), ${locale} has ${target.length}`,
      });
    }
    const shared = Math.min(source.length, target.length);
    for (let i = 0; i < shared; i++) {
      walk(source[i], target[i], locale, `${path}${path ? "." : ""}${i}`);
    }
    return;
  }

  if (source && typeof source === "object") {
    if (!target || typeof target !== "object" || Array.isArray(target)) return;
    for (const key of Object.keys(source)) {
      walk(
        (source as Record<string, Json>)[key],
        (target as Record<string, Json>)[key],
        locale,
        `${path}${path ? "." : ""}${key}`
      );
    }
    return;
  }

  if (typeof source !== "string" || typeof target !== "string") return;
  if (isIdentifier(path)) return;

  if (target.trim() === "") {
    findings.push({
      locale,
      path,
      kind: "empty",
      detail: "translated value is empty",
    });
    return;
  }

  if (target === source && !IDENTICAL_ALLOWED.has(path)) {
    findings.push({
      locale,
      path,
      kind: "untranslated",
      detail: `still identical to ${DEFAULT_LOCALE}: "${truncate(source)}"`,
    });
  }

  // A translation that drops or invents a {placeholder} renders a literal
  // "{name}" to the visitor, or silently loses a value.
  const from = placeholders(source);
  const to = placeholders(target);
  const missing = [...from].filter((p) => !to.has(p));
  const extra = [...to].filter((p) => !from.has(p));
  if (missing.length || extra.length) {
    findings.push({
      locale,
      path,
      kind: "placeholder-drift",
      detail: [
        missing.length ? `missing {${missing.join("}, {")}}` : "",
        extra.length ? `unknown {${extra.join("}, {")}}` : "",
      ]
        .filter(Boolean)
        .join("; "),
    });
  }
}

function truncate(value: string, max = 60): string {
  return value.length > max ? `${value.slice(0, max)}...` : value;
}

const TARGETS: Partial<Record<Locale, unknown>> = { ar };

for (const locale of LOCALES) {
  if (locale === DEFAULT_LOCALE) continue;
  const target = TARGETS[locale];
  if (!target) {
    console.error(`\n  No dictionary registered for "${locale}" in check-i18n.ts\n`);
    process.exit(1);
  }
  walk(en as unknown as Json, target as Json, locale, "");
}

if (findings.length === 0) {
  const localeList = LOCALES.join(", ");
  console.log(`\n  i18n parity OK  (${localeList})`);
  console.log("  Keys are enforced by TypeScript; shape and content verified here.\n");
  process.exit(0);
}

console.error(`\n  i18n parity FAILED with ${findings.length} finding(s):\n`);

const byKind = findings.reduce<Record<string, Finding[]>>((acc, f) => {
  (acc[f.kind] ??= []).push(f);
  return acc;
}, {});

const HEADINGS: Record<Finding["kind"], string> = {
  "array-length": "Array length drift (TypeScript cannot catch this)",
  empty: "Empty translations",
  untranslated: "Values still identical to English",
  "placeholder-drift": "Placeholder mismatches",
};

for (const [kind, items] of Object.entries(byKind)) {
  console.error(`  ${HEADINGS[kind as Finding["kind"]]}`);
  for (const item of items) {
    console.error(`    [${item.locale}] ${item.path || "(root)"}  ${item.detail}`);
  }
  console.error("");
}

console.error("  Fix the findings above, then re-run: npm run i18n:check\n");
process.exit(1);
