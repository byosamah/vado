"use client";

/**
 * Footer Component
 * ================
 * VADO footer with contact info and social links.
 */

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-black py-16 md:py-20">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-3xl font-semibold tracking-wider text-white mb-6 block"
            >
              VADO
            </Link>
            <p className="text-white/60 leading-relaxed max-w-md">
              VISION Arch. & Engineering Consultants. Transforming ideas into
              built realities through thoughtful design and engineering
              excellence since 1994.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-medium mb-6 text-sm tracking-widest uppercase">
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:info@vado.sa"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@vado.sa
              </a>
              <a
                href="tel:+966542900447"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +966 542 900 447
              </a>
              <div className="flex items-start gap-3 text-white/60">
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
          <div>
            <h4 className="text-white font-medium mb-6 text-sm tracking-widest uppercase">
              Quick Links
            </h4>
            <div className="space-y-3">
              <Link
                href="#portfolio"
                className="block text-white/60 hover:text-white transition-colors"
              >
                Projects
              </Link>
              <Link
                href="#about"
                className="block text-white/60 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="#services"
                className="block text-white/60 hover:text-white transition-colors"
              >
                Services
              </Link>
              <Link
                href="#contact"
                className="block text-white/60 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} VISION Arch. & Engineering Consultants.
            All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  text-sm text-white/40
                  hover:text-white
                  transition-colors duration-300
                "
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
