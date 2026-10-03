"use client";

import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";

export default function ContactClient() {
  return (
    <main className="w-full text-white min-h-screen bg-black">
      {/* Header Section (Black Background) */}
      <div className="w-full bg-black py-16 border-b border-white/10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 font-light block mb-3">
            GET IN TOUCH
          </span>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-[0.15em] text-white mb-4">
            Contact Us
          </h1>

          <p className="text-zinc-400 text-sm md:text-base font-light tracking-[0.1em] max-w-xl">
            Let&apos;s collaborate on your next architectural masterpiece or
            interior curation project.
          </p>
        </div>
      </div>

      {/* Main Content Section (Zinc Background matching reference) */}
      <section className="w-full bg-zinc-900 border-t border-white/10 py-16 md:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Contact Information */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-light block mb-2">
                  INFORMATION
                </span>
                <h2 className="text-2xl md:text-3xl font-light tracking-[0.05em] text-white">
                  Studio Inquiries
                </h2>
                <p className="text-sm font-light text-zinc-300 mt-4 leading-relaxed">
                  We are open for new architectural commissions, spatial
                  consultations, and creative partnerships. Reach out through
                  the channels below or visit our primary studio.
                </p>
              </div>

              <div className="space-y-6 pt-4 border-t border-white/10">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/15 flex items-center justify-center text-white shrink-0 mt-1">
                    <MapPin size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-light mb-1">
                      Headquarters
                    </h3>
                    <p className="text-sm font-light text-zinc-200 leading-relaxed">
                      Jl. Manyar Tirtoyoso Utara III No.6, Klampis Ngasem, Kec.
                      Sukolilo, Surabaya, Jawa Timur 60117
                    </p>
                  </div>
                </div>

                {/* Email (Clickable) */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/15 flex items-center justify-center text-white shrink-0 mt-1">
                    <Mail size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-light mb-1">
                      Direct Email
                    </h3>
                    <a
                      href="mailto:inquiry@aethelgardstudio.com"
                      className="text-sm font-light text-zinc-200 hover:text-white hover:underline transition-colors duration-200 block"
                    >
                      inquiry@aethelgardstudio.com
                    </a>
                  </div>
                </div>

                {/* Phone / WhatsApp (Clickable) */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/15 flex items-center justify-center text-white shrink-0 mt-1">
                    <Phone size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-light mb-1">
                      Phone Line / WhatsApp
                    </h3>
                    <a
                      href="https://wa.me/628970587487?text=Halo,%20saya%20tertarik%20dengan%20jasa%20interior%20Anda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-light text-zinc-200 hover:text-white hover:underline transition-colors duration-200 block"
                    >
                      +62 897-0587-487
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-6 bg-zinc-900/50 border border-white/10">
                <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-light mb-2">
                  Operating Hours
                </h3>
                <p className="text-sm font-light text-zinc-300">
                  Monday – Friday: 09:00 AM – 06:00 PM (WIB) <br />
                  Saturday – Sunday: By Appointment Only
                </p>
              </div>
            </div>

            {/* Right Column: Google Maps Embed */}
            <div className="lg:col-span-7 bg-zinc-950 border border-white/15 p-6 md:p-8 relative shadow-2xl flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-light block mb-1">
                    OUR LOCATION
                  </span>
                  <h2 className="text-xl md:text-2xl font-light tracking-[0.05em] text-white">
                    Find Us on Map
                  </h2>
                </div>
                <a
                  href="https://maps.google.com/?q=Jl.+Manyar+Tirtoyoso+Utara+III+No.6,+Klampis+Ngasem,+Kec.+Sukolilo,+Surabaya,+Jawa+Timur+60117"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors duration-200 border border-white/20 px-4 py-2"
                >
                  <span>Open Maps</span>
                  <ExternalLink size={14} strokeWidth={1.5} />
                </a>
              </div>

              {/* Responsive Google Maps Iframe with border thickness */}
              <div className="w-full h-[400px] md:h-[480px] border-[10px] border-black relative overflow-hidden bg-black shadow-inner">
                <iframe
                  title="Aethelgard Studio Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.6585147576517!2d112.7634676!3d-7.2796123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f95147820bb1%3A0x1d4715978f6974e!2sJl.%20Manyar%20Tirtoyoso%20Utara%20III%20No.6%2C%20Klampis%20Ngasem%2C%20Kec.%20Sukolilo%2C%20Kota%20SBY%2C+Jawa%20Timur%2060117!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "invert(90%) hue-rotate(180deg) contrast(120%)",
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
