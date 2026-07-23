/**
 * About Page
 * ==========
 * The firm's story, told as a calm editorial page. Server component only:
 * no client hooks, no GSAP, no Swiper. Every fact here is drawn from the
 * repo's own source of truth (lib/site.ts) and the homepage section copy
 * (AboutSection, GuidingPrinciples, TeamGrid). Nothing is invented.
 */

import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/schema";
import {
  SITE_URL,
  SITE_DESCRIPTION,
  FOUNDING_YEAR,
  ADDRESS,
  SERVICES,
} from "@/lib/site";

// Static metadata: the root layout template appends " | VADO", so the title
// intentionally omits it. Description sits near ~150 characters for clean
// snippets, and the canonical points at this page's own path.
export const metadata: Metadata = {
  title: "About Our Architecture and Engineering Consultancy in Al Khobar",
  description:
    "VADO is a multidisciplinary architecture and engineering consultancy in Al Khobar, Saudi Arabia, established in 1994 by VISION Arch. & Engineering Consultants.",
  alternates: {
    canonical: "/about",
  },
};

// Guiding principles, mirrored verbatim from GuidingPrinciples.tsx so the two
// surfaces never drift apart.
const principles = [
  {
    id: "01",
    title: "Innovation",
    description:
      "We turn vision into architecture, pursuing creative, forward-thinking design that answers to context and purpose.",
  },
  {
    id: "02",
    title: "Sustainability",
    description:
      "We design responsibly, shaping functional environments built to serve communities and endure for generations.",
  },
  {
    id: "03",
    title: "Precision",
    description:
      "We hold to engineering rigor and disciplined execution, from the first concept to the final detail on site.",
  },
];

// Leadership, names and roles only, mirrored from TeamGrid.tsx. No bios are
// invented for either person.
const leadership = [
  {
    name: "Arch. Khalid Al Mulla",
    role: "President",
    image: "/images/team-khalid.webp",
  },
  {
    name: "Arch. Mutaz Al Mulla",
    role: "Vice President & Chief Architect",
    image: "/images/team-mutaz.webp",
  },
];

// AboutPage structured data, built on the code-authored organization node so
// the facts stay truthful and in sync with the rest of the site.
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About VADO",
  url: `${SITE_URL}/about`,
  description: SITE_DESCRIPTION,
  mainEntity: organizationSchema(),
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutSchema} />

      <Header forceSolid />

      <main className="pt-24">
        {/* Intro */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="text-sm tracking-widest uppercase text-gray-600">
                  About VADO
                </span>
              </div>

              {/* Primary headline (the only h1 on the page) */}
              <h1>
                An architecture and engineering consultancy in Al Khobar, Saudi
                Arabia.
              </h1>

              {/* Who VADO is */}
              <p className="text-lg leading-relaxed text-gray-600 mt-10 max-w-2xl">
                VADO (VISION Arch. & Engineering Consultants) is a
                multidisciplinary consultancy specialized in architecture,
                engineering, and project development. Established in{" "}
                {FOUNDING_YEAR} and based in {ADDRESS.city}, the practice
                delivers innovative, functional, and sustainable solutions
                tailored to the evolving needs of communities and clients across
                Saudi Arabia.
              </p>
            </div>
          </div>
        </section>

        {/* Representative work, full-width band */}
        <div className="relative w-full h-[50vh] md:h-[60vh]">
          <Image
            src="/images/projects/al-hamra-waterfront/hero.webp"
            alt="Al Hamra Waterfront masterplan by VADO on the Arabian Gulf"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* What we do */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="text-sm tracking-widest uppercase text-gray-600">
                  What we do
                </span>
              </div>
              <h2>From first concept to final detail</h2>
              <p className="text-lg leading-relaxed text-gray-600 mt-8 max-w-2xl">
                Our work spans urban, landscape, cultural, retail, hospitality,
                and residential projects across the Kingdom, delivered through
                four integrated disciplines.
              </p>
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {SERVICES.map((service, index) => (
                <div key={service.name} className="pt-8 border-t border-gray-200">
                  <span className="block text-sm tracking-widest text-gray-400 mb-6">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light mb-4">
                    {service.name}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guiding principles */}
        <section className="section bg-gray-50">
          <div className="container">
            <div className="flex items-center gap-3 mb-16">
              <span className="w-2 h-2 bg-black rounded-full" />
              <span className="text-sm tracking-widest uppercase text-gray-600">
                What guides us
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {principles.map((principle) => (
                <div
                  key={principle.id}
                  className="md:px-8 md:border-l md:border-gray-200 md:first:border-l-0 md:first:pl-0"
                >
                  <span className="block text-sm tracking-widest text-gray-400 mb-6">
                    {principle.id}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light mb-4">
                    {principle.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-600 max-w-xs">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="section">
          <div className="container">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="text-sm tracking-widest uppercase text-gray-600">
                  Leadership
                </span>
              </div>
              <h2>Meet our people</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
              {leadership.map((member) => (
                <div key={member.name} className="group">
                  <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role} at VADO`}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-xl font-light mb-1">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="section bg-gray-900">
          <div className="container">
            <div className="max-w-2xl">
              <h2 className="text-white">Have a project in mind?</h2>
              <p className="text-lg leading-relaxed text-white/60 mt-6">
                Tell us about your vision and we will help you shape it into
                architecture.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 mt-10 text-sm tracking-widest uppercase text-white underline-hover"
              >
                Get in touch
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
