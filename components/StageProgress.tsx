"use client";

import React from "react";

interface StageProgressProps {
  currentStage: number; // 1 to 5
  progress: number; // 0 to 1
  onSelectStage: (stage: number) => void;
}

const STAGES = [
  { id: 1, label: "01", name: "THE ARRIVAL", desc: "Girl Entry" },
  { id: 2, label: "02", name: "HAIR WASH", desc: "Refresh & Restore" },
  { id: 3, label: "03", name: "THE MAKEUP", desc: "Artistry & Glow" },
  { id: 4, label: "04", name: "THE BRIDE", desc: "Adorned in Gold" },
  { id: 5, label: "05", name: "FINAL LOOK", desc: "Metamorphosis" },
];

export const StageProgress: React.FC<StageProgressProps> = ({
  currentStage,
  progress,
  onSelectStage,
}) => {
  return (
    <>
      {/* Desktop Vertical Timeline Indicator */}
      <aside className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-6 pointer-events-auto">
        <div className="relative flex flex-col gap-5 py-2">
          <div className="absolute right-[5px] top-0 bottom-0 w-[1px] bg-white/10">
            <div
              className="w-full bg-[#d4af37] transition-all duration-300 origin-top"
              style={{ height: `${Math.min(100, Math.max(0, progress * 100))}%` }}
            />
          </div>

          {STAGES.map((s) => {
            const isActive = currentStage === s.id;
            const isPassed = currentStage > s.id;

            return (
              <button
                key={s.id}
                onClick={() => onSelectStage(s.id)}
                className="group flex items-center gap-3 text-right transition-all duration-300 outline-none"
                title={`${s.label} — ${s.name}`}
              >
                <div
                  className={`transition-all duration-300 flex flex-col items-end ${
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-40 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                  }`}
                >
                  <span
                    className={`text-[10px] tracking-[0.2em] font-sans font-medium uppercase transition-colors ${
                      isActive ? "text-[#d4af37]" : "text-white/60 group-hover:text-white"
                    }`}
                  >
                    {s.label} — {s.name}
                  </span>
                  <span
                    className={`text-[9px] font-serif-luxury tracking-wider ${
                      isActive ? "text-[#fceec5]" : "text-white/40"
                    }`}
                  >
                    {s.desc}
                  </span>
                </div>

                <div className="relative flex items-center justify-center w-3 h-3 z-10">
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-2.5 h-2.5 bg-[#d4af37] ring-4 ring-[#d4af37]/20"
                        : isPassed
                        ? "w-1.5 h-1.5 bg-[#d4af37]/60"
                        : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/60"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-[10px] tracking-widest text-[#d4af37]/70 font-mono mt-2 pr-1">
          {Math.round(progress * 100).toString().padStart(2, "0")}%
        </div>
      </aside>

      {/* Mobile Top Thin Progress Bar & Stage Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden pointer-events-none">
        <div className="w-full h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#d4af37] to-[#fceec5] transition-all duration-200"
            style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          />
        </div>
      </div>
    </>
  );
};
