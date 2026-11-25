'use client';

import React, { useState } from 'react';
import { V2IslandPanel } from './V2IslandPanel';

interface Certificate {
  id: number;
  num: string;
  name: string;
  issuer: string;
  image: string;
  pdfUrl?: string;
}

export function V2CertificatesSection() {
  const [hovered, setHovered] = useState<Certificate | null>(null);
  const [selected, setSelected] = useState<Certificate | null>(null);

  const certificates: Certificate[] = [
    {
      id: 1,
      num: '01',
      name: 'Cybersecurity Essentials (Junior Cybersecurity Analyst)',
      issuer: 'Cisco Networking Academy · Ateneo de Naga University',
      image: '/certifications/cisco-junior-cybersecurity-analyst.png',
      pdfUrl: '/certifications/cisco-junior-cybersecurity-analyst.png',
    },
    {
      id: 2,
      num: '02',
      name: 'IT Essentials: PC Hardware and Software',
      issuer: 'Cisco Networking Academy · Ateneo de Naga University',
      image: '/certifications/cisco-it-essentials.png',
      pdfUrl: '/certifications/cisco-it-essentials.png',
    },
    {
      id: 3,
      num: '03',
      name: 'Operating Systems Support',
      issuer: 'Cisco Networking Academy',
      image: '/certifications/cisco-operating-systems-support.png',
      pdfUrl: '/certifications/OperatingSystemsSupportv120261125-20-shk4pq.pdf',
    },
    {
      id: 4,
      num: '04',
      name: 'IT Customer Support Basics',
      issuer: 'Cisco Networking Academy',
      image: '/certifications/cisco-it-customer-support-basics.png',
      pdfUrl: '/certifications/ITCustomerSupportBasicsv120261125-20-5zn7f1.pdf',
    },
  ];

  return (
    <V2IslandPanel id="certs" className="my-8">
      <div id="certifications" className="relative -top-24" />
      <div id="certificates" className="relative -top-24" />

      {/* ============================================================== */}
      {/* SECTION HEADER (Dark Island Theme)                             */}
      {/* ============================================================== */}
      <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">
        <span>(06) — CERTIFICATIONS</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-4 mb-8 md:mb-14 border-b border-white/10 pb-6 md:pb-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
            Always <em className="font-serif-italic text-blue-400 font-normal">learning.</em>
          </h2>
          <p className="text-sm md:text-base text-slate-300 font-light mt-2 max-w-2xl leading-relaxed">
            Verified industry credentials spanning cybersecurity operations, operating systems support, hardware diagnostics, and IT essentials.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400 uppercase shrink-0">
          {certificates.length} certificates
          <span className="hidden md:inline"> · hover to preview</span>
          <span className="sm:hidden"> · swipe →</span>
        </span>
      </div>

      {/* ============================================================== */}
      {/* MOBILE (< 640px): HORIZONTAL SNAP-SCROLL CREDENTIAL CARDS      */}
      {/* ============================================================== */}
      <div className="sm:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 no-scrollbar -mx-4 px-4 pb-2">
        {certificates.map((cert) => (
          <button
            key={cert.id}
            type="button"
            onClick={() => setSelected(cert)}
            className="snap-start shrink-0 w-[78vw] text-left rounded-2xl border border-white/15 bg-white/[0.04] overflow-hidden active:scale-[0.99] transition-transform cursor-pointer flex flex-col"
          >
            <div className="relative aspect-[16/10] w-full bg-[#060a18] border-b border-white/10 overflow-hidden">
              <img
                src={cert.image}
                alt={cert.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/75 text-[10px] font-mono text-blue-300">
                {cert.num}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between gap-2">
              <div>
                <div className="text-base font-semibold text-white leading-snug line-clamp-2">
                  {cert.name}
                </div>
                <div className="text-xs font-mono text-slate-400 mt-1 line-clamp-1">
                  {cert.issuer}
                </div>
              </div>
              <span className="inline-flex items-center min-h-[40px] text-xs font-mono text-blue-400 font-medium">
                View certificate ↗
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* DESKTOP / TABLET (sm+): EDITORIAL TABLE ROWS                   */}
      {/* ============================================================== */}
      <div className="hidden sm:block divide-y divide-white/10 border-t border-b border-white/10">
        {certificates.map((cert) => (
          <button
            key={cert.id}
            type="button"
            className="w-full py-5 sm:py-8 px-1 sm:px-2 text-left flex items-center justify-between gap-3 sm:grid sm:grid-cols-12 sm:gap-4 group transition-colors duration-200 hover:bg-white/[0.04] active:bg-white/[0.08] relative cursor-pointer"
            onMouseEnter={() => setHovered(cert)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(cert)}
          >
            <span className="hidden sm:block sm:col-span-1 font-mono text-slate-400 text-sm">
              {cert.num}
            </span>
            <div className="flex-1 sm:col-span-10 sm:grid sm:grid-cols-10 sm:items-center sm:gap-4 min-w-0 pr-2 sm:pr-0">
              <span className="block sm:hidden font-mono text-[11px] text-slate-400 mb-1">
                {cert.num}
              </span>
              <span className="block sm:col-span-7 text-lg sm:text-2xl md:text-3xl font-normal tracking-tight text-white group-hover:text-blue-400 transition-colors">
                {cert.name}
              </span>
              <span className="block sm:col-span-3 text-slate-400 text-xs sm:text-sm font-mono mt-1 sm:mt-0 sm:text-left">
                {cert.issuer}
              </span>
            </div>
            <span className="shrink-0 sm:col-span-1 text-right flex justify-end">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/10 group-hover:bg-white group-hover:text-[#060a18] md:group-hover:rotate-45 transition-all text-xs text-white">
                ↗
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* FLOATING HOVER PREVIEW CARD (Dark Theme)                       */}
      {/* ============================================================== */}
      {hovered && (
        <div
          className="fixed pointer-events-none z-50 w-72 md:w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#0a122a] text-white transition-opacity duration-300 hidden md:block"
          style={{ top: '35%', right: '12%' }}
        >
          <div className="w-full h-44 bg-[#060a18] relative overflow-hidden border-b border-white/10">
            <img src={hovered.image} alt={hovered.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-4 bg-[#0a122a]">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-1">
              {hovered.issuer}
            </span>
            <h4 className="text-sm font-semibold text-white">{hovered.name}</h4>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* LIGHTBOX MODAL (Dark Theme - Full Uncropped View)               */}
      {/* ============================================================== */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-2 sm:p-6 md:p-8 overflow-y-auto"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.name}
        >
          <div
            className="max-w-4xl w-full bg-[#0a122a] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-7 relative border border-white/20 text-white my-auto max-h-[90dvh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4 shrink-0 border-b border-white/10 pb-4">
              <div className="min-w-0 flex-1">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-0.5">
                  {selected.issuer}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  {selected.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer inline-flex items-center justify-center"
                >
                  Close ✕
                </button>
              </div>
            </div>

            {/* Full uncropped image container with contain sizing */}
            <div className="w-full flex-1 overflow-auto rounded-xl sm:rounded-2xl border border-white/10 bg-black/40 p-2 sm:p-3 flex items-center justify-center">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </V2IslandPanel>
  );
}
