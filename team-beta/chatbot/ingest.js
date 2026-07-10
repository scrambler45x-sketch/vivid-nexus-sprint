// ingest.js
const mongoose = require("mongoose");
const { GoogleGenAI } = require("@google/genai");
const Knowledge = require("./src/models/Knowledge");
require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const rawDMMessages = [
    // --- LEVEL 1: WEB ARCHITECTURE & PLATFORMS ---
    {
        text: "Vivid Nexus Plan 1: Lightning Frontend Showcase Layout. Price: ₹2,999 (One-Time). Target Audience: Personal brands, creators, local shops. Deliverables: Sub-1 second loading speed, fluid 1-page responsive frame with modern gradient layers, optimized for cross-device visibility.",
        source: "pricing-web-plan1"
    },
    {
        text: "Vivid Nexus Plan 2: Micro-Leads Landing Page. Price: ₹4,499 (One-Time). Target Audience: Content creators, webinar hosts, independent consultants. Deliverables: High-converting single-page sales lander featuring an advance interactive booking layout, custom dynamic scheduling widgets, and direct backend verification.",
        source: "pricing-web-plan2"
    },
    {
        text: "Vivid Nexus Plan 3: Portfolio Showcase Blueprint. Price: ₹6,999 (One-Time). Target Audience: Models, independent architects, premium photographers, design studios. Deliverables: High-end 3-section asymmetric grid portfolio setup with cinematic asset lazy-loading, sleek image/video viewport overlays, and full optimization for visual retention.",
        source: "pricing-web-plan3"
    },
    {
        text: "Vivid Nexus Plan 4: The Multi-Page Authority Engine. Price: ₹14,999 (One-Time). Target Audience: Growing startups, corporate agencies, service providers. Deliverables: 5-Page highly scalable web structure (Home, Services, Rules/Onboarding, Contact, Portfolio Hub). Built using React/Next.js with clean centralized routing engines.",
        source: "pricing-web-plan4"
    },
    {
        text: "Vivid Nexus Plan 5: The E-Commerce Conversion Terminal. Price: ₹34,999 (One-Time). Target Audience: D2C brands, local fashion labels, lifestyle boutiques. Deliverables: Premium storefront architecture with custom product catalog grids, smooth cart micro-interactions, integrated payment gateways, and automated receipt dispatches.",
        source: "pricing-web-plan5"
    },

    // --- LEVEL 2: INTELLIGENT AI AUTOMATION & OPERATIONS ---
    {
        text: "Vivid Nexus Plan 6: Smart 24/7 Conversion Chatbot. Price: ₹2,499 (One-Time). Target Audience: Local businesses losing late-night traffic. Deliverables: Lightweight script widget that automatically captures visitor metadata (Name, Email, WhatsApp number) and answers complex FAQs autonomously.",
        source: "pricing-ai-plan6"
    },
    {
        text: "Vivid Nexus Plan 7: Custom FAQ Interactive Knowledge Base. Price: ₹5,499 (One-Time). Target Audience: Customer-facing services, medical clinics, educational cells. Deliverables: Specialized conversational standalone module trained on explicit client text files/rules, instantly parsing complex client queries with conversational logic.",
        source: "pricing-ai-plan7"
    },
    {
        text: "Vivid Nexus Plan 8: Enterprise Lead Intelligence System. Price: ₹19,999 (One-Time). Target Audience: High-ticket B2B agencies, real estate firms, consultants. Deliverables: Advanced AI assistant syncing with multi-tenant system logs. Connects incoming customer intents directly to internal Discord/Slack workflows using secure real-time backend webhooks.",
        source: "pricing-ai-plan8"
    },
    {
        text: "Vivid Nexus Plan 9: Fully Autonomous Customer Support Framework. Price: ₹49,999 (One-Time Setup + Maintenance). Target Audience: Established platforms dealing with high-volume inbound client queries. Deliverables: Deeply trained custom LLM assistant with background data validation pipelines to filter out junk entries before archiving verified logs into production databases.",
        source: "pricing-ai-plan9"
    },

    // --- LEVEL 3: VISUAL IDENTITY & BRAND ARCHITECTURE ---
    {
        text: "Vivid Nexus Plan 10: Social Media Authority Pack. Price: ₹1,999 / Month. Target Audience: Bootstrap projects, LinkedIn/Instagram founders. Deliverables: 12 premium high-contrast component graphic layouts customized with the client's brand kit.",
        source: "pricing-brand-plan10"
    },
    {
        text: "Vivid Nexus Plan 11: Rapid Brand Kit Accelerator. Price: ₹3,999 (One-Time). Target Audience: Early stage startups, local micro-ventures. Deliverables: Execution of 1 primary vector logo configuration, corporate typography pairings, and a cohesive 3-color palette configuration framework for rapid cross-platform launch.",
        source: "pricing-brand-plan11"
    },
    {
        text: "Vivid Nexus Plan 12: High-Authority LinkedIn Grid System. Price: ₹8,499 / Month. Target Audience: C-Suite executives, founders looking to raise capital, elite consultants. Deliverables: 16 highly structured text/graphic minimalist post systems per month focused on founder branding, combined with custom-tailored visual cover designs and automated asset deployment tracking.",
        source: "pricing-brand-plan12"
    },
    {
        text: "Vivid Nexus Plan 13: Complete Corporate Identity Ecosystem. Price: ₹24,999 (One-Time System Handoff). Target Audience: Newly funded entities, complete brand transformations. Deliverables: Full design asset system: Custom vector logo layout, premium dark cyber font rules, unified style library sheets, and 50 reusable, high-fidelity auto-layout components in Figma.",
        source: "pricing-brand-plan13"
    },

    // --- LEVEL 4: UNIFIED ARCHITECTURE MACHINES ---
    {
        text: "Vivid Nexus Plan 14: The Complete Digital Machine Bundle. Price: ₹5,599 (One-Time Setup). Target Audience: Startups looking for a rapid, comprehensive launch framework. Deliverables: 1-Page Business Web Build + Smart AI Assistant Integration + 1 Month Social Media Content Pack.",
        source: "pricing-bundle-plan14"
    },
    {
        text: "Vivid Nexus Plan 15: CUSTOM ENTERPRISE ENGINE (THE ₹2 LAKH TARGET CRUSHER). Price: Starting at ₹2,00,000+. Target Audience: Scaled corporate enterprises and large-scale digital architectures. Deliverables: Custom multi-tenant secure database registries, fully isolated backend server provisioning, custom MLOps automation data streams, and complete network infrastructure security scanning systems.",
        source: "pricing-enterprise-plan15"
    }
];

const seedDatabase = async () => {
    try {
        if (!process.env.MONGO_URI) throw new Error("Missing MONGO_URI in .env");

        // Unified async connection layout
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "VividNexus-sprint"
        });
        console.log("💾 MongoDB Connected to VividNexus-sprint");

        // Wipe previous vector items to execute a clean seed
        await Knowledge.deleteMany({});
        console.log("🧹 Previous data cleared. Starting vector embedding generations...");

        for (const item of rawDMMessages) {
            // 1. Generate content embedding configuration
            const response = await ai.models.embedContent({
                model: "gemini-embedding-001",
                contents: item.text,
                config: {
                    outputDimensionality: 768 // Forces the 768 dimension vector match
                }
            });

            // 2. Map directly into MongoDB
            await Knowledge.create({
                text: item.text,
                embedding: response.embeddings[0].values,
                metadata: { source: item.source }
            });

            console.log(`✅ Embedded: ${item.source}`);
        }

        console.log("🎉 All 15 infrastructure plans embedded and pushed to Atlas successfully!");
        process.exit(0);
        
    } catch (err) {
        console.error("❌ Seeding failure:", err);
        process.exit(1);
    }
};

seedDatabase();