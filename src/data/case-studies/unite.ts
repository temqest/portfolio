import { CaseStudy } from './types';

export const UNITE_CASE_STUDY: CaseStudy = {
  id: 'unite',
  routeId: '1',
  num: '01 / 02',
  name: 'UNITE',
  tagline: 'Emergency Blood Bank Logistics & Real-Time Donor Mobilization',
  category: 'Healthcare Infrastructure · Emergency Logistics',
  executiveSummary:
    'A centralized blood unit inventory and donor mobilization platform connecting regional hospitals, blood centers, and volunteer donors in real time. Built in active clinical collaboration with Bicol Medical Center (BMC) to eliminate emergency transfusion stockouts across Camarines Sur and Camarines Norte.',
  meta: {
    role: 'Co-Founder & Lead Systems Architect',
    timeline: '2025 – Present',
    partnerOrClient: 'In active clinical collaboration with Bicol Medical Center (BMC)',
    platform: 'Web Portal & Mobile Client (Next.js 16, React Native, Supabase)',
    stack: ['Next.js 16', 'React Native', 'TypeScript', 'Node.js', 'Supabase RLS', 'PostgreSQL', 'Docker'],
    liveUrl: '#',
  },
  clientFacts: {
    name: 'UNITE & Bicol Medical Center (BMC)',
    industry: 'Healthcare Startup · Transfusion Medicine Logistics',
    location: 'Camarines Sur & Camarines Norte, Philippines',
    website: 'https://unite-health.ph',
    liveUrlLabel: 'Visit live portal',
  },
  challenges: [
    {
      no: '01',
      title: 'Finding blood takes hours of manual phone calls.',
      description:
        'During a midnight emergency, hospital staff must call facility after facility one by one to locate compatible blood units, wasting precious hours when every second counts.',
    },
    {
      no: '02',
      title: "Hospitals have no way to see each other's blood stock.",
      description:
        'Each healthcare facility keeps its blood inventory locked inside private spreadsheets or paper logbooks. No one has real-time regional visibility into available units.',
    },
    {
      no: '03',
      title: 'Blood units spoil quickly and donor tracking is manual.',
      description:
        'Platelets expire in 5 days, while whole blood donors must wait 90 days between donations. Without automated tracking, blood units spoil and donors are called at the wrong time.',
    },
  ],
  approachSteps: [
    {
      no: '01',
      title: 'Real-time component categorization across facilities.',
      description:
        'Rather than tracking generic blood units, UNITE categorizes live inventory into Packed Red Blood Cells (PRBC), Fresh Frozen Plasma (FFP), Platelets, and Cryoprecipitate, with automated shelf-life degradation counters visible to authorized medical staff.',
      tag: 'DATABASE SCHEMA',
    },
    {
      no: '02',
      title: 'Engine-level PostgreSQL Row-Level Security (RLS).',
      description:
        'To guarantee complete institutional privacy without brittle application middleware, cryptographic facility_id constraints are enforced directly at the database engine level. No facility can query or alter another hospital’s private records.',
      tag: 'SECURITY ARCHITECTURE',
    },
    {
      no: '03',
      title: 'Automated donor mobilization & dispatch algorithms.',
      description:
        'When a facility registers an emergency stockout, the platform calculates matching ABO and Rh factors, checks the statutory 90-day whole blood waiting period, and dispatches targeted push notifications to nearby verified donors.',
      tag: 'DISPATCH ENGINE',
    },
    {
      no: '04',
      title: 'Direct clinical validation with Bicol Medical Center.',
      description:
        'We designed data intake models directly alongside transfusion medicine doctors and medical technologists at BMC—the largest tertiary healthcare provider and blood center in the region—ensuring clinical workflows match emergency room realities.',
      tag: 'CLINICAL INTEGRATION',
    },
    {
      no: '05',
      title: 'Cross-platform field client in React Native.',
      description:
        'Equipped volunteer blood drive organizers with an offline-tolerant mobile client for recording field donor vitals, screening questionnaires, and bag barcodes directly at community blood donation drives.',
      tag: 'MOBILE CLIENT',
    },
    {
      no: '06',
      title: 'Production Dockerized Next.js 16 deployment.',
      description:
        'Deployed with sub-100ms edge rendering, real-time Supabase replication sockets, and automated database backups satisfying Philippine health record compliance regulations.',
      tag: 'CLOUD INFRASTRUCTURE',
    },
  ],
  deviceShowcase: {
    desktopImage: '/assets/projects/unite.png',
    mobileImage: '/assets/projects/unite.png',
    urlDisplay: 'https://unite-health.ph/dashboard/inventory',
    liveUrl: '#',
  },
  whatWeBuilt: [
    'Real-time blood component inventory tracker by PRBC, FFP, Platelets, and Whole Blood',
    'PostgreSQL Row-Level Security (RLS) multi-tenant facility isolation engine',
    'Automated ABO/Rh emergency donor matching and geolocated dispatch broadcasts',
    'Statutory 90-day donation interval and hemoglobin screening validation logic',
    'Clinical transfusion intake workflows co-designed with Bicol Medical Center (BMC)',
    'Mobile blood drive coordination application in React Native for volunteer organizers',
    'Real-time WebSocket alerts for critical stockout thresholds across regional facilities',
    'Production Dockerized Next.js 16 portal with sub-100ms regional latency',
  ],
  numbers: [
    {
      value: '< 45s',
      label: 'Emergency Dispatch Latency',
      detail: 'Replaced multi-hour manual phone trees during critical transfusion emergencies',
    },
    {
      value: '4 Types',
      label: 'Blood Component Tracking',
      detail: 'Granular tracking across PRBC, FFP, Platelet Concentrates, and Cryoprecipitate',
    },
    {
      value: '100%',
      label: 'Tenant Data Isolation',
      detail: 'PostgreSQL Row-Level Security ensuring proprietary patient & unit confidentiality',
    },
    {
      value: 'BMC Tier',
      label: 'Institutional Validation',
      detail: 'Validated with the largest blood center in Camarines Sur & Camarines Norte',
    },
  ],
  testimonial: {
    quote:
      'UNITE addresses a critical operational gap in provincial blood logistics. Having real-time visibility into blood component stockouts and donor pipelines transforms how regional hospitals coordinate emergency transfusions.',
    author: 'Transfusion Medicine Department',
    role: 'Clinical Collaboration Partners',
    organization: 'Bicol Medical Center (BMC)',
    image: '/assets/projects/bmc-team.jpg',
    imageCaption: 'On-site clinical co-design and workflow validation with Bicol Medical Center doctors and transfusion medicine staff',
  },
  milestones: [
    {
      title: 'Bicol Medical Center Clinical Partnership',
      honor: 'Clinical Collaboration & Co-Design',
      year: '2025 – Present',
      organization: 'Bicol Medical Center (BMC) Transfusion Medicine Dept',
      image: '/assets/projects/bmc-team.jpg',
      caption: 'Direct on-site clinical consultation with hospital doctors and transfusion staff to validate emergency blood allocation workflows',
    },
    {
      title: 'SparkLAB Hackathon 2025',
      honor: '1st Place Grand Champion',
      year: '2025',
      organization: 'SparkLAB Innovation & Regional Startup Hackathon',
      image: '/assets/projects/hackaton-1.jpg',
      caption: 'Pitching and demonstrating UNITE real-time inventory allocation under live judging',
    },
    {
      title: 'DICT Philippine Startup Challenge',
      honor: '3rd Runner Up (Regional Finals)',
      year: '2026',
      organization: 'Department of Information & Communications Technology (DICT Region V)',
      image: '/assets/projects/startupchallengeDICT.jpg',
      caption: 'Recognized by DICT for regional healthcare logistics innovation and technical infrastructure',
    },
    {
      title: 'ADNU MAGIS TBI Incubation',
      honor: 'Incubation Graduate',
      year: '2025 – 2026',
      organization: 'Ateneo de Naga University — Technology Business Incubator',
      image: '/assets/projects/magisTBI.jpg',
      caption: 'Completed incubation, venture acceleration, customer discovery, and legal governance',
    },
    {
      title: 'CEELI UNC FLIP Startup Competition',
      honor: 'Top 8 Finalist',
      year: '2026',
      organization: 'Center for Entrepreneurship & Innovation (UNC)',
      image: '/assets/projects/flip.jpg',
      caption: 'Selected among top collegiate startup ventures for measurable social health impact',
    },
    {
      title: 'Idea2Startup Naga City',
      honor: 'Semi-Finalist',
      year: '2026',
      organization: 'City Government of Naga & Startup Ecosystem Partners',
      image: '/assets/projects/idea2Startup.jpg',
      caption: 'Advanced to regional cohort pitch in municipal innovation initiative',
    },
  ],
  systemViews: [
    {
      title: 'Hospital Operations Command Center',
      category: 'Clinical Operations',
      urlDisplay: 'https://unite-health.ph/dashboard',
      image: '/assets/projects/unite-dashboard.png',
      description: 'Central hospital administrator portal tracking daily operational focus items, critical blood threshold alerts, event schedules, and upcoming drives.',
    },
    {
      title: 'Regional Donation Coverage GIS Map',
      category: 'Geospatial Analytics',
      urlDisplay: 'https://unite-health.ph/dashboard/coverage-map',
      image: '/assets/projects/unite-coverage-map.jpg',
      description: 'Interactive municipality-level boundary mapping tracking donation service coverage, target progress (e.g. Baao at 73%), and regional supply deficit zones across Camarines Sur.',
    },
    {
      title: 'Real-Time Blood Component Inventory',
      category: 'Inventory Logistics',
      urlDisplay: 'https://unite-health.ph/dashboard/inventory',
      image: '/assets/projects/unite-blood-inventory.png',
      description: 'Granular component-level tracking (PRBC, FFP, Platelets) across 8 blood groups (A+, A-, B+, B-, AB+, AB-, O+, O-) with automated critical threshold warnings.',
    },
    {
      title: 'Mobile Donor & Field Drive Client',
      category: 'Mobile Application',
      urlDisplay: 'iOS / Android Native Client',
      image: '/assets/projects/unite-mobile-app.jpg',
      description: 'Cross-platform mobile client for volunteer donors featuring geolocated drive discovery, proximity alerts, and instant appointment booking.',
    },
  ],
  nextStudyId: '2',
  nextStudyName: 'ap-silang (Municipal Maternal EMR)',
};
