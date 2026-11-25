"use client";

import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Preserve native hardware-accelerated momentum scrolling on mobile touchscreens
    if (isCoarsePointer || prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let animId = 0;
    function raf(time: number) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }

    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const stopScroll = useCallback(() => {
    lenisRef.current?.stop();
    document.documentElement.classList.add("lenis-stopped");
  }, []);

  const startScroll = useCallback(() => {
    lenisRef.current?.start();
    document.documentElement.classList.remove("lenis-stopped");
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement, offset: number = 0) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset });
      return;
    }

    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return { stopScroll, startScroll, scrollTo };
}
