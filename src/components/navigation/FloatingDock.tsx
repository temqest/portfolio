"use client";

import React, { useState } from "react";
import { Code, Volume2, VolumeX, Cookie } from "lucide-react";

interface FloatingDockProps {
  mode: "site" | "story";
  onModeChange: (mode: "site" | "story") => void;
  onOpenCodeDrawer: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onPrevStoryChapter?: () => void;
  onNextStoryChapter?: () => void;
}

export function FloatingDock({
  mode,
  onModeChange,
  onOpenCodeDrawer,
  isAudioPlaying,
  onToggleAudio,
}: FloatingDockProps) {
  const [lang, setLang] = useState<"EN" | "PT">("EN");
  const [showCookieTooltip, setShowCookieTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none">
      <div className="flex items-center gap-1.5 bg-[#141414]/85 backdrop-blur-xl border border-white/12 px-2.5 py-1.5 rounded-full shadow-2xl">
        {/* Code Drawer Button */}
        <button
          onClick={onOpenCodeDrawer}
          title="Show the code / performance telemetry"
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Inspect Code and Performance"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

        {/* Site vs Story Switcher */}
        <div className="flex items-center bg-black/40 p-0.5 rounded-full border border-white/5">
          <button
            onClick={() => onModeChange("site")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              mode === "site"
                ? "bg-[#eeece8] text-[#0a0a0a] shadow-sm font-semibold"
                : "text-white/60 hover:text-white"
            }`}
          >
            Site
          </button>
          <button
            onClick={() => onModeChange("story")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
              mode === "story"
                ? "bg-[#eeece8] text-[#0a0a0a] shadow-sm font-semibold"
                : "text-white/60 hover:text-white"
            }`}
          >
            Story
          </button>
        </div>

        <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

        {/* Drift Audio Synthesizer */}
        {mode === "story" ? (
          <button
            onClick={onToggleAudio}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Drift Ambient Web Audio Synthesizer"
          >
            <span className="flex items-end gap-0.5 h-3">
              <span className={`w-0.5 bg-[#5b5fe0] rounded-full ${isAudioPlaying ? "h-3 animate-pulse" : "h-1"}`} />
              <span className={`w-0.5 bg-[#5b5fe0] rounded-full ${isAudioPlaying ? "h-2 animate-pulse delay-75" : "h-1.5"}`} />
              <span className={`w-0.5 bg-[#5b5fe0] rounded-full ${isAudioPlaying ? "h-3.5 animate-pulse delay-150" : "h-1"}`} />
            </span>
            <span>Drift ⇄</span>
          </button>
        ) : (
          <button
            onClick={onToggleAudio}
            title={isAudioPlaying ? "Mute Drift Synth" : "Play Drift Ambient Synth"}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle Drift Ambient Synth"
          >
            {isAudioPlaying ? (
              <Volume2 className="w-4 h-4 text-[#5b5fe0]" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        )}

        <div className="w-[1px] h-4 bg-white/10 mx-0.5" />

        {/* EN / PT Language Toggle */}
        <div className="flex items-center text-xs font-mono font-medium px-1.5 text-white/60">
          <button
            onClick={() => setLang("EN")}
            className={`px-1 hover:text-white transition-colors cursor-pointer ${
              lang === "EN" ? "text-white font-bold" : ""
            }`}
          >
            EN
          </button>
          <span className="text-white/20">/</span>
          <button
            onClick={() => setLang("PT")}
            className={`px-1 hover:text-white transition-colors cursor-pointer ${
              lang === "PT" ? "text-white font-bold" : ""
            }`}
          >
            PT
          </button>
        </div>

        {/* Cookie / Playful Hint */}
        <div className="relative">
          <button
            onMouseEnter={() => setShowCookieTooltip(true)}
            onMouseLeave={() => setShowCookieTooltip(false)}
            onClick={() => setShowCookieTooltip((prev) => !prev)}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cookies policy hint"
          >
            <Cookie className="w-3.5 h-3.5" />
          </button>
          {showCookieTooltip && (
            <div className="absolute bottom-10 right-0 bg-white text-black text-xs font-medium px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95 pointer-events-none">
              Cookies? Zero tracking here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
