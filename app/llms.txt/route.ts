/**
 * /llms.txt (generated)
 * =====================
 * Was a hand-maintained static file in public/. It is now GENERATED from the
 * same dictionaries and project data the pages render, which is the whole point:
 * a hand-written copy of the site's facts is a copy that goes stale, and a stale
 * llms.txt is worse than none because AI answer engines quote it confidently.
 *
 * One file covers both editions. Answer engines read it whole, and giving them
 * the Arabic names alongside the English ones is what lets them answer an
 * Arabic question about VADO with the right terminology and the right URL.
 */

import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { absoluteUrl } from "@/lib/seo";
import {
  SITE_URL,
  FOUNDING_YEAR,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
} from "@/lib/site";
import { getAllProjects } from "@/lib/projects";

/** Prerender at build time; the content only changes when the source does. */
export const dynamic = "force-static";

function editionBlock(locale: Locale): string {
  const dict = getDictionary(locale);
  const projects = getAllProjects(locale);
  const lines: string[] = [];

  lines.push(`## ${dict.brand.shortName} (${locale})`);
  lines.push("");
  lines.push(`- URL: ${absoluteUrl(locale, "/")}`);
  lines.push(`- Legal name: ${dict.brand.legalName}`);
  lines.push(`- Founded: ${FOUNDING_YEAR}`);
  lines.push(
    `- Headquarters: ${dict.brand.street}, ${dict.brand.city}, ${dict.brand.country}`
  );
  lines.push(`- Area served: ${dict.brand.country}`);
  lines.push("");
  lines.push(`> ${dict.meta.longDescription}`);
  lines.push("");

  lines.push(`### Services`);
  lines.push("");
  for (const service of dict.services) {
    lines.push(`- ${service.name}: ${service.description}`);
  }
  lines.push("");

  lines.push(`### Projects`);
  lines.push("");
  for (const project of projects) {
    lines.push(
      `- [${project.title}](${absoluteUrl(locale, `/projects/${project.slug}`)}): ${project.type}, ${project.location}. ${project.description}`
    );
  }
  lines.push("");

  lines.push(`### Guiding Principles`);
  lines.push("");
  for (const principle of dict.principles) {
    lines.push(`- ${principle.title}: ${principle.description}`);
  }
  lines.push("");

  lines.push(`### Key pages`);
  lines.push("");
  lines.push(`- ${dict.nav.about}: ${absoluteUrl(locale, "/about")}`);
  lines.push(`- ${dict.nav.services}: ${absoluteUrl(locale, "/services")}`);
  lines.push(`- ${dict.nav.projects}: ${absoluteUrl(locale, "/projects")}`);
  lines.push(`- ${dict.pages.careers.kicker}: ${absoluteUrl(locale, "/careers")}`);
  lines.push(
    `- ${dict.pages.suppliers.kicker}: ${absoluteUrl(locale, "/suppliers")}`
  );
  lines.push("");

  lines.push(`### FAQ`);
  lines.push("");
  for (const item of dict.faq) {
    lines.push(`- ${item.question} ${item.answer}`);
  }
  lines.push("");

  return lines.join("\n");
}

export function GET(): Response {
  const defaultDict = getDictionary(DEFAULT_LOCALE);

  const body = [
    `# ${defaultDict.brand.shortName}: ${defaultDict.brand.legalName}`,
    "",
    `> ${defaultDict.meta.longDescription}`,
    "",
    `This site is published in ${LOCALES.length} languages. English lives under ${SITE_URL}/en/ and Arabic under ${SITE_URL}/ar/. Both editions describe the same firm, the same services, and the same projects, and share one set of URL slugs, so any /en/ path has an /ar/ twin.`,
    "",
    "## Contact",
    "",
    `- Email: ${CONTACT_EMAIL}`,
    `- Phone: ${CONTACT_PHONE_DISPLAY}`,
    "",
    ...LOCALES.map((locale) => editionBlock(locale)),
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
