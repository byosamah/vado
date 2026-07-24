/**
 * VADO Homepage
 * =============
 * VISION Arch. & Engineering Consultants
 *
 * A SERVER component: it resolves the locale, loads the dictionary once, and
 * hands each section only the slice it needs. Keeping the dictionary on the
 * server is what stops both languages' copy from being shipped to the browser.
 *
 * Sections:
 * 1. Hero Slider (fullscreen)
 * 2. About Section
 * 3. Portfolio Showcase
 * 4. Services Tabs
 * 5. Quote Block
 * 6. Team Grid
 * 7. Guiding Principles
 * 8. Contact Section
 * 9. CTA Banner
 */

import { notFound } from "next/navigation";

// Layout Components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// SEO: homepage FAQ structured data (extractable Q&A for AI answer engines)
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";

// Section Components
import HeroSlider from "@/components/sections/HeroSlider";
import AboutSection from "@/components/sections/AboutSection";
// import ServicesLinks from "@/components/sections/ServicesLinks"; // TEMPORARILY HIDDEN
// import FeatureCards from "@/components/sections/FeatureCards"; // TEMPORARILY HIDDEN
import PortfolioShowcase from "@/components/sections/PortfolioShowcase";
import ServicesTabs from "@/components/sections/ServicesTabs";
import QuoteBlock from "@/components/sections/QuoteBlock";
import TeamGrid from "@/components/sections/TeamGrid";
import GuidingPrinciples from "@/components/sections/GuidingPrinciples";
// import BlogGrid from "@/components/sections/BlogGrid"; // TEMPORARILY HIDDEN
import ContactSection from "@/components/sections/ContactSection";
import CTABanner from "@/components/sections/CTABanner";

import { LOCALES, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getAllProjects } from "@/lib/projects";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const projects = getAllProjects(lang);

  return (
    <>
      {/* FAQ structured data (additive, invisible) — does not alter section order */}
      <JsonLd data={faqSchema(lang, dict)} />

      {/* Sticky Header - Transparent on hero, solid on scroll */}
      <Header lang={lang} nav={dict.nav} langSwitcher={dict.langSwitcher} />

      <main id="main">
        {/* Primary page heading for SEO. Visually hidden (the hero is an image
            slider with cycling h2 titles), but present as the single semantic H1
            carrying the primary keyword. */}
        <h1 className="sr-only">{dict.home.srHeading}</h1>

        {/* Hero - Fullscreen slider with fade effect */}
        <HeroSlider lang={lang} hero={dict.home.hero} projects={projects} />

        {/* About - Two column layout with text and image */}
        <AboutSection about={dict.home.about} />

        {/* Services Links - TEMPORARILY HIDDEN
        <ServicesLinks links={dict.hidden.servicesLinks} />
        */}

        {/* Feature Cards - TEMPORARILY HIDDEN
        <FeatureCards cards={dict.hidden.featureCards} />
        */}

        {/* Portfolio - Interactive sidebar with Swiper carousel */}
        <PortfolioShowcase
          lang={lang}
          portfolio={dict.home.portfolio}
          projects={projects}
        />

        {/* Services Tabs - Tabbed content section */}
        <ServicesTabs services={dict.services} />

        {/* Quote - Large typography centered quote */}
        <QuoteBlock quote={dict.home.quote} />

        {/* Team - Grid of leadership */}
        <TeamGrid team={dict.team} copy={dict.home.team} />

        {/* Guiding Principles - Dark background values band */}
        <GuidingPrinciples
          principles={dict.principles}
          copy={dict.home.principles}
        />

        {/* Blog - TEMPORARILY HIDDEN - Uncomment to restore:
        <BlogGrid blog={dict.hidden.blog} />
        */}

        {/* Contact - Form and contact information */}
        <ContactSection
          lang={lang}
          contact={dict.home.contact}
          forms={dict.forms}
          subject={dict.enquirySubject}
        />

        {/* CTA - Full-width banner with parallax background */}
        <CTABanner cta={dict.home.cta} />
      </main>

      {/* Footer - Simple credits and social links */}
      <Footer
        lang={lang}
        brandName={dict.brand.shortName}
        footer={dict.footer}
        nav={dict.nav}
      />
    </>
  );
}
