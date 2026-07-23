/**
 * Project Data & Utilities
 * ========================
 * Centralized project data for the portfolio.
 * Each project has details, images, and metadata.
 */

export interface Project {
  slug: string;
  title: string;
  /** Short label shown on the portfolio carousel */
  category: string;
  /** Full project type shown in the details block */
  type: string;
  client: string;
  location: string;
  description: string;
  heroImage: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "al-hamra-waterfront",
    title: "Al Hamra Waterfront",
    category: "Master Plan",
    type: "Waterfront Master Plan",
    client: "Dammam Municipality",
    location: "Dammam, Saudi Arabia",
    description:
      "A landmark waterfront masterplan designed to transform Al Hamra Corniche into a vibrant public destination that celebrates the connection between the city and the Arabian Gulf. The development integrates a marina, landscaped parks, cultural landmarks, recreational spaces, pedestrian promenades, and public plazas within a cohesive urban framework. Inspired by the region's coastal identity, the design balances environmental sustainability, accessibility, and community engagement while creating a dynamic waterfront experience for residents and visitors throughout the year.",
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
    title: "Courtyard Villa",
    category: "Residential",
    type: "Residential Villa",
    client: "Private Client",
    location: "Al Khobar, Saudi Arabia",
    description:
      "A contemporary private villa designed to combine modern simplicity with timeless architectural character. The design features clean geometric masses enriched with elegant arched openings, natural limestone accents, and warm textured finishes that create a refined visual identity. Spacious openings maximize natural daylight and strengthen the connection between interior living spaces and landscaped outdoor areas, while carefully integrated lighting enhances the architectural composition and creates a welcoming atmosphere throughout the day and evening.",
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
    title: "Tholal",
    category: "Commercial",
    type: "Commercial Boulevard",
    client: "MSM Group",
    location: "Al Khobar, Saudi Arabia",
    description:
      "Designed as a contemporary lifestyle destination, Tholal brings together retail, dining, and leisure experiences within a vibrant open-air environment. The architectural concept emphasizes connectivity through shaded pedestrian walkways, elevated terraces, and welcoming public plazas that encourage social interaction. A refined combination of steel, natural wood, stone, and lush landscaping creates a distinctive identity, while integrated water features and passive shading strategies enhance comfort and enrich the visitor experience throughout the year.",
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
    title: "Matal",
    category: "Waterfront",
    type: "Waterfront Mixed-Use Development",
    client: "Private Client",
    location: "Al Khobar, Saudi Arabia",
    description:
      "Designed as a contemporary waterfront destination, Matal redefines the coastal dining and leisure experience through a harmonious blend of architecture, landscape, and public space. The project integrates premium restaurants, cafés, panoramic terraces, and vibrant outdoor plazas overlooking the Arabian Gulf. Clean architectural forms, expansive glazing, natural stone finishes, and shaded outdoor environments create a refined yet inviting atmosphere that encourages social interaction and year-round activity. Carefully designed pedestrian circulation, water features, and landscaped gathering spaces establish Matal as a distinctive lifestyle destination that celebrates its exceptional seaside setting.",
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

/**
 * Get a project by its URL slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
  return projects;
}

/**
 * Get adjacent projects for navigation
 */
export function getAdjacentProjects(slug: string): {
  previous: Project | null;
  next: Project | null;
} {
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
  };
}
