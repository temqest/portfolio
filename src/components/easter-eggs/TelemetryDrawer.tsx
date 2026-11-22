"use client";

import React, { useState } from "react";
import { X, Check, Copy } from "lucide-react";
import { useTelemetry } from "@/hooks/useTelemetry";

interface TelemetryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TelemetryDrawer({ isOpen, onClose }: TelemetryDrawerProps) {
  const [activeTab, setActiveTab] = useState<"diff" | "source">("diff");
  const [copied, setCopied] = useState(false);
  const metrics = useTelemetry();

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(diffCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const diffCode = `// layout.js - Physics Gravity Exception Patch
- const layout = undefined;
+ const layout = measure(section);
- gravity = 9.8;
+ gravity = 0;
- throw new Error('not my fault');
+ return fixed;`;

  const sourceCode = `// LensReveal.tsx - Viewport Kinetic Orchestrator
import { useEffect, useRef } from 'react';

export function LensReveal({ progress, children }: LensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    // Smooth transform dampening
    const targetY = (1 - progress) * 40;
    el.style.transform = \`translate3d(0, \${targetY}px, 0)\`;
    el.style.opacity = Math.min(1, progress * 1.5).toString();
  }, [progress]);

  return (
    <div ref={containerRef} className="will-change-transform">
      {children}
    </div>
  );
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#141414] border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-sm flex flex-col max-h-[85vh]">
        {/* Header HUD Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-[#5b5fe0]/20 text-[#a9abff] border border-[#5b5fe0]/30 font-semibold">
              &lt;section class=&quot;motto&quot;&gt;
            </span>
            <span className="text-white/40 hidden sm:inline">· 758px · 22 elements</span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close inspector"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Performance Profiling Matrix */}
        <div className="px-5 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3 flex items-center justify-between">
            <span>Measured in your browser, right now</span>
            <span className="text-[#3ddc84] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3ddc84] animate-pulse" />
              LIVE TELEMETRY
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center font-mono">
            <div className="bg-black/40 border border-white/8 p-2.5 rounded-xl">
              <div className="text-white/40 text-[10px] uppercase">Largest Paint</div>
              <div className="text-lg font-bold text-white mt-0.5">{metrics.lcp}s</div>
            </div>
            <div className="bg-black/40 border border-white/8 p-2.5 rounded-xl">
              <div className="text-white/40 text-[10px] uppercase">Layout Shift</div>
              <div className="text-lg font-bold text-white mt-0.5">{metrics.cls}</div>
            </div>
            <div className="bg-black/40 border border-white/8 p-2.5 rounded-xl">
              <div className="text-white/40 text-[10px] uppercase">Page Weight</div>
              <div className="text-lg font-bold text-white mt-0.5">{metrics.pageWeightKb} KB</div>
            </div>
            <div className="bg-black/40 border border-white/8 p-2.5 rounded-xl">
              <div className="text-white/40 text-[10px] uppercase">Dots</div>
              <div className="text-lg font-bold text-[#5b5fe0] mt-0.5">41,135</div>
            </div>
            <div className="bg-black/40 border border-white/8 p-2.5 rounded-xl col-span-2 sm:col-span-1">
              <div className="text-white/40 text-[10px] uppercase">Elements</div>
              <div className="text-lg font-bold text-white mt-0.5">{metrics.domElements}</div>
            </div>
          </div>
        </div>

        {/* Code Tabs & Content */}
        <div className="flex items-center justify-between px-5 pt-3 border-b border-white/10">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("diff")}
              className={`pb-2.5 text-xs font-mono font-medium transition-colors border-b-2 cursor-pointer ${
                activeTab === "diff"
                  ? "border-[#5b5fe0] text-white"
                  : "border-transparent text-white/40 hover:text-white"
              }`}
            >
              layout.js (Git Diff)
            </button>
            <button
              onClick={() => setActiveTab("source")}
              className={`pb-2.5 text-xs font-mono font-medium transition-colors border-b-2 cursor-pointer ${
                activeTab === "source"
                  ? "border-[#5b5fe0] text-white"
                  : "border-transparent text-white/40 hover:text-white"
              }`}
            >
              LensReveal.tsx (Component)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer mb-2"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#3ddc84]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        {/* Code Display Area */}
        <div className="p-5 font-mono text-xs overflow-auto bg-black/60 flex-1 leading-relaxed">
          {activeTab === "diff" ? (
            <div className="space-y-1">
              <div className="text-white/40 mb-2">{"// layout.js"}</div>
              <div className="text-red-400 bg-red-950/20 px-2 py-0.5 rounded">
                - const layout = undefined;
              </div>
              <div className="text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded">
                + const layout = measure(section);
              </div>
              <div className="text-red-400 bg-red-950/20 px-2 py-0.5 rounded">
                - gravity = 9.8;
              </div>
              <div className="text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded">
                + gravity = 0;
              </div>
              <div className="text-red-400 bg-red-950/20 px-2 py-0.5 rounded">
                - throw new Error(&apos;not my fault&apos;);
              </div>
              <div className="text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded">
                + return fixed;
              </div>
              <div className="text-white/40 pt-4">{"// Fixed. Nothing to see here."}</div>
            </div>
          ) : (
            <pre className="text-white/80 whitespace-pre">
              <code>{sourceCode}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
