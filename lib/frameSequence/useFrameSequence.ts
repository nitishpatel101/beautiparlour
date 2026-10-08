"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface FrameSequenceConfig {
  totalFrames: number;
  framePathPattern: (index: number) => string;
}

export function useFrameSequence({
  totalFrames,
  framePathPattern,
}: FrameSequenceConfig) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingQueueRef = useRef<Set<number>>(new Set());
  const currentRenderedFrameRef = useRef<number>(-1);
  const targetFrameRef = useRef<number>(0);
  const isRunningRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState<boolean>(false);

  // Helper to load a single frame
  const loadFrame = useCallback(
    (index: number): Promise<HTMLImageElement> => {
      const cache = imagesCacheRef.current;
      if (cache.has(index)) {
        return Promise.resolve(cache.get(index)!);
      }

      if (loadingQueueRef.current.has(index)) {
        return new Promise((resolve) => {
          const check = setInterval(() => {
            if (cache.has(index)) {
              clearInterval(check);
              resolve(cache.get(index)!);
            }
          }, 40);
        });
      }

      loadingQueueRef.current.add(index);
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = framePathPattern(index);
        img.onload = () => {
          cache.set(index, img);
          loadingQueueRef.current.delete(index);
          setLoadedCount((prev) => prev + 1);
          if (index === 0) {
            setIsFirstFrameLoaded(true);
          }
          resolve(img);
        };
        img.onerror = () => {
          loadingQueueRef.current.delete(index);
          reject(new Error(`Failed to load frame ${index}`));
        };
      });
    },
    [framePathPattern]
  );

  // Progressive batch loading
  useEffect(() => {
    let isCancelled = false;

    async function startProgressiveLoad() {
      // 1. Load frame 0 immediately
      try {
        await loadFrame(0);
      } catch (e) {
        console.error("Frame 0 failed to load", e);
      }

      if (isCancelled) return;

      // 2. Load the first 30 frames immediately for instant smooth start
      const initialBatch = Array.from({ length: Math.min(30, totalFrames) }, (_, i) => i);
      await Promise.allSettled(initialBatch.map((i) => loadFrame(i)));

      if (isCancelled) return;

      // 3. Fast scrub pass - every 3rd frame across the whole sequence
      const scrubPass = [];
      for (let i = 0; i < totalFrames; i += 3) {
        if (!imagesCacheRef.current.has(i)) {
          scrubPass.push(i);
        }
      }
      for (let i = 0; i < scrubPass.length; i += 8) {
        if (isCancelled) return;
        const chunk = scrubPass.slice(i, i + 8);
        await Promise.allSettled(chunk.map((idx) => loadFrame(idx)));
      }

      if (isCancelled) return;

      // 4. Fill in all remaining frames smoothly
      const remaining: number[] = [];
      for (let i = 0; i < totalFrames; i++) {
        if (!imagesCacheRef.current.has(i)) {
          remaining.push(i);
        }
      }

      for (let i = 0; i < remaining.length; i += 8) {
        if (isCancelled) return;
        const chunk = remaining.slice(i, i + 8);
        await Promise.allSettled(chunk.map((idx) => loadFrame(idx)));
      }
    }

    startProgressiveLoad();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, loadFrame]);

  // Canvas drawing function with "cover" fit
  const drawFrameToCanvas = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Find best available frame if exact frame is still loading
      const cache = imagesCacheRef.current;
      let img = cache.get(index);

      if (!img) {
        // Find nearest cached frame
        let minDiff = Infinity;
        let nearestIdx = -1;
        for (const cachedIdx of cache.keys()) {
          const diff = Math.abs(cachedIdx - index);
          if (diff < minDiff) {
            minDiff = diff;
            nearestIdx = cachedIdx;
          }
        }
        if (nearestIdx !== -1) {
          img = cache.get(nearestIdx);
        }
      }

      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      // Clear canvas
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, cw, ch);

      const canvasRatio = cw / ch;
      const imageRatio = iw / ih;

      if (canvasRatio < 0.9) {
        // MOBILE PORTRAIT SCREENS:
        // 1. Draw ambient blurred background to fill the vertical canvas
        const bgScale = Math.max(cw / iw, ch / ih);
        const bgW = iw * bgScale;
        const bgH = ih * bgScale;
        const bgX = (cw - bgW) / 2;
        const bgY = (ch - bgH) / 2;

        ctx.save();
        ctx.filter = "blur(18px) brightness(0.35)";
        ctx.drawImage(img, bgX, bgY, bgW, bgH);
        ctx.restore();

        // 2. Draw the full sharp 16:9 action frame centered without cropping any hair wash, makeup, or bride details!
        const fitW = cw;
        const fitH = cw / imageRatio;
        const fitY = (ch - fitH) / 2;

        ctx.drawImage(img, 0, fitY, fitW, fitH);

        // 3. Subtle edge softening between main video and ambient background
        const topGrad = ctx.createLinearGradient(0, fitY, 0, fitY + 16);
        topGrad.addColorStop(0, "rgba(0,0,0,0.6)");
        topGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, fitY, fitW, 16);

        const bottomGrad = ctx.createLinearGradient(0, fitY + fitH - 16, 0, fitY + fitH);
        bottomGrad.addColorStop(0, "rgba(0,0,0,0)");
        bottomGrad.addColorStop(1, "rgba(0,0,0,0.6)");
        ctx.fillStyle = bottomGrad;
        ctx.fillRect(0, fitY + fitH - 16, fitW, 16);
      } else {
        // DESKTOP & LANDSCAPE: Full-bleed cover
        let drawWidth = cw;
        let drawHeight = ch;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imageRatio) {
          drawWidth = cw;
          drawHeight = cw / imageRatio;
          offsetY = (ch - drawHeight) / 2;
        } else {
          drawHeight = ch;
          drawWidth = ch * imageRatio;
          offsetX = (cw - drawWidth) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      currentRenderedFrameRef.current = index;
    },
    []
  );

  // Resize canvas to match display window & DPR
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      if (currentRenderedFrameRef.current >= 0) {
        drawFrameToCanvas(currentRenderedFrameRef.current);
      }
    }
  }, [drawFrameToCanvas]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [handleResize]);

  // Render loop using requestAnimationFrame for buttery-smooth scrubbing
  const setTargetFrame = useCallback(
    (targetIndex: number) => {
      const clamped = Math.max(0, Math.min(totalFrames - 1, Math.round(targetIndex)));
      targetFrameRef.current = clamped;

      if (!isRunningRef.current) {
        isRunningRef.current = true;
        const renderLoop = () => {
          const current = currentRenderedFrameRef.current;
          const target = targetFrameRef.current;

          if (current !== target) {
            // Direct responsive step for buttery responsiveness
            const diff = target - current;
            const step = Math.abs(diff) <= 2 ? diff : Math.round(diff * 0.65);
            const nextFrame = current + step;

            drawFrameToCanvas(nextFrame);
          }

          if (currentRenderedFrameRef.current === targetFrameRef.current) {
            isRunningRef.current = false;
            rafIdRef.current = null;
          } else {
            rafIdRef.current = requestAnimationFrame(renderLoop);
          }
        };

        rafIdRef.current = requestAnimationFrame(renderLoop);
      }
    },
    [totalFrames, drawFrameToCanvas]
  );

  // Initial draw when frame 0 is ready
  useEffect(() => {
    if (isFirstFrameLoaded && currentRenderedFrameRef.current === -1) {
      handleResize();
      drawFrameToCanvas(0);
    }
  }, [isFirstFrameLoaded, handleResize, drawFrameToCanvas]);

  return {
    canvasRef,
    setTargetFrame,
    loadedCount,
    totalFrames,
    isFirstFrameLoaded,
    loadingPercentage: Math.min(100, Math.round((loadedCount / totalFrames) * 100)),
  };
}
