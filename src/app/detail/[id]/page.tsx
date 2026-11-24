import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface ProjectDetail {
  id: string;
  num: string;
  name: string;
  category: string;
  role: string;
  platform: string;
  builtFor: string;
  stack: string[];
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  images: { url: string; caption: string }[];
}

const PROJECTS_DATA: Record<string, ProjectDetail> = {
  '1': {
    id: '1',
    num: '01 / 02',
    name: 'UNITE',
    category: 'Healthcare Startup · Blood Logistics',
    role: 'Co-Founder & Lead Systems Architect',
    platform: 'Web Portal & Mobile Application (Next.js, React Native, Supabase)',
    builtFor: 'Regional Blood Centers, Hospital Transfusion Units & Volunteer Donors',
    stack: ['Next.js 16', 'React Native', 'TypeScript', 'Node.js', 'Supabase RLS', 'PostgreSQL', 'Docker'],
    summary:
      'A centralized digital blood bank inventory and donor mobilization platform connecting hospital transfusion units, regional blood centers, and volunteer donors in real time to prevent life-threatening blood shortages.',
    problem:
      'Hospitals and regional blood banks in the Bicol region face chronic coordination delays during critical emergencies. Blood inventory is tracked on fragmented physical ledgers or disconnected sheets, resulting in delayed transfusions, emergency donor search delays, and preventable blood wastage.',
    solution:
      'Architected a multi-tenant operational platform featuring live blood unit inventory tracking by blood component (PRBC, FFP, Platelets), automated donor eligibility attribution, emergency dispatch broadcasts, and granular Row-Level Security (RLS) ensuring strict cross-facility data privacy. Validated through direct institutional collaboration with Bicol Medical Center (BMC), the largest blood bank provider in Camarines Sur and Camarines Norte.',
    impact: '1st Place Winner at SparkLAB Hackathon 2025; 3rd Runner Up at DICT Philippine Startup Challenge (PSC) Regional Finals; successfully completed ADNU MAGIS TBI incubation; CEELI UNC FLIP Startup Top 8 Finalist; Idea2Startup Naga City Semi-Finalist.',
    images: [
      {
        url: '/assets/projects/unite.png',
        caption: '01 — Real-Time Multi-Tenant Blood Unit Inventory Dashboard',
      },
      {
        url: '/assets/projects/bmc.png',
        caption: '02 — Institutional Transfusion Medicine Partnership with Bicol Medical Center',
      },
      {
        url: '/assets/projects/hackaton-1.jpg',
        caption: '03 — 1st Place Grand Champions at SparkLAB Hackathon 2025',
      },
      {
        url: '/assets/projects/startupchallengeDICT.jpg',
        caption: '04 — 3rd Runner Up at DICT Philippine Startup Challenge Regional Finals',
      },
      {
        url: '/assets/projects/flip.jpg',
        caption: '05 — CEELI UNC FLIP Startup Competition Top 8 Finalist',
      },
      {
        url: '/assets/projects/idea2Startup.jpg',
        caption: '06 — Idea2Startup Naga City Regional Cohort Pitch',
      },
    ],
  },
  '2': {
    id: '2',
    num: '02 / 02',
    name: 'ap-silang',
    category: 'Municipal Healthcare · Clinical EMR',
    role: 'Capstone Lead Architect & Full-Stack Developer',
    platform: 'Progressive Web App & Mobile Field Client (React 19, React Native, Dexie.js)',
    builtFor: 'Municipal Rural Health Units (RHU), Barangay Health Stations (BHS) & Midwives',
    stack: ['React 19 PWA', 'React Native', 'Dexie.js', 'SQLite', 'Express', 'Node.js', 'WebSockets', 'Tailwind CSS'],
    summary:
      'An offline-first municipal maternal healthcare and electronic medical records (EMR) platform engineered to guarantee clinical care continuity in rural areas with volatile or zero cellular connectivity.',
    problem:
      'Rural midwives and healthcare workers frequently operate in remote barangays with no internet. Traditional cloud-only EMR systems freeze and drop consultation records, leaving high-risk pregnant mothers without medical oversight and violating national DOH record-keeping requirements.',
    solution:
      'Engineered an offline-first synchronization engine using Dexie.js on the web PWA and SQLite on mobile. All clinical vitals, pregnancy visits, and prescriptions write to a local outbox in <8ms and automatically reconcile via priority-weighted mutation queues when connectivity returns. Built an in-browser deterministic CDSS (Targeted Early Warning Score / TEWS) risk triage engine and secure PIN-gated inter-clinic referral handover gateways.',
    impact: 'Compliant with DOH 28-year maternal record retention and Philippine Data Privacy Act (RA 10173); 100% data retention during complete network blackouts across municipal health stations.',
    images: [
      {
        url: '/assets/projects/silang.png',
        caption: '01 — Clinical Dashboard with TEWS Maternal Risk Triage Alerts',
      },
      {
        url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop',
        caption: '02 — Offline Outbox Sync Engine & In-Browser Mutation Replay',
      },
      {
        url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
        caption: '03 — Inter-Clinic Referral & Secure Handover Gateway with PIN Unlock',
      },
    ],
  },
  '3': {
    id: '3',
    num: '01 / 02',
    name: 'UNITE',
    category: 'Healthcare Startup · Blood Logistics',
    role: 'Co-Founder & Lead Systems Architect',
    platform: 'Web Portal & Mobile Application',
    builtFor: 'Regional Blood Centers & Transfusion Units',
    stack: ['Next.js 16', 'React Native', 'TypeScript', 'Node.js', 'Supabase RLS', 'PostgreSQL'],
    summary: 'Centralized blood bank logistics platform with real-time multi-tenant inventory tracking.',
    problem: 'Emergency blood shortages and slow coordination between regional facilities.',
    solution: 'Live blood component inventory with automated donor dispatch and enterprise RLS security.',
    impact: '1st Place SparkLAB Hackathon 2025; Partnered with Bicol Medical Center (BMC).',
    images: [{ url: '/assets/projects/unite.png', caption: 'UNITE Platform' }],
  },
  '4': {
    id: '4',
    num: '02 / 02',
    name: 'ap-silang',
    category: 'Municipal Healthcare · Clinical EMR',
    role: 'Capstone Lead Architect & Developer',
    platform: 'PWA & Mobile App',
    builtFor: 'Rural Health Units & Barangay Stations',
    stack: ['React 19 PWA', 'React Native', 'Dexie.js', 'SQLite', 'Express'],
    summary: 'Offline-first municipal maternal EMR platform with CDSS TEWS risk triage.',
    problem: 'Rural clinics with zero connectivity losing critical patient records.',
    solution: 'Dexie.js + SQLite offline outbox mutation sync engine and deterministic risk scoring.',
    impact: 'Compliant with DOH 28-year retention rules and RA 10173 Data Privacy Act.',
    images: [{ url: '/assets/projects/silang.png', caption: 'ap-silang Clinical Platform' }],
  },
  '5': {
    id: '5',
    num: '01 / 02',
    name: 'UNITE',
    category: 'Healthcare Startup',
    role: 'Co-Founder',
    platform: 'Web & Mobile',
    builtFor: 'Hospitals & Blood Donors',
    stack: ['Next.js', 'React Native', 'Supabase'],
    summary: 'Blood bank logistics platform.',
    problem: 'Blood shortages and coordination delays.',
    solution: 'Real-time component tracking.',
    impact: '1st Place SparkLAB Hackathon 2025.',
    images: [{ url: '/assets/projects/unite.png', caption: 'UNITE' }],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS_DATA[id];
  if (!project) return { title: 'Case Study — Patrick' };
  return {
    title: `${project.name} Case Study — Patrick`,
    description: project.summary,
  };
}

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }];
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECTS_DATA[id];

  if (!project) {
    notFound();
  }

  const nextId = id === '1' ? '2' : '1';

  return (
    <div className="min-h-screen bg-white text-[#0a122a] selection:bg-blue-100 selection:text-blue-900 font-sans pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-black/5 px-6 md:px-12 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/#work"
            className="text-xs font-mono uppercase tracking-wider text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
          >
            <span>←</span>
            <span>All projects</span>
          </Link>
          <span className="text-xs font-mono text-slate-400">{project.num}</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 uppercase tracking-widest">
            {project.category}
          </span>
          <span className="text-xs font-mono text-slate-400">Case Study {id}</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#0a122a] mb-8">
          {project.name}
        </h1>

        <p className="text-xl md:text-2xl font-light leading-relaxed text-slate-700 max-w-4xl mb-14">
          {project.summary}
        </p>

        {/* Architectural Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-slate-50 border border-black/10">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5">
              Role
            </span>
            <p className="text-sm font-medium text-[#0a122a] leading-snug">{project.role}</p>
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5">
              Platform
            </span>
            <p className="text-sm font-medium text-[#0a122a] leading-snug">{project.platform}</p>
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5">
              Built For
            </span>
            <p className="text-sm font-medium text-[#0a122a] leading-snug">{project.builtFor}</p>
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5">
              Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-white border border-black/10 text-xs font-mono text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deep Narrative Sections */}
      <section className="py-12 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="p-8 rounded-3xl border border-black/10 bg-white shadow-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-500 block mb-3">
              01 — The Challenge
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-[#0a122a] mb-4">
              Real-World Constraints
            </h3>
            <p className="text-base text-slate-600 font-light leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-black/10 bg-white shadow-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-600 block mb-3">
              02 — The Approach
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-[#0a122a] mb-4">
              Architectural Solution
            </h3>
            <p className="text-base text-slate-600 font-light leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Quantified Impact Banner */}
        <div className="p-8 md:p-10 rounded-3xl bg-[#060a18] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16 shadow-xl">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2">
              Verified Production Outcome
            </span>
            <h3 className="text-2xl md:text-3xl font-light">{project.impact}</h3>
          </div>
          <span className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs uppercase tracking-wider border border-emerald-500/30 whitespace-nowrap">
            ● Shipped to Production
          </span>
        </div>

        {/* Showcase Gallery */}
        <div className="space-y-12">
          {project.images.map((img, idx) => (
            <div key={idx} className="rounded-3xl overflow-hidden border border-black/10 shadow-lg">
              <img src={img.url} alt={img.caption} className="w-full h-[450px] object-cover" />
              <div className="p-4 bg-slate-50 border-t border-black/5 text-xs font-mono text-slate-600">
                {img.caption}
              </div>
            </div>
          ))}
        </div>

        {/* Next Case Study Navigation */}
        <div className="mt-20 pt-12 border-t border-black/10 flex items-center justify-between">
          <Link
            href="/#work"
            className="text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-blue-600"
          >
            ← Back to all projects
          </Link>
          <Link
            href={`/detail/${nextId}`}
            className="px-6 py-3 rounded-full bg-[#0a122a] text-white text-xs font-mono uppercase tracking-wider hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <span>Next Case Study</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
