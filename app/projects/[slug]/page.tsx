/**
 * Project Detail Page
 * ===================
 * Individual project page with minimalist architecture firm aesthetic.
 * Clean layout, generous whitespace, images that speak for themselves.
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectGallery from "@/components/sections/ProjectGallery";
import JsonLd from "@/components/seo/JsonLd";
import { projectGraph } from "@/lib/schema";
import {
  getProjectBySlug,
  getAdjacentProjects,
  getAllProjects,
} from "@/lib/projects";

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    // Bare title; the root layout template appends "| VADO".
    return {
      title: "Project Not Found",
    };
  }

  // A tighter, self-contained description for snippets: project name, type, and
  // location, then the opening of the narrative. Reads well in AI answers.
  const metaDescription = `${project.title} by VADO: a ${project.type.toLowerCase()} in ${project.location}. ${project.description}`.slice(
    0,
    200
  );
  const canonicalPath = `/projects/${project.slug}`;

  return {
    title: `${project.title} | ${project.type}`,
    description: metaDescription,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      siteName: "VADO",
      title: `${project.title} | VADO`,
      description: metaDescription,
      url: canonicalPath,
      images: [{ url: project.heroImage, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | VADO`,
      description: metaDescription,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(slug);

  return (
    <>
      {/* Per-project structured data: CreativeWork + BreadcrumbList */}
      <JsonLd data={projectGraph(project)} />

      <Header forceSolid />

      <main className="pt-24">
        {/* Back Navigation */}
        <div className="container py-8">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 py-3 -my-3 text-sm tracking-wide text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>

        {/* Hero Image — Full Width */}
        <div className="relative w-full h-[60vh]">
          <Image
            src={project.heroImage}
            alt={`${project.title}, ${project.type} by VADO in ${project.location}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Project Content */}
        <div className="container py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column — Title & Description */}
            <div className="lg:col-span-7">
              {/* Category Label */}
              <span className="text-sm tracking-widest uppercase text-gray-500">
                {project.category}
              </span>

              {/* Title */}
              <h1 className="mt-6">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-lg leading-relaxed text-gray-600 mt-10">
                {project.description}
              </p>
            </div>

            {/* Right Column — Project Details */}
            <div className="lg:col-span-5">
              <div className="lg:pl-8 lg:border-l border-gray-200">
                {/* Eyebrow label (span, not a heading): as an h3 the global
                    type scale would force it to 32px, but it's authored as the
                    site-wide 14px kicker pattern. */}
                <span className="block text-sm tracking-widest uppercase text-gray-500 mb-6">
                  Project Details
                </span>

                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500">Client</dt>
                    <dd className="text-base mt-1">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Location</dt>
                    <dd className="text-base mt-1">{project.location}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Type</dt>
                    <dd className="text-base mt-1">{project.type}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery — clickable thumbnails that open a full-screen lightbox */}
        {project.gallery.length > 1 && (
          <div className="container pb-16 md:pb-24">
            <ProjectGallery
              images={project.gallery.slice(1)}
              title={project.title}
              category={project.category}
            />
          </div>
        )}

        {/* Project Navigation */}
        <div className="border-t border-gray-200">
          <div className="container">
            <div className="flex items-center justify-between py-8">
              {/* Previous */}
              {previous ? (
                <Link
                  href={`/projects/${previous.slug}`}
                  className="group flex items-center gap-3 py-2 -my-2 text-gray-600 hover:text-black transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <div>
                    <span className="text-xs tracking-widest uppercase text-gray-400 block">
                      Previous
                    </span>
                    <span className="text-sm">{previous.title}</span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {/* Next */}
              {next ? (
                <Link
                  href={`/projects/${next.slug}`}
                  className="group flex items-center gap-3 py-2 -my-2 text-right text-gray-600 hover:text-black transition-colors"
                >
                  <div>
                    <span className="text-xs tracking-widest uppercase text-gray-400 block">
                      Next
                    </span>
                    <span className="text-sm">{next.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
