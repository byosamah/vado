import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/Reveal";

export default function AboutSection() {
  return (
    <section id="about" className="section bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal variant="stagger" className="space-y-8">
            <RevealItem className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full" aria-hidden="true" />
              <span className="text-sm tracking-widest uppercase text-[var(--color-text-secondary)]">
                About VADO
              </span>
            </RevealItem>

            <RevealItem>
              <h2>Where vision becomes architecture.</h2>
            </RevealItem>

            <RevealItem>
              <p className="text-lg leading-relaxed max-w-md text-[var(--color-text-secondary)]">
                VADO (VISION Arch. &amp; Engineering Consultants) is a
                multidisciplinary consultancy specialised in architecture,
                engineering, and project development. With decades of
                experience, VADO delivers innovative, functional, and
                sustainable solutions tailored to the evolving needs of
                communities and clients across Saudi Arabia.
              </p>
            </RevealItem>

            <RevealItem>
              <Link
                href="#services"
                className="inline-flex items-center min-h-[var(--touch-target)] text-sm tracking-widest uppercase border-b border-[var(--color-accent)] pb-1 hover:opacity-70 transition-opacity duration-300"
              >
                View Services
              </Link>
            </RevealItem>
          </Reveal>

          <Reveal
            variant="fadeInRight"
            className="image-hover-scale relative w-full aspect-[4/5]"
          >
            <Image
              src="/images/about.webp"
              alt="VADO studio interior"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
