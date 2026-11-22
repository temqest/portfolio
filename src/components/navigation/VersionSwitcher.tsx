'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function VersionSwitcher() {
  const pathname = usePathname();
  const isV2 = pathname.startsWith('/v2');

  return (
    <aside
      aria-label="Portfolio Version Switcher"
      className="fixed bottom-4 left-4 z-[9990] flex items-center gap-1.5 p-1.5 bg-black/80 backdrop-blur-md border border-white/20 rounded-full shadow-2xl text-[11px] font-mono transition-all duration-300 hover:border-white/40 opacity-85 hover:opacity-100"
    >
      <Link
        href="/"
        className={`px-3.5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
          !isV2
            ? 'bg-white text-black font-semibold shadow-md'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
        title="Version 1: The Cyber-Editorial Engineer (Inacio Nakiti inspiration)"
      >
        <span>✦</span>
        <span>v1: Cyber</span>
      </Link>
      <Link
        href="/v2"
        className={`px-3.5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
          isV2
            ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/25'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
        title="Version 2: The Tactile Systems Craftsman (Patrick)"
      >
        <span>🦖</span>
        <span>v2: Tactile</span>
      </Link>
    </aside>
  );
}
