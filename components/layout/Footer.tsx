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
 */

import { useRef } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { useReveals } from "@/lib/gsap/reveals";

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
];

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <footer ref={root} className="bg-black py-16 md:py-20">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & About */}
          <div data-reveal className="lg:col-span-2">
            <Link
              href="/"
              className="text-3xl font-semibold tracking-wider mb-6 block"
              style={{ color: "#ffffff" }}
            >
              VADO
            </Link>
            <p className="leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.6)" }}>
              VISION Arch. & Engineering Consultants. Transforming ideas into
              built realities through thoughtful design and engineering
              excellence since 1994.
            </p>
          </div>

          {/* Contact Info */}
          <div data-reveal>
            <h4 className="font-medium mb-6 text-sm tracking-widest uppercase" style={{ color: "#ffffff" }}>
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:info@vado.sa"
                className="flex items-center gap-3 hover:opacity-100 transition-opacity"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <Mail className="w-4 h-4" />
                info@vado.sa
              </a>
              <a
                href="tel:+966542900447"
                className="flex items-center gap-3 hover:opacity-100 transition-opacity"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <Phone className="w-4 h-4" />
                +966 542 900 447
              </a>
              <div className="flex items-start gap-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  Al Fardan Tower – Office 401
                  <br />
                  Al Khobar, Saudi Arabia
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div data-reveal>
            <h4 className="font-medium mb-6 text-sm tracking-widest uppercase" style={{ color: "#ffffff" }}>
              Quick Links
            </h4>
            <div className="space-y-2">
              <Link
                href="#portfolio"
                className="block py-2 -my-1 hover:opacity-100 transition-opacity"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Projects
              </Link>
              <Link
                href="#about"
                className="block py-2 -my-1 hover:opacity-100 transition-opacity"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                About
              </Link>
              <Link
                href="#services"
                className="block py-2 -my-1 hover:opacity-100 transition-opacity"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Services
              </Link>
              <Link
                href="#contact"
                className="block py-2 -my-1 hover:opacity-100 transition-opacity"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div data-reveal className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} VISION Arch. & Engineering Consultants.
            All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm py-2 px-1 -my-1 hover:opacity-100 transition-opacity"
                style={{ color: "rgba(255,255,255,0.4)" }}
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
