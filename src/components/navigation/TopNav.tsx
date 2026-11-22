"use client";

import React from "react";

interface TopNavProps {
  onNavigate?: (id: string) => void;
  mode?: "site" | "story";
  onSwitchMode?: (mode: "site" | "story") => void;
}

export function TopNav({ onNavigate, mode = "site", onSwitchMode }: TopNavProps) {
  if (mode === "story") {
    return (
      <header className="absolute top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between pointer-events-none select-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="font-medium text-sm md:text-base text-white">Inacio Nakiti</span>
          <span className="text-white/40 text-xs font-mono">· a story in particles</span>
        </div>
        <button
          onClick={() => onSwitchMode?.("site")}
          className="pointer-events-auto text-xs font-mono tracking-wider uppercase text-white/70 hover:text-white transition-colors flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full cursor-pointer"
        >
          Skip to the site <span className="text-[#5b5fe0]">→</span>
        </button>
      </header>
    );
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-40 px-6 md:px-24 py-6 flex items-center justify-between text-sm pointer-events-none select-none">
      {/* Brand & Status */}
      <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.("hero");
          }}
          className="font-medium text-white flex items-center gap-1.5 hover:opacity-80 transition-opacity text-base tracking-tight"
        >
          <span>Inacio Nakiti</span>
          <span className="inline-flex gap-0.5 text-[#5b5fe0] text-xs font-black">●●</span>
        </a>

        {/* Live Availability Status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm text-xs text-white/80">
          <span className="w-2 h-2 rounded-full bg-[#3ddc84] shadow-[0_0_8px_#3ddc84]" />
          <span>Open for freelance work</span>
        </div>
      </div>

      {/* Nav Links & Menu */}
      <nav className="flex items-center gap-6 pointer-events-auto font-sans">
        <button
          onClick={() => onNavigate?.("about")}
          className="hidden md:inline-block text-white/70 hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-wider font-mono"
        >
          About
        </button>
        <button
          onClick={() => onNavigate?.("work")}
          className="hidden md:inline-block text-white/70 hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-wider font-mono"
        >
          Work
        </button>
        <button
          onClick={() => onNavigate?.("contact")}
          className="hidden md:inline-block text-white/70 hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-wider font-mono"
        >
          Contact
        </button>
        <button
          onClick={() => onNavigate?.("contact")}
          className="flex items-center gap-1.5 border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md cursor-pointer"
        >
          <span>Menu</span>
          <span className="text-[#5b5fe0] font-black text-[10px]">••</span>
        </button>
      </nav>
    </header>
  );
}
