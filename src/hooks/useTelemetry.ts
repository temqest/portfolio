"use client";

import { useState, useEffect } from "react";

export interface TelemetryMetrics {
  lcp: number;
  cls: number;
  pageWeightKb: number;
  dotsCount: number;
  domElements: number;
  fps: number;
}

export function useTelemetry(activeDots: number = 41135) {
  const [metrics, setMetrics] = useState<TelemetryMetrics>({
    lcp: 0.44,
    cls: 0.004,
    pageWeightKb: 724,
    dotsCount: activeDots,
    domElements: 1104,
    fps: 60,
  });

  useEffect(() => {
    let lcpObserver: PerformanceObserver | null = null;
    let clsObserver: PerformanceObserver | null = null;
    let animId: number;

    // Use requestAnimationFrame to avoid synchronous setState inside effect body
    requestAnimationFrame(() => {
      const count = document.querySelectorAll("*").length;
      let totalBytes = 0;
      try {
        const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
        for (const res of resources) {
          if (res.transferSize) {
            totalBytes += res.transferSize;
          } else if (res.encodedBodySize) {
            totalBytes += res.encodedBodySize;
          }
        }
      } catch {
        // fallback
      }

      setMetrics((prev) => ({
        ...prev,
        domElements: count || 1104,
        pageWeightKb: totalBytes > 0 ? Math.max(Math.round(totalBytes / 1024), 240) : prev.pageWeightKb,
      }));
    });

    try {
      if (typeof PerformanceObserver !== "undefined") {
        lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            const sec = parseFloat((lastEntry.startTime / 1000).toFixed(2));
            setMetrics((prev) => ({ ...prev, lcp: sec }));
          }
        });
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

        let clsValue = 0;
        clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as { hadRecentInput?: boolean }).hadRecentInput) {
              clsValue += (entry as { value?: number }).value || 0;
            }
          }
          setMetrics((prev) => ({
            ...prev,
            cls: parseFloat(clsValue.toFixed(3)) || 0.004,
          }));
        });
        clsObserver.observe({ type: "layout-shift", buffered: true });
      }
    } catch {
      // observer not supported
    }

    let frameCount = 0;
    let lastTime = performance.now();

    const calcFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / (now - lastTime));
        setMetrics((prev) => ({ ...prev, fps: currentFps }));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);

    return () => {
      cancelAnimationFrame(animId);
      lcpObserver?.disconnect();
      clsObserver?.disconnect();
    };
  }, [activeDots]);

  return metrics;
}
