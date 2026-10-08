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
      className="relative w-full h-screen flex flex-col justify-end pb-24 sm:pb-28 px-5 sm:px-12 md:px-16 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-sm sm:max-w-lg w-full flex flex-col items-start p-0">
        {/* Section Pill Label */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-[#d4af37]/50 mb-2.5 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-[#d4af37] uppercase font-semibold drop-shadow-md">
            01 — THE ARRIVAL
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#faf7f2] leading-[1.05] mb-1.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          Nitish <span className="italic font-light text-[#fceec5]">Salon</span>
        </h1>

        {/* Supporting Text */}
        <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          BRIDAL &amp; BEAUTY ATELIER
        </p>

        {/* Short Copy */}
        <p className="font-serif-luxury text-sm sm:text-base text-[#faf7f2] italic font-light leading-relaxed mb-4 max-w-md drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          Where your transformation begins. Step into an ethereal sanctuary curated for the modern bride.
        </p>

        {/* CTA Button */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={onOpenBooking}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full overflow-hidden bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#aa8228] text-black font-sans font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.4)] active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>BOOK NOW</span>
          </button>
        </div>
      </div>
    </section>
  );
};
