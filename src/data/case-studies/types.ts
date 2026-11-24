export interface ClientFacts {
  name: string;
  industry: string;
  location: string;
  website: string;
  liveUrlLabel?: string;
}

export interface ChallengeTile {
  no: string;
  title: string;
  description: string;
}

export interface ApproachStep {
  no: string;
  title: string;
  description: string;
  tag?: string;
}

export interface DeviceShowcase {
  desktopImage: string;
  mobileImage?: string;
  urlDisplay: string;
  liveUrl: string;
}

export interface ColossalStat {
  value: string;
  label: string;
  detail: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
}

export interface MilestoneEvidence {
  title: string;
  honor: string;
  year: string;
  organization: string;
  image: string;
  caption: string;
}

export interface CaseStudy {
  id: string;
  routeId: string;
  num: string;
  name: string;
  tagline: string;
  category: string;
  executiveSummary: string;
  meta: {
    role: string;
    timeline: string;
    partnerOrClient: string;
    platform: string;
    stack: string[];
    liveUrl?: string;
    githubUrl?: string;
  };
  clientFacts: ClientFacts;
  challenges: ChallengeTile[];
  approachSteps: ApproachStep[];
  deviceShowcase: DeviceShowcase;
  whatWeBuilt: string[];
  numbers: ColossalStat[];
  testimonial: Testimonial;
  milestones?: MilestoneEvidence[];
  nextStudyId: string;
  nextStudyName: string;
}
