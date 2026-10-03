import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white border-t border-white/10 selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Bagian Utama: Grid Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Kolom Brand & Tagline (Lebih lebar) */}
          <div className="md:col-span-5 space-y-6">
            <Link
              href="/"
              className="inline-block text-lg font-semibold tracking-[0.2em] uppercase"
            >
              SENSE ISLE STUDIO
            </Link>
            <p className="text-zinc-400 text-sm font-light tracking-wide max-w-sm leading-relaxed">
              Creating sophisticated, timeless spaces through thoughtful
              architecture, refined interior details, and a strong sense of
              place.
            </p>
          </div>

          {/* Kolom Navigasi: Navigasi Menu */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-light text-zinc-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom Layanan / Services */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm font-light text-zinc-300">
              <li>
                <Link
                  href="/ourServices"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  Architecture Services
                </Link>
              </li>
              <li>
                <Link
                  href="/ourServices"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  Interior Design
                </Link>
              </li>
              <li>
                <Link
                  href="/ourServices"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  Home & Office Renovation
                </Link>
              </li>
              <li>
                <Link
                  href="/ourServices"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  Custom-Built Furniture
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom Sosial Media */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium">
              Social Media
            </h4>
            <div className="flex flex-col space-y-3 text-sm font-light text-zinc-300">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between group py-1 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-zinc-500 group-hover:text-white transition-colors"
                />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between group py-1 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter / X
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-zinc-500 group-hover:text-white transition-colors"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bagian Bawah: Copyright & Legal (Diubah menjadi text-zinc-300 agar terlihat terang/jelas) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-zinc-300">
          <p>© {currentYear} Sense Isle Studio. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
