import { CaseStudy } from './types';

export const RTC_CLEARANCE_CASE_STUDY: CaseStudy = {
  id: 'rtc-clearance',
  routeId: '3',
  num: '03 / 03',
  name: 'RTC Clearance Express',
  tagline: 'Digital Court Clearance & Citizen Self-Registration System',
  category: 'Civic Tech · Judicial Workflow Digitization',
  executiveSummary:
    'A digital court clearance and citizen self-registration prototype for the Hall of Justice — Regional Trial Court (Iriga City), replacing manual paper logbooks with 3-minute online filing, QR pass lookup, and instant 8.5" × 13" certificate printing.',
  meta: {
    role: 'Prototype Architect & Full-Stack Developer',
    timeline: '2025',
    partnerOrClient: 'Hall of Justice — Regional Trial Court, Iriga City (Office of the Clerk of Court)',
    platform: 'Citizen Web Portal & Staff Counter Workstation (Next.js, TypeScript, Tailwind CSS)',
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'QR Pass Engine', 'Digital Registry'],
    liveUrl: '#',
  },
  clientFacts: {
    name: 'Regional Trial Court — Iriga City (Hall of Justice)',
    industry: 'Civic Tech · Judicial Records & Counter Operations',
    location: '5th Judicial Region, Iriga City, Camarines Sur',
    website: 'https://rtc-clearance-iriga.ph',
    liveUrlLabel: 'View prototype',
  },
  challenges: [
    {
      no: '01',
      title: 'Manual paper-based logging slows down every clearance request.',
      description:
        'Court staff relied on physical logbooks and handwritten or manually re-typed forms to track each applicant, making historical lookups slow and creating fragile paper trails.',
    },
    {
      no: '02',
      title: 'Long counter queues and hours of waiting for citizens.',
      description:
        'Applicants had to line up in person just to submit basic personal details and purpose of request, turning a routine court clearance into a multi-hour wait at the Hall of Justice.',
    },
    {
      no: '03',
      title: 'Repetitive manual typing and paper waste during issuance.',
      description:
        'Staff had to re-enter constituent details into certificate templates by hand, increasing typographical errors, consuming excessive paper, and bottlenecking counter throughput.',
    },
  ],
  approachSteps: [
    {
      no: '01',
      title: '4-step citizen self-registration portal with Tagalog support.',
      description:
        'Designed a mobile- and desktop-friendly self-service intake flow (01 Payment → 02 Details → 03 Preview → 04 QR Pass) so constituents can submit their Document Type, Purpose of Request, and Personal Identity Details in under 3 minutes before arriving at the counter.',
      tag: 'CITIZEN PORTAL',
    },
    {
      no: '02',
      title: 'Instant digital QR pass & real-time application tracking.',
      description:
        'Upon submitting an application and linking a payment receipt, citizens receive a unique digital QR pass and tracking ID—eliminating redundant counter intake interviews.',
      tag: 'QR WORKFLOW',
    },
    {
      no: '03',
      title: 'Priority-sorted Counter Workstation Queue for court clerks.',
      description:
        'Built an Official Staff Workspace featuring live operational metrics (Pending Action, Certificates Issued, Total Logged Volume) and a priority-sorted queue that automatically surfaces paid applications needing immediate print and seal.',
      tag: 'STAFF WORKSTATION',
    },
    {
      no: '04',
      title: 'Quick QR Scanner for rapid counter lookup and verification.',
      description:
        'Clerks can scan an applicant’s digital QR pass directly from the workstation header to pull up their verified record immediately, cutting counter lookup time down to seconds.',
      tag: 'COUNTER SPEED',
    },
    {
      no: '05',
      title: 'Centralized digital Clearance Registry replacing paper logbooks.',
      description:
        'Every online self-registration and walk-in entry is persisted in a structured digital database with Doc IDs, constituent addresses, purposes, and release statuses—making past records searchable without flipping through physical binders.',
      tag: 'DIGITAL DATABASE',
    },
    {
      no: '06',
      title: 'Live 8.5" × 13" Official RTC Certificate preview & print engine.',
      description:
        'Engineered a synchronized split-pane Clearance Form Controls and Live Clearance Preview matching the official Republic of the Philippines Regional Trial Court (5th Judicial Region, Iriga City) certificate layout, ready for one-click printing.',
      tag: 'DOCUMENT ENGINE',
    },
  ],
  deviceShowcase: {
    desktopImage: '/assets/projects/rtc-clearance-hero.png',
    mobileImage: '/assets/projects/rtc-clearance-queue.png',
    urlDisplay: 'https://rtc-clearance-iriga.ph/',
    liveUrl: '#',
  },
  whatWeBuilt: [
    'Citizen self-registration portal with 4-step guided intake (Payment, Details, Preview, QR Pass)',
    'Bilingual English / Tagalog interface toggle for accessible constituent filing',
    'Instant digital QR pass generation and self-service application status tracker',
    'Priority-sorted Staff Counter Workstation Queue surfacing paid, ready-to-print requests',
    'Quick QR Scanner modal for instant applicant record retrieval at Counter 03',
    'Structured digital Clearance Registry replacing manual paper logbooks',
    'Live 8.5" × 13" Official RTC Certificate previewer with editable court and applicant controls',
    'One-click print & reprint workflow with release status tracking (Pending vs. Printed & Released)',
  ],
  numbers: [
    {
      value: '~3 min',
      label: 'Citizen Self-Filing Time',
      detail: 'Constituents complete their clearance application online before reaching the counter',
    },
    {
      value: '4 Steps',
      label: 'Guided Intake Flow',
      detail: 'Structured Payment, Details, Preview, and QR Pass pipeline with zero guesswork',
    },
    {
      value: '100%',
      label: 'Digital Record Traceability',
      detail: 'Every issued and pending clearance is indexed by Doc ID in a searchable staff registry',
    },
    {
      value: '8.5"×13"',
      label: 'Print-Ready Court Format',
      detail: 'Live official RTC certificate preview eliminates manual re-typing and paper reprints',
    },
  ],
  testimonial: {
    quote:
      'Replacing handwritten logbooks with citizen self-registration and instant QR counter lookup dramatically reduces lobby wait times while keeping every Regional Trial Court clearance record organized and ready for immediate printing.',
    author: 'Iriga Hall of Justice Prototype',
    role: 'Office of the Clerk of Court Workflow',
    organization: 'Regional Trial Court — 5th Judicial Region, Iriga City',
  },
  systemViews: [
    {
      title: 'Citizen Self-Service Landing Portal',
      category: 'Public Intake',
      urlDisplay: 'https://rtc-clearance-iriga.ph/',
      image: '/assets/projects/rtc-clearance-hero.png',
      description:
        'Clean public portal with Tagalog toggle, application status tracking, and a 3-minute guided self-registration entry point.',
    },
    {
      title: '4-Step Clearance Application Form',
      category: 'Self-Registration',
      urlDisplay: 'https://rtc-clearance-iriga.ph/apply/details',
      image: '/assets/projects/rtc-clearance-form.png',
      description:
        'Step-by-step constituent intake capturing Document Type, Purpose of Request, and Personal Identity Details with progress tracking.',
    },
    {
      title: 'Staff Counter Workstation Queue',
      category: 'Staff Workspace',
      urlDisplay: 'https://rtc-clearance-iriga.ph/staff/dashboard',
      image: '/assets/projects/rtc-clearance-queue.png',
      description:
        'Real-time counter dashboard showing Pending Action, Certificates Issued, Total Logged Volume, Quick QR Scan, and priority-sorted queue.',
    },
    {
      title: 'Live 8.5" × 13" Official Certificate Preview',
      category: 'Document Engine',
      urlDisplay: 'https://rtc-clearance-iriga.ph/staff/document',
      image: '/assets/projects/rtc-clearance-preview.jpg',
      description:
        'Split-pane Clearance Form Controls and live official Regional Trial Court certificate preview ready for instant Save & Print.',
    },
  ],
  nextStudyId: '1',
  nextStudyName: 'UNITE (Blood Logistics Platform)',
};
