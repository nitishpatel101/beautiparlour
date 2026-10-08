"use client";

import React from "react";
import { Sparkles, MessageSquare } from "lucide-react";

interface FinalSceneProps {
  onOpenBooking: () => void;
  opacity: number;
}

export const FinalScene: React.FC<FinalSceneProps> = ({
  onOpenBooking,
  opacity,
}) => {
  return (
    <section
      className="relative w-full h-screen flex flex-col justify-end items-center pb-20 sm:pb-24 px-5 sm:px-10 pointer-events-none transition-opacity duration-300 text-center"
      style={{ opacity }}
    >
      <div className="max-w-md sm:max-w-xl w-full flex flex-col items-center p-0">
        {/* Section Label */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-[#d4af37]/50 mb-2 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-[#d4af37] uppercase font-semibold drop-shadow-md">
            05 — THE FINAL REVEAL
          </span>
        </div>

        {/* Title */}
        <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-normal text-[#faf7f2] leading-[1] mb-1.5 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          Nitish <span className="italic font-light text-[#fceec5]">Salon</span>
        </h2>

        {/* Subtitle */}
        <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          BRIDAL &amp; BEAUTY ATELIER
        </p>

        {/* Supporting Line */}
        <p className="font-serif-luxury text-sm sm:text-xl text-[#fceec5] italic font-light leading-snug mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          &ldquo;Your transformation starts here.&rdquo;
        </p>

        {/* CTA Buttons */}
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-3 w-full">
          <button
            onClick={onOpenBooking}
            id="final-book-now-btn"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full overflow-hidden bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#aa8228] text-black font-sans font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 shadow-[0_4px_25px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.4)] active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>BOOK NOW</span>
          </button>

          <a
            href="https://wa.me/919876543210?text=Hello%20Nitish%20Salon,%20I%20would%20like%20to%20inquire%20about%20bridal%20appointments."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black/60 hover:bg-[#25D366]/20 backdrop-blur-sm border border-white/30 hover:border-[#25D366]/60 text-white font-sans text-xs tracking-wider uppercase transition-colors shadow-lg"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>WHATSAPP</span>
          </a>
        </div>

        <div className="mt-4 flex items-center gap-3 text-[10px] font-sans text-white/80 tracking-wider drop-shadow-md">
          <span>★ 4.9 Rating</span>
          <span>·</span>
          <span>1,200+ Couture Brides</span>
        </div>
      </div>
    </section>
  );
};
