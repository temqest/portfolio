'use client';

import React, { useEffect, useRef } from 'react';

interface WaveMeshCanvasProps {
  className?: string;
  width?: number;
  height?: number;
}

export function WaveMeshCanvas({
  className = '',
  width = 440,
  height = 360,
}: WaveMeshCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const COLS = 32;
    const ROWS = 32;
    const SPACING_X = 13;
    const SPACING_Y = 13;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.024;

      const cx = canvas.width * 0.52;
      const cy = canvas.height * 0.5;

      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const x0 = (i - COLS / 2) * SPACING_X;
          const y0 = (j - ROWS / 2) * SPACING_Y;

          // Undulating dual-harmonic sine-cosine field
          const distFromCenter = Math.sqrt(x0 * x0 + y0 * y0) * 0.015;
          const z0 =
            Math.sin(i * 0.22 + t) * Math.cos(j * 0.22 + t * 0.8) * 24 +
            Math.sin(distFromCenter - t * 1.2) * 12;

          // Isometric 3D Projection with slight tilt
          const isoX = cx + (x0 - y0) * 0.72;
          const isoY = cy + (x0 + y0) * 0.36 - z0;

          // Depth-based attenuation and point sizing
          const depthNorm = Math.max(0, Math.min(1, (z0 + 36) / 72));
          const alpha = 0.12 + depthNorm * 0.76;
          const radius = depthNorm > 0.65 ? 1.5 : 1.0;

          ctx.fillStyle = `rgba(234, 242, 255, ${alpha.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(isoX, isoY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`pointer-events-none select-none max-w-full ${className}`}
    />
  );
}
