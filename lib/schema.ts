/**
 * JSON-LD Structured Data Builders
 * ================================
 * Pure functions that return schema.org objects for AI answer engines and
 * search crawlers. Emitting these as <script type="application/ld+json"> gives
 * ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews a clean,
 * machine-readable description of the firm, its services, and its projects,
 * which raises the odds of being cited accurately.
 *
 * Every builder takes a locale and its dictionary, so the Arabic edition emits
 * Arabic names and descriptions rather than repeating the English graph.
 *
 * Entity @ids stay locale-INDEPENDENT on purpose. The firm is one organization
 * described in two languages, not two organizations, so both editions point at
 * `${SITE_URL}/#organization`. `inLanguage` on the page-level nodes is what
 * tells a crawler which edition it is reading.
 *
 * Everything here is grounded in real site content (lib/site.ts,
 * lib/projects.ts, and the dictionaries). No fabricated ratings or awards.
 */

import {
  SITE_URL,
  FOUNDING_YEAR,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  COUNTRY_CODE,
  OG_IMAGE,
} from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import { LOCALES, LOGOS, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Project } from "@/lib/projects";

/** Stable @id anchors so entities can cross-reference within a @graph. */
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * The firm itself, typed as ProfessionalService (a subtype of LocalBusiness),
 * so it carries both entity signals (Organization) and local-business signals
 * (address, area served, contact channels).
 */
export function organizationSchema(locale: Locale, dict: Dictionary) {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: dict.brand.shortName,
    legalName: dict.brand.legalName,
    alternateName: dict.brand.legalName,
    url: absoluteUrl(locale, "/"),
    // The edition's own wordmark, so an Arabic knowledge panel shows the Arabic
    // lockup rather than the Latin one.
    logo: `${SITE_URL}${LOGOS[locale]}`,
    image: `${SITE_URL}${OG_IMAGE.url}`,
    description: dict.meta.longDescription,
    foundingDate: FOUNDING_YEAR,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: dict.brand.street,
      addressLocality: dict.brand.city,
      addressRegion: dict.brand.region,
      addressCountry: COUNTRY_CODE,
    },
    areaServed: {
      "@type": "Country",
      name: dict.brand.country,
    },
    knowsAbout: dict.services.map((service) => service.name),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      areaServed: COUNTRY_CODE,
      availableLanguage: [...LOCALES],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.pages.services.heading,
      itemListElement: dict.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
  };
}

/** The site as a WebSite entity, published by the organization above. */
export function websiteSchema(locale: Locale, dict: Dictionary) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl(locale, "/"),
    name: dict.brand.shortName,
    description: dict.meta.longDescription,
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
  };
}

/**
 * Site-wide graph rendered once per locale layout. Combines the firm and the
 * website so crawlers resolve a single, cross-linked knowledge entity.
 */
export function siteGraph(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(locale, dict), websiteSchema(locale, dict)],
  };
}

/**
 * Homepage FAQ. Answers are short, self-contained, and drawn straight from the
 * site so they extract cleanly into AI answers. FAQPage is also eligible for
 * Google rich results.
 */
export function faqSchema(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: dict.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** AboutPage node for /about, wrapped around the shared organization entity. */
export function aboutSchema(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: dict.pages.about.metaTitle,
    url: absoluteUrl(locale, "/about"),
    description: dict.meta.longDescription,
    inLanguage: locale,
    mainEntity: organizationSchema(locale, dict),
  };
}

/**
 * /services: a CollectionPage cross-linked to the organization, a breadcrumb,
 * and one Service entity per discipline.
 */
export function servicesGraph(locale: Locale, dict: Dictionary) {
  const pageUrl = absoluteUrl(locale, "/services");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: dict.pages.services.heading,
        description: dict.pages.services.metaDescription,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        inLanguage: locale,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: dict.pages.project.breadcrumbHome,
            item: absoluteUrl(locale, "/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: dict.nav.services,
            item: pageUrl,
          },
        ],
      },
      ...dict.services.map((service) => ({
        "@type": "Service",
        "@id": `${pageUrl}#${service.id}`,
        name: service.name,
        serviceType: service.name,
        description: service.description,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: dict.brand.country },
      })),
    ],
  };
}

/**
 * A single project, typed as CreativeWork, with a BreadcrumbList for the
 * project trail. Rendered on each /[lang]/projects/[slug] page.
 */
export function projectGraph(
  project: Project,
  locale: Locale,
  dict: Dictionary
) {
  const projectUrl = absoluteUrl(locale, `/projects/${project.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${projectUrl}#project`,
        name: project.title,
        headline: project.title,
        description: project.description,
        url: projectUrl,
        image: `${SITE_URL}${project.heroImage}`,
        genre: project.type,
        inLanguage: locale,
        locationCreated: {
          "@type": "Place",
          name: project.location,
        },
        creator: { "@id": ORG_ID },
        author: { "@id": ORG_ID },
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: dict.pages.project.breadcrumbHome,
            item: absoluteUrl(locale, "/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: dict.pages.project.breadcrumbProjects,
            item: absoluteUrl(locale, "/projects"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: projectUrl,
          },
        ],
      },
    ],
  };
}
