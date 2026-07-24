/**
 * Services Overview Page
 * ======================
 * A calm, editorial overview of VADO's four disciplines. Server component only:
 * no client hooks, no GSAP, no Swiper. Content is pulled from lib/site.ts (the
 * single source of truth for service names and descriptions) and real project
 * imagery, so nothing here is invented.
 */

import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import {
  SERVICES,
  SITE_URL,
  LEGAL_NAME,
  FOUNDING_YEAR,
  ADDRESS,
} from "@/lib/site";

// The layout template appends " | VADO", so the title stays bare here.
export const metadata: Metadata = {
  title: "Architecture & Engineering Services in Saudi Arabia",
  description:
    "VADO delivers architectural design, engineering design, project management, and site supervision across Saudi Arabia, from our studio in Al Khobar.",
  alternates: {
    canonical: "/services",
  },
};

const PAGE_URL = `${SITE_URL}/services`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Stable, deep-linkable id from a service name (e.g. "architectural-design"). */
function toId(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Real project imagery paired with each discipline, mirrored from the homepage
 * ServicesTabs section. Each image links to its live project page for internal
 * navigation. Alt text describes the actual project, not the service claim.
 */
const SERVICE_MEDIA: Record<
  string,
  { image: string; alt: string; project: { title: string; slug: string } }
> = {
  "architectural-design": {
    image: "/images/projects/matal/gallery-12.webp",
    alt: "Matal, a waterfront mixed-use development by VADO in Al Khobar",
    project: { title: "Matal", slug: "matal" },
  },
  "engineering-design": {
    image: "/images/projects/tholal/gallery-10.webp",
    alt: "Tholal, a commercial boulevard by VADO in Al Khobar",
    project: { title: "Tholal", slug: "tholal" },
  },
  "project-management": {
    image: "/images/projects/al-hamra-waterfront/gallery-04.webp",
    alt: "Al Hamra Waterfront, a master plan by VADO in Dammam",
    project: { title: "Al Hamra Waterfront", slug: "al-hamra-waterfront" },
  },
  "site-supervision": {
    image: "/images/projects/matal/gallery-10.webp",
    alt: "On-site view of Matal, a waterfront development by VADO in Al Khobar",
    project: { title: "Matal", slug: "matal" },
  },
};

// Structured data: a CollectionPage cross-linked to the site-wide organization,
// a breadcrumb, and one Service entity per discipline. All facts come from
// lib/site.ts constants, so this graph stays truthful.
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Architecture and Engineering Services in Saudi Arabia",
      description: metadata.description,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORG_ID },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: PAGE_URL },
      ],
    },
    ...SERVICES.map((service) => ({
      "@type": "Service",
      "@id": `${PAGE_URL}#${toId(service.name)}`,
      name: service.name,
      serviceType: service.name,
      description: service.description,
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: ADDRESS.country },
    })),
  ],
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd} />

      <Header forceSolid />

      <main className="pt-24">
        {/* Intro — same .section/.container structure as the /about and
            /projects intros so all subpage intros share one rhythm */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="text-sm tracking-widest uppercase text-gray-600">
                  Our Services
                </span>
              </div>

              <h1>Architecture and engineering services in Saudi Arabia</h1>

              <p className="text-lg leading-relaxed text-gray-600 mt-10 max-w-2xl">
                VADO ({LEGAL_NAME}) is a multidisciplinary consultancy established
                in {FOUNDING_YEAR} and based in {ADDRESS.city}, {ADDRESS.country}.
                Our work spans four connected disciplines that carry a project from
                concept to completion. Explore each one below.
              </p>
            </div>
          </div>
        </section>

        {/* One section per discipline, deep-linkable via its id */}
        <div className="border-t border-gray-200">
          {SERVICES.map((service, index) => {
            const id = toId(service.name);
            const media = SERVICE_MEDIA[id];
            const number = String(index + 1).padStart(2, "0");
            const imageFirst = index % 2 === 1;

            return (
              <section
                key={id}
                id={id}
                className="scroll-mt-24 border-b border-gray-200"
              >
                <div className="container py-16 md:py-24">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Text column */}
                    <div className={imageFirst ? "lg:order-2" : ""}>
                      <span className="text-sm tracking-widest uppercase text-gray-400">
                        {number}
                      </span>
                      <h2 className="mt-6">{service.name}</h2>
                      <p className="text-lg leading-relaxed text-gray-600 mt-6 max-w-xl">
                        {service.description}
                      </p>

                      {media && (
                        <Link
                          href={`/projects/${media.project.slug}`}
                          className="underline-hover inline-flex items-center gap-2 text-sm tracking-widest uppercase mt-8 text-gray-800 hover:text-black transition-colors"
                        >
                          View related project: {media.project.title}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>

                    {/* Image column */}
                    {media && (
                      <div className={imageFirst ? "lg:order-1" : ""}>
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={media.image}
                            alt={media.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Call to action */}
        <section className="section">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2>Have a project in mind?</h2>
              <p className="text-lg leading-relaxed text-gray-600 mt-6">
                Tell us about your site, your program, and your timeline. We will
                help you plan the right path, from first design through
                construction.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 text-sm tracking-widest uppercase border border-black px-8 py-4 mt-10 hover:bg-black hover:text-white transition-colors"
              >
                Start a conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
