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
      className="fixed bottom-4 left-4 z-30 hidden lg:flex items-center gap-1 p-1 bg-white/85 backdrop-blur-md border border-black/10 rounded-full shadow-md text-[11px] font-mono transition-all duration-300 opacity-65 hover:opacity-100"
    >
      <Link
        href="/"
        className={`px-2.5 py-1 rounded-full transition-all duration-200 flex items-center gap-1 ${
          !isV2
            ? 'bg-[#0a122a] text-white font-medium shadow-xs'
            : 'text-slate-500 hover:text-black hover:bg-black/5'
        }`}
        title="Version 1: The Cyber-Editorial Engineer"
      >
        <span>v1: Cyber</span>
      </Link>
      <Link
        href="/v2"
        className={`px-2.5 py-1 rounded-full transition-all duration-200 flex items-center gap-1 ${
          isV2
            ? 'bg-[#0a122a] text-white font-medium shadow-xs'
            : 'text-slate-500 hover:text-black hover:bg-black/5'
        }`}
        title="Version 2: The Tactile Systems Craftsman"
      >
        <span>v2: Tactile</span>
      </Link>
    </aside>
  );
}
