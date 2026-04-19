import Link from "next/link";
import { Reveal, RevealItem } from "@/components/Reveal";

const links = [
  { id: 1, text: "Explore our projects", href: "#portfolio" },
  { id: 2, text: "Learn about our vision", href: "#about" },
  { id: 3, text: "Start your project today", href: "#contact" },
];

export default function ServicesLinks() {
  return (
    <section className="py-16 md:py-24 bg-background border-t border-[var(--color-border)]">
      <div className="container">
        <Reveal
          variant="stagger"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {links.map((link) => (
            <RevealItem key={link.id}>
              <Link
                href={link.href}
                className="text-xl md:text-2xl font-light text-[var(--color-text-primary)] hover:opacity-70 underline-hover transition-opacity duration-300"
              >
                {link.text}
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
