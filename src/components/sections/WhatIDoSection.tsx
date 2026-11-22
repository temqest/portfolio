"use client";

import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { SERVICE_TABS } from "@/lib/constants";

interface WhatIDoSectionProps {
  onSkipNext?: () => void;
}

export function WhatIDoSection({ onSkipNext }: WhatIDoSectionProps) {
  const [activeTabId, setActiveTabId] = useState("shopify-plus");
  const activeTab = SERVICE_TABS.find((t) => t.id === activeTabId) || SERVICE_TABS[0];

  return (
    <section
      id="whatido"
      className="relative w-full bg-[#eeece8] text-[#0a0a0a] px-6 md:px-24 py-28 transition-colors select-none overflow-hidden border-t border-black/10"
    >
      <div className="w-full max-w-7xl mx-auto space-y-12">
        <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-black/50 border-b border-black/10 pb-4">
          <span>(02) WHAT I *&#123;</span>
          <span>Usually on the same store</span>
        </div>

        <div className="text-black/60 font-mono text-sm">
          {activeTab.subtitle}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h2
              className="font-black text-[#0a0a0a] tracking-tight leading-[0.98]"
              style={{
                fontSize: "clamp(3rem, 7vw, 6.5rem)",
              }}
            >
              {activeTab.title}
            </h2>

            <p className="text-lg sm:text-2xl text-black/80 font-normal leading-relaxed">
              {activeTab.description}
            </p>

            <div className="pt-4 space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-black/45">
                Key Deliverables
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-black/75 font-mono">
                {activeTab.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#5b5fe0] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-black/[0.04] border border-black/10 rounded-3xl p-6 min-h-[300px] flex flex-col justify-between">
            <div className="text-xs font-mono text-black/50 uppercase tracking-widest">
              Example Deployments
            </div>
            <div className="text-base sm:text-lg font-medium text-black/80 py-8 leading-snug">
              &ldquo;{activeTab.example}&rdquo;
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-[#5b5fe0]">
              <span>Tab {activeTab.number} / 06</span>
              <span className="animate-pulse">● Live Storefront System</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-black/10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {SERVICE_TABS.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                    isActive
                      ? "bg-[#0a0a0a] text-white border-black shadow-lg"
                      : "bg-white/40 hover:bg-white/80 text-black/70 border-black/8"
                  }`}
                >
                  <div
                    className={`text-[10px] font-mono tracking-widest mb-1 ${
                      isActive ? "text-[#a9abff]" : "text-black/40"
                    }`}
                  >
                    {tab.number}
                  </div>
                  <div className="font-semibold text-sm tracking-tight">
                    {tab.title}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-8 flex justify-end">
            <button
              onClick={onSkipNext}
              className="flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-black/50 hover:text-black transition-colors cursor-pointer"
            >
              <span>Skip to the next section</span>
              <span className="text-[#5b5fe0]">↘</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
