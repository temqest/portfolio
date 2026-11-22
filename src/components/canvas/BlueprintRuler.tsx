"use client";

import { useEffect, useRef } from "react";

export function BlueprintRuler() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      canvas.width = 24 * (window.devicePixelRatio || 1);
      canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      const height = window.innerHeight;
      ctx.clearRect(0, 0, 24, height);

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      const beadY = scrollPercent * (height - 30) + 15;

      // Draw millimeter ticks
      const step = 6;
      ctx.strokeStyle = "rgba(238, 236, 232, 0.18)";
      ctx.lineWidth = 1;

      for (let y = 0; y < height; y += step) {
        const isMajor = y % 30 === 0;
        const isMid = y % 15 === 0;
        const tickWidth = isMajor ? 12 : isMid ? 8 : 4;

        ctx.beginPath();
        ctx.moveTo(24 - tickWidth, y);
        ctx.lineTo(24, y);
        ctx.stroke();
      }

      // Draw scroll position bead
      ctx.beginPath();
      ctx.arc(14, beadY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#5b5fe0";
      ctx.fill();

      // Outer glow around bead
      ctx.beginPath();
      ctx.arc(14, beadY, 6, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(91, 95, 224, 0.4)";
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="fixed right-0 top-0 bottom-0 w-6 z-30 pointer-events-none select-none hidden md:block"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}
