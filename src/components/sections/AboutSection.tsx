"use client";

import React from "react";
import { Trophy } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/constants";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#eeece8] text-[#0a0a0a] px-6 md:px-24 py-28 transition-colors duration-500 select-none overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-16">
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-black/50 border-b border-black/10 pb-4">
          <span>(01) ABOUT ME</span>
          <span>Cape Town, working worldwide</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-9">
            <blockquote
              className="font-normal text-[#0a0a0a] tracking-tight leading-[1.12]"
              style={{
                fontSize: "clamp(2rem, 4.2vw, 4.5rem)",
              }}
            >
              <span>{PORTFOLIO_DATA.aboutQuote.lead} </span>
              <strong className="font-extrabold text-[#0a0a0a]">
                {PORTFOLIO_DATA.aboutQuote.highlight}
              </strong>
              <span> {PORTFOLIO_DATA.aboutQuote.tail}</span>
            </blockquote>
          </div>

          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
              <svg
                className="w-full h-full animate-spin-slow select-none pointer-events-none"
                viewBox="0 0 200 200"
              >
                <path
                  id="awardCirclePath"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                  fill="none"
                />
                <text className="text-[9.5px] font-mono tracking-[0.22em] uppercase fill-[#0a0a0a]/70 font-semibold">
                  <textPath href="#awardCirclePath" startOffset="0%">
                    WD AWARDS · 03.11.2026 · SITE OF THE DAY · CSS WINNER · 05.11.2026 ·
                  </textPath>
                </text>
              </svg>

              <div className="absolute inset-8 rounded-full border border-black/15 bg-black/[0.04] flex items-center justify-center shadow-inner">
                <Trophy className="w-10 h-10 text-[#0a0a0a]/80" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-black/10">
          {PORTFOLIO_DATA.metrics.map((item) => (
            <div key={item.label} className="space-y-1 font-mono">
              <div className="text-3xl sm:text-5xl font-black tracking-tight text-[#0a0a0a]">
                {item.prefix}
                {item.value}
                {item.suffix}
              </div>
              <div className="text-xs uppercase tracking-wider text-black/55 font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
