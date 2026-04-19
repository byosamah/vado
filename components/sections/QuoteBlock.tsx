import { Reveal } from "@/components/Reveal";

export default function QuoteBlock() {
  return (
    <section className="section bg-[var(--color-surface)]">
      <div className="container">
        <Reveal className="max-w-4xl mx-auto text-center">
          <h2 className="sr-only">Our Vision</h2>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-[var(--color-text-primary)]">
            &ldquo;To shape meaningful spaces through thoughtful design and
            engineering excellence — creating environments that inspire, serve,
            and sustain communities.&rdquo;
          </blockquote>
          <p className="mt-8 text-sm tracking-widest uppercase text-[var(--color-text-secondary)]">
            — VADO Vision Statement
          </p>
        </Reveal>
      </div>
    </section>
  );
}
