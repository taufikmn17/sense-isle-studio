"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
        setIsOpen(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`sticky top-0 z-50 bg-[#f6f6f6] border-b border-zinc-300 px-3 sm:px-6 md:px-8 py-2 sm:py-3 w-full transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto relative">
        {/* Logo */}
        <div className="flex items-center h-11 sm:h-12 md:h-14 w-auto z-10 shrink-0 -my-1">
          <Image
            src="/images/sis_logo.webp"
            alt="Sense Isle Studio Logo"
            width={220}
            height={80}
            priority
            className="h-full w-auto object-contain"
          />
        </div>

        {/* Desktop Menu - Teks hitam pekat dengan efek hover garis bawah minimalis khas arsitektur */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-medium tracking-[0.15em] uppercase text-zinc-900 whitespace-nowrap">
          <a
            href="/"
            className="relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-zinc-900 hover:after:w-full after:transition-all after:duration-300"
          >
            Home
          </a>
          <a
            href="#"
            className="relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-zinc-900 hover:after:w-full after:transition-all after:duration-300"
          >
            Reviews
          </a>
          <a
            href="#"
            className="relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-zinc-900 hover:after:w-full after:transition-all after:duration-300"
          >
            Services
          </a>
          <a
            href="#"
            className="relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-zinc-900 hover:after:w-full after:transition-all after:duration-300"
          >
            Blog
          </a>
          <a
            href="#"
            className="relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-zinc-900 hover:after:w-full after:transition-all after:duration-300"
          >
            About Us
          </a>
          <a
            href="#"
            className="relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-zinc-900 hover:after:w-full after:transition-all after:duration-300"
          >
            Contact
          </a>
        </div>

        {/* Mobile & Tablet Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-zinc-900 focus:outline-none p-1.5 z-10"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile & Tablet Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#f6f6f6] border-b border-zinc-300 shadow-xl text-center">
          <div className="flex flex-col text-xs font-medium tracking-[0.2em] uppercase text-zinc-900 divide-y divide-zinc-200">
            <a
              href="/"
              onClick={() => setIsOpen(false)}
              className="py-4 hover:bg-zinc-200/50 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="py-4 hover:bg-zinc-200/50 transition-colors"
            >
              Reviews
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="py-4 hover:bg-zinc-200/50 transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="py-4 hover:bg-zinc-200/50 transition-colors"
            >
              Blog
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="py-4 hover:bg-zinc-200/50 transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="py-4 hover:bg-zinc-200/50 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
