/**
 * Localized 404
 * =============
 * A not-found page receives no route params, so this server component cannot
 * read `[lang]` directly. Rather than reach for a dynamic API (which would drop
 * static generation for the whole segment), it hands every edition's 404 strings
 * to a small client component that picks the right one from the pathname.
 *
 * Rendered inside app/[lang]/layout.tsx, so it inherits the correct <html lang>
 * and <html dir> for whichever edition the visitor was browsing.
 */

import NotFoundContent, {
  type NotFoundEdition,
} from "@/components/layout/NotFoundContent";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default function NotFound() {
  const editions = Object.fromEntries(
    LOCALES.map((locale) => {
      const dict = getDictionary(locale);
      const edition: NotFoundEdition = {
        nav: dict.nav,
        langSwitcher: dict.langSwitcher,
        footer: dict.footer,
        title: dict.pages.project.notFoundTitle,
        homeLabel: dict.pages.project.breadcrumbHome,
      };
      return [locale, edition];
    })
  ) as Record<Locale, NotFoundEdition>;

  return <NotFoundContent editions={editions} />;
}
