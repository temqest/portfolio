"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";

interface BreakItGlitchProps {
  onBreakStateChange?: (broken: boolean) => void;
  onOpenCodeDrawer?: () => void;
}

export function BreakItGlitch({
  onBreakStateChange,
  onOpenCodeDrawer,
}: BreakItGlitchProps) {
  const [isBroken, setIsBroken] = useState(false);
  const [showHonest, setShowHonest] = useState(false);

  const handleToggleBreak = () => {
    const nextState = !isBroken;
    setIsBroken(nextState);
    onBreakStateChange?.(nextState);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[460px] py-16 px-4 select-none">
      {/* Terminal Error Toasts on Break */}
      {isBroken && (
        <div className="fixed top-20 left-6 md:left-24 z-50 flex flex-col gap-2 max-w-md animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="border border-red-500/40 bg-black/90 backdrop-blur-md text-red-400 p-3 rounded-lg text-xs font-mono shadow-2xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-red-300">
                TypeError: Cannot read properties of undefined (reading &apos;layout&apos;)
              </div>
              <div className="text-red-400/80 text-[11px] mt-1">
                at measure (/src/components/Motto.tsx:42)
                <br />
                at HTMLDocument.onGravityTrigger (engine.js:88)
              </div>
            </div>
          </div>
          <div className="border border-amber-500/40 bg-black/90 backdrop-blur-md text-amber-300 p-2.5 rounded-lg text-xs font-mono shadow-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Warning: gravity is not supposed to be on (g = 9.8m/s²)</span>
          </div>
        </div>
      )}

      {/* Section Kicker */}
      <div className="text-xs font-mono tracking-widest uppercase text-white/40 mb-8">
        MY MOTTO
      </div>

      {/* Main Motto Typography with simulated physics collapse */}
      <div
        className="relative text-center font-bold tracking-tight text-white mb-6 transition-all duration-700 ease-out"
        style={{
          fontSize: "clamp(3rem, 7.5vw, 7.5rem)",
          lineHeight: 1.05,
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6">
          <span
            className={`inline-block transition-all duration-700 ${
              isBroken
                ? "translate-y-24 -rotate-12 translate-x-[-20px] text-red-300/80"
                : "translate-y-0 rotate-0 text-white"
            }`}
          >
            Good
          </span>
          <span
            className={`inline-block transition-all duration-700 delay-75 ${
              isBroken
                ? "translate-y-40 rotate-[22deg] translate-x-8 text-amber-300/80"
                : "translate-y-0 rotate-0 text-white"
            }`}
          >
            code
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 mt-1">
          <span
            className={`inline-block transition-all duration-700 delay-100 ${
              isBroken
                ? "translate-y-16 -rotate-[18deg] translate-x-[-12px] text-white/50"
                : "translate-y-0 rotate-0 text-white"
            }`}
          >
            is
          </span>
          <span
            className={`inline-block transition-all duration-700 delay-150 ${
              isBroken
                ? "translate-y-36 rotate-[14deg] translate-x-12 text-[#a9abff]"
                : "translate-y-0 rotate-0 text-[#5b5fe0]"
            }`}
          >
            invisible.
          </span>
        </div>
      </div>

      {/* Hover to read honest version tooltip */}
      <div
        onMouseEnter={() => setShowHonest(true)}
        onMouseLeave={() => setShowHonest(false)}
        className="text-xs md:text-sm font-mono text-white/50 hover:text-white transition-colors cursor-pointer mb-8 text-center max-w-md px-4"
      >
        {showHonest ? (
          <span className="text-[#a9abff] animate-in fade-in">
            &ldquo;I spend 80% of my time making sure edge cases behave so well you assume nothing is happening.&rdquo;
          </span>
        ) : (
          <span>Hover to read the honest version</span>
        )}
      </div>

      {/* Control Buttons: Break it / Fix it and Show the Code */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleToggleBreak}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
            isBroken
              ? "bg-[#3ddc84] text-black border-[#3ddc84] hover:bg-[#45ed91] font-bold shadow-lg shadow-[#3ddc84]/20 animate-pulse"
              : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10 hover:text-white"
          }`}
        >
          {isBroken ? (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Fix it</span>
            </>
          ) : (
            <span>Break it</span>
          )}
        </button>

        <button
          onClick={onOpenCodeDrawer}
          className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-white/5 text-white/80 border border-white/15 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
        >
          <span className="text-[#5b5fe0] font-bold">&lt;/&gt;</span>
          <span>Show the code</span>
        </button>
      </div>

      {/* Success banner after fixing */}
      {!isBroken && (
        <div className="text-[11px] font-mono text-white/30 mt-4 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#3ddc84]" />
          <span>Layout stable. Zero uncaught exceptions.</span>
        </div>
      )}
    </div>
  );
}
