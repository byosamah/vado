/**
 * Services Overview Page
 * ======================
 * A calm, editorial overview of VADO's four disciplines. Server component only:
 * no client hooks, no GSAP, no Swiper. Service names and descriptions come from
 * the dictionary (the same array that drives the homepage accordion, /about,
 * the JSON-LD, and llms.txt), so nothing here can drift or be invented.
 */

import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { servicesGraph } from "@/lib/schema";
import { buildAlternates } from "@/lib/seo";
import { FOUNDING_YEAR } from "@/lib/site";
import { LOCALES, isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary, t } from "@/lib/i18n/get-dictionary";
import { getAllProjects } from "@/lib/projects";

const PATH = "/services";

/**
 * Real project imagery paired with each discipline, keyed by service id and
 * mirrored from the homepage ServicesTabs section. Each image links to its live
 * project page for internal navigation; the alt text is translated and lives in
 * the dictionary under `pages.services.mediaAlt`.
 */
const SERVICE_MEDIA: Record<string, { image: string; slug: string }> = {
  "architectural-design": {
    image: "/images/projects/matal/gallery-12.webp",
    slug: "matal",
  },
  "engineering-design": {
    image: "/images/projects/tholal/gallery-10.webp",
    slug: "tholal",
  },
  "project-management": {
    image: "/images/projects/al-hamra-waterfront/gallery-04.webp",
    slug: "al-hamra-waterfront",
  },
  "site-supervision": {
    image: "/images/projects/matal/gallery-10.webp",
    slug: "matal",
  },
};

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
    title: dict.pages.services.metaTitle,
    description: dict.pages.services.metaDescription,
    alternates: buildAlternates(lang, PATH),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const copy = dict.pages.services;
  const projects = getAllProjects(lang);

  return (
    <>
      <JsonLd data={servicesGraph(lang, dict)} />

      <Header
        lang={lang}
        nav={dict.nav}
        langSwitcher={dict.langSwitcher}
        forceSolid
      />

      <main id="main" className="pt-24">
        {/* Intro — same .section/.container structure as the /about and
            /projects intros so all subpage intros share one rhythm */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="text-sm tracking-widest uppercase text-gray-600">
                  {copy.kicker}
                </span>
              </div>

              <h1>{copy.heading}</h1>

              <p className="text-lg leading-relaxed text-gray-600 mt-10 max-w-2xl">
                {t(copy.intro, {
                  legalName: dict.brand.legalName,
                  year: FOUNDING_YEAR,
                  city: dict.brand.city,
                  country: dict.brand.country,
                })}
              </p>
            </div>
          </div>
        </section>

        {/* One section per discipline, deep-linkable via its id */}
        <div className="border-t border-gray-200">
          {dict.services.map((service, index) => {
            const media = SERVICE_MEDIA[service.id];
            const number = String(index + 1).padStart(2, "0");
            // The linked project, resolved in this locale so the label reads
            // "شاهد المشروع المرتبط: مطل" rather than the English title.
            const project = media
              ? projects.find((p) => p.slug === media.slug)
              : undefined;
            const imageFirst = index % 2 === 1;

            return (
              <section
                key={service.id}
                id={service.id}
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

                      {media && project && (
                        <Link
                          href={localePath(lang, `/projects/${media.slug}`)}
                          className="underline-hover inline-flex items-center gap-2 text-sm tracking-widest uppercase mt-8 text-gray-800 hover:text-black transition-colors"
                        >
                          {t(copy.relatedProject, { project: project.title })}
                          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                        </Link>
                      )}
                    </div>

                    {/* Image column */}
                    {media && (
                      <div className={imageFirst ? "lg:order-1" : ""}>
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={media.image}
                            alt={
                              copy.mediaAlt[
                                service.id as keyof typeof copy.mediaAlt
                              ]
                            }
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
              <h2>{copy.ctaHeading}</h2>
              <p className="text-lg leading-relaxed text-gray-600 mt-6">
                {copy.ctaBody}
              </p>
              <Link
                href={`${localePath(lang, "/")}#contact`}
                className="inline-flex items-center gap-2 text-sm tracking-widest uppercase border border-black px-8 py-4 mt-10 hover:bg-black hover:text-white transition-colors"
              >
                {copy.ctaButton}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} footer={dict.footer} nav={dict.nav} />
    </>
  );
}
