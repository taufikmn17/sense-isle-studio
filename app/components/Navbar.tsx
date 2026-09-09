"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-zinc-800 px-4 md:px-8 py-2 w-full">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center h-8 md:h-10 w-auto">
          <Image
            src="/images/sis_logo.jpg"
            alt="Sense Isle Studio Logo"
            width={200}
            height={60}
            priority
            className="h-full w-auto object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-xs font-light tracking-[0.2em] uppercase text-zinc-300">
          <a href="/" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="/portfolio" className="hover:text-white transition-colors">
            Portfolio
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Reviews
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Blog
          </a>
          <a href="#" className="hover:text-white transition-colors">
            About Us
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-300 focus:outline-none"
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

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-zinc-800 py-4 px-4 md:px-8 flex flex-col gap-4 text-xs font-light tracking-[0.2em] uppercase text-zinc-300">
          <a href="/" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="/portfolio" className="hover:text-white transition-colors">
            Portfolio
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Reviews
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Blog
          </a>
          <a href="#" className="hover:text-white transition-colors">
            About Us
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
