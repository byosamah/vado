/**
 * Site Constants
 * ==============
 * Single source of truth for canonical URL and brand facts used by metadata,
 * JSON-LD structured data, robots.ts, sitemap.ts, and llms.txt. Keeping these
 * in one place means an eventual custom domain is a one-line change.
 */

/** Public production URL. Update here if a custom domain is added later. */
export const SITE_URL = "https://vado.sa";

export const SITE_NAME = "VADO";
export const LEGAL_NAME = "VISION Arch. & Engineering Consultants";
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
/** E.164 form for tel: links and schema. Displayed as +966 542 900 447. */
export const CONTACT_PHONE = "+966542900447";

export const ADDRESS = {
  street: "Al Fardan Tower, Office 401",
  city: "Al Khobar",
  region: "Eastern Province",
  country: "Saudi Arabia",
  countryCode: "SA",
} as const;

/**
 * Default social / share image. No dedicated OG asset exists, so the Al Hamra
 * Waterfront hero (a wide landscape render) stands in. Dimensions are the real
 * intrinsic pixels of the file.
 */
export const OG_IMAGE = {
  url: "/images/projects/al-hamra-waterfront/hero.webp",
  width: 1968,
  height: 1312,
  alt: "Al Hamra Waterfront masterplan by VADO on the Arabian Gulf",
} as const;

/**
 * Long description for structured data / llms.txt (depth is fine there).
 */
export const SITE_DESCRIPTION =
  "VADO (VISION Arch. & Engineering Consultants) is a multidisciplinary architecture and engineering consultancy in Al Khobar, Saudi Arabia. Established in 1994, VADO delivers architectural design, engineering, project management, and site supervision for urban, landscape, cultural, retail, hospitality, and residential projects across the Kingdom.";

/**
 * Short meta description for the SERP snippet (~155 chars, so Google does not
 * truncate it). Keep the long SITE_DESCRIPTION for JSON-LD and llms.txt.
 */
export const META_DESCRIPTION =
  "Architecture and engineering consultancy in Al Khobar, Saudi Arabia. Since 1994, VADO delivers design, engineering, and project management across the Kingdom.";

/** Core services, mirrored from the ServicesTabs section (kept truthful). */
export const SERVICES = [
  {
    name: "Architectural Design",
    description:
      "Creative architectural solutions that balance aesthetics, function, and context, turning vision into architecture.",
  },
  {
    name: "Engineering Design",
    description:
      "Integrated structural and MEP engineering ensuring safety, efficiency, and sustainability in every project.",
  },
  {
    name: "Project Management",
    description:
      "Comprehensive project management from concept to completion, aligning quality, schedule, and budget.",
  },
  {
    name: "Site Supervision",
    description:
      "Dedicated on-site supervision delivering precision, consistency, and construction excellence.",
  },
] as const;
