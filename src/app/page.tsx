'use client';

import React, { useState, Suspense } from 'react';
import { V2TopNav } from '@/components/v2/V2TopNav';
import { V2BottomNav } from '@/components/v2/V2BottomNav';
import { V2HeroSection } from '@/components/v2/V2HeroSection';
import { V2AboutSection } from '@/components/v2/V2AboutSection';
import { V2WorkSection } from '@/components/v2/V2WorkSection';
import { V2AchievementsSection } from '@/components/v2/V2AchievementsSection';
import { V2ToolkitSection } from '@/components/v2/V2ToolkitSection';
import { V2ExperienceSection } from '@/components/v2/V2ExperienceSection';
import { V2CertificatesSection } from '@/components/v2/V2CertificatesSection';
import { V2TechStackSection } from '@/components/v2/V2TechStackSection';
import { V2AvailabilitySection } from '@/components/v2/V2AvailabilitySection';
import { V2ContactSection } from '@/components/v2/V2ContactSection';
import { V2CustomCursor } from '@/components/v2/V2CustomCursor';
import { TelemetryDrawer } from '@/components/easter-eggs/TelemetryDrawer';
import { useLenisScroll } from '@/hooks/useLenisScroll';

function PortfolioContent() {
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);

  const { scrollTo } = useLenisScroll();

  return (
    <div className="min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 bg-white text-[#0a122a]">
      {/* Precision Difference-Blend Cursor */}
      <V2CustomCursor />

      {/* Hero Topbar (visible in hero, hides when scrolled past hero) */}
      <V2TopNav />

      <main>
        {/* 1. Hero Section */}
        <V2HeroSection />

        {/* 2. About Me */}
        <V2AboutSection />

        {/* 3. Projects */}
        <V2WorkSection />

        {/* 4. Skills & Disciplines */}
        <V2ToolkitSection />

        {/* 5. Work Experience */}
        <V2ExperienceSection />

        {/* 6. Achievements & Milestones */}
        <V2AchievementsSection />

        {/* 7. Certifications */}
        <V2CertificatesSection />

        {/* 8. Technical Arsenal & Stack */}
        <V2TechStackSection />

        {/* 9. Work & Internship Availability */}
        <V2AvailabilitySection />

        {/* 10. Direct Contact */}
        <V2ContactSection />
      </main>

      {/* Minimal Editorial Footer */}
      <footer className="site-footer border-t border-[rgba(10,18,42,0.1)] py-12 px-6 md:px-12 text-center text-xs font-mono text-slate-500 pb-28">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Patrick · Built with Next.js 16 &amp; Tailwind CSS</div>
          <div className="flex gap-6">
            <a
              href="https://github.com/temqest"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/patrick-villamer-15267b36a"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/patrick.kurt.127"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black"
            >
              Facebook
            </a>
            <a href="#front" className="hover:text-blue-600">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Navbar (reveals when scrolled past hero) */}
      <V2BottomNav onScrollToTop={() => scrollTo(0)} />

      {/* Developer Architecture & Performance Telemetry Drawer */}
      <TelemetryDrawer
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white text-[#0a122a] flex items-center justify-center font-mono text-xs">
          Loading portfolio...
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
