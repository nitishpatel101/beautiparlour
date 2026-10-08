"use client";

import React from "react";
import { Crown, Sparkles } from "lucide-react";

interface JewellerySceneProps {
  opacity: number;
  stageProgress: number; // 0 to 1 progress within this stage
}

const TRANSFORMATION_MILESTONES = [
  { threshold: 0.0, label: "Initial Grace", detail: "Prepared natural canvas" },
  { threshold: 0.3, label: "Couture Hair Weaving", detail: "Voluminous cascading waves" },
  { threshold: 0.5, label: "Kundan Earrings", detail: "Handcrafted temple jhumkas" },
  { threshold: 0.7, label: "Sacred Maang Tikka", detail: "Gold centerpiece placed" },
  { threshold: 0.85, label: "Crimson Bridal Drape", detail: "Royal zari silk borders" },
  { threshold: 1.0, label: "Royal Metamorphosis", detail: "The sovereign bride complete" },
];

export const JewelleryScene: React.FC<JewellerySceneProps> = ({
  opacity,
  stageProgress,
}) => {
  let currentMilestone = TRANSFORMATION_MILESTONES[0];
  for (let i = TRANSFORMATION_MILESTONES.length - 1; i >= 0; i--) {
    if (stageProgress >= TRANSFORMATION_MILESTONES[i].threshold) {
      currentMilestone = TRANSFORMATION_MILESTONES[i];
      break;
    }
  }

  return (
    <section
      className="relative w-full h-screen flex flex-col justify-start pt-20 sm:pt-28 px-5 sm:px-12 md:px-16 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-sm sm:max-w-lg w-full flex flex-col items-start p-0">
        {/* Section Pill Label */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-[#d4af37]/50 mb-2.5 shadow-lg">
          <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-[#d4af37] uppercase font-semibold drop-shadow-md">
            04 — THE BRIDE
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-normal text-[#faf7f2] leading-[1.1] mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          Adorned in <span className="italic text-[#fceec5]">Gold</span>
        </h2>

        {/* Copy */}
        <p className="font-sans text-xs sm:text-sm text-[#faf7f2] leading-relaxed font-light mb-3 max-w-md drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          Handcrafted antique gold jewellery, regal jhumkas, and the sacred maang tikka are meticulously placed.
        </p>

        {/* Dynamic Milestone Card */}
        <div className="w-full max-w-xs sm:max-w-sm pt-1">
          <div className="flex items-center gap-2.5 bg-black/50 backdrop-blur-sm border border-[#d4af37]/40 px-3.5 py-2 rounded-2xl shadow-xl">
            <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0" />
            <div className="flex flex-col">
              <span className="font-sans font-semibold text-xs text-[#faf7f2] drop-shadow-sm">
                {currentMilestone.label}
              </span>
              <span className="font-serif-luxury italic text-[10px] sm:text-xs text-[#fceec5] drop-shadow-sm">
                {currentMilestone.detail}
              </span>
            </div>
            <span className="ml-auto font-mono text-[10px] font-bold text-[#d4af37]">
              {Math.round(stageProgress * 100)}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden shadow-sm">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#fceec5] transition-all duration-200"
              style={{ width: `${Math.min(100, Math.round(stageProgress * 100))}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
