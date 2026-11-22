"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/lib/constants";

export function ExperienceSection() {
  const techStack = [
    "Shopify Plus",
    "Liquid",
    "Next.js",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "GraphQL",
    "Node.js",
    "WebGL",
    "Cloudflare Workers",
    "Supabase",
    "Vercel",
    "Algolia",
    "Headless Commerce",
  ];

  return (
    <section
      id="experience"
      className="relative w-full bg-[#0a0a0a] text-white py-24 select-none overflow-hidden border-t border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-24 mb-16">
        {/* Kicker */}
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-white/40 border-b border-white/10 pb-4 mb-12">
          <span>(05) EXPERIENCE</span>
          <span>9 years of deliberate practice</span>
        </div>

        {/* Rolling Odometer Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {PORTFOLIO_DATA.metrics.map((item) => (
            <div key={item.label} className="space-y-2">
              <div
                className="font-black text-white tracking-tight flex items-baseline font-mono"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                }}
              >
                <span>{item.prefix}</span>
                <span>{item.value}</span>
                <span className="text-[#5b5fe0]">{item.suffix}</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-white/50">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Horizontal Tech Marquee */}
      <div className="w-full overflow-hidden border-y border-white/10 py-5 bg-white/[0.02]">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
          {[...techStack, ...techStack].map((tech, idx) => (
            <div
              key={`${tech}-${idx}`}
              className="flex items-center gap-4 text-lg md:text-2xl font-bold tracking-tight text-white/70 hover:text-white transition-colors cursor-default"
            >
              <span>{tech}</span>
              <span className="text-[#5b5fe0] text-sm font-black">●</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
