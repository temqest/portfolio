"use client";

import React from "react";
import { BreakItGlitch } from "@/components/easter-eggs/BreakItGlitch";

interface MottoSectionProps {
  onBreakStateChange?: (broken: boolean) => void;
  onOpenCodeDrawer?: () => void;
}

export function MottoSection({
  onBreakStateChange,
  onOpenCodeDrawer,
}: MottoSectionProps) {
  return (
    <section
      id="motto"
      className="relative w-full bg-[#0a0a0a] text-white px-6 md:px-24 py-20 select-none overflow-hidden border-t border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto">
        <BreakItGlitch
          onBreakStateChange={onBreakStateChange}
          onOpenCodeDrawer={onOpenCodeDrawer}
        />
      </div>
    </section>
  );
}
