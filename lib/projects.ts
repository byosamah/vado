/**
 * Project Data & Utilities
 * ========================
 * Centralized project data for the portfolio, stored bilingually.
 *
 * Every human-readable field is `Localized<string>` (`{ en, ar }`), so the
 * compiler rejects a project that was only written in one language. Slug and
 * image paths are shared, because a project is ONE entity with one URL and one
 * set of renders, described in two languages.
 *
 * Components never touch `ProjectSource`. They call `getAllProjects(locale)` or
 * `getProjectBySlug(slug, locale)` and receive a flat `Project` whose strings
 * are already resolved, which keeps every consumer locale-agnostic.
 */

import type { Locale, Localized } from "@/lib/i18n/config";

/** How a project is authored: bilingual copy, shared assets. */
export interface ProjectSource {
  slug: string;
  title: Localized<string>;
  /** Short label shown on the portfolio carousel */
  category: Localized<string>;
  /** Full project type shown in the details block */
  type: Localized<string>;
  client: Localized<string>;
  location: Localized<string>;
  description: Localized<string>;
  heroImage: string;
  gallery: string[];
}

/** How a project is consumed: one language, flat strings. */
export interface Project {
  slug: string;
  title: string;
  category: string;
  type: string;
  client: string;
  location: string;
  description: string;
  heroImage: string;
  gallery: string[];
}

export const projectSources: ProjectSource[] = [
  {
    slug: "al-hamra-waterfront",
    title: {
      en: "Al Hamra Waterfront",
      ar: "واجهة الحمراء البحرية",
    },
    category: { en: "Master Plan", ar: "مخطط عام" },
    type: {
      en: "Waterfront Master Plan",
      ar: "مخطط عام لواجهة بحرية",
    },
    client: { en: "Dammam Municipality", ar: "أمانة الدمام" },
    location: {
      en: "Dammam, Saudi Arabia",
      ar: "الدمام، المملكة العربية السعودية",
    },
    description: {
      en: "A landmark waterfront masterplan designed to transform Al Hamra Corniche into a vibrant public destination that celebrates the connection between the city and the Arabian Gulf. The development integrates a marina, landscaped parks, cultural landmarks, recreational spaces, pedestrian promenades, and public plazas within a cohesive urban framework. Inspired by the region's coastal identity, the design balances environmental sustainability, accessibility, and community engagement while creating a dynamic waterfront experience for residents and visitors throughout the year.",
      ar: "مخطط عام بارز لواجهة بحرية صُمّم ليحوّل كورنيش الحمراء إلى وجهة عامة نابضة بالحياة تحتفي بالصلة بين المدينة والخليج العربي. يدمج المشروع مرسى ومتنزهات منسّقة ومعالم ثقافية ومساحات ترفيهية وممشى للمشاة وساحات عامة ضمن إطار عمراني متماسك. واستلهامًا من الهوية الساحلية للمنطقة، يوازن التصميم بين الاستدامة البيئية وسهولة الوصول والتفاعل المجتمعي، ليخلق تجربة واجهة بحرية حيوية للسكان والزوار على مدار العام.",
    },
    heroImage: "/images/projects/al-hamra-waterfront/hero.webp",
    gallery: [
      "/images/projects/al-hamra-waterfront/hero.webp",
      "/images/projects/al-hamra-waterfront/gallery-01.webp",
      "/images/projects/al-hamra-waterfront/gallery-02.webp",
      "/images/projects/al-hamra-waterfront/gallery-03.webp",
      "/images/projects/al-hamra-waterfront/gallery-04.webp",
      "/images/projects/al-hamra-waterfront/gallery-05.webp",
      "/images/projects/al-hamra-waterfront/gallery-06.webp",
    ],
  },
  {
    slug: "courtyard-villa",
    title: { en: "Courtyard Villa", ar: "فيلا الفناء" },
    category: { en: "Residential", ar: "سكني" },
    type: { en: "Residential Villa", ar: "فيلا سكنية" },
    client: { en: "Private Client", ar: "عميل خاص" },
    location: {
      en: "Al Khobar, Saudi Arabia",
      ar: "الخبر، المملكة العربية السعودية",
    },
    description: {
      en: "A contemporary private villa designed to combine modern simplicity with timeless architectural character. The design features clean geometric masses enriched with elegant arched openings, natural limestone accents, and warm textured finishes that create a refined visual identity. Spacious openings maximize natural daylight and strengthen the connection between interior living spaces and landscaped outdoor areas, while carefully integrated lighting enhances the architectural composition and creates a welcoming atmosphere throughout the day and evening.",
      ar: "فيلا خاصة معاصرة صُمّمت لتجمع بين البساطة الحديثة والطابع المعماري الخالد. يتميّز التصميم بكتل هندسية نقية تثريها فتحات مقوّسة أنيقة ولمسات من الحجر الجيري الطبيعي وتشطيبات دافئة ذات ملمس مميّز تمنح المبنى هوية بصرية راقية. وتزيد الفتحات الواسعة من ضوء النهار الطبيعي وتقوّي الصلة بين فضاءات المعيشة الداخلية والمساحات الخارجية المنسّقة، بينما تُبرز الإضاءة المدمجة بعناية التكوين المعماري وتخلق أجواءً ترحيبية طوال النهار والمساء.",
    },
    heroImage: "/images/projects/courtyard-villa/hero.webp",
    gallery: [
      "/images/projects/courtyard-villa/hero.webp",
      "/images/projects/courtyard-villa/gallery-01.webp",
      "/images/projects/courtyard-villa/gallery-02.webp",
      "/images/projects/courtyard-villa/gallery-03.webp",
      "/images/projects/courtyard-villa/gallery-04.webp",
      "/images/projects/courtyard-villa/gallery-05.webp",
      "/images/projects/courtyard-villa/gallery-06.webp",
    ],
  },
  {
    slug: "tholal",
    title: { en: "Tholal", ar: "ظلال" },
    category: { en: "Commercial", ar: "تجاري" },
    type: { en: "Commercial Boulevard", ar: "بوليفارد تجاري" },
    client: { en: "MSM Group", ar: "مجموعة إم إس إم" },
    location: {
      en: "Al Khobar, Saudi Arabia",
      ar: "الخبر، المملكة العربية السعودية",
    },
    description: {
      en: "Designed as a contemporary lifestyle destination, Tholal brings together retail, dining, and leisure experiences within a vibrant open-air environment. The architectural concept emphasizes connectivity through shaded pedestrian walkways, elevated terraces, and welcoming public plazas that encourage social interaction. A refined combination of steel, natural wood, stone, and lush landscaping creates a distinctive identity, while integrated water features and passive shading strategies enhance comfort and enrich the visitor experience throughout the year.",
      ar: "صُمّم ظلال ليكون وجهة معاصرة لأسلوب الحياة، يجمع بين تجارب التسوق والمطاعم والترفيه في بيئة مفتوحة نابضة بالحياة. يركّز المفهوم المعماري على الترابط عبر ممرات مشاة مظلّلة وشرفات مرتفعة وساحات عامة ترحيبية تشجّع على التفاعل الاجتماعي. ويمنح المزيج المدروس من الفولاذ والخشب الطبيعي والحجر والمساحات الخضراء الوارفة هوية مميّزة للمشروع، فيما تعزّز العناصر المائية المدمجة واستراتيجيات التظليل السلبي الراحة وتُثري تجربة الزائر على مدار العام.",
    },
    heroImage: "/images/projects/tholal/hero.webp",
    gallery: [
      "/images/projects/tholal/hero.webp",
      "/images/projects/tholal/gallery-01.webp",
      "/images/projects/tholal/gallery-02.webp",
      "/images/projects/tholal/gallery-03.webp",
      "/images/projects/tholal/gallery-04.webp",
      "/images/projects/tholal/gallery-05.webp",
      "/images/projects/tholal/gallery-06.webp",
      "/images/projects/tholal/gallery-07.webp",
      "/images/projects/tholal/gallery-08.webp",
      "/images/projects/tholal/gallery-09.webp",
      "/images/projects/tholal/gallery-10.webp",
      "/images/projects/tholal/gallery-11.webp",
      "/images/projects/tholal/gallery-12.webp",
    ],
  },
  {
    slug: "matal",
    title: { en: "Matal", ar: "مطل" },
    category: { en: "Waterfront", ar: "واجهة بحرية" },
    type: {
      en: "Waterfront Mixed-Use Development",
      ar: "مشروع متعدد الاستخدامات على الواجهة البحرية",
    },
    client: { en: "Private Client", ar: "عميل خاص" },
    location: {
      en: "Al Khobar, Saudi Arabia",
      ar: "الخبر، المملكة العربية السعودية",
    },
    description: {
      en: "Designed as a contemporary waterfront destination, Matal redefines the coastal dining and leisure experience through a harmonious blend of architecture, landscape, and public space. The project integrates premium restaurants, cafés, panoramic terraces, and vibrant outdoor plazas overlooking the Arabian Gulf. Clean architectural forms, expansive glazing, natural stone finishes, and shaded outdoor environments create a refined yet inviting atmosphere that encourages social interaction and year-round activity. Carefully designed pedestrian circulation, water features, and landscaped gathering spaces establish Matal as a distinctive lifestyle destination that celebrates its exceptional seaside setting.",
      ar: "صُمّم مطل ليكون وجهة معاصرة على الواجهة البحرية، يعيد تعريف تجربة تناول الطعام والترفيه الساحلية عبر مزيج متناغم من العمارة والمساحات المنسّقة والفضاء العام. يضم المشروع مطاعم راقية ومقاهي وشرفات بانورامية وساحات خارجية نابضة بالحياة تطل على الخليج العربي. وتخلق الأشكال المعمارية النقية والواجهات الزجاجية الواسعة وتشطيبات الحجر الطبيعي والبيئات الخارجية المظلّلة أجواءً راقية وجذابة في آن، تشجّع على التفاعل الاجتماعي والنشاط على مدار العام. كما ترسّخ حركة المشاة المصمّمة بعناية والعناصر المائية ومساحات التجمّع المنسّقة مكانة مطل كوجهة مميّزة لأسلوب الحياة تحتفي بموقعها البحري الاستثنائي.",
    },
    heroImage: "/images/projects/matal/hero.webp",
    gallery: [
      "/images/projects/matal/hero.webp",
      "/images/projects/matal/gallery-01.webp",
      "/images/projects/matal/gallery-02.webp",
      "/images/projects/matal/gallery-03.webp",
      "/images/projects/matal/gallery-04.webp",
      "/images/projects/matal/gallery-05.webp",
      "/images/projects/matal/gallery-06.webp",
      "/images/projects/matal/gallery-07.webp",
      "/images/projects/matal/gallery-08.webp",
      "/images/projects/matal/gallery-09.webp",
      "/images/projects/matal/gallery-10.webp",
      "/images/projects/matal/gallery-11.webp",
      "/images/projects/matal/gallery-12.webp",
      "/images/projects/matal/gallery-13.webp",
      "/images/projects/matal/gallery-14.webp",
    ],
  },
];

/** Collapse a bilingual source record down to one language. */
function resolve(source: ProjectSource, locale: Locale): Project {
  return {
    slug: source.slug,
    title: source.title[locale],
    category: source.category[locale],
    type: source.type[locale],
    client: source.client[locale],
    location: source.location[locale],
    description: source.description[locale],
    heroImage: source.heroImage,
    gallery: source.gallery,
  };
}

/** Every project, resolved for one language. */
export function getAllProjects(locale: Locale): Project[] {
  return projectSources.map((source) => resolve(source, locale));
}

/** One project by URL slug, resolved for one language. */
export function getProjectBySlug(
  slug: string,
  locale: Locale
): Project | undefined {
  const source = projectSources.find((project) => project.slug === slug);
  return source ? resolve(source, locale) : undefined;
}

/**
 * Slugs only. Used by generateStaticParams and the sitemap, neither of which
 * needs any translated copy.
 */
export function getProjectSlugs(): string[] {
  return projectSources.map((project) => project.slug);
}

/** Neighbouring projects for the prev/next footer on a detail page. */
export function getAdjacentProjects(
  slug: string,
  locale: Locale
): { previous: Project | null; next: Project | null } {
  const currentIndex = projectSources.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous:
      currentIndex > 0
        ? resolve(projectSources[currentIndex - 1], locale)
        : null,
    next:
      currentIndex < projectSources.length - 1
        ? resolve(projectSources[currentIndex + 1], locale)
        : null,
  };
}
