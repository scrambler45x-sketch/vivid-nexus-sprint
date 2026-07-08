// Vivid Nexus — Expanded Infrastructure & Pricing Engine
// Source of truth for every plan shown in the Services section.

export const LEVELS = [
  {
    id: "01",
    key: "architecture",
    title: "Web Architecture & Platforms",
    subtitle: "Elite cornerstones — the sites your brand actually lives on.",
    url: "vividnexus.in/architecture",
    plans: [
      {
        tag: "ONE-TIME",
        title: "Lightning Frontend Showcase",
        audience: "Personal brands, creators, local shops",
        price: "2,999",
        per: "one-time",
        desc: "Sub-1s load speed, a fluid one-page responsive frame with modern gradient layers, optimized for cross-device visibility.",
      },
      {
        tag: "ONE-TIME",
        title: "Micro-Leads Landing Page",
        audience: "Creators, webinar hosts, consultants",
        price: "4,499",
        per: "one-time",
        desc: "High-converting single-page lander with an interactive booking layout, dynamic scheduling widgets, and backend verification.",
      },
      {
        tag: "ONE-TIME",
        title: "Portfolio Showcase Blueprint",
        audience: "Models, architects, photographers, studios",
        price: "6,999",
        per: "one-time",
        desc: "3-section asymmetric grid portfolio with cinematic lazy-loading and sleek image/video overlays for visual retention.",
      },
      {
        tag: "ONE-TIME",
        title: "Multi-Page Authority Engine",
        audience: "Growing startups, corporate agencies",
        price: "14,999",
        per: "one-time",
        desc: "5-page scalable structure — Home, Services, Rules, Contact, Portfolio — built on React/Next.js with clean routing.",
      },
      {
        tag: "ONE-TIME",
        title: "E-Commerce Conversion Terminal",
        audience: "D2C brands, fashion labels, boutiques",
        price: "34,999",
        per: "one-time",
        desc: "Premium storefront with custom catalog grids, cart micro-interactions, payment gateways, and automated receipts.",
      },
    ],
  },
  {
    id: "02",
    key: "automation",
    title: "Intelligent AI Automation",
    subtitle: "Systems that work the night shift, so leads never go cold.",
    url: "vividnexus.in/automation",
    plans: [
      {
        tag: "ONE-TIME",
        title: "Smart 24/7 Conversion Chatbot",
        audience: "Local businesses losing late-night traffic",
        price: "2,499",
        per: "one-time",
        desc: "A lightweight widget that captures visitor name, email, and WhatsApp number while answering FAQs autonomously.",
      },
      {
        tag: "ONE-TIME",
        title: "Custom FAQ Knowledge Base",
        audience: "Clinics, education cells, client services",
        price: "5,499",
        per: "one-time",
        desc: "A standalone conversational module trained on your own rules and documents, parsing complex queries with real logic.",
      },
      {
        tag: "ONE-TIME",
        title: "Enterprise Lead Intelligence",
        audience: "B2B agencies, real estate, consultants",
        price: "19,999",
        per: "one-time",
        desc: "An AI assistant syncing with multi-tenant logs, routing customer intent into Discord/Slack via secure webhooks.",
      },
      {
        tag: "SETUP + CARE",
        title: "Autonomous Support Framework",
        audience: "High-volume inbound platforms",
        price: "49,999",
        per: "setup",
        desc: "A custom-trained assistant with validation pipelines that filter junk entries before archiving verified leads.",
      },
    ],
  },
  {
    id: "03",
    key: "identity",
    title: "Visual Identity & Brand Architecture",
    subtitle: "The look your brand gets recognized by, everywhere it shows up.",
    url: "vividnexus.in/identity",
    plans: [
      {
        tag: "MONTHLY",
        title: "Social Media Authority Pack",
        audience: "Bootstrap projects, founders on LinkedIn/IG",
        price: "1,999",
        per: "month",
        desc: "12 premium, high-contrast post layouts customized to your brand kit, delivered every month.",
      },
      {
        tag: "ONE-TIME",
        title: "Rapid Brand Kit Accelerator",
        audience: "Early-stage startups, micro-ventures",
        price: "3,999",
        per: "one-time",
        desc: "A primary vector logo, corporate type pairings, and a cohesive 3-color palette — ready for launch.",
      },
      {
        tag: "MONTHLY",
        title: "LinkedIn Authority Grid System",
        audience: "Founders, C-suite, capital-raising execs",
        price: "8,499",
        per: "month",
        desc: "16 structured text/graphic posts a month for founder branding, with custom covers and deployment tracking.",
      },
      {
        tag: "HANDOFF",
        title: "Corporate Identity Ecosystem",
        audience: "Newly funded entities, full rebrands",
        price: "24,999",
        per: "handoff",
        desc: "A full asset system — vector logo suite, type rules, style library, and 50 reusable Figma components.",
      },
    ],
  },
];

// Level 04 — the two "closer" offers, kept visually distinct from the grid above.
export const BUNDLE = {
  tag: "★ BEST VALUE — SAVE ₹1,499",
  title: "The Complete Digital Machine",
  desc: "The ultimate brand launchpad — the full website, a month of social content, and the smart chat assistant, bundled to get you live and generating leads fast.",
  price: "5,999",
  note: "One-time setup · everything included",
  items: [
    "1-Page Business Website Build",
    "Smart AI Assistant Integration",
    "1 Month Social Media Content Pack",
  ],
};

export const ENTERPRISE = {
  tag: "LEVEL 04 · CUSTOM ENGINE",
  title: "Custom Enterprise Engine",
  desc: "For scaled corporate enterprises and large-scale digital architectures that need infrastructure, not templates.",
  price: "2,00,000",
  priceNote: "starting at",
  items: [
    "Custom multi-tenant secure database registries",
    "Fully isolated backend server provisioning",
    "Custom MLOps automation data streams",
    "Complete network infrastructure security scanning",
  ],
};
