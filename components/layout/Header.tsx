"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Projects", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

interface HeaderProps {
  forceSolid?: boolean;
}

export default function Header({ forceSolid = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // rAF-throttled scroll listener — avoids re-rendering on every scroll event
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 100);
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu: Escape to close, lock scroll, return focus on close
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const toggleEl = toggleRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      toggleEl?.focus();
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(() => setIsMobileMenuOpen(false), []);

  const isDarkOverHero = !forceSolid && !isScrolled;
  const headerBg = isMobileMenuOpen
    ? "bg-[var(--color-surface-inverse)]"
    : forceSolid || isScrolled
    ? "bg-white"
    : "bg-transparent";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${headerBg}`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link href="/" className="block" aria-label="VADO — home">
            <Image
              src="/logo.svg"
              alt=""
              width={120}
              height={40}
              priority
              className={`h-8 md:h-10 w-auto transition-all duration-300 ${
                isMobileMenuOpen || isDarkOverHero ? "brightness-0 invert" : ""
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm tracking-wide uppercase underline-hover transition-colors duration-300 ${
                  forceSolid || isScrolled ? "text-[var(--color-text-primary)]" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle — 44px hit target */}
          <button
            ref={toggleRef}
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            className={`md:hidden touch-target transition-colors duration-300 ${
              isMobileMenuOpen || isDarkOverHero ? "text-white" : "text-black"
            }`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        aria-hidden={!isMobileMenuOpen}
        className={`md:hidden fixed inset-0 top-20 bg-[var(--color-surface-inverse)] transition-opacity duration-300 ease-out dark-surface ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 pt-12" aria-label="Primary mobile">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              ref={i === 0 ? firstLinkRef : undefined}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              className="text-lg tracking-wide uppercase text-white hover:text-white/80 touch-target px-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
