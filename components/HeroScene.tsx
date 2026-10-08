"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface HeroSceneProps {
  onOpenBooking: () => void;
  opacity: number;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  onOpenBooking,
  opacity,
}) => {
  return (
    <section
      className="relative w-full h-[100dvh] flex flex-col justify-end pb-16 sm:pb-24 px-4 sm:px-12 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-xs sm:max-w-md w-full flex flex-col items-start p-0">
        {/* Section Pill Label */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-[#d4af37]/40 mb-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
          <span className="text-[8px] sm:text-[10px] font-sans tracking-[0.2em] text-[#d4af37] uppercase font-semibold">
            01 — THE ARRIVAL
          </span>
        </div>

        {/* Compact Title */}
        <h1 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#faf7f2] leading-[1.05] mb-0.5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          Nitish <span className="italic font-light text-[#fceec5]">Salon</span>
        </h1>

        {/* Supporting Text */}
        <p className="font-sans text-[8px] sm:text-xs tracking-[0.2em] uppercase text-[#d4af37] font-semibold mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          BRIDAL &amp; BEAUTY ATELIER
        </p>

        {/* Short Copy */}
        <p className="font-serif-luxury text-[11px] sm:text-sm text-[#faf7f2]/95 italic font-light leading-relaxed mb-3 max-w-xs sm:max-w-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          Where your transformation begins. Step into an ethereal sanctuary curated for the modern bride.
        </p>

        {/* CTA Button */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={onOpenBooking}
            className="group relative inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full overflow-hidden bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#aa8228] text-black font-sans font-bold text-[10px] sm:text-xs tracking-[0.18em] uppercase transition-all duration-300 hover:scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.4)] active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>BOOK NOW</span>
          </button>
        </div>
      </div>
    </section>
  );
};
