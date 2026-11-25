import { CaseStudy } from './types';

export const AP_SILANG_CASE_STUDY: CaseStudy = {
  id: 'apsilang',
  routeId: '2',
  num: '02 / 03',
  name: 'ap-silang',
  tagline: 'Offline-First Municipal Maternal Healthcare & Clinical EMR Platform',
  category: 'Clinical EMR · Distributed Edge Computing',
  executiveSummary:
    'An offline-first municipal electronic medical record (EMR) platform engineered to ensure zero-data-loss clinical care continuity for rural health midwives operating in mountain barangays with volatile or zero cellular connectivity.',
  meta: {
    role: 'Capstone Lead Architect & Full-Stack Developer',
    timeline: '2024 – 2025',
    partnerOrClient: 'Rural Health Units (RHU), Barangay Health Stations (BHS) & Field Midwives',
    platform: 'Progressive Web App & Mobile Field Client (React 19, React Native, Dexie.js)',
    stack: ['React 19 PWA', 'React Native', 'Dexie.js', 'SQLite', 'Express', 'Node.js', 'WebSockets', 'Tailwind CSS'],
    liveUrl: '#',
  },
  clientFacts: {
    name: 'Municipal Rural Health Units & Field Midwives',
    industry: 'Public Health Informatics · Municipal Maternal Care',
    location: 'Decentralized Rural Health Stations & Mountain Barangays',
    website: 'https://apsilang-emr.ph',
    liveUrlLabel: 'Visit live system',
  },
  challenges: [
    {
      no: '01',
      title: 'No internet connection in remote mountain villages.',
      description:
        'Midwives frequently hike hours into highland communities with complete network blackouts. Standard cloud-based health apps freeze and fail to save patient records.',
    },
    {
      no: '02',
      title: 'Offline medical records clash and risk being lost.',
      description:
        'When multiple field workers update maternal consultation records while disconnected, reconnecting causes data overwrites that can erase critical prenatal vitals and care histories.',
    },
    {
      no: '03',
      title: 'Paper forms cause fatal delays in high-risk pregnancies.',
      description:
        'Relying on handwritten paper charts causes weeks of delay before municipal doctors can review maternal complications and arrange timely emergency hospital transfers.',
    },
  ],
  approachSteps: [
    {
      no: '01',
      title: 'Deterministic append-only outbox mutation journal.',
      description:
        'All patient visits, vital signs, and clinical evaluations write to a local IndexedDB outbox queue via Dexie.js in under 4ms. Clinical workers never experience input lag or freezing screens regardless of signal status.',
      tag: 'OUTBOX ENGINE',
    },
    {
      no: '02',
      title: 'Priority-weighted mutation reconciliation engine.',
      description:
        'When a device detects restored connectivity, a custom sync worker serializes pending mutations into priority tiers: Emergency Clinical Triage syncs first, followed by prescriptions, vitals, and demographic updates.',
      tag: 'SYNC PROTOCOL',
    },
    {
      no: '03',
      title: 'Client-side Targeted Early Warning Score (TEWS) triage.',
      description:
        'Implemented an in-browser deterministic Clinical Decision Support System (CDSS). As systolic/diastolic pressure, pulse, and fetal heart tones are entered, risk scores compute in <1ms without requiring server roundtrips.',
      tag: 'CLINICAL CDSS',
    },
    {
      no: '04',
      title: 'Secure PIN-gated inter-clinic referral handover gateways.',
      description:
        'Built an encrypted referral workflow allowing midwives in remote stations to package a patient’s full clinical trajectory for emergency ambulance transfer to the municipal hospital, unlocked via tamper-evident security PINs.',
      tag: 'REFERRAL GATEWAY',
    },
    {
      no: '05',
      title: 'SQLite-backed mobile field client in React Native.',
      description:
        'Provided field midwives with a ruggedized mobile companion application storing offline demographic registries in local SQLite databases, surviving device reboots and low battery power cutoffs.',
      tag: 'MOBILE RUNTIME',
    },
    {
      no: '06',
      title: 'Statutory DOH 28-year compliance and audit logs.',
      description:
        'Every mutation journal record is cryptographically timestamped and stored in an append-only ledger, guaranteeing complete data provenance and compliance with Philippine health privacy laws.',
      tag: 'REGULATORY COMPLIANCE',
    },
  ],
  deviceShowcase: {
    desktopImage: '/assets/projects/silang.png',
    mobileImage: '/assets/projects/silang.png',
    urlDisplay: 'https://apsilang-emr.ph/clinical/triage',
    liveUrl: '#',
  },
  whatWeBuilt: [
    'Dexie.js IndexedDB append-only outbox sync engine for web Progressive Web Apps (PWA)',
    'SQLite mobile local store in React Native surviving complete device battery shutdowns',
    'Deterministic in-browser Targeted Early Warning Score (TEWS) clinical risk calculation',
    'Priority-weighted sync reconciliation queue (Emergency Triage > Prescriptions > Vitals)',
    'PIN-gated encrypted inter-clinic referral handover gateway for emergency transport',
    'Full offline demographic intake and gestational age calculation engines',
    'Compliant with Philippine Department of Health (DOH) 28-year maternal record retention',
    '100% data retention verified during total simulated network blackouts',
  ],
  numbers: [
    {
      value: '< 4ms',
      label: 'Local Outbox Mutation Latency',
      detail: 'Deterministic local writes to Dexie.js / SQLite; zero freeze or input latency in the field',
    },
    {
      value: '100%',
      label: 'Zero-Connectivity Retention',
      detail: 'Full clinical consultation records persist indefinitely during extended power & cellular blackouts',
    },
    {
      value: '28 Years',
      label: 'Statutory Retention Horizon',
      detail: 'Engineered in strict compliance with Philippine Department of Health (DOH) maternal guidelines',
    },
    {
      value: '< 1ms',
      label: 'Client-Side CDSS Triage',
      detail: 'In-browser Targeted Early Warning Score (TEWS) risk triage computed without server roundtrips',
    },
  ],
  testimonial: {
    quote:
      'In remote mountain barangays where power and signal fail daily, ap-silang ensures midwives never lose a single patient record. The offline outbox and immediate risk scoring provide real clinical continuity.',
    author: 'Municipal Health Healthcare Workers',
    role: 'Rural Health Unit Stakeholders',
    organization: 'Municipal Maternal Health Platform',
  },
  systemViews: [
    {
      title: 'Maternal Patient Record & TEWS Clinical Triage',
      category: 'Clinical Decision Support',
      urlDisplay: 'https://apsilang-emr.ph/clinical/maternal-records',
      image: '/assets/projects/silang-maternal-record.png',
      description:
        'Patient-level consultation dashboard featuring deterministic client-side Targeted Early Warning Score (TEWS) risk triage, vital signs trajectory, and gestational timeline tracking with zero server latency.',
    },
    {
      title: 'Inter-Clinic Referral Queue & Handover Codes',
      category: 'Referral Gateway',
      urlDisplay: 'https://apsilang-emr.ph/operations/referrals',
      image: '/assets/projects/silang-referrals-queue.png',
      description:
        'Central referral coordination table managing high-risk pregnancy transfers, secure one-click transfer codes, and verified routing between municipal health stations and tertiary facilities like Bicol Medical Center.',
    },
    {
      title: 'Emergency Clinical Handover & Vitals Dossier',
      category: 'Hospital Integration',
      urlDisplay: 'https://apsilang-emr.ph/referrals/detail',
      image: '/assets/projects/silang-referral-detail.png',
      description:
        'Structured patient transfer view bundling real-time maternal vitals, chief complaints, and PIN-gated acceptance workflows for receiving hospital doctors and emergency teams.',
    },
    {
      title: 'Municipal Clinic Operations & Prenatal Calendar',
      category: 'Schedule & Operations',
      urlDisplay: 'https://apsilang-emr.ph/operations/appointments',
      image: '/assets/projects/silang-appointments-calendar.png',
      description:
        'Synchronized municipal scheduling grid coordinating routine prenatal visits, midwife field schedules, and patient follow-ups across decentralized rural barangays.',
    },
  ],
  nextStudyId: '3',
  nextStudyName: 'RTC Clearance Express (Iriga Hall of Justice)',
};
