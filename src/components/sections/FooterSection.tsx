"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/constants";

interface FooterSectionProps {
  onScrollToTop?: () => void;
}

export function FooterSection({ onScrollToTop }: FooterSectionProps) {
  return (
    <footer
      id="footer"
      className="relative w-full bg-[#0a0a0a] text-white px-6 md:px-24 py-24 select-none overflow-hidden border-t border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto space-y-16">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 w-fit text-xs text-white/80">
          <span className="w-2 h-2 rounded-full bg-[#3ddc84] animate-pulse" />
          <span>Taking on new projects now</span>
        </div>

        <div className="max-w-4xl">
          <h2
            className="font-black text-white tracking-tight leading-[0.98]"
            style={{
              fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
            }}
          >
            What&apos;s actually hurting?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
          {PORTFOLIO_DATA.footer.stages.map((stage) => (
            <div key={stage.number} className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5b5fe0] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#5b5fe0]" />
                <span>{stage.number}</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {stage.title}
              </h3>
              <p className="text-sm text-white/50 font-mono">
                {stage.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-white/40">
          <div>
            © {new Date().getFullYear()} Inacio Nakiti. All code & design crafted with care.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onScrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#5b5fe0] group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
