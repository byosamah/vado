/**
 * Project Data & Utilities
 * ========================
 * Centralized project data for the portfolio.
 * Each project has details, images, and metadata.
 */

export interface Project {
  slug: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  description: string;
  heroImage: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "al-mashraq-strip-mall",
    title: "Al Mashraq Strip Mall",
    category: "Commercial",
    client: "Al Mashraq Development Co.",
    location: "Al Khobar, Saudi Arabia",
    year: "2023",
    description:
      "A contemporary retail destination designed to serve the growing community of Al Khobar. The project balances commercial functionality with architectural elegance, featuring an open-air design that encourages pedestrian flow while providing shade and comfort in the Saudi climate. The facade combines modern materials with traditional Arabian geometric patterns, creating a dialogue between heritage and innovation.",
    heroImage: "/images/portfolio-almashraq.jpg",
    gallery: [
      "/images/portfolio-almashraq.jpg",
      "/images/portfolio-1.png",
      "/images/portfolio-2.png",
    ],
  },
  {
    slug: "villa-yun",
    title: "The Feel of Villa Yun",
    category: "Interiors",
    client: "Private Client",
    location: "Dhahran, Saudi Arabia",
    year: "2022",
    description:
      "An interior design project that transforms a modern villa into a serene living space. The design philosophy centered on creating harmony between minimalist aesthetics and warm, inviting atmospheres. Natural materials, carefully curated lighting, and a neutral palette work together to establish spaces that feel both luxurious and comfortable.",
    heroImage: "/images/portfolio-1.png",
    gallery: [
      "/images/portfolio-1.png",
      "/images/portfolio-almashraq.jpg",
      "/images/portfolio-2.png",
    ],
  },
  {
    slug: "nomus-art-house",
    title: "Nomus Art House",
    category: "Exteriors",
    client: "Nomus Cultural Foundation",
    location: "Dammam, Saudi Arabia",
    year: "2021",
    description:
      "A cultural space designed to house and celebrate contemporary art. The exterior architecture makes a bold statement while respecting its urban context. Clean lines and thoughtful massing create dramatic interplay of light and shadow throughout the day. The building serves as both a container for art and a work of art itself.",
    heroImage: "/images/portfolio-2.png",
    gallery: [
      "/images/portfolio-2.png",
      "/images/portfolio-1.png",
      "/images/portfolio-almashraq.jpg",
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
