"use client";

import React from "react";
import { Droplets } from "lucide-react";

interface HairWashSceneProps {
  opacity: number;
}

export const HairWashScene: React.FC<HairWashSceneProps> = ({ opacity }) => {
  return (
    <section
      className="relative w-full h-[100dvh] flex flex-col justify-start pt-16 sm:pt-24 px-4 sm:px-12 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-xs sm:max-w-md w-full flex flex-col items-start p-0">
        {/* Section Pill Label */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-[#d4af37]/40 mb-1.5 shadow-md">
          <Droplets className="w-3 h-3 text-[#d4af37]" />
          <span className="text-[8px] sm:text-[10px] font-sans tracking-[0.2em] text-[#d4af37] uppercase font-semibold">
            02 — HAIR WASH
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-serif-luxury text-xl sm:text-3xl md:text-4xl font-normal text-[#faf7f2] leading-[1.1] mb-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          Refresh &amp; <span className="italic text-[#fceec5]">Restore</span>
        </h2>

        {/* Copy */}
        <p className="font-sans text-[11px] sm:text-sm text-[#faf7f2]/95 leading-relaxed font-light mb-2 max-w-xs sm:max-w-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          Awaken natural radiance with therapeutic botanical infusions and pure restorative care.
        </p>

        {/* Micro Badges */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          <span className="text-[8px] sm:text-[9px] tracking-wider uppercase font-sans font-medium text-[#fceec5] bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-[#d4af37]/35 shadow-sm">
            Thermal Infusion
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-wider uppercase font-sans font-medium text-[#fceec5] bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-[#d4af37]/35 shadow-sm">
            Scalp Rejuvenation
          </span>
        </div>
      </div>
    </section>
  );
};
