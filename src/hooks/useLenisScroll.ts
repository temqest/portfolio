"use client";

import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

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
    lenisRef.current?.scrollTo(target, { offset });
  }, []);

  return { stopScroll, startScroll, scrollTo };
}
