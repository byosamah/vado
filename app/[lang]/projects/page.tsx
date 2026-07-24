/**
 * Projects Index Page
 * ===================
 * Portfolio listing for VADO's architecture work. Server component only:
 * a single H1, a short intro, and a responsive grid of project cards that
 * link through to each detail page at /[lang]/projects/[slug]. Minimalist
 * layout, generous whitespace, matching the site's calm editorial aesthetic.
 */

import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { buildAlternates } from "@/lib/seo";
import { LOCALES, isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary, t } from "@/lib/i18n/get-dictionary";
import { getAllProjects } from "@/lib/projects";

const PATH = "/projects";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);

  return {
    title: dict.pages.projects.metaTitle,
    description: dict.pages.projects.metaDescription,
    alternates: buildAlternates(lang, PATH),
  };
}

export default async function ProjectsIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const copy = dict.pages.projects;
  const projects = getAllProjects(lang);

  return (
    <>
      <Header
        lang={lang}
        nav={dict.nav}
        langSwitcher={dict.langSwitcher}
        forceSolid
      />

      <main id="main" className="pt-24">
        {/* Intro */}
        <section className="section">
          <div className="container">
            <span className="text-sm tracking-widest uppercase text-gray-500">
              {copy.kicker}
            </span>

            <h1 className="mt-6 max-w-3xl">{copy.heading}</h1>

            <p className="text-lg leading-relaxed text-gray-600 mt-10 max-w-2xl">
              {copy.intro}
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
                  href={localePath(lang, `/projects/${project.slug}`)}
                  className="group block"
                >
                  {/* Image */}
                  <div className="image-hover-scale relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.heroImage}
                      alt={t(copy.cardAlt, {
                        title: project.title,
                        category: project.category.toLowerCase(),
                        location: project.location,
                      })}
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
              <p className="text-lg text-gray-600 max-w-xl">{copy.ctaBody}</p>
              <Link
                href={`${localePath(lang, "/")}#contact`}
                className="group inline-flex items-center gap-2 text-sm tracking-widest uppercase text-black underline-hover"
              >
                {copy.ctaLink}
                <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
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
