'use client';

import React from 'react';
import Link from 'next/link';
import { V2IslandPanel } from './V2IslandPanel';

export function V2WorkSection() {
  const projects = [
    {
      id: 1,
      num: '01 / 05',
      name: 'GymTrack',
      tag: 'Gym management · Solo project',
      desc: 'Front-desk check-ins, a live dashboard of who is on the floor, and plans the owner can edit in real time.',
      stack: ['React', 'Vite', 'CSS', 'Node.js', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop',
    },
    {
      id: 2,
      num: '02 / 05',
      name: 'Faculty Evaluation System',
      tag: 'NwSSU · Solo Dev',
      desc: 'Institutional analytics app evaluating instructor performance, student feedback, and departmental grade reporting.',
      stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Room DB'],
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=900&auto=format&fit=crop',
    },
    {
      id: 3,
      num: '03 / 05',
      name: 'Bantay POS',
      tag: 'Point of sale & inventory · Solo project',
      desc: 'Offline-first tablet point of sale with real-time barcode scanning, daily cash reconciliation, and stock alerts.',
      stack: ['React Native', 'Expo', 'SQLite', 'TypeScript'],
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=900&auto=format&fit=crop',
    },
    {
      id: 4,
      num: '04 / 05',
      name: 'Appoint',
      tag: 'Church office · Solo project',
      desc: 'Clergy calendar and parishioner scheduling platform with automated SMS confirmations and priest availability.',
      stack: ['React', 'Vite', 'Node.js', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=900&auto=format&fit=crop',
    },
    {
      id: 5,
      num: '05 / 05',
      name: 'Ambitpolong',
      tag: 'Church youth app · Solo project',
      desc: 'Mobile-first community portal for scripture reading, prayer requests, event ticketing, and announcements.',
      stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase'],
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=900&auto=format&fit=crop',
    },
  ];

  return (
    <V2IslandPanel id="work" className="my-8">
      <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">
        <span>(03) — SELECTED WORK</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white">
          Systems built for <em className="font-serif-italic text-blue-400 font-normal">real</em> work.
        </h2>
        <span className="text-xs font-mono text-slate-400 uppercase">05 Case studies</span>
      </div>

      <div className="space-y-12">
        {projects.map((item) => (
          <Link
            key={item.id}
            href={`/detail/${item.id}`}
            className="block group p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Preview Thumbnail */}
              <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-white/90">
                  {item.num}
                </span>
              </div>

              {/* Details */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4 group-hover:text-blue-300 transition-colors flex items-center justify-between">
                    <span>{item.name}</span>
                    <span className="text-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      ↗
                    </span>
                  </h3>
                  <p className="text-base text-slate-300 font-light leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full bg-white/10 text-xs font-mono text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </V2IslandPanel>
  );
}
