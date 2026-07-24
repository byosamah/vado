"use client";

/**
 * Footer Component
 * ================
 * VADO footer with contact info and social links.
 *
 * Motion: GSAP reveals via the shared useReveals hook, scoped to the <footer>
 * root ref. The three columns (logo/about, Contact, Quick Links) and the bottom
 * bar (copyright + socials) carry data-reveal, so they fade + rise in with an
 * auto-stagger as the footer scrolls into view. Respects prefers-reduced-motion
 * (content stays fully visible when reduced motion is requested).
 *
 * RTL note: the email address and phone number are wrapped in dir="ltr". Both
 * are Latin-script runs inside a right-to-left paragraph, and without an
 * explicit direction the bidi algorithm moves the leading "+" of the phone
 * number to the wrong end.
 */

import { Fragment, useRef } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { useReveals } from "@/lib/gsap/reveals";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
} from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n/config";
import { t, type Dictionary } from "@/lib/i18n/get-dictionary";

interface FooterProps {
  lang: Locale;
  /** The wordmark, in this locale. "VADO" in English, "ڤادو" in Arabic. */
  brandName: string;
  footer: Dictionary["footer"];
  nav: Dictionary["nav"];
}

export default function Footer({ lang, brandName, footer, nav }: FooterProps) {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  const socialLinks = [
    { label: footer.linkedin, href: "#" },
    { label: footer.instagram, href: "#" },
    { label: footer.twitter, href: "#" },
  ];

  const quickLinks = [
    { label: nav.projects, href: localePath(lang, "/projects") },
    { label: nav.about, href: localePath(lang, "/about") },
    { label: nav.services, href: localePath(lang, "/services") },
    { label: nav.contact, href: `${localePath(lang, "/")}#contact` },
  ];

  return (
    <footer ref={root} className="bg-black py-16 md:py-20">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & About */}
          <div data-reveal className="lg:col-span-2">
            {/* Text wordmark, not the logo. The header keeps the Latin logo SVG
                (a graphic never translates), but this is the firm's NAME set as
                type, so it reads ڤادو in Arabic. No dir="ltr" here: forcing LTR
                on Arabic text would strand the following punctuation. */}
            <Link
              href={localePath(lang, "/")}
              className="text-3xl font-semibold tracking-wider mb-6 block text-white"
            >
              {brandName}
            </Link>
            <p className="leading-relaxed max-w-md text-white/60">
              {footer.blurb}
            </p>
          </div>

          {/* Contact Info */}
          <div data-reveal>
            <h4 className="font-medium mb-6 tracking-widest uppercase text-white">
              {footer.contactHeading}
            </h4>
            {/* Flush-stacked py-2 rows: same 16px visual gap as space-y-4, but the
                tap-to-email/tap-to-call links grow to ~42px hit boxes. */}
            <div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 py-2 text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span dir="ltr">{CONTACT_EMAIL}</span>
              </a>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="flex items-center gap-3 py-2 text-white/60 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span dir="ltr">{CONTACT_PHONE_DISPLAY}</span>
              </a>
              <div className="flex items-start gap-3 py-2 text-white/60">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  {footer.addressLines.map((line, index) => (
                    <Fragment key={line}>
                      {index > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div data-reveal>
            <h4 className="font-medium mb-6 tracking-widest uppercase text-white">
              {footer.quickLinksHeading}
            </h4>
            {/* No space-y here: in Tailwind v4 a child's -my-* would override the
                :where()-scoped space-y margins and the hit boxes would overlap.
                Flush-stacked py-2 links give clean 16px gaps and ~42px targets. */}
            <div>
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div data-reveal className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-white/40">
            {t(footer.copyright, { year: new Date().getFullYear() })}
          </p>

          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm py-2 px-1 -my-1 text-white/40 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
