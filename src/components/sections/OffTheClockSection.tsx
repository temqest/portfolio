"use client";

import React from "react";
import { OFF_THE_CLOCK } from "@/lib/constants";

export function OffTheClockSection() {
  return (
    <section
      id="offtheclock"
      className="relative w-full bg-[#eeece8] text-[#0a0a0a] px-6 md:px-24 py-28 transition-colors select-none overflow-hidden border-t border-black/10 bg-stipple-sand"
    >
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Header Kicker */}
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-black/50 border-b border-black/10 pb-4">
          <span>(07) OFF THE []&#123;+-</span>
          <span>Music and games</span>
        </div>

        <h2
          className="font-black text-[#0a0a0a] tracking-tight leading-tight"
          style={{
            fontSize: "clamp(3rem, 6.5vw, 6rem)",
          }}
        >
          After hours
        </h2>

        {/* 4 Interests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {OFF_THE_CLOCK.map((item, idx) => (
            <div
              key={item.category}
              className="bg-white/80 backdrop-blur-md border border-black/10 p-6 rounded-2xl shadow-sm space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="text-xs font-mono text-[#5b5fe0] font-bold">
                0{idx + 1}
              </div>
              <h3 className="text-xl font-bold text-[#0a0a0a] tracking-tight">
                {item.category}
              </h3>
              <p className="text-xs text-black/70 leading-relaxed font-mono">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
