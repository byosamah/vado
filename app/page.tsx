/**
 * VADO Homepage
 * =============
 * VISION Arch. & Engineering Consultants
 * Based on Hiroshi design with VADO content
 *
 * Sections:
 * 1. Hero Slider (fullscreen)
 * 2. About Section
 * 3. Services Links
 * 4. Feature Cards
 * 5. Portfolio Showcase
 * 6. Services Tabs
 * 7. Quote Block
 * 8. Team Grid
 * 9. Guiding Principles
 * 10. Blog Grid
 * 11. Contact Section (NEW)
 * 12. CTA Banner
 * 13. Footer
 */

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

export default function Home() {
  return (
    <>
      {/* FAQ structured data (additive, invisible) — does not alter section order */}
      <JsonLd data={faqSchema()} />

      {/* Sticky Header - Transparent on hero, solid on scroll */}
      <Header />

      <main>
        {/* Hero - Fullscreen slider with fade effect */}
        <HeroSlider />

        {/* About - Two column layout with text and image */}
        <AboutSection />

        {/* Services Links - TEMPORARILY HIDDEN
        <ServicesLinks />
        */}

        {/* Feature Cards - TEMPORARILY HIDDEN
        <FeatureCards />
        */}

        {/* Portfolio - Interactive sidebar with Swiper carousel */}
        <PortfolioShowcase />

        {/* Services Tabs - Tabbed content section */}
        <ServicesTabs />

        {/* Quote - Large typography centered quote */}
        <QuoteBlock />

        {/* Team - Four column grid of team members */}
        <TeamGrid />

        {/* Guiding Principles - Dark background values band */}
        <GuidingPrinciples />

        {/* Blog - Four column grid of blog posts */}
        {/* TEMPORARILY HIDDEN - Uncomment to restore:
        <BlogGrid />
        */}

        {/* Contact - Form and contact information */}
        <ContactSection />

        {/* CTA - Full-width banner with parallax background */}
        <CTABanner />
      </main>

      {/* Footer - Simple credits and social links */}
      <Footer />
    </>
  );
}
