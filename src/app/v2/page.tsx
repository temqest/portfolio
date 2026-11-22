import React from 'react';
import type { Metadata } from 'next';
import { V2TopNav } from '@/components/v2/V2TopNav';
import { V2HeroSection } from '@/components/v2/V2HeroSection';
import { V2AboutSection } from '@/components/v2/V2AboutSection';
import { V2ToolkitSection } from '@/components/v2/V2ToolkitSection';
import { V2WorkSection } from '@/components/v2/V2WorkSection';
import { V2CertificatesSection } from '@/components/v2/V2CertificatesSection';
import { V2ProcessSection } from '@/components/v2/V2ProcessSection';
import { V2TestimonialsSection } from '@/components/v2/V2TestimonialsSection';
import { V2ContactSection } from '@/components/v2/V2ContactSection';
import { V2PhysicsMascot } from '@/components/v2/V2PhysicsMascot';
import { V2CustomCursor } from '@/components/v2/V2CustomCursor';

export const metadata: Metadata = {
  title: 'Ariel Angel (Anghel) — Web Developer for Small Businesses',
  description:
    'I build web systems for small businesses that hold up with real users. Full-stack React, Next.js, Node.js and PostgreSQL solutions.',
};

export default function VersionTwoPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a122a] selection:bg-blue-100 selection:text-blue-900 font-sans">
      <V2CustomCursor />
      <V2TopNav />
      <main>
        <V2HeroSection />
        <V2AboutSection />
        <V2ToolkitSection />
        <V2WorkSection />
        <V2CertificatesSection />
        <V2ProcessSection />
        <V2TestimonialsSection />
        <V2ContactSection />
      </main>

      {/* Minimal Footer */}
      <footer className="site-footer border-t border-[rgba(10,18,42,0.1)] py-12 px-6 md:px-12 text-center text-xs font-mono text-slate-500">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 Anghel · Built with Next.js 16 &amp; Tailwind CSS</div>
          <div className="flex gap-6">
            <a href="https://github.com/pork-arie" target="_blank" rel="noreferrer" className="hover:text-black">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-black">LinkedIn</a>
            <a href="#front" className="hover:text-blue-600">Back to top ↑</a>
          </div>
        </div>
      </footer>

      {/* Interactive 2D Physics Mascot Companion */}
      <V2PhysicsMascot />
    </div>
  );
}
