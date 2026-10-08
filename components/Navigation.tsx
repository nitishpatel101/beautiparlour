"use client";

import React from "react";
import { Phone, MessageSquare, Volume2, VolumeX, Sparkles } from "lucide-react";

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface NavigationProps {
  onOpenBooking: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenBooking,
  isAudioPlaying,
  onToggleAudio,
}) => {
  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 md:px-12 py-3.5 sm:py-5 flex items-center justify-between pointer-events-none transition-all duration-300">
        {/* Top-left: Brand */}
        <div
          className="pointer-events-auto flex flex-col group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-serif-luxury text-lg sm:text-2xl tracking-[0.2em] sm:tracking-[0.25em] text-[#faf7f2] font-semibold uppercase group-hover:text-[#d4af37] transition-colors duration-300">
              NITISH SALON
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[8px] sm:text-[10px] tracking-[0.18em] uppercase text-[#d4af37] font-medium font-sans">
              BRIDAL &amp; BEAUTY ATELIER
            </span>
            <span className="text-[10px] text-white/30 hidden md:inline">|</span>
            <span className="text-[9px] tracking-wider text-[#faf7f2]/70 font-sans hidden md:inline">
              ★ 4.9 · 1,200+ Couture Brides
            </span>
          </div>
        </div>

        {/* Top-right: Contact & Audio Icons */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Ambient Sound Toggle */}
          <button
            onClick={onToggleAudio}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full luxury-glass flex items-center justify-center text-[#d4af37] hover:text-white hover:border-[#d4af37] transition-all duration-300 group shadow-md"
            title={isAudioPlaying ? "Mute Salon Ambiance" : "Play Salon Ambiance"}
            aria-label="Toggle Salon Ambiance"
          >
            {isAudioPlaying ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37] animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 group-hover:text-white" />
            )}
          </button>

          {/* Instagram Icon */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full luxury-glass flex items-center justify-center text-[#faf7f2]/80 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300 shadow-md"
            title="Instagram @nitishsalon"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>

          {/* Phone Icon */}
          <a
            href="tel:+919876543210"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full luxury-glass flex items-center justify-center text-[#faf7f2]/80 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300 shadow-md"
            title="Call Concierge"
            aria-label="Phone"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>

          {/* WhatsApp / Contact Icon */}
          <a
            href="https://wa.me/919876543210?text=Hello%20Nitish%20Salon,%20I%20would%20like%20to%20inquire%20about%20bridal%20appointments."
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full luxury-glass flex items-center justify-center text-[#faf7f2]/80 hover:text-[#25D366] hover:border-[#25D366]/60 transition-all duration-300 shadow-md"
            title="WhatsApp Concierge"
            aria-label="WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>
      </header>

      {/* Bottom Area: Metadata & Floating BOOK NOW */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 px-4 sm:px-8 md:px-12 py-3.5 sm:py-5 flex items-end justify-between pointer-events-none">
        {/* Bottom-left: Salon Metadata */}
        <div className="pointer-events-auto hidden md:flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-[1px] bg-[#d4af37]" />
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#d4af37] font-semibold font-sans">
              FLAGSHIP ATELIERS
            </span>
          </div>
          <span className="text-[10px] tracking-[0.15em] text-[#faf7f2]/70 font-sans">
            NEW DELHI · MUMBAI · DUBAI
          </span>
          <span className="text-[8px] tracking-wider text-[#faf7f2]/40 font-sans">
            BESPOKE HAUTE BRIDAL COUTURE &copy; {new Date().getFullYear()} NITISH SALON
          </span>
        </div>

        {/* Bottom Right: Floating BOOK NOW button */}
        <div className="pointer-events-auto mx-auto md:mx-0">
          <button
            onClick={onOpenBooking}
            id="nav-book-now-btn"
            className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full overflow-hidden transition-all duration-300 luxury-glass-dark border border-[#d4af37]/40 hover:border-[#d4af37] hover:gold-glow shadow-2xl active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10 font-sans text-[11px] sm:text-xs tracking-[0.2em] font-semibold uppercase text-[#faf7f2] group-hover:text-[#fceec5]">
              BOOK NOW
            </span>
          </button>
        </div>
      </footer>
    </>
  );
};
