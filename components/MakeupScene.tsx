"use client";

import React from "react";
import { Wand2 } from "lucide-react";

interface MakeupSceneProps {
  opacity: number;
}

export const MakeupScene: React.FC<MakeupSceneProps> = ({ opacity }) => {
  return (
    <section
      className="relative w-full h-screen flex flex-col justify-end pb-24 sm:pb-28 px-5 sm:px-12 md:px-16 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-sm sm:max-w-lg w-full flex flex-col items-start p-0">
        {/* Section Pill Label */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-[#d4af37]/50 mb-2.5 shadow-lg">
          <Wand2 className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-[#d4af37] uppercase font-semibold drop-shadow-md">
            03 — THE MAKEUP
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-normal text-[#faf7f2] leading-[1.1] mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          Perfected in <span className="italic text-[#fceec5]">Every Detail</span>
        </h2>

        <p className="font-sans text-xs sm:text-sm text-[#faf7f2] leading-relaxed font-light mb-3 max-w-md drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          Weightless HD airbrush complexion, cheekbone sculpting, and kohled smokey eyes harmonize into timeless bridal radiance.
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-sans font-medium text-[#fceec5] bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-[#d4af37]/40 shadow-md">
            HD Glass Skin
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-sans font-medium text-[#fceec5] bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-[#d4af37]/40 shadow-md">
            Kohl Smokey Eyes
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-sans font-medium text-[#fceec5] bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-[#d4af37]/40 shadow-md">
            24H Glow
          </span>
        </div>
      </div>
    </section>
  );
};
