"use client";

import React from "react";
import { Droplets } from "lucide-react";

interface HairWashSceneProps {
  opacity: number;
}

export const HairWashScene: React.FC<HairWashSceneProps> = ({ opacity }) => {
  return (
    <section
      className="relative w-full h-screen flex flex-col justify-start pt-20 sm:pt-28 px-5 sm:px-12 md:px-16 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-sm sm:max-w-lg w-full flex flex-col items-start p-0">
        {/* Section Pill Label */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-[#d4af37]/50 mb-2.5 shadow-lg">
          <Droplets className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-[#d4af37] uppercase font-semibold drop-shadow-md">
            02 — HAIR WASH
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-normal text-[#faf7f2] leading-[1.1] mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          Refresh &amp; <span className="italic text-[#fceec5]">Restore</span>
        </h2>

        {/* Copy */}
        <p className="font-sans text-xs sm:text-sm text-[#faf7f2] leading-relaxed font-light mb-3 max-w-md drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          Awaken your hair&apos;s natural radiance with therapeutic botanical infusions, nourishing argan balms, and pure restorative care.
        </p>

        {/* Micro Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-sans font-medium text-[#fceec5] bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-[#d4af37]/40 shadow-md">
            Thermal Infusion
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-sans font-medium text-[#fceec5] bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-[#d4af37]/40 shadow-md">
            Scalp Rejuvenation
          </span>
        </div>
      </div>
    </section>
  );
};
