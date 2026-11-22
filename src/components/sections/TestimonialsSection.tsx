"use client";

import React, { useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = TESTIMONIALS[activeIdx];

  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#eeece8] text-[#0a0a0a] px-6 md:px-24 py-28 transition-colors select-none overflow-hidden border-t border-black/10"
    >
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Header Kicker */}
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-black/50 border-b border-black/10 pb-4">
          <span>(06) WHAT THEY #]&lt;&#123;</span>
          <span>People I have worked with</span>
        </div>

        {/* Main Testimonial Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Avatar Selector Pills on Left */}
          <div className="lg:col-span-2 flex lg:flex-col gap-3">
            {TESTIMONIALS.map((item, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={item.initials}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm transition-all cursor-pointer shadow-md ${
                    isSelected
                      ? "bg-[#5b5fe0] text-white ring-4 ring-[#5b5fe0]/20 scale-105"
                      : "bg-black/15 text-black/70 hover:bg-black/25"
                  }`}
                  aria-label={`Testimonial from ${item.author}`}
                >
                  {item.initials}
                </button>
              );
            })}
          </div>

          {/* Large Quote Content */}
          <div className="lg:col-span-10 space-y-6">
            <h3
              className="font-black text-[#0a0a0a] tracking-tight leading-[1.05]"
              style={{
                fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              }}
            >
              <span className="text-[#5b5fe0]">&ldquo;</span>
              {activeItem.headline}
              <span className="text-[#5b5fe0]">&rdquo;</span>
            </h3>

            <p className="text-lg sm:text-2xl text-black/80 font-normal leading-relaxed max-w-3xl">
              {activeItem.quote}
            </p>

            <div className="pt-4 border-t border-black/10 flex flex-wrap items-center gap-4 text-xs font-mono text-black/60">
              <span className="font-bold text-black">{activeItem.author}</span>
              <span>·</span>
              <span>{activeItem.role}</span>
              <span>·</span>
              <span className="text-[#5b5fe0] font-semibold">{activeItem.company}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
