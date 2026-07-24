/**
 * Project Detail Page
 * ===================
 * Individual project page with minimalist architecture firm aesthetic.
 * Clean layout, generous whitespace, images that speak for themselves.
 *
 * Both language editions share ONE slug, so /en/projects/matal and
 * /ar/projects/matal are the same project described twice. That is what lets
 * the language switcher stay on the page you were reading.
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
import { buildAlternates } from "@/lib/seo";
import { LOCALES, OG_LOCALES, isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary, t } from "@/lib/i18n/get-dictionary";
import {
  getProjectBySlug,
  getAdjacentProjects,
  getProjectSlugs,
} from "@/lib/projects";

/** Every project, in every locale. */
export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    getProjectSlugs().map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  const project = getProjectBySlug(slug, lang);

  if (!project) {
    // Bare title; the root layout template appends the localized wordmark.
    return { title: dict.pages.project.notFoundTitle };
  }

  // A tighter, self-contained description for snippets: project name, type, and
  // location, then the opening of the narrative. Reads well in AI answers.
  const metaDescription =
    `${project.title} — ${project.type}, ${project.location}. ${project.description}`.slice(
      0,
      200
    );
  const path = `/projects/${project.slug}`;
  const alternates = buildAlternates(lang, path);

  return {
    title: `${project.title} | ${project.type}`,
    description: metaDescription,
    alternates,
    openGraph: {
      type: "article",
      siteName: dict.brand.shortName,
      title: `${project.title} | ${dict.brand.shortName}`,
      description: metaDescription,
      url: alternates.canonical,
      locale: OG_LOCALES[lang],
      images: [{ url: project.heroImage, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${dict.brand.shortName}`,
      description: metaDescription,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const copy = dict.pages.project;
  const project = getProjectBySlug(slug, lang);

  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(slug, lang);

  return (
    <>
      {/* Per-project structured data: CreativeWork + BreadcrumbList */}
      <JsonLd data={projectGraph(project, lang, dict)} />

      <Header
        lang={lang}
        nav={dict.nav}
        langSwitcher={dict.langSwitcher}
        forceSolid
      />

      <main id="main" className="pt-24">
        {/* Back Navigation */}
        <div className="container py-8">
          <Link
            href={localePath(lang, "/projects")}
            className="inline-flex items-center gap-2 py-3 -my-3 text-sm tracking-wide text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {copy.back}
          </Link>
        </div>

        {/* Hero Image — Full Width */}
        <div className="relative w-full h-[60vh]">
          <Image
            src={project.heroImage}
            alt={t(copy.heroAlt, {
              title: project.title,
              type: project.type,
              location: project.location,
            })}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Project Content */}
        <div className="container py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Title & Description */}
            <div className="lg:col-span-7">
              {/* Category Label */}
              <span className="text-sm tracking-widest uppercase text-gray-500">
                {project.category}
              </span>

              {/* Title */}
              <h1 className="mt-6">{project.title}</h1>

              {/* Description */}
              <p className="text-lg leading-relaxed text-gray-600 mt-10">
                {project.description}
              </p>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-5">
              <div className="lg:ps-8 lg:border-s border-gray-200">
                {/* Eyebrow label (span, not a heading): as an h3 the global
                    type scale would force it to 32px, but it's authored as the
                    site-wide 14px kicker pattern. */}
                <span className="block text-sm tracking-widest uppercase text-gray-500 mb-6">
                  {copy.detailsLabel}
                </span>

                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500">{copy.client}</dt>
                    <dd className="text-base mt-1">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">{copy.location}</dt>
                    <dd className="text-base mt-1">{project.location}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">{copy.type}</dt>
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
              lang={lang}
              gallery={dict.gallery}
            />
          </div>
        )}

        {/* Project Navigation. "Previous" sits on the leading side in both
            directions, so the pair mirrors with the rest of the layout. */}
        <div className="border-t border-gray-200">
          <div className="container">
            <div className="flex items-center justify-between py-8">
              {/* Previous */}
              {previous ? (
                <Link
                  href={localePath(lang, `/projects/${previous.slug}`)}
                  className="group flex items-center gap-3 py-2 -my-2 text-gray-600 hover:text-black transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                  <div>
                    <span className="text-xs tracking-widest uppercase text-gray-400 block">
                      {copy.previous}
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
                  href={localePath(lang, `/projects/${next.slug}`)}
                  className="group flex items-center gap-3 py-2 -my-2 text-end text-gray-600 hover:text-black transition-colors"
                >
                  <div>
                    <span className="text-xs tracking-widest uppercase text-gray-400 block">
                      {copy.next}
                    </span>
                    <span className="text-sm">{next.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer
        lang={lang}
        brandName={dict.brand.shortName}
        footer={dict.footer}
        nav={dict.nav}
      />
    </>
  );
}
