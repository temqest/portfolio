'use client';

import React, { useState, useEffect } from 'react';
import { Code, Volume2, VolumeX } from 'lucide-react';

interface V2FloatingDockProps {
  mode: 'site' | 'story';
  onModeChange: (mode: 'site' | 'story') => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenTelemetry: () => void;
}

export function V2FloatingDock({
  mode,
  onModeChange,
  isAudioPlaying,
  onToggleAudio,
  onOpenTelemetry,
}: V2FloatingDockProps) {
  const [timeStr, setTimeStr] = useState('MNL --:--');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setTimeStr(`MNL ${formatter.format(now)}`);
      } catch {
        setTimeStr('MNL 23:05');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside
      aria-label="Tactile Navigation Dock"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none max-w-[95vw]"
    >
      <div className="flex items-center gap-2 bg-white/88 backdrop-blur-xl border border-black/10 px-3 py-1.5 rounded-full shadow-[0_12px_36px_rgba(10,18,42,0.12)] text-[#0a122a] font-sans text-xs transition-colors duration-300">
        {/* Code & Telemetry Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenTelemetry}
          title="Inspect Live Architecture & Telemetry"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-[#0a122a] hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Inspect Telemetry"
        >
          <Code className="w-4 h-4 text-[#2e4fc7]" />
        </button>

        <div className="w-[1px] h-4 bg-black/10 mx-0.5" />

        {/* Site vs Story Segmented Switcher (No Emojis) */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-black/5">
          <button
            type="button"
            onClick={() => onModeChange('site')}
            className={`px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'site'
                ? 'bg-[#0a122a] text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-black font-medium'
            }`}
          >
            Site
          </button>
          <button
            type="button"
            onClick={() => onModeChange('story')}
            className={`px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'story'
                ? 'bg-[#2e4fc7] text-white font-semibold shadow-sm shadow-blue-500/25'
                : 'text-slate-600 hover:text-black font-medium'
            }`}
          >
            Story
          </button>
        </div>

        <div className="w-[1px] h-4 bg-black/10 mx-0.5" />

        {/* Ambient Drift Synthesizer Toggle */}
        {mode === 'story' ? (
          <button
            type="button"
            onClick={onToggleAudio}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-slate-700 hover:text-[#0a122a] hover:bg-black/5 transition-colors cursor-pointer"
            title="Toggle Drift Ambient Web Audio Synth"
          >
            <span className="flex items-end gap-0.5 h-3">
              <span
                className={`w-0.5 bg-[#2e4fc7] rounded-full ${
                  isAudioPlaying ? 'h-3 animate-pulse' : 'h-1'
                }`}
              />
              <span
                className={`w-0.5 bg-[#2e4fc7] rounded-full ${
                  isAudioPlaying ? 'h-2 animate-pulse delay-75' : 'h-1.5'
                }`}
              />
              <span
                className={`w-0.5 bg-[#2e4fc7] rounded-full ${
                  isAudioPlaying ? 'h-3.5 animate-pulse delay-150' : 'h-1'
                }`}
              />
            </span>
            <span className="hidden sm:inline">Drift ⇄</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onToggleAudio}
            title={isAudioPlaying ? 'Mute Ambient Synthesizer' : 'Play Ambient Drift Synthesizer'}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-[#0a122a] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Toggle Ambient Audio"
          >
            {isAudioPlaying ? (
              <Volume2 className="w-4 h-4 text-[#2e4fc7]" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        )}

        <div className="w-[1px] h-4 bg-black/10 mx-0.5 hidden sm:block" />

        {/* Real-time Manila Telemetry Badge */}
        <div className="hidden sm:flex items-center px-2 text-[11px] font-mono text-slate-500 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 shadow-[0_0_6px_#10b981]" />
          <span>{timeStr}</span>
        </div>
      </div>
    </aside>
  );
}
