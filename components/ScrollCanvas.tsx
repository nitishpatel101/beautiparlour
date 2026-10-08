"use client";

import React, { useImperativeHandle, forwardRef } from "react";
import { useFrameSequence } from "@/lib/frameSequence/useFrameSequence";

export interface ScrollCanvasHandle {
  updateProgress: (progress: number) => void;
}

interface ScrollCanvasProps {
  totalFrames?: number;
}

export const ScrollCanvas = forwardRef<ScrollCanvasHandle, ScrollCanvasProps>(
  ({ totalFrames = 240 }, ref) => {
    const {
      canvasRef,
      setTargetFrame,
      isFirstFrameLoaded,
      loadingPercentage,
    } = useFrameSequence({
      totalFrames,
      framePathPattern: (index) =>
        `/frames/frame_${index.toString().padStart(3, "0")}.webp`,
    });

    useImperativeHandle(ref, () => ({
      updateProgress: (progress: number) => {
        const clamped = Math.max(0, Math.min(1, progress));
        const frameIndex = Math.floor(clamped * (totalFrames - 1));
        setTargetFrame(frameIndex);
      },
    }));

    return (
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-black">
        {/* Canvas for cinematic frame sequence - 100% natural, crisp, zero green tint */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isFirstFrameLoaded ? 1 : 0 }}
        />

        {/* Fallback poster until canvas is initialized */}
        {!isFirstFrameLoaded && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300"
            style={{ backgroundImage: "url('/images/scene1_entry.webp')" }}
          />
        )}

        {/* Minimal Preload Status Indicator */}
        {loadingPercentage < 100 && (
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex items-center gap-2 pointer-events-none bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#d4af37]/30">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
            <span className="text-[9px] sm:text-[10px] tracking-widest text-[#d4af37] uppercase font-sans font-medium">
              Loading {loadingPercentage}%
            </span>
          </div>
        )}
      </div>
    );
  }
);

ScrollCanvas.displayName = "ScrollCanvas";
