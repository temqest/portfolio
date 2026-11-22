"use client";

import React from "react";
import { PROCESS_STAGES } from "@/lib/constants";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative w-full bg-[#0a0a0a] text-white px-6 md:px-24 py-28 select-none overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto space-y-16">
        {/* Header Kicker */}
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-white/40 border-b border-white/10 pb-4">
          <span>(03) PROCESS</span>
          <span>From discovery to production</span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl">
          <h2
            className="font-bold tracking-tight text-white leading-[1.05]"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
            }}
          >
            From first call to long after launch
          </h2>
        </div>

        {/* 6-Stage Lifecycle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {PROCESS_STAGES.map((stage) => (
            <div
              key={stage.number}
              className="group border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-4">
                  <span className="text-[#5b5fe0] font-bold">{stage.number}</span>
                  <span className="group-hover:text-white transition-colors">Phase</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {stage.name}
                </h3>
                <p className="text-sm font-medium text-white/80 mb-3">
                  {stage.tagline}
                </p>
              </div>

              <p className="text-xs text-white/50 leading-relaxed font-mono">
                {stage.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
