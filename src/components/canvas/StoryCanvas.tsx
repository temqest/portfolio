"use client";

import { useEffect, useRef, useState } from "react";
import { STORY_CHAPTERS } from "@/lib/constants";

interface StoryCanvasProps {
  currentChapter: number;
  onChapterSelect?: (index: number) => void;
}

export function StoryCanvas({ currentChapter }: StoryCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const rotRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const PARTICLE_COUNT = 3600;
    const currentPositions = new Float32Array(PARTICLE_COUNT * 3);
    const targetPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    function generateTargetShape(chapterIndex: number) {
      const cx = 0;
      const cy = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let tx = 0, ty = 0, tz = 0;
        let r = 0.9, g = 0.9, b = 0.95;

        switch (chapterIndex) {
          case 0: {
            const angle = (i / PARTICLE_COUNT) * Math.PI * 14;
            const dist = Math.pow(Math.random(), 0.7) * 380 + 30;
            tx = cx + Math.cos(angle) * dist;
            ty = cy + Math.sin(angle) * dist * 0.35 + (Math.random() - 0.5) * 35;
            tz = (Math.random() - 0.5) * 120;
            if (i % 5 === 0) {
              r = 0.36; g = 0.37; b = 0.88;
            }
            break;
          }
          case 1: {
            const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
            const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
            const rad = 230;
            tx = rad * Math.cos(theta) * Math.sin(phi);
            ty = rad * Math.sin(theta) * Math.sin(phi);
            tz = rad * Math.cos(phi);
            if (i < 120) {
              tx = 130 + (Math.random() - 0.5) * 20;
              ty = 110 + (Math.random() - 0.5) * 20;
              tz = 80 + Math.random() * 40;
              r = 0.36; g = 0.37; b = 0.88;
            }
            break;
          }
          case 2: {
            const cols = 20;
            const rows = Math.floor(PARTICLE_COUNT / cols);
            const col = i % cols;
            const row = Math.floor(i / cols);
            tx = (col - cols / 2) * 24;
            ty = (row - rows / 2) * 6;
            tz = Math.sin((col / cols) * Math.PI * 2) * 160;
            if ((col > 4 && col < 9) || (col > 11 && col < 16)) {
              r = 0.36; g = 0.37; b = 0.88;
            }
            break;
          }
          case 3: {
            const cluster = i % 4;
            const clusterCenters = [
              [-240, -100, 0],
              [-80, 80, 50],
              [80, -90, -40],
              [240, 90, 20],
            ];
            const [baseX, baseY, baseZ] = clusterCenters[cluster];
            const spread = 75;
            tx = baseX + (Math.random() - 0.5) * spread;
            ty = baseY + (Math.random() - 0.5) * spread;
            tz = baseZ + (Math.random() - 0.5) * spread;
            r = cluster === 1 ? 0.36 : 0.85;
            g = cluster === 1 ? 0.37 : 0.85;
            b = cluster === 1 ? 0.88 : 0.95;
            break;
          }
          case 4: {
            const ring = Math.floor((i / PARTICLE_COUNT) * 16);
            const angle = (i % 225) * ((Math.PI * 2) / 225);
            const radius = 60 + ring * 18;
            tx = Math.cos(angle) * radius;
            ty = Math.sin(angle) * radius;
            tz = (ring - 8) * 45;
            if (ring % 3 === 0) {
              r = 0.36; g = 0.37; b = 0.88;
            }
            break;
          }
          case 5: {
            if (i < 400) {
              const p = Math.acos(-1 + (2 * i) / 400);
              const th = Math.sqrt(400 * Math.PI) * p;
              tx = 50 * Math.cos(th) * Math.sin(p);
              ty = 50 * Math.sin(th) * Math.sin(p);
              tz = 50 * Math.cos(p);
              r = 1.0; g = 0.9; b = 0.4;
            } else {
              const orbitIdx = (i - 400) % 4;
              const orbitRadii = [140, 220, 310, 400];
              const rad = orbitRadii[orbitIdx];
              const angle = ((i - 400) / (PARTICLE_COUNT - 400)) * Math.PI * 12;
              tx = Math.cos(angle) * rad;
              ty = Math.sin(angle) * rad * 0.4;
              tz = Math.sin(angle) * 70;
              if (orbitIdx === 0) { r = 0.36; g = 0.37; b = 0.88; }
            }
            break;
          }
          case 6: {
            const badge = i % 3;
            const badgeOffsets = [-240, 0, 240];
            const u = (Math.random() - 0.5) * 150;
            const v = (Math.random() - 0.5) * 150;
            tx = badgeOffsets[badge] + u;
            ty = v;
            tz = (badge - 1) * 60;
            if (badge === 0) { r = 0.36; g = 0.37; b = 0.88; }
            break;
          }
          case 7: {
            const u = (i / PARTICLE_COUNT) * 600 - 300;
            tx = u;
            ty = Math.sin(u * 0.04) * 45 + (Math.random() - 0.5) * 30;
            tz = Math.cos(u * 0.04) * 60;
            r = 0.36; g = 0.37; b = 0.88;
            break;
          }
          case 8: {
            const p = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
            const th = Math.sqrt(PARTICLE_COUNT * Math.PI) * p;
            tx = 180 * Math.cos(th) * Math.sin(p) * 0.85;
            ty = 220 * Math.sin(th) * Math.sin(p) - 30;
            tz = 140 * Math.cos(p);
            r = 0.95; g = 0.92; b = 0.88;
            break;
          }
          default: {
            const angle = Math.random() * Math.PI * 2;
            const dist = 280 + Math.random() * 320;
            tx = Math.cos(angle) * dist;
            ty = Math.sin(angle) * dist;
            tz = (Math.random() - 0.5) * 350;
            if (Math.random() > 0.5) {
              r = 0.36; g = 0.37; b = 0.88;
            }
            break;
          }
        }

        targetPositions[i * 3 + 0] = tx;
        targetPositions[i * 3 + 1] = ty;
        targetPositions[i * 3 + 2] = tz;
        colors[i * 3 + 0] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
      }
    }

    generateTargetShape(currentChapter);
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      currentPositions[i] = targetPositions[i];
    }

    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      rotRef.current.lastX = e.clientX;
      rotRef.current.lastY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - rotRef.current.lastX;
      const dy = e.clientY - rotRef.current.lastY;
      rotRef.current.x += dy * 0.005;
      rotRef.current.y += dx * 0.005;
      rotRef.current.lastX = e.clientX;
      rotRef.current.lastY = e.clientY;
    };
    const onMouseUp = () => setIsDragging(false);

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const render = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.4)";
      ctx.fillRect(0, 0, width, height);

      if (!isDragging) {
        rotRef.current.y += 0.003;
      }

      const cosY = Math.cos(rotRef.current.y);
      const sinY = Math.sin(rotRef.current.y);
      const cosX = Math.cos(rotRef.current.x);
      const sinX = Math.sin(rotRef.current.x);

      const fov = 420;
      const midX = width / 2;
      const midY = height / 2;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        currentPositions[i * 3 + 0] += (targetPositions[i * 3 + 0] - currentPositions[i * 3 + 0]) * 0.06;
        currentPositions[i * 3 + 1] += (targetPositions[i * 3 + 1] - currentPositions[i * 3 + 1]) * 0.06;
        currentPositions[i * 3 + 2] += (targetPositions[i * 3 + 2] - currentPositions[i * 3 + 2]) * 0.06;

        const x = currentPositions[i * 3 + 0];
        const y = currentPositions[i * 3 + 1];
        const z = currentPositions[i * 3 + 2];

        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const scale = fov / (fov + z2 + 350);
        if (scale > 0) {
          const projX = midX + x1 * scale;
          const projY = midY + y2 * scale;
          const size = Math.max(0.6, scale * 2.2);

          const r = Math.round(colors[i * 3 + 0] * 255);
          const g = Math.round(colors[i * 3 + 1] * 255);
          const b = Math.round(colors[i * 3 + 2] * 255);
          const alpha = Math.min(1, Math.max(0.15, scale * 0.95));

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fillRect(projX, projY, size, size);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [currentChapter, isDragging]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none block"
      />

      <div className="absolute top-1/2 left-8 md:left-24 -translate-y-1/2 max-w-lg z-20 pointer-events-none select-none">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[#5b5fe0] font-mono text-sm tracking-widest font-semibold">
            {STORY_CHAPTERS[currentChapter]?.chapter}
          </span>
          <span className="text-white/40 uppercase text-xs tracking-widest font-mono">
            {STORY_CHAPTERS[currentChapter]?.title}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
          {STORY_CHAPTERS[currentChapter]?.lead}
        </h1>
        <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
          {STORY_CHAPTERS[currentChapter]?.body}
        </p>
        <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 text-xs font-mono text-white/50 tracking-widest uppercase bg-black/40 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5b5fe0] animate-pulse" />
          {STORY_CHAPTERS[currentChapter]?.hint}
        </div>
      </div>
    </div>
  );
}
