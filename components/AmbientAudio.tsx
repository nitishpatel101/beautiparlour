"use client";

import { useEffect, useRef } from "react";

interface AmbientAudioProps {
  isPlaying: boolean;
}

export const AmbientAudio: React.FC<AmbientAudioProps> = ({ isPlaying }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    if (isPlaying) {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        // F frequencies for serene, royal Indian luxury ambient chord (F, C, A, C)
        const chordFrequencies = [174.61, 261.63, 349.23, 440.0, 523.25];
        const oscs: OscillatorNode[] = [];

        chordFrequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
          const oscGain = ctx.createGain();

          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle slow vibrato for warmth
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime);
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(osc.frequency);
          lfo.start();

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(800 + idx * 200, ctx.currentTime);

          oscGain.gain.setValueAtTime(0.06 / chordFrequencies.length, ctx.currentTime);

          osc.connect(filter);
          filter.connect(oscGain);

          if (panner) {
            panner.pan.setValueAtTime((idx - 2) * 0.3, ctx.currentTime);
            oscGain.connect(panner);
            panner.connect(masterGain);
          } else {
            oscGain.connect(masterGain);
          }

          osc.start();
          oscs.push(osc);
        });

        oscillatorsRef.current = oscs;
      }

      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.cancelScheduledValues(
          audioCtxRef.current.currentTime
        );
        masterGainRef.current.gain.linearRampToValueAtTime(
          0.12,
          audioCtxRef.current.currentTime + 2.5
        );
      }
    } else {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.cancelScheduledValues(
          audioCtxRef.current.currentTime
        );
        masterGainRef.current.gain.linearRampToValueAtTime(
          0.001,
          audioCtxRef.current.currentTime + 1.5
        );
      }
    }
  }, [isPlaying]);

  return null;
};
