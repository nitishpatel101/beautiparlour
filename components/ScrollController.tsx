"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { ScrollCanvas, ScrollCanvasHandle } from "./ScrollCanvas";
import { Navigation } from "./Navigation";
import { StageProgress } from "./StageProgress";
import { HeroScene } from "./HeroScene";
import { HairWashScene } from "./HairWashScene";
import { MakeupScene } from "./MakeupScene";
import { JewelleryScene } from "./JewelleryScene";
import { FinalScene } from "./FinalScene";
import { BookNowModal } from "./BookNowModal";
import { AmbientAudio } from "./AmbientAudio";

export const ScrollController: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const canvasHandleRef = useRef<ScrollCanvasHandle | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [currentStage, setCurrentStage] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [stage4Progress, setStage4Progress] = useState<number>(0);

  // Scene Opacities
  const [opacities, setOpacities] = useState({
    stage1: 1,
    stage2: 0,
    stage3: 0,
    stage4: 0,
    stage5: 0,
  });

  // Modal and Audio State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Initialize GSAP, ScrollTrigger and Lenis
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 2. ScrollTrigger on the 500vh track
    const track = trackRef.current;
    if (!track) return;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // Update Canvas Frame
        if (canvasHandleRef.current) {
          canvasHandleRef.current.updateProgress(p);
        }

        // Calculate active stage (1 to 5)
        let active = 1;
        if (p < 0.20) active = 1;
        else if (p < 0.42) active = 2;
        else if (p < 0.64) active = 3;
        else if (p < 0.84) active = 4;
        else active = 5;
        setCurrentStage(active);

        // Stage 4 transformation progress (0 to 1)
        const s4Min = 0.62;
        const s4Max = 0.83;
        const s4Prog = Math.max(0, Math.min(1, (p - s4Min) / (s4Max - s4Min)));
        setStage4Progress(s4Prog);

        // Smooth Opacity Interpolation for Each Scene
        const calcOpacity = (
          currentP: number,
          fadeInStart: number,
          fadeInEnd: number,
          fadeOutStart: number,
          fadeOutEnd: number
        ) => {
          if (currentP < fadeInStart) return 0;
          if (currentP < fadeInEnd) {
            return (currentP - fadeInStart) / (fadeInEnd - fadeInStart);
          }
          if (currentP <= fadeOutStart) return 1;
          if (currentP < fadeOutEnd) {
            return 1 - (currentP - fadeOutStart) / (fadeOutEnd - fadeOutStart);
          }
          return 0;
        };

        // Opacity curves:
        const op1 = calcOpacity(p, 0.0, 0.0, 0.12, 0.20);
        const op2 = calcOpacity(p, 0.18, 0.23, 0.35, 0.42);
        const op3 = calcOpacity(p, 0.38, 0.44, 0.56, 0.64);
        const op4 = calcOpacity(p, 0.60, 0.65, 0.77, 0.84);
        const op5 = calcOpacity(p, 0.81, 0.87, 1.0, 1.0);

        setOpacities({
          stage1: op1,
          stage2: op2,
          stage3: op3,
          stage4: op4,
          stage5: op5,
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // Handler to jump to any stage from the timeline indicator
  const handleSelectStage = useCallback((stageId: number) => {
    const stageTargets: Record<number, number> = {
      1: 0.02,
      2: 0.26,
      3: 0.48,
      4: 0.70,
      5: 0.95,
    };

    const targetProgress = stageTargets[stageId] ?? 0;
    const track = trackRef.current;
    if (!track) return;

    const trackHeight = track.offsetHeight - window.innerHeight;
    const targetScrollY = targetProgress * trackHeight;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScrollY, { duration: 1.6 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black text-[#faf7f2]">
      {/* Ambient Audio Synthesizer */}
      <AmbientAudio isPlaying={isAudioPlaying} />

      {/* Global Fixed Navigation */}
      <Navigation
        onOpenBooking={() => setIsBookingOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={() => setIsAudioPlaying((prev) => !prev)}
      />

      {/* Fixed Canvas Rendering 240 WebP Frames (Untouched colors, no green tint) */}
      <ScrollCanvas ref={canvasHandleRef} totalFrames={240} />

      {/* Fixed Timeline Indicator */}
      <StageProgress
        currentStage={currentStage}
        progress={scrollProgress}
        onSelectStage={handleSelectStage}
      />

      {/* Fixed Overlays for the 5 Stages */}
      <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-center">
        {/* Stage 01: Girl Entry / Hero */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            visibility: opacities.stage1 > 0.01 ? "visible" : "hidden",
            pointerEvents: opacities.stage1 > 0.3 ? "auto" : "none",
          }}
        >
          <HeroScene
            opacity={opacities.stage1}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        </div>

        {/* Stage 02: Hair Wash */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            visibility: opacities.stage2 > 0.01 ? "visible" : "hidden",
            pointerEvents: opacities.stage2 > 0.3 ? "auto" : "none",
          }}
        >
          <HairWashScene opacity={opacities.stage2} />
        </div>

        {/* Stage 03: The Makeup */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            visibility: opacities.stage3 > 0.01 ? "visible" : "hidden",
            pointerEvents: opacities.stage3 > 0.3 ? "auto" : "none",
          }}
        >
          <MakeupScene opacity={opacities.stage3} />
        </div>

        {/* Stage 04: The Bride / Jewellery */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            visibility: opacities.stage4 > 0.01 ? "visible" : "hidden",
            pointerEvents: opacities.stage4 > 0.3 ? "auto" : "none",
          }}
        >
          <JewelleryScene
            opacity={opacities.stage4}
            stageProgress={stage4Progress}
          />
        </div>

        {/* Stage 05: Final Look Reveal */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            visibility: opacities.stage5 > 0.01 ? "visible" : "hidden",
            pointerEvents: opacities.stage5 > 0.3 ? "auto" : "none",
          }}
        >
          <FinalScene
            opacity={opacities.stage5}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        </div>
      </div>

      {/* 500vh Virtual Scroll Track driving the entire animation */}
      <div
        ref={trackRef}
        className="relative w-full h-[500vh] pointer-events-none"
        aria-hidden="true"
      />

      {/* Booking Reservation Modal */}
      <BookNowModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};
