"use client";

import React, { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CASE_STUDIES } from "@/lib/constants";

export function WorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWork = CASE_STUDIES[activeIndex];

  const prevCase = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : CASE_STUDIES.length - 1));
  };

  const nextCase = () => {
    setActiveIndex((prev) => (prev < CASE_STUDIES.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="work"
      className="relative w-full bg-[#0a0a0a] text-white px-6 md:px-24 py-28 select-none overflow-hidden border-t border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto space-y-12">
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-white/40 border-b border-white/10 pb-4">
          <span>(03) SELECTE&lt; &lt;+*1</span>
          <span>{activeWork.context}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-white/50 text-sm font-mono">
            Work I&apos;ve had a hand in
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#5b5fe0] font-bold">
              {activeWork.number}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={prevCase}
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Previous Case Study"
              >
                <ChevronLeft className="w-4 h-4 text-white/70" />
              </button>
              <button
                onClick={nextCase}
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Next Case Study"
              >
                <ChevronRight className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-sm font-mono text-white/60">
              {activeWork.category}
            </div>

            <h3
              className="font-black text-white tracking-tight leading-[0.95]"
              style={{
                fontSize: "clamp(3rem, 6.5vw, 6rem)",
              }}
            >
              {activeWork.client}
            </h3>

            <p className="text-base sm:text-xl text-white/80 leading-relaxed max-w-xl">
              {activeWork.description}
            </p>

            <div className="pt-4 flex flex-wrap gap-2">
              {activeWork.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-white/40">
              Measured Commercial Impact
            </div>

            <div className="space-y-4">
              {activeWork.metrics.map((metric) => (
                <div
                  key={metric}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#3ddc84]" />
                  <span className="font-mono text-sm text-white font-medium">
                    {metric}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
              <span>Role: {activeWork.role}</span>
              <span className="text-[#a9abff] flex items-center gap-1 cursor-pointer hover:underline">
                <span>View case details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
