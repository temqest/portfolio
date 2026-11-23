'use client';

import React from 'react';
import Link from 'next/link';

export function V2WorkSection() {
  const projects = [
    {
      id: 1,
      num: '01 / 02',
      name: 'UNITE',
      tag: 'Blood Bank Logistics Platform · Startup Co-Founder & Lead Engineer',
      desc: 'Centralized blood unit inventory and donor mobilization platform connecting hospitals, blood centers, and volunteer donors in real time. Built in active partnership with Bicol Medical Center (BMC), the largest blood bank provider in Camarines Sur and Camarines Norte.',
      achievements: [
        '1st Place — SparkLAB Hackathon 2025',
        'Partnered with Bicol Medical Center (BMC)',
        'ADNU MAGIS TBI Incubation Graduate',
        'CEELI UNC FLIP Startup Top 8 Finalist',
        'Idea2Startup Naga City Semi-Finalist',
      ],
      stack: ['Next.js', 'React Native', 'TypeScript', 'Node.js', 'Supabase RLS', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 2,
      num: '02 / 02',
      name: 'ap-silang',
      tag: 'Municipal Maternal Healthcare Platform · Capstone Lead Architect',
      desc: 'Offline-first clinical care and maternal EMR platform serving Rural Health Units (RHU) and Barangay Health Stations (BHS). Features an in-browser & mobile sync engine that operates with zero internet, paired with an offline TEWS clinical risk triage engine.',
      achievements: [
        'Dexie.js + SQLite offline outbox mutation sync engine',
        'In-browser CDSS (Targeted Early Warning Score) risk triage',
        'Compliant with DOH 28-year records retention & RA 10173',
        'Secure inter-clinic patient handover with PIN gateways',
      ],
      stack: ['React 19 PWA', 'React Native', 'Dexie.js', 'SQLite', 'Express', 'WebSockets'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return (
    <section id="work" className="py-24 px-6 md:px-12 max-w-6xl mx-auto text-[#0a122a] relative">
      <div id="projects" className="relative -top-24" />
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
        <span>(02) — FLAGSHIP PROJECTS</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16 border-b border-black/10 pb-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#0a122a]">
            Software built for <em className="font-serif-italic text-blue-600 font-normal">high-stakes</em> reality.
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-light mt-2 max-w-xl">
            Real systems in clinical healthcare and emergency blood logistics where downtime isn&apos;t an inconvenience—it&apos;s critical.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400 uppercase">02 Flagship Deployments</span>
      </div>

      <div className="space-y-12">
        {projects.map((item) => (
          <Link
            key={item.id}
            href={`/detail/${item.id}`}
            className="block group p-6 sm:p-8 rounded-3xl border border-black/10 bg-white hover:border-black/25 hover:shadow-xl transition-all duration-300 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Preview Thumbnail */}
              <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-black/10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-white">
                  {item.num}
                </span>
              </div>

              {/* Details */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-blue-600 uppercase tracking-wider block mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0a122a] mb-3 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    <span>{item.name}</span>
                    <span className="text-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      ↗
                    </span>
                  </h3>
                  <p className="text-base text-slate-600 font-light leading-relaxed mb-5">
                    {item.desc}
                  </p>

                  {/* Key Milestones / Achievements */}
                  <div className="mb-5 space-y-1.5 text-xs font-mono text-slate-600">
                    {item.achievements.slice(0, 3).map((ach) => (
                      <div key={ach} className="flex items-center gap-2">
                        <span className="text-blue-600">✦</span>
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.stack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-slate-100 border border-black/5 text-xs font-mono text-slate-700 font-medium"
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
    </section>
  );
}
