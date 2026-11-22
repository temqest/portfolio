import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    num: '01 / 05',
    name: 'GymTrack',
    category: 'Gym Management',
    role: 'Solo Project: Architecture, UI/UX, Backend & Database',
    platform: 'Web Application (React 19, Vite, Node.js)',
    builtFor: 'Independent Gym Owners, Front-Desk Staff & Trainers',
    stack: ['React', 'Vite', 'Node.js', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS'],
    summary:
      'A full-stack fitness facility management engine engineered to replace fragmented paper logs with real-time occupancy metrics, self-service QR check-ins, and flexible membership tiers.',
    problem:
      'Peak-hour queues at the check-in desk were causing 10-15 minute delays, manual attendance ledger sheets frequently went missing, and staff had zero visibility into real-time equipment congestion.',
    solution:
      'Designed an offline-resilient kiosk interface with instant sub-second QR code scanning, a synchronized live occupancy dashboard via WebSockets, and an administrative portal allowing owners to adjust tier pricing and trainer schedules in real time.',
    impact: 'Reduced front-desk check-in time by 82% and automated membership expiration renewals with zero manual data entry.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
        caption: '01 — Live Floor Dashboard & Occupancy Metrics',
      },
      {
        url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop',
        caption: '02 — Self-Service QR Kiosk & Member Roster',
      },
      {
        url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop',
        caption: '03 — Subscription Tier Editor & Automated Billing',
      },
    ],
  },
  '2': {
    id: '2',
    num: '02 / 05',
    name: 'Faculty Evaluation System',
    category: 'Academic Analytics',
    role: 'Solo Lead Developer & Database Architect',
    platform: 'Android App & Institutional Web Dashboard',
    builtFor: 'Northwest Samar State University (NwSSU) Faculty & Students',
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Room DB', 'Node.js'],
    summary:
      'An end-to-end evaluation suite designed to streamline student evaluations of academic instructors, computing verified composite scores and departmental grade distributions automatically.',
    problem:
      'Scantron sheets and manual questionnaire tallying took up to 6 weeks per semester, resulting in delayed accreditation reports and high data entry error rates.',
    solution:
      'Created a native mobile client with zero-trust token authentication ensuring each student can only evaluate enrolled subjects once, paired with automated aggregate statistics and exportable dean reports.',
    impact: 'Processed 8,400+ student evaluations with instant compilation upon semester close.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
        caption: '01 — Departmental Evaluation Summary & Composite Scoring',
      },
      {
        url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200&auto=format&fit=crop',
        caption: '02 — Student Mobile Assessment Workflow & Verification',
      },
    ],
  },
  '3': {
    id: '3',
    num: '03 / 05',
    name: 'Bantay POS',
    category: 'Retail & POS',
    role: 'Solo Mobile & Database Engineer',
    platform: 'Tablet POS (React Native & Expo)',
    builtFor: 'Small Retail Shops & Micro-Enterprises',
    stack: ['React Native', 'Expo', 'SQLite', 'TypeScript', 'Bluetooth Thermal Printing'],
    summary:
      'An offline-first point-of-sale terminal built for tablets, supporting fast barcode lookup, daily cash drawer reconciliation, low-stock notifications, and Bluetooth receipt printing.',
    problem:
      'Unreliable neighborhood internet connections caused cloud-only POS systems to freeze during customer transactions, leading to lost sales.',
    solution:
      'Architected a fully local SQLite cache that operates 100% offline and background-syncs delta transactions whenever an internet handshake is re-established.',
    impact: 'Zero transaction failures during network blackouts across 12 pilot retail locations.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556742049-0a67e557224d?q=80&w=1200&auto=format&fit=crop',
        caption: '01 — Register Interface & Quick SKU Lookup',
      },
      {
        url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop',
        caption: '02 — Daily Cash Drawer Shift Reconciliation',
      },
    ],
  },
  '4': {
    id: '4',
    num: '04 / 05',
    name: 'Appoint',
    category: 'Parish Administration',
    role: 'Full-Stack Developer & Product Designer',
    platform: 'Web App & SMS Dispatch Engine',
    builtFor: 'Church Clergy, Office Administrators & Parishioners',
    stack: ['React', 'Vite', 'Node.js', 'PostgreSQL', 'Twilio API'],
    summary:
      'A streamlined booking engine connecting parishioners with church offices for sacramental appointments, marriage counselling, and memorial services with automated SMS reminders.',
    problem:
      'Office volunteers were double-booking priests and relying on paper calendar notebooks that were prone to scheduling conflicts.',
    solution:
      'Delivered a shared real-time calendar with configurable slot limits, automated priest SMS alerts, and parishioner self-service cancellation links.',
    impact: 'Eliminated double-bookings entirely and reduced appointment no-shows by 65%.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop',
        caption: '01 — Parish Master Calendar & Service Scheduling',
      },
    ],
  },
  '5': {
    id: '5',
    num: '05 / 05',
    name: 'Ambitpolong',
    category: 'Community Portal',
    role: 'Solo Developer & UI Designer',
    platform: 'Mobile Web App (PWA)',
    builtFor: 'Regional Church Youth Community',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Web Push'],
    summary:
      'A vibrant mobile-first youth app designed to engage young members through daily scripture reading plans, prayer request boards, event registrations, and announcements.',
    problem:
      'Important youth event announcements were getting buried in noisy social media group chats.',
    solution:
      'Created a focused progressive web app with push notifications, bookmarkable reflection notes, and ticket reservation passes for community camps.',
    impact: 'Achieved 88% active weekly engagement among 450+ registered youth participants.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop',
        caption: '01 — Community Feed & Scripture Reading Streak',
      },
    ],
  },
};

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

  const nextId = String((parseInt(id, 10) % 5) + 1);

  return (
    <div className="min-h-screen bg-white text-[#0a122a] selection:bg-blue-100 selection:text-blue-900 font-sans pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-black/5 px-6 md:px-12 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/v2#work"
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
            href="/v2#work"
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
