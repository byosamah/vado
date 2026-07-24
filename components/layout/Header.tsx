"use client";

/**
 * Header Component
 * ================
 * Sticky header that transitions from transparent to solid white on scroll.
 *
 * Behavior:
 * - Transparent background when at top of page
 * - Solid white background after scrolling 100px
 * - Logo on the start side, navigation on the end side
 * - Smooth 300ms transition
 *
 * Navigation targets the homepage's in-page sections. On the homepage itself
 * those stay bare hashes so Lenis keeps handling them as smooth scrolls; from
 * any subpage they become full locale-prefixed links, so "Team" works from
 * /en/about instead of being a dead anchor (which it used to be).
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { localePath, stripLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

interface HeaderProps {
  lang: Locale;
  nav: Dictionary["nav"];
  langSwitcher: Dictionary["langSwitcher"];
  forceSolid?: boolean; // Force solid background (for pages without dark hero)
}

export default function Header({
  lang,
  nav,
  langSwitcher,
  forceSolid = false,
}: HeaderProps) {
  // Track scroll position to determine header background
  const [isScrolled, setIsScrolled] = useState(false);

  // Track mobile menu open state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const onHomepage = stripLocale(pathname ?? "/") === "/";

  // Section anchors live on the homepage. Bare hash while already there (Lenis
  // smooth-scrolls it); otherwise a real link back to the homepage section.
  const sectionHref = (hash: string) =>
    onHomepage ? `#${hash}` : `${localePath(lang, "/")}#${hash}`;

  const navItems = [
    { label: nav.about, href: sectionHref("about") },
    { label: nav.projects, href: sectionHref("portfolio") },
    { label: nav.services, href: sectionHref("services") },
    { label: nav.team, href: sectionHref("team") },
    { label: nav.contact, href: sectionHref("contact") },
  ];

  useEffect(() => {
    // Function to check scroll position
    const handleScroll = () => {
      // Switch to solid background after 100px scroll
      setIsScrolled(window.scrollY > 100);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Check initial position (in case page loads scrolled)
    handleScroll();

    // Cleanup listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Lock page scroll behind the open overlay; close the menu if the
    // viewport grows past the md breakpoint so the lock can't get stranded.
    if (!isMobileMenuOpen) return;

    document.documentElement.style.overflow = "hidden";

    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => setIsMobileMenuOpen(false);
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      document.documentElement.style.overflow = "";
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${isMobileMenuOpen
          ? "bg-black"
          : (forceSolid || isScrolled)
            ? "bg-white"
            : "bg-transparent"
        }
      `}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href={localePath(lang, "/")} className="flex items-center min-h-11">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt={nav.logoAlt}
              className={`
                h-8 md:h-10 w-auto
                transition-all duration-300
                ${isMobileMenuOpen || (!forceSolid && !isScrolled) ? "brightness-0 invert" : ""}
              `}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  inline-flex items-center py-3
                  text-sm tracking-wide uppercase
                  transition-colors duration-300
                  ${(forceSolid || isScrolled) ? "text-gray-800" : "text-white"}
                `}
              >
                <span className="underline-hover">{item.label}</span>
              </Link>
            ))}

            {/* Language switcher, separated from the nav by a hairline so it
                reads as a mode control rather than another destination. */}
            <LanguageSwitcher
              lang={lang}
              label={langSwitcher.label}
              className={`
                ps-8 border-s
                ${(forceSolid || isScrolled)
                  ? "text-gray-800 border-gray-200"
                  : "text-white border-white/30"
                }
              `}
            />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`
              md:hidden flex items-center justify-center min-w-11 min-h-11 -me-1
              transition-colors duration-300
              ${isMobileMenuOpen || (!forceSolid && !isScrolled) ? "text-white" : "text-black"}
            `}
            aria-label={isMobileMenuOpen ? nav.closeMenu : nav.openMenu}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`
          md:hidden
          fixed inset-0 top-20
          bg-black overflow-y-auto
          transition-all duration-300 ease-out
          ${isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }
        `}
      >
        <nav className="flex flex-col items-center gap-2 pt-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              className="block w-full text-center py-3 px-8 text-lg tracking-wide uppercase text-white hover:text-white/80"
            >
              {item.label}
            </Link>
          ))}

          {/* Language switcher sits below a divider, matching the desktop
              treatment: a mode control, not a sixth destination. */}
          <div
            className="mt-6 pt-6 w-full flex justify-center border-t border-white/15"
            onClick={handleNavClick}
          >
            <LanguageSwitcher
              lang={lang}
              label={langSwitcher.label}
              className="text-lg text-white"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
