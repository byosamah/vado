"use client";

/**
 * Header Component
 * ================
 * Sticky header that transitions from transparent to solid white on scroll.
 *
 * Behavior:
 * - Transparent background when at top of page
 * - Solid white background after scrolling 100px
 * - Logo on left, navigation on right
 * - Smooth 300ms transition
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

// Navigation items for VADO site
const navItems = [
  { label: "Projects", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  // Track scroll position to determine header background
  const [isScrolled, setIsScrolled] = useState(false);

  // Track mobile menu open state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${isScrolled
          ? "bg-white shadow-sm"
          : "bg-transparent"
        }
      `}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link
            href="/"
            className={`
              text-2xl font-semibold tracking-wider
              transition-colors duration-300
              ${isScrolled ? "text-black" : "text-white"}
            `}
          >
            VADO
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  text-sm tracking-wide uppercase
                  underline-hover
                  transition-colors duration-300
                  ${isScrolled
                    ? "text-gray-800 hover:text-black"
                    : "text-white/90 hover:text-white"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`
              md:hidden p-2
              transition-colors duration-300
              ${isScrolled ? "text-black" : "text-white"}
            `}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
          bg-white
          transition-all duration-300 ease-out
          ${isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }
        `}
      >
        <nav className="flex flex-col items-center gap-6 pt-12">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              className="text-lg tracking-wide uppercase text-gray-800 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
