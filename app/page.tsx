/**
 * VADO Homepage
 * Single-page composition of section components.
 */

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/sections/HeroSlider";
import AboutSection from "@/components/sections/AboutSection";
import PortfolioShowcase from "@/components/sections/PortfolioShowcase";
import ServicesTabs from "@/components/sections/ServicesTabs";
import QuoteBlock from "@/components/sections/QuoteBlock";
import TeamGrid from "@/components/sections/TeamGrid";
import TestimonialsSlider from "@/components/sections/TestimonialsSlider";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <AboutSection />
        <PortfolioShowcase />
        <ServicesTabs />
        <QuoteBlock />
        <TeamGrid />
        <TestimonialsSlider />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
