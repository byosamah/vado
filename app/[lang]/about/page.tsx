/**
 * About Page
 * ==========
 * The firm's story, told as a calm editorial page. Server component only:
 * no client hooks, no GSAP, no Swiper. Every fact here is drawn from the
 * repo's own source of truth (lib/site.ts and the dictionaries), and the
 * principles, services, and leadership lists are the SAME dictionary arrays
 * the homepage renders, so the two surfaces cannot drift apart.
 */

import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { aboutSchema } from "@/lib/schema";
import { buildAlternates } from "@/lib/seo";
import { FOUNDING_YEAR } from "@/lib/site";
import { LOCALES, isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary, t } from "@/lib/i18n/get-dictionary";

const PATH = "/about";

/** Portraits, in the same order as `dict.team`. */
const PORTRAITS = ["/images/team-khalid.webp", "/images/team-mutaz.webp"];

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
    title: dict.pages.about.metaTitle,
    description: dict.pages.about.metaDescription,
    alternates: buildAlternates(lang, PATH),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const copy = dict.pages.about;

  return (
    <>
      <JsonLd data={aboutSchema(lang, dict)} />

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
            <div className="max-w-4xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="text-sm tracking-widest uppercase text-gray-600">
                  {copy.kicker}
                </span>
              </div>

              {/* Primary headline (the only h1 on the page) */}
              <h1>{copy.heading}</h1>

              {/* Who VADO is */}
              <p className="text-lg leading-relaxed text-gray-600 mt-10 max-w-2xl">
                {t(copy.intro, {
                  year: FOUNDING_YEAR,
                  city: dict.brand.city,
                })}
              </p>
            </div>
          </div>
        </section>

        {/* Representative work, full-width band */}
        <div className="relative w-full h-[50vh] md:h-[60vh]">
          <Image
            src="/images/projects/al-hamra-waterfront/hero.webp"
            alt={copy.bandImageAlt}
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
                  {copy.whatWeDoKicker}
                </span>
              </div>
              <h2>{copy.whatWeDoHeading}</h2>
              <p className="text-lg leading-relaxed text-gray-600 mt-10 max-w-2xl">
                {copy.whatWeDoBody}
              </p>
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {dict.services.map((service, index) => (
                <div key={service.id} className="pt-8 border-t border-gray-200">
                  <span className="block text-sm tracking-widest text-gray-400 mb-6">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-4">{service.name}</h3>
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
                {copy.principlesKicker}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {dict.principles.map((principle) => (
                <div
                  key={principle.id}
                  className="md:px-8 md:border-s md:border-gray-200 md:first:border-s-0 md:first:ps-0"
                >
                  <span className="block text-sm tracking-widest text-gray-400 mb-6">
                    {principle.id}
                  </span>
                  <h3 className="mb-4">{principle.title}</h3>
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
                  {copy.leadershipKicker}
                </span>
              </div>
              <h2>{copy.leadershipHeading}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
              {dict.team.map((member, index) => (
                <div key={PORTRAITS[index]} className="group">
                  <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                    <Image
                      src={PORTRAITS[index]}
                      alt={t(dict.home.team.memberAlt, {
                        name: member.name,
                        role: member.role,
                      })}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h4 className="mb-1">{member.name}</h4>
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
              <h2 className="text-white">{copy.ctaHeading}</h2>
              <p className="text-lg leading-relaxed text-white/60 mt-6">
                {copy.ctaBody}
              </p>
              <Link
                href={`${localePath(lang, "/")}#contact`}
                className="inline-flex items-center gap-3 mt-10 text-sm tracking-widest uppercase text-white underline-hover"
              >
                {copy.ctaLink}
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
