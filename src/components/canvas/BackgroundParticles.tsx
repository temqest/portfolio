"use client";

import { useEffect, useRef } from "react";

export function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Generate 1200 stippled background star particles
    const count = 1200;
    const particles = new Float32Array(count * 4); // x, y, speed, alpha
    for (let i = 0; i < count; i++) {
      particles[i * 4 + 0] = Math.random() * width;
      particles[i * 4 + 1] = Math.random() * height;
      particles[i * 4 + 2] = 0.15 + Math.random() * 0.35;
      particles[i * 4 + 3] = 0.1 + Math.random() * 0.45;
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const x = particles[i * 4 + 0];
        let y = particles[i * 4 + 1];
        const speed = particles[i * 4 + 2];
        const alpha = particles[i * 4 + 3];

        // Slight drift downwards
        y += speed;
        if (y > height) y = 0;
        particles[i * 4 + 1] = y;

        // Subtle mouse parallax
        const dx = (mouseX - width / 2) * 0.015 * speed;
        const dy = (mouseY - height / 2) * 0.015 * speed;

        ctx.fillStyle = i % 12 === 0 ? "rgba(91, 95, 224, 0.6)" : `rgba(238, 236, 232, ${alpha * 0.45})`;
        ctx.fillRect(x + dx, y + dy, 1.2, 1.2);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full select-none"
      aria-hidden="true"
    />
  );
}
