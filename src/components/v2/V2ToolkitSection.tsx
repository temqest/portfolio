'use client';

import React from 'react';

export function V2ToolkitSection() {
  const tools = [
    {
      category: 'Frontend',
      title: 'Interfaces',
      skills: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'JavaScript / TypeScript', 'HTML / CSS', 'Framer Motion'],
    },
    {
      category: 'Backend',
      title: 'Logic & APIs',
      skills: ['Node.js', 'Express', 'PHP', 'JWT Auth', 'REST APIs', 'Nodemailer', 'Kotlin'],
    },
    {
      category: 'Data',
      title: 'Storage & DB',
      skills: ['PostgreSQL', 'Prisma ORM', 'MongoDB', 'Firebase', 'Firestore', 'Supabase'],
    },
  ];

  return (
    <section id="stack" className="py-24 px-6 md:px-12 max-w-6xl mx-auto text-[#0a122a]">
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
        <span>(02) — TOOLKIT</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-14">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#0a122a]">
          Tools used to ship <em className="font-serif-italic text-blue-600 font-normal">resilient</em> software.
        </h2>
        <span className="text-xs font-mono text-slate-500 uppercase">Production proven stack</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-slate-200/80 p-1 rounded-3xl border border-black/10 overflow-hidden shadow-sm">
        {tools.map((col) => (
          <div
            key={col.category}
            className="bg-white p-8 md:p-10 flex flex-col justify-between hover:bg-slate-50/70 transition-colors"
          >
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-2">
                {col.category}
              </span>
              <h3 className="text-2xl font-semibold tracking-tight text-[#0a122a] mb-6">
                {col.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {col.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 border border-black/5 text-xs font-mono text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
