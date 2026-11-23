export interface StatItem {
  value: string;
  label: string;
}

export interface FactItem {
  label: string;
  value: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface CaseMetric {
  label: string;
  value: string;
}

export interface CaseScreenshot {
  src: string;
  caption: string;
}

export interface CaseStudy {
  client: string;
  industry: string;
  date: string;
  headline: string;
  summary: string;
  metrics: CaseMetric[];
  screenshots: CaseScreenshot[];
  reserved: boolean;
  reservedNote: string;
}

export interface ClientItem {
  name: string;
  logo: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface ToolGroup {
  name: string;
  items: string[];
}

export interface SiteContent {
  hero: {
    badge: string;
    nameLine: string;
    titleLine: string;
    description: string;
    skills: string[];
    experienceBadge: string;
    experienceLabel: string;
    monogram: string;
  };
  stats: {
    items: StatItem[];
    footnote: string;
  };
  marquee: string[];
  about: {
    heading: string;
    title: string;
    description: string;
    bullets: string[];
    facts: FactItem[];
  };
  services: ServiceItem[];
  caseStudies: CaseStudy[];
  clients: {
    heading: string;
    description: string;
    items: ClientItem[];
  };
  experience: ExperienceItem[];
  tools: {
    heading: string;
    groups: ToolGroup[];
  };
  contact: {
    heading: string;
    subheading: string;
    phone: string;
    email: string;
    linkedin: string;
    linkedinLabel: string;
    location: string;
    whatsapp: string;
  };
  footer: {
    note: string;
  };
}

export const defaultContent: SiteContent = {
  hero: {
    badge: "Hello! Available for projects",
    nameLine: "Richa Jha",
    titleLine: "A Performance Marketing Specialist",
    description:
      "Performance marketer based in Ghaziabad, India, running paid campaigns on Meta and Google for e-commerce and lead-generation brands. I plan, launch and optimise paid campaigns, and report on them with clear numbers. My focus is simple: spend efficiently and drive results the business can measure.",
    skills: [
      "Lead Generation",
      "Meta Ads",
      "Google Ads",
      "ROAS Optimisation",
      "Creative & Campaign Optimisation",
      "KPI Reporting",
    ],
    experienceBadge: "1 Year",
    experienceLabel: "Meta & Google Ads",
    monogram: "RJ",
  },
  stats: {
    items: [
      { value: "₹55L+", label: "Revenue Generated" },
      { value: "₹11.2L+", label: "Ad Spend Managed" },
      { value: "6.29x", label: "Peak Purchase ROAS" },
      { value: "3,021+", label: "Purchases Driven" },
      { value: "396+", label: "Leads & Conversions" },
      { value: "12+", label: "Brands Managed" },
    ],
    footnote:
      "Across documented case studies — Fashion E-Commerce · Ciceroni · The East · plus $10.2K+ international spend (The East)",
  },
  marquee: [
    "Meta Ads",
    "Google Ads",
    "Lead Generation",
    "ROAS Optimisation",
    "Creative Testing",
    "KPI Reporting",
    "E-Commerce Scaling",
    "Remarketing",
  ],
  about: {
    heading: "About",
    title: "Spend efficiently. Report clearly. Scale what works.",
    description:
      "I'm a performance marketer based in Ghaziabad, India, running paid campaigns on Meta and Google for e-commerce and lead-generation brands. I plan, launch and optimise paid campaigns, and report on them with clear numbers. My focus is simple: spend efficiently and drive results the business can measure.",
    bullets: [
      "Plans, launches and optimises paid campaigns on Meta & Google",
      "Reports with clear numbers — spend, CPA, ROAS",
      "E-commerce and lead-generation focus, domestic & international",
    ],
    facts: [
      { label: "Role", value: "Performance Marketing Specialist" },
      { label: "Base", value: "Ghaziabad, Delhi NCR, India" },
      { label: "Platforms", value: "Meta Ads · Google Ads" },
      { label: "Focus", value: "Leads · Purchases · ROAS" },
      { label: "Education", value: "BBA (Pursuing) · IGNOU" },
      { label: "Certification", value: "Digital Marketing · HubSpot" },
      { label: "Open to", value: "Full-time roles & freelance" },
    ],
  },
  services: [
    {
      title: "Meta Ads",
      description:
        "Full-funnel purchase and lead campaigns — Advantage+ shopping, CBO scaling, dynamic catalogue retargeting and disciplined creative testing.",
    },
    {
      title: "Google Ads",
      description:
        "High-intent Search, Shopping and Performance Max with tight negative keyword curation and clean, scalable account structure.",
    },
    {
      title: "Lead Generation",
      description:
        "Instant forms and click-to-WhatsApp flows that filter tyre-kickers and deliver leads the sales team can actually close.",
    },
    {
      title: "ROAS Optimisation",
      description:
        "Creative iteration frameworks, hook testing and cost-per-purchase reduction — every decision backed by numbers.",
    },
    {
      title: "Creative & Campaign Optimisation",
      description:
        "Continuous A/B testing across audiences, placements and ad creative to keep campaigns learning and improving.",
    },
    {
      title: "KPI Reporting",
      description:
        "Clear, honest reporting — spend, CPA, ROAS and what's next. GA4, UTM discipline and real-time dashboards.",
    },
  ],
  caseStudies: [
    {
      client: "Fashion E-Commerce Brand",
      industry: "Apparel & D2C",
      date: "1–27 Feb 2026",
      headline: "₹10.3L Meta spend scaled into ₹49L purchase value at 4.76x ROAS",
      summary:
        "Managed two ad accounts end-to-end — setup, execution, budget and audience targeting — with a Midnight Sale promotional push and ongoing performance monitoring and optimisation.",
      metrics: [
        { label: "Meta Ad Spend", value: "₹10,30,899" },
        { label: "Purchase Value", value: "₹49,09,202" },
        { label: "ROAS", value: "4.76x" },
        { label: "Purchases", value: "3,021" },
        { label: "Account 1", value: "₹4.6L → ₹22.3L" },
        { label: "Account 2", value: "₹5.7L → ₹26.8L" },
      ],
      screenshots: [
        {
          src: "/case-studies/cs-fashion-account1.jpg",
          caption:
            "Account 1: 7 campaigns · ₹4,61,138 spent · ₹22,26,358 purchase value · 4.83 ROAS",
        },
        {
          src: "/case-studies/cs-fashion-account2.jpg",
          caption:
            "Account 2: ₹5,69,761 spent · ₹26,82,844 purchase value",
        },
      ],
      reserved: false,
      reservedNote:
        "Screenshot slot reserved — the real Ads Manager screenshot will be added here soon.",
    },
    {
      client: "Ciceroni",
      industry: "Designer E-Commerce",
      date: "February 2026",
      headline:
        "6.29x combined ROAS across domestic and international Meta campaigns",
      summary:
        "Reviewed Domestic and International Meta performance separately, consolidated spend and revenue, and prepared combined performance reporting.",
      metrics: [
        { label: "Combined Spend", value: "₹95,585" },
        { label: "Combined Revenue", value: "₹6,01,373" },
        { label: "Combined ROAS", value: "6.29x" },
        { label: "Meta-Reported Orders", value: "109" },
        { label: "Domestic", value: "₹79,688 → ₹4,74,623" },
        { label: "International", value: "₹15,897 → ₹1,26,750" },
      ],
      screenshots: [
        {
          src: "/case-studies/cs-ciceroni-domestic.jpg",
          caption:
            "Domestic Meta: 8 campaigns · ₹79,688 spent · 40 purchases · ₹4,74,623 value · 6.00 average ROAS",
        },
        {
          src: "/case-studies/cs-ciceroni-international.jpg",
          caption:
            "International Meta: ₹15,897 spent · 69 orders · ₹1,26,750 revenue",
        },
      ],
      reserved: false,
      reservedNote:
        "Screenshot slot reserved — the real Ads Manager screenshot will be added here soon.",
    },
    {
      client: "The East",
      industry: "Lead Generation",
      date: "1 Jun – 31 Jul 2026",
      headline:
        "Full-funnel dual channel: 295 Meta leads + 101 Google conversions",
      summary:
        "Meta captured high-volume leads at a $7.17 blended CPL while Google Search captured ultra-high-intent traffic at 5.32% CTR with 25 phone calls.",
      metrics: [
        { label: "Meta Leads", value: "295" },
        { label: "Meta Spend", value: "$2,114.73" },
        { label: "Blended CPL", value: "$7.17" },
        { label: "Google Conversions", value: "101.44" },
        { label: "Google Spend", value: "$8,143.93" },
        { label: "Phone Calls", value: "25" },
      ],
      screenshots: [
        {
          src: "/case-studies/cs-east-meta.jpg",
          caption:
            "Meta Ads Manager lead results: 295 leads · $2,114.73 spend · 3.01% link CTR",
        },
        {
          src: "/case-studies/cs-east-google.jpg",
          caption:
            "Google Ads: $8,143.93 cost · 3,449 clicks · 5.32% CTR · 101.44 conversions",
        },
      ],
      reserved: false,
      reservedNote:
        "Screenshot slot reserved — the real Ads Manager screenshot will be added here soon.",
    },
    {
      client: "Wishart Jewellers",
      industry: "Fine Jewelry",
      date: "Illustrative Projection",
      headline:
        "A $35/day lead engine projected at 84 enquiries per month, $12.50 CPL",
      summary:
        "Illustrative projection modelled on the client's budget — only the $35/day budget is actual. Built for bridal consultation appointment bookings.",
      metrics: [
        { label: "Daily Budget", value: "$35 / day" },
        { label: "30-Day Budget", value: "$1,050" },
        { label: "Projected Leads", value: "84" },
        { label: "Projected CPL", value: "$12.50" },
        { label: "Projected Clicks", value: "1,050" },
        { label: "Projected CTR", value: "2.0%" },
      ],
      screenshots: [],
      reserved: true,
      reservedNote:
        "Screenshot slot reserved — the real Ads Manager screenshot will be added here soon.",
    },
  ],
  clients: {
    heading: "Clients",
    description:
      "Brands whose paid campaigns I've planned, launched and optimised across Meta and Google.",
    items: [
      { name: "Identiti", logo: "/clients/identiti.jpg" },
      { name: "Sajilo", logo: "/clients/sajilo.jpg" },
      { name: "SurplusDekho", logo: "/clients/surplusdekho.jpg" },
      { name: "Lille Barn", logo: "/clients/lille-barn.jpg" },
      { name: "Ciceroni", logo: "/clients/ciceroni.jpg" },
      { name: "ServPro", logo: "/clients/servpro.jpg" },
      { name: "Brayford Sod", logo: "/clients/brayford-sod.jpg" },
      {
        name: "Palms Rural Self Storage",
        logo: "/clients/palms-rural-self-storage.jpg",
      },
      { name: "The East", logo: "/clients/the-east.jpg" },
      { name: "Artisan Juice", logo: "/clients/artisan-juice.jpg" },
      { name: "Guniaa", logo: "/clients/guniaa.jpg" },
      { name: "Wishart Jewellers", logo: "/clients/wishart-jewellers.jpg" },
    ],
  },
  experience: [
    {
      role: "PPC Executive",
      company: "Greenbyte Web Media",
      duration: "4 months",
      description:
        "Meta Ads and Google Ads campaigns for D2C and international clients.",
    },
    {
      role: "Freelance Performance Marketer",
      company: "Nandiniclick",
      duration: "2 months",
      description:
        "Freelance performance marketing engagements across Meta and Google Ads.",
    },
    {
      role: "Performance Marketing Intern",
      company: "Uniqoe Media",
      duration: "4 months",
      description:
        "Hands-on campaign support — creative testing, audience work and reporting.",
    },
    {
      role: "Digital Marketing Intern",
      company: "Online Strikers",
      duration: "2 months",
      description:
        "Digital marketing foundations — campaign setup and optimisation support.",
    },
  ],
  tools: {
    heading: "Tools & Platforms",
    groups: [
      {
        name: "Ads & Platforms",
        items: [
          "Meta Ads Manager",
          "Google Ads",
          "Facebook Ad Library",
          "Google Merchant Center",
          "WhatsApp Business",
          "BusinessOnBot",
        ],
      },
      {
        name: "Analytics & Tracking",
        items: [
          "Google Analytics 4",
          "Google Tag Manager",
          "Google Search Console",
          "Google Sheets",
          "Microsoft Excel",
        ],
      },
      {
        name: "E-Commerce & Social",
        items: ["Shopify", "YouTube", "Instagram", "Facebook"],
      },
      {
        name: "Research & AI",
        items: ["Semrush", "ChatGPT", "Claude", "Perplexity"],
      },
      {
        name: "Marketing & Design",
        items: ["HubSpot", "Canva", "Google Business Profile"],
      },
    ],
  },
  contact: {
    heading: "Let's make your ads profitable.",
    subheading:
      "Available for full-time performance marketing roles and freelance projects.",
    phone: "+91 7061313703",
    email: "richajha31715@gmail.com",
    linkedin: "https://www.linkedin.com/in/richa-jha-2012b12b0",
    linkedinLabel: "linkedin.com/in/richa-jha-2012b12b0",
    location: "Ghaziabad, India",
    whatsapp: "https://wa.me/917061313703",
  },
  footer: {
    note: "© 2026 Richa Jha — Performance Marketing Specialist",
  },
};
