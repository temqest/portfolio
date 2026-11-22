'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { V2TopNav } from '@/components/v2/V2TopNav';
import { V2HeroSection } from '@/components/v2/V2HeroSection';
import { V2AboutSection } from '@/components/v2/V2AboutSection';
import { V2ToolkitSection } from '@/components/v2/V2ToolkitSection';
import { V2WorkSection } from '@/components/v2/V2WorkSection';
import { V2AchievementsSection } from '@/components/v2/V2AchievementsSection';
import { V2CertificatesSection } from '@/components/v2/V2CertificatesSection';
import { V2ProcessSection } from '@/components/v2/V2ProcessSection';
import { V2TestimonialsSection } from '@/components/v2/V2TestimonialsSection';
import { V2ContactSection } from '@/components/v2/V2ContactSection';
import { V2CustomCursor } from '@/components/v2/V2CustomCursor';
import { V2FloatingDock } from '@/components/v2/V2FloatingDock';
import { V2TactileStoryExperience } from '@/components/v2/V2TactileStoryExperience';
import { TelemetryDrawer } from '@/components/easter-eggs/TelemetryDrawer';
import { useAudioSynth } from '@/hooks/useAudioSynth';
import { useLenisScroll } from '@/hooks/useLenisScroll';

function VersionTwoContent() {
  const searchParams = useSearchParams();
  const paramMode = searchParams.get('v') || searchParams.get('mode');
  const [mode, setMode] = useState<'site' | 'story'>(paramMode === 'story' ? 'story' : 'site');
  const [storyChapter, setStoryChapter] = useState(0);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);

  const { isPlaying: isAudioPlaying, toggleAudio } = useAudioSynth();
  const { stopScroll, startScroll } = useLenisScroll();

  // Mode change handler with scroll lock for Story Mode
  const handleModeChange = useCallback(
    (newMode: 'site' | 'story') => {
      setMode(newMode);
      if (newMode === 'story') {
        stopScroll();
        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', '/v2?v=story');
        }
      } else {
        startScroll();
        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', '/v2');
        }
      }
    },
    [stopScroll, startScroll]
  );

  // Sync scroll on initial mount based on mode
  useEffect(() => {
    if (mode === 'story') {
      stopScroll();
    } else {
      startScroll();
    }
  }, [mode, stopScroll, startScroll]);

  return (
    <div className="min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 bg-white text-[#0a122a]">
      {/* Precision Difference-Blend Cursor */}
      <V2CustomCursor />

      {/* Top Header (only visible in site mode; story mode has its monograph header) */}
      <V2TopNav mode={mode} onSwitchMode={handleModeChange} />

      {/* Modality A: Full-featured Tactile Editorial Site */}
      {mode === 'site' && (
        <>
          <main>
            <V2HeroSection />
            <V2AboutSection />
            <V2ToolkitSection />
            <V2WorkSection />
            <V2AchievementsSection />
            <V2CertificatesSection />
            <V2ProcessSection />
            <V2TestimonialsSection />
            <V2ContactSection />
          </main>

          {/* Minimal Editorial Footer */}
          <footer className="site-footer border-t border-[rgba(10,18,42,0.1)] py-12 px-6 md:px-12 text-center text-xs font-mono text-slate-500 pb-28">
            <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>© 2026 Patrick · Built with Next.js 16 &amp; Tailwind CSS</div>
              <div className="flex gap-6">
                <a
                  href="https://github.com/pork-arie"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black"
                >
                  LinkedIn
                </a>
                <a href="#front" className="hover:text-blue-600">
                  Back to top ↑
                </a>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Modality B: Tactile Monograph Story Experience */}
      {mode === 'story' && (
        <V2TactileStoryExperience onExit={() => handleModeChange('site')} />
      )}

      {/* Tactile Floating Navigation Dock */}
      <V2FloatingDock
        mode={mode}
        onModeChange={handleModeChange}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
      />

      {/* Developer Architecture & Performance Telemetry Drawer */}
      <TelemetryDrawer
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />
    </div>
  );
}

export default function VersionTwoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white text-[#0a122a] flex items-center justify-center font-mono text-xs">
          Loading tactile experience...
        </div>
      }
    >
      <VersionTwoContent />
    </Suspense>
  );
}
