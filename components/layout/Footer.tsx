import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/vado-consultants" },
  { label: "Instagram", href: "https://www.instagram.com/vado.consultants" },
  { label: "Twitter", href: "https://twitter.com/vado_consultants" },
];

const quickLinks = [
  { label: "Projects", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface-inverse)] text-[var(--color-on-dark)] py-16 md:py-20 dark-surface">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="text-3xl font-semibold tracking-wider mb-6 block text-[var(--color-on-dark)]">
              VADO
            </Link>
            <p className="leading-relaxed max-w-md text-[var(--color-on-dark-muted)]">
              Transforming ideas into built realities through thoughtful design
              and engineering excellence.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-6 text-sm tracking-widest uppercase text-[var(--color-on-dark)]">
              Contact
            </h4>
            <address className="not-italic space-y-4 text-[var(--color-on-dark-muted)]">
              <a
                href="mailto:info@vado.sa"
                className="flex items-center gap-3 hover:text-[var(--color-on-dark)] transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                info@vado.sa
              </a>
              <a
                href="tel:+966542900447"
                className="flex items-center gap-3 hover:text-[var(--color-on-dark)] transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                +966 542 900 447
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" aria-hidden="true" />
                <span>
                  Al Fardan Tower — Office 401
                  <br />
                  Al Khobar, Saudi Arabia
                </span>
              </div>
            </address>
          </div>

          <nav aria-label="Footer">
            <h4 className="font-medium mb-6 text-sm tracking-widest uppercase text-[var(--color-on-dark)]">
              Quick Links
            </h4>
            <ul className="space-y-3 list-none p-0">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center min-h-[44px] text-[var(--color-on-dark-muted)] hover:text-[var(--color-on-dark)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-[var(--color-on-dark-border)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-sm text-[var(--color-on-dark-muted)]">
            © {new Date().getFullYear()} VISION Arch. &amp; Engineering Consultants.
            All rights reserved.
          </p>

          <ul className="flex gap-2 list-none p-0">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex items-center justify-center px-3 min-h-[44px] text-sm text-[var(--color-on-dark-muted)] hover:text-[var(--color-on-dark)] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
