"use client";

import React from "react";

interface LeftHUDProps {
  activeSection?: string;
  mode?: "site" | "story";
}

export function LeftHUD({ activeSection = "hero", mode = "site" }: LeftHUDProps) {
  const sectionLabels: Record<string, string> = {
    hero: "00 Start",
    about: "(01) About me",
    whatido: "(02) What I do",
    process: "(03) Process",
    work: "(04) Selected work",
    apps: "(05) Now building",
    experience: "(06) Experience",
    motto: "My motto",
    testimonials: "(07) What they said",
    offtheclock: "(08) Off the clock",
    contact: "(09) Contact",
    footer: "10 Colophon",
  };

  return (
    <aside
      className="fixed left-0 top-24 bottom-0 z-30 pointer-events-none select-none hidden md:flex flex-col justify-between px-6 pb-6 w-16"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center">
        <div className="w-10 h-28 border border-white/15 bg-black/60 backdrop-blur-md rounded-md flex flex-col items-center justify-between py-2.5 shadow-xl">
          <span className="font-bold text-sm tracking-tighter text-white">W.</span>
          <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase [writing-mode:vertical-lr] rotate-180">
            Nominee
          </span>
        </div>
      </div>

      {mode === "site" && (
        <div className="flex items-center gap-2 [writing-mode:vertical-lr] rotate-180 pb-16">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5b5fe0] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-white/60">
            • {sectionLabels[activeSection] || "(01) About me"}
          </span>
        </div>
      )}
    </aside>
  );
}
