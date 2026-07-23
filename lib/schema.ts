/**
 * JSON-LD Structured Data Builders
 * ================================
 * Pure functions that return schema.org objects for AI answer engines and
 * search crawlers. Emitting these as <script type="application/ld+json"> gives
 * ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews a clean,
 * machine-readable description of the firm, its services, and its projects,
 * which raises the odds of being cited accurately.
 *
 * Everything here is grounded in real site content (see lib/site.ts and
 * lib/projects.ts). No fabricated ratings, awards, or authors.
 */

import {
  SITE_URL,
  SITE_NAME,
  LEGAL_NAME,
  FOUNDING_YEAR,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  ADDRESS,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SERVICES,
} from "@/lib/site";
import type { Project } from "@/lib/projects";

/** Stable @id anchors so entities can cross-reference within a @graph. */
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * The firm itself, typed as ProfessionalService (a subtype of LocalBusiness),
 * so it carries both entity signals (Organization) and local-business signals
 * (address, area served, contact channels).
 */
export function organizationSchema() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    alternateName: LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    image: `${SITE_URL}${OG_IMAGE.url}`,
    description: SITE_DESCRIPTION,
    foundingDate: FOUNDING_YEAR,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.region,
      addressCountry: ADDRESS.countryCode,
    },
    areaServed: {
      "@type": "Country",
      name: ADDRESS.country,
    },
    knowsAbout: [
      "Architecture",
      "Engineering Consultancy",
      "Urban Design",
      "Landscape Architecture",
      "Master Planning",
      "Project Management",
      "Site Supervision",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      areaServed: ADDRESS.countryCode,
      availableLanguage: ["en", "ar"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Architecture and Engineering Services",
      itemListElement: SERVICES.map((service) => ({
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
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * Site-wide graph rendered once in the root layout. Combines the firm and the
 * website so crawlers resolve a single, cross-linked knowledge entity.
 */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema()],
  };
}

/**
 * Homepage FAQ. Answers are short, self-contained, and drawn straight from the
 * site so they extract cleanly into AI answers. FAQPage is also eligible for
 * Google rich results.
 */
export function faqSchema() {
  const faqs = [
    {
      q: "What is VADO?",
      a: "VADO (VISION Arch. & Engineering Consultants) is a multidisciplinary architecture and engineering consultancy based in Al Khobar, Saudi Arabia. Established in 1994, it delivers architecture, engineering, and project development services across the Kingdom.",
    },
    {
      q: "Where is VADO located?",
      a: "VADO is headquartered at Al Fardan Tower, Office 401, in Al Khobar, Saudi Arabia, and serves clients throughout Saudi Arabia.",
    },
    {
      q: "What services does VADO offer?",
      a: "VADO provides architectural design, engineering design, project management, and site supervision, covering projects from first concept through construction on site.",
    },
    {
      q: "When was VADO established?",
      a: "VADO was established in 1994 and has decades of experience delivering urban, landscape, cultural, retail, hospitality, and residential projects in Saudi Arabia.",
    },
    {
      q: "What types of projects does VADO work on?",
      a: "VADO's portfolio spans waterfront master plans, mixed-use developments, commercial destinations, and private residential villas, including Al Hamra Waterfront, Matal, Tholal, and Courtyard Villa.",
    },
    {
      q: "How can I contact VADO?",
      a: "You can reach VADO by email at info@vado.sa or by phone at +966 542 900 447.",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/**
 * A single project, typed as CreativeWork, with a BreadcrumbList for the
 * project trail. Rendered on each /projects/[slug] page.
 */
export function projectGraph(project: Project) {
  const projectUrl = `${SITE_URL}/projects/${project.slug}`;

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
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${SITE_URL}/#portfolio`,
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
