export interface CaseStudy {
  id: string;
  number: string;
  client: string;
  category: string;
  role: string;
  context: string;
  description: string;
  metrics: string[];
  tags: string[];
}

export interface OwnApp {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  status: string;
  link: string;
  color: string;
}

export interface ServiceTab {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  example: string;
  deliverables: string[];
}

export interface ProcessStage {
  number: string;
  name: string;
  tagline: string;
  detail: string;
}

export interface Testimonial {
  initials: string;
  author: string;
  role: string;
  company: string;
  headline: string;
  quote: string;
}

export interface StoryChapter {
  chapter: string;
  title: string;
  lead: string;
  body: string;
  hint: string;
}

export const PORTFOLIO_DATA = {
  name: "Inacio Nakiti",
  role: "Frontend Engineer & Shopify Plus Specialist",
  locations: "Cape Town, SA & London, UK Remote",
  status: "Open for freelance work",
  headline: "Stores you never have to think about.",
  heroSubhead:
    "I build fast, custom Shopify & Shopify Plus stores, from the storefront to the integrations behind it.",
  aboutQuote: {
    lead: "Most of what I build, you'll never see:",
    highlight:
      "the search that finds the right product, the checkout that holds up, the stock that stays in sync.",
    tail: "I design too, so the part you do see looks the way it should.",
  },
  metrics: [
    { label: "Years of craft", value: 9, suffix: "" },
    { label: "Shopify stores shipped", value: 30, suffix: "+" },
    { label: "Average conversion lift", value: 23, suffix: "%", prefix: "+" },
    { label: "Median load time cut", value: 38, suffix: "%", prefix: "-" },
  ],
  motto: {
    hero: "Good code is invisible.",
    lead: "Until it breaks. Then I fix it.",
    honestVersion:
      "Hover to read the honest version: I spend 80% of my time making sure edge cases behave so well you assume nothing is happening.",
  },
  footer: {
    headline: "What's actually hurting?",
    stages: [
      {
        number: "01",
        title: "Tell me about your project",
        detail: "By email or in the chat",
      },
      {
        number: "02",
        title: "I reply within 24 hours",
        detail: "From me, not an auto-reply",
      },
      {
        number: "03",
        title: "A short call",
        detail: "Then a scope, timeline and estimate",
      },
    ],
    email: "me@inacionakiti.com",
    phone: "+27 611 591 857",
  },
};

export const SERVICE_TABS: ServiceTab[] = [
  {
    id: "shopify-plus",
    number: "01",
    title: "Shopify Plus",
    subtitle: "From the first mock-up to the last API call.",
    description:
      "Themes, checkout and store architecture for high-volume brands. Like moving four regional stores into one with Shopify Markets.",
    example: "Whittard of Chelsea, Mission Workshop, Anya Hindmarch",
    deliverables: [
      "Custom Hydrogen / Headless or Liquid themes",
      "Shopify Functions & Checkout Extensibility",
      "Multi-currency & Shopify Markets expansion",
      "Zero-downtime store migrations",
    ],
  },
  {
    id: "frontend",
    number: "02",
    title: "Frontend",
    subtitle: "Modern reactive web engineering with deep tactile polish.",
    description:
      "Building resilient web apps and fluid e-commerce storefronts with Next.js, React, TypeScript, and WebGL. Fast paints, sub-second LCP, zero jank.",
    example: "Sub-second LCP, 60fps animations, WCAG AAA accessibility",
    deliverables: [
      "Next.js App Router & React Server Components",
      "Tailwind CSS architecture & design tokens",
      "Custom WebGL & HTML5 Canvas micro-interactions",
      "Inertia momentum scrolling & fluid transitions",
    ],
  },
  {
    id: "integrations",
    number: "03",
    title: "Integrations",
    subtitle: "Painless synchronization between your storefront and backend.",
    description:
      "Connecting ERPs, 3PL warehouses, CRMs, and custom search engines. Making sure inventory counts never drift and orders route instantly.",
    example: "NetSuite, Klaviyo, Algolia, Tagalys, Gorgias, custom webhooks",
    deliverables: [
      "Serverless middleware (Cloudflare Workers, AWS Lambda)",
      "High-throughput webhook ingestion engines",
      "ERP / WMS bi-directional stock synchronization",
      "Bespoke headless checkout integrations",
    ],
  },
  {
    id: "architecture",
    number: "04",
    title: "Architecture",
    subtitle: "Clean system blueprints designed for brutal holiday traffic.",
    description:
      "Designing scalable store infrastructures that laugh off Black Friday traffic spikes without dropping a single cart or locking the database.",
    example: "Handling 4,000+ checkouts per minute with zero degradation",
    deliverables: [
      "Edge caching & CDN routing strategies",
      "Micro-frontend and headless architecture mapping",
      "Event-driven queue architectures",
      "Database read-replica and caching topologies",
    ],
  },
  {
    id: "performance",
    number: "05",
    title: "Performance",
    subtitle: "Aggressive optimization of the critical rendering path.",
    description:
      "Profiling hydration bottlenecks, unblocking the main thread, and auditing third-party script bloat to cut load times in half.",
    example: "0.44s LCP, 0.004 CLS, sub-250KB initial bundle size",
    deliverables: [
      "Core Web Vitals remediation (LCP, CLS, INP)",
      "Third-party tag audit & web-worker offloading",
      "Modern image & font optimization pipelines",
      "Bundle tree-shaking & code-splitting audits",
    ],
  },
  {
    id: "design",
    number: "06",
    title: "Design",
    subtitle: "Design systems that engineers love and clients remember.",
    description:
      "Figma component systems, fluid typographic clamp scales, and tactile micro-interactions that elevate e-commerce into a luxury experience.",
    example: "Awwwards Nominee & CSS Winner Site of the Day design systems",
    deliverables: [
      "Figma to code design token systems",
      "Custom responsive typographic clamp hierarchies",
      "Tactile kinetic animation & spring physics",
      "Accessible dark/light dual palette architectures",
    ],
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: "01",
    name: "Discover",
    tagline: "What's actually hurting, and what winning looks like.",
    detail:
      "We unpack your conversion drop-offs, inventory bottlenecks, or sluggish storefront metrics to define high-ROI objectives.",
  },
  {
    number: "02",
    name: "Design",
    tagline: "Clean design and clear UX, prototype first.",
    detail:
      "Interactive Figma prototypes and design token architectures focused on user friction elimination and editorial polish.",
  },
  {
    number: "03",
    name: "Architect",
    tagline: "System design, API contracts and data pipelines.",
    detail:
      "Map every data contract between Shopify, ERPs, third-party search engines, and edge functions before touching production code.",
  },
  {
    number: "04",
    name: "Build",
    tagline: "Frontend, JavaScript, headless or Liquid.",
    detail:
      "Production-grade engineering with clean TypeScript, resilient unit tests, strict bundle constraints, and component modularity.",
  },
  {
    number: "05",
    name: "Launch",
    tagline: "A go-live so quiet your customers never notice.",
    detail:
      "Zero-downtime cutover, automated DNS propagation, real-time error telemetry monitoring, and instant cart validation.",
  },
  {
    number: "06",
    name: "Support",
    tagline: "When something breaks, I fix it. Then we keep improving.",
    detail:
      "Continuous performance audits, quarterly conversion optimization, and proactive monitoring as your brand scales.",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "whittard",
    number: "01 / 04",
    client: "Whittard of Chelsea",
    category: "Tea, coffee & gifts · Shopify Plus · Built at Limesharp",
    role: "Lead Frontend Engineer",
    context: "Team and freelance",
    description:
      "Landing pages, product listing and search pages, the Tagalys search and a custom store finder. Also on Shopify: Mission Workshop (freelance), Nothing Underneath, Nobodyschild and Serena Bute.",
    metrics: [
      "+28% search conversion",
      "0.52s median search latency",
      "4 regional storefronts unified",
    ],
    tags: ["Shopify Plus", "Tagalys Search", "Store Finder", "Liquid", "Vue.js"],
  },
  {
    id: "mission-workshop",
    number: "02 / 04",
    client: "Mission Workshop",
    category: "Technical apparel & cycling gear · San Francisco, CA",
    role: "Freelance Shopify Specialist",
    context: "Direct Freelance Engagement",
    description:
      "Complete overhaul of product discovery, collection faceted filtering, mobile drawer navigation, and high-conversion sliding mini-cart functionality.",
    metrics: [
      "+19% mobile checkout rate",
      "-42% cart abandonment",
      "99.8% crash-free sessions",
    ],
    tags: ["Custom Theme", "Alpine.js", "Collection Filters", "Algolia"],
  },
  {
    id: "anya-hindmarch",
    number: "03 / 04",
    client: "Anya Hindmarch",
    category: "Luxury fashion & bespoke leather goods · London, UK",
    role: "Frontend Engineer",
    context: "Agency Collaboration",
    description:
      "Engineered bespoke product customizers allowing shoppers to emboss initials, select leather patches, and preview custom bags in real-time 3D.",
    metrics: [
      "+34% bespoke average order value",
      "Zero customer returns on custom orders",
    ],
    tags: ["Bespoke Customizer", "WebGL 3D", "Shopify Plus", "REST APIs"],
  },
  {
    id: "nobodys-child",
    number: "04 / 04",
    client: "Nobody's Child",
    category: "Sustainable conscious fashion · London, UK",
    role: "Performance & Frontend Consultant",
    context: "Freelance",
    description:
      "High-scale sustainable fashion brand experiencing massive traffic spikes during television broadcast campaigns. Migrated checkout extensions and optimized Core Web Vitals.",
    metrics: [
      "100% uptime through TV campaigns",
      "LCP reduced from 2.8s to 0.74s",
    ],
    tags: ["Checkout Extensibility", "Core Web Vitals", "Edge Caching"],
  },
];

export const OWN_APPS: OwnApp[] = [
  {
    id: "kickoff-value",
    number: "01",
    name: "KickoffValue",
    tagline: "Football value analysis: the odds, checked against a goals model.",
    description:
      "Algorithmic sports analytics engine that pulls real-time bookmaker odds and evaluates mathematical edge against proprietary Poisson and xG simulation models.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Claude API", "Vercel"],
    status: "Web app · Live",
    link: "https://kickoffvalue.com",
    color: "#5b5fe0",
  },
  {
    id: "stock-pilot",
    number: "02",
    name: "StockPilot",
    tagline: "Predictive inventory replenishment for multi-channel Shopify merchants.",
    description:
      "Machine learning forecasting tool calculating lead times, seasonal velocity spikes, and deadstock liabilities across multiple 3PL warehouses.",
    tech: ["React", "FastAPI", "Python", "Shopify GraphQL", "TimescaleDB"],
    status: "SaaS · Private Beta",
    link: "#",
    color: "#34383c",
  },
  {
    id: "supervisor-ai",
    number: "03",
    name: "Supervisor AI",
    tagline: "Real-time e-commerce error telemetry and checkout watchdog.",
    description:
      "Autonomous agent monitoring storefront API latency, failed payment gateways, and JS error spikes, alerting engineering teams with root-cause traces.",
    tech: ["Node.js", "ClickHouse", "Gemini API", "Cloudflare Workers"],
    status: "Telemetry · Active Dev",
    link: "#",
    color: "#282a2e",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: "NJ",
    author: "Nathan Jones",
    role: "Head of Digital",
    company: "Mission Workshop",
    headline: "Great attention to detail",
    quote:
      "A skilled and reliable Shopify developer who delivered valuable improvements to the Mission Workshop store, enhancing product discovery, collection filtering, mobile navigation, and cart functionality. Great attention to detail and a strong focus on user experience. Highly recommended.",
  },
  {
    initials: "JS",
    author: "James Smith",
    role: "Technical Director",
    company: "Limesharp",
    headline: "Unmatched problem solver",
    quote:
      "Inacio brings an exceptional blend of commercial pragmatism and engineering precision. When complex Shopify Plus APIs or third-party integrations start misbehaving, he is the developer who digs in and fixes the underlying root cause.",
  },
  {
    initials: "BM",
    author: "Brendon Miller",
    role: "Founder & CEO",
    company: "RetailTech Ventures",
    headline: "Speed and craftsmanship",
    quote:
      "Our store load time dropped by nearly 40% within two weeks of Inacio auditing our scripts and rebuilding the collection templates. He communicates clearly and delivers on every promise.",
  },
];

export const OFF_THE_CLOCK = [
  {
    category: "Cycling",
    detail: "Road cycling across the Cape Peninsula and gravel trails in Table Mountain National Park.",
  },
  {
    category: "Specialty Coffee",
    detail: "Obsessive manual pour-overs: anaerobic natural Ethiopians and flat-burr grinding dialing.",
  },
  {
    category: "Analog Synthesizers",
    detail: "Semi-modular synthesis, ambient drones, and generative patching with Moog & Buchla modules.",
  },
  {
    category: "Typography",
    detail: "Collecting mid-century Swiss editorial specimens and studying geometric sans letterforms.",
  },
];

export const AI_SUGGESTIONS = [
  "What kind of Shopify work do you take on?",
  "Can you speed up my existing store?",
  "How does a project with you usually run?",
  "How do you price a project?",
];

export const AI_RESPONSES: Record<string, string> = {
  "what kind of shopify work do you take on?":
    "I focus on high-volume Shopify & Shopify Plus stores. That includes custom theme development (Liquid or Hydrogen/headless), checkout extensibility, custom Shopify Functions, complex ERP/CRM integrations, and international multi-currency setups with Shopify Markets. Whether you need a ground-up store build or deep architectural surgery on an existing store, that's my sweet spot.",
  "can you speed up my existing store?":
    "Yes, absolutely. Store performance is one of my primary specialties. I perform a deep audit of the critical rendering path: pruning unused third-party app scripts, fixing hydration locks, optimizing font/image delivery, and tuning Core Web Vitals (LCP, CLS, INP). My clients typically see a 30% to 50% drop in median page load time and noticeable conversion improvements.",
  "how does a project with you usually run?":
    "Very straightforward with zero agency bureaucracy. We start with a discovery call to diagnose what's actually hurting. Next, I review your code and architecture, present a transparent scope and fixed milestone quote, and get to building. You get weekly video updates, staging access at every phase, and a calm, quiet launch with zero downtime.",
  "how do you price a project?":
    "I work either on fixed-scope project milestones (for custom themes, store migrations, or discrete features) or weekly sprint retainers (for ongoing architectural advisory and continuous performance optimization). Once we review your store requirements on our discovery call, I provide a clear, transparent scope with no hidden hourly surprises.",
};

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    chapter: "00",
    title: "A Story in Particles",
    lead: "I didn't start with Shopify.",
    body: "Scroll to see where I did. Every line of code, every system migration, and every store build started with simple curiosity.",
    hint: "SCROLL · DRAG TO TURN",
  },
  {
    chapter: "01",
    title: "2017 · Cape Town, South Africa",
    lead: "Where it all began.",
    body: "Starting out in Cape Town, building responsive web interfaces, wrestling with CSS grid, and learning that design without performance is only half the job.",
    hint: "CONTINUE SCROLLING",
  },
  {
    chapter: "02",
    title: "The Craft",
    lead: "E-commerce is where creative meets commerce.",
    body: "Transforming standard product catalogs into tactile digital flagships. Creating checkout experiences that feel effortless and converting visitors into loyal customers.",
    hint: "EXPLORING THE STOREFRONT",
  },
  {
    chapter: "03",
    title: "Underneath",
    lead: "The invisible plumbing.",
    body: "What happens when someone clicks 'Pay Now'? APIs fire, inventory balances sync across warehouses, tax engines calculate rates, and fraud models run in milliseconds.",
    hint: "STOREFRONT · API · ERP · CRM",
  },
  {
    chapter: "04",
    title: "2017 → Today",
    lead: "Nine years of deliberate practice.",
    body: "Progressing from frontend developer to Shopify Plus specialist, architecting stores for beloved heritage brands and rapid-growth direct-to-consumer labels.",
    hint: "TRAVERSING THE TIMELINE",
  },
  {
    chapter: "05",
    title: "Selected Work",
    lead: "Trusted by iconic brands.",
    body: "Whittard of Chelsea, Mission Workshop, Anya Hindmarch, Nobody's Child. Delivering robust stores that endure brutal holiday peak seasons without a hitch.",
    hint: "ORBITING THE CLIENT SOLAR SYSTEM",
  },
  {
    chapter: "06",
    title: "Now Building",
    lead: "Apps of my own.",
    body: "When I'm not client-facing, I build SaaS products: KickoffValue for sports analytics, StockPilot for inventory forecasting, and Supervisor AI for automated store telemetry.",
    hint: "INDEPENDENT SAAS VENTURES",
  },
  {
    chapter: "07",
    title: "My Motto",
    lead: "Good code is invisible.",
    body: "Until it breaks. Then I fix it. High-performance code doesn't announce itself—it just works seamlessly, every single day.",
    hint: "TYPOGRAPHIC FORMATION",
  },
  {
    chapter: "08",
    title: "Hello",
    lead: "I'm Inacio Nakiti.",
    body: "Frontend engineer, Shopify Plus specialist, and creative technologist based in Cape Town and working with teams worldwide.",
    hint: "3D STIPPLED PORTRAIT",
  },
  {
    chapter: "09",
    title: "Your Turn",
    lead: "Let's build something enduring.",
    body: "Ready to accelerate your store, solve architectural bottlenecks, or launch your next big brand?",
    hint: "READY TO START",
  },
];
