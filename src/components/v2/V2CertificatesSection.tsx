'use client';

import React, { useState } from 'react';

interface Certificate {
  id: number;
  num: string;
  name: string;
  issuer: string;
  image: string;
}

export function V2CertificatesSection() {
  const [hovered, setHovered] = useState<Certificate | null>(null);
  const [selected, setSelected] = useState<Certificate | null>(null);

  const certificates: Certificate[] = [
    {
      id: 1,
      num: '01',
      name: 'Front-End Developer (React)',
      issuer: 'HackerRank',
      image: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 2,
      num: '02',
      name: 'Google Analytics',
      issuer: 'Google',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      num: '03',
      name: 'HubSpot Digital Marketing',
      issuer: 'HubSpot Academy',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 4,
      num: '04',
      name: 'Make Advanced Automation',
      issuer: 'Make',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 5,
      num: '05',
      name: 'FrontEnd Development',
      issuer: 'freeCodeCamp',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 6,
      num: '06',
      name: 'Make Basics',
      issuer: 'Make',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section id="certs" className="py-24 px-6 md:px-12 max-w-6xl mx-auto text-[#0a122a] relative">
      <div id="certifications" className="relative -top-24" />
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
        <span>(06) — CERTIFICATIONS</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-14">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#0a122a]">
          Always <em className="font-serif-italic text-blue-600 font-normal">learning.</em>
        </h2>
        <span className="text-xs font-mono text-slate-500 uppercase">
          {certificates.length} certificates · hover to preview
        </span>
      </div>

      <div className="divide-y divide-black/10 border-t border-b border-black/10">
        {certificates.map((cert) => (
          <button
            key={cert.id}
            type="button"
            className="w-full py-8 text-left grid grid-cols-12 items-center gap-4 group transition-all duration-300 hover:px-6 hover:bg-slate-50 relative cursor-pointer"
            onMouseEnter={() => setHovered(cert)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(cert)}
          >
            <span className="col-span-2 sm:col-span-1 font-mono text-slate-400 text-sm">
              {cert.num}
            </span>
            <span className="col-span-6 sm:col-span-7 text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-[#0a122a] group-hover:text-blue-600 transition-colors">
              {cert.name}
            </span>
            <span className="col-span-2 sm:col-span-3 text-slate-500 text-xs sm:text-sm font-mono text-right sm:text-left">
              {cert.issuer}
            </span>
            <span className="col-span-2 sm:col-span-1 text-right">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 group-hover:bg-[#0a122a] group-hover:text-white group-hover:rotate-45 transition-all text-xs">
                ↗
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Floating Hover Tilt Preview Card */}
      {hovered && (
        <div
          className="fixed pointer-events-none z-50 w-72 md:w-80 rounded-2xl overflow-hidden shadow-2xl border border-black/15 bg-white transition-opacity duration-300 hidden md:block"
          style={{ top: '35%', right: '12%' }}
        >
          <img src={hovered.image} alt={hovered.name} className="w-full h-44 object-cover" />
          <div className="p-4 bg-white">
            <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest block">
              {hovered.issuer}
            </span>
            <h4 className="text-sm font-semibold text-[#0a122a]">{hovered.name}</h4>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-label={selected.name}
        >
          <div
            className="max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-6 relative border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-xs font-mono text-blue-600 uppercase">{selected.issuer}</span>
                <h3 className="text-xl font-bold text-[#0a122a]">{selected.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-700 transition-colors"
              >
                Close ✕
              </button>
            </div>
            <img
              src={selected.image}
              alt={selected.name}
              className="w-full h-80 object-cover rounded-2xl border border-black/10"
            />
          </div>
        </div>
      )}
    </section>
  );
}
