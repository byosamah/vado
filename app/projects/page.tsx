/**
 * Projects Index Page
 * ===================
 * Portfolio listing for VADO's architecture work. Server component only:
 * a single H1, a short intro, and a responsive grid of project cards that
 * link through to each detail page at /projects/[slug]. Minimalist layout,
 * generous whitespace, matching the site's calm editorial aesthetic.
 */

import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAllProjects } from "@/lib/projects";

// Static metadata for SEO. The root layout template appends "| VADO",
// so the title here stays bare.
export const metadata: Metadata = {
  title: "Architecture Projects in Saudi Arabia",
  description:
    "Explore VADO's architecture projects in Saudi Arabia: master plans, waterfront developments, commercial boulevards, and private villas across the Eastern Province.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsIndexPage() {
  const projects = getAllProjects();

  return (
    <>
      <Header forceSolid />

      <main className="pt-24">
        {/* Intro */}
        <section className="section">
          <div className="container">
            <span className="text-sm tracking-widest uppercase text-gray-500">
              Selected Work
            </span>

            <h1 className="mt-6 max-w-3xl">
              Architecture projects in Saudi Arabia
            </h1>

            <p className="text-lg leading-relaxed text-gray-600 mt-10 max-w-2xl">
              A selection of VADO&apos;s architecture and engineering work across
              the Eastern Province, spanning waterfront master plans, mixed-use
              destinations, commercial boulevards, and private residences. Each
              project reflects a considered balance of place, function, and
              enduring design.
            </p>
          </div>
        </section>

        {/* Project Grid */}
        <section className="pb-16 md:pb-24">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group block"
                >
                  {/* Image */}
                  <div className="image-hover-scale relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.heroImage}
                      alt={`${project.title}, a ${project.category.toLowerCase()} project by VADO in ${project.location}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Caption */}
                  <div className="mt-5">
                    <span className="text-xs tracking-widest uppercase text-gray-500">
                      {project.category}
                    </span>
                    <h2 className="mt-2 group-hover:text-gray-600 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {project.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="border-t border-gray-200">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-12 md:py-16">
              <p className="text-lg text-gray-600 max-w-xl">
                Have a project in mind? We would be glad to discuss how VADO can
                bring it to life.
              </p>
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 text-sm tracking-widest uppercase text-black underline-hover"
              >
                Start a conversation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
