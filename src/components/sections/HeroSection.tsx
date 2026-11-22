"use client";

import React, { useEffect, useState, useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { GlobeWireframe } from "@/components/canvas/GlobeWireframe";
import { PORTFOLIO_DATA } from "@/lib/constants";

interface HeroSectionProps {
  onStartProject?: () => void;
  onExploreWork?: () => void;
}

export function HeroSection({ onStartProject, onExploreWork }: HeroSectionProps) {
  const [capeTownTime, setCapeTownTime] = useState("14:08");
  const portraitCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const sast = new Date(utc + 3600000 * 2);
      const h = sast.getHours().toString().padStart(2, "0");
      const m = sast.getMinutes().toString().padStart(2, "0");
      setCapeTownTime(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = portraitCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const width = (canvas.width = 420);
    const height = (canvas.height = 540);

    const points: [number, number, number][] = [];
    for (let i = 0; i < 3400; i++) {
      const v = Math.random();
      let x = 0, y = 0;

      if (v < 0.28) {
        const theta = Math.random() * Math.PI * 2;
        const rad = Math.pow(Math.random(), 0.6) * 78;
        x = 210 + Math.cos(theta) * rad * 0.78;
        y = 145 + Math.sin(theta) * rad * 0.95;
      } else if (v < 0.38) {
        x = 210 + (Math.random() - 0.5) * 65;
        y = 215 + Math.random() * 45;
      } else if (v < 0.52) {
        const handSide = Math.random() > 0.5 ? 1 : -1;
        x = 205 + handSide * (Math.random() * 28);
        y = 190 + Math.random() * 110;
      } else {
        const rx = 185;
        x = 210 + (Math.random() - 0.5) * (rx * 2 * (y > 340 ? 1.1 : 0.85));
        y = 260 + Math.random() * 240;
      }

      points.push([x, y, Math.random() * 0.85 + 0.15]);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.012;

      for (let i = 0; i < points.length; i++) {
        const [bx, by, alpha] = points[i];
        const breath = Math.sin(t + by * 0.015) * 1.2;
        const shimmer = (Math.sin(t * 2 + bx) + 1) * 0.15;
        ctx.fillStyle = `rgba(238, 236, 232, ${Math.min(1, alpha + shimmer) * 0.65})`;
        ctx.fillRect(bx + breath, by, 1.2, 1.2);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-24 pt-28 pb-20 select-none overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-3 flex items-center gap-4 lg:flex-col lg:items-start space-y-2 order-2 lg:order-1">
          <GlobeWireframe />
          <div>
            <div className="text-white font-semibold text-sm sm:text-base tracking-tight">
              Cape Town
            </div>
            <div className="text-white/60 font-mono text-xs sm:text-sm">
              {capeTownTime}
            </div>
            <div className="text-white/40 font-mono text-[11px] mt-0.5">
              2 hours ahead of London
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center items-center relative order-1 lg:order-2 my-4 lg:my-0">
          <canvas
            ref={portraitCanvasRef}
            className="w-[280px] sm:w-[340px] md:w-[380px] h-[380px] sm:h-[460px] pointer-events-none"
            aria-label="Monochromatic 3D Stippled Portrait of Inacio Nakiti"
          />
        </div>

        <div className="lg:col-span-5 space-y-6 order-3">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40">
            <ArrowDownRight className="w-4 h-4 text-[#5b5fe0]" />
          </div>

          <h1
            className="font-bold tracking-tight text-white leading-[1.02]"
            style={{
              fontSize: "clamp(2.75rem, 5.5vw, 5.5rem)",
            }}
          >
            Stores you <br />
            never <br />
            have to think <br />
            about.
          </h1>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-md">
            {PORTFOLIO_DATA.heroSubhead}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartProject}
              className="bg-[#5b5fe0] hover:bg-[#6c70e8] text-white px-7 py-3 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-indigo-500/20 cursor-pointer"
            >
              Let&apos;s talk
            </button>

            <button
              onClick={onExploreWork}
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-mono tracking-wider transition-colors cursor-pointer group"
            >
              <span>See the work</span>
              <span className="text-[#5b5fe0] transition-transform group-hover:translate-x-1 group-hover:translate-y-1">
                ↘
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
