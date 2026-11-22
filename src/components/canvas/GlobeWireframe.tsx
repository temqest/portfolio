"use client";

import { useEffect, useRef } from "react";

export function GlobeWireframe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotation = 0;
    const radius = 38;
    const cx = 48;
    const cy = 48;

    // Cape Town coordinates: ~33.92° S, 18.42° E
    const capeTownLat = (-33.92 * Math.PI) / 180;
    const capeTownLon = (18.42 * Math.PI) / 180;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotation += 0.008;

      // Draw latitude lines (parallels)
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (lat * Math.PI) / 180;
        const r = radius * Math.cos(phi);
        const y = cy + radius * Math.sin(phi);

        ctx.beginPath();
        ctx.strokeStyle = "rgba(238, 236, 232, 0.12)";
        ctx.lineWidth = 1;
        ctx.ellipse(cx, y, r, r * 0.28, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw longitude lines (meridians)
      for (let lon = 0; lon < 180; lon += 45) {
        const phi = (lon * Math.PI) / 180 + rotation;
        const width = radius * Math.cos(phi);

        ctx.beginPath();
        ctx.strokeStyle = "rgba(238, 236, 232, 0.16)";
        ctx.lineWidth = 1;
        ctx.ellipse(cx, cy, Math.abs(width), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Outer boundary sphere
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(238, 236, 232, 0.28)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Cape Town beacon point
      const currentLon = capeTownLon + rotation;
      const x = cx + radius * Math.cos(capeTownLat) * Math.sin(currentLon);
      const y = cy - radius * Math.sin(capeTownLat);
      const isVisible = Math.cos(currentLon) >= -0.2;

      if (isVisible) {
        // Vertical projection line
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - 18);
        ctx.strokeStyle = "#5b5fe0";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Pin top beacon
        ctx.beginPath();
        ctx.arc(x, y - 18, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#5b5fe0";
        ctx.fill();

        // Ground anchor pulse
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
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
      width={96}
      height={96}
      className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 select-none pointer-events-none"
      aria-label="Cape Town 3D Wireframe Telemetric Globe"
    />
  );
}
