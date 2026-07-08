# Vivid Nexus — Website

A monochrome (black / white / gray) growth-studio website, built with React + Vite.

## Project structure

```
vivid-nexus/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                 # React entry point
    ├── App.jsx                  # Composes all sections
    ├── styles/
    │   └── index.css            # All global styles / design tokens
    ├── hooks/
    │   └── useBrandFonts.js     # Injects Archivo / Inter / JetBrains Mono
    ├── data/
    │   └── pricing.js           # All 15 plans across 4 levels, + bundle & enterprise
    └── components/
        ├── BrowserWindow.jsx    # Signature "browser chrome" frame, reused everywhere
        ├── TypingURL.jsx        # Animated typewriter effect in the hero mock
        ├── Nav.jsx              # Sticky top navigation + mobile menu
        ├── Hero.jsx             # Hero section with headline + live browser mock
        ├── Stats.jsx            # 4-stat proof strip
        ├── PricingCard.jsx      # Single compact plan card (used inside PricingLevel)
        ├── PricingLevel.jsx     # One infrastructure level: header + grid of PricingCards
        ├── EnterpriseCard.jsx   # Level 04's custom-quote "closer" card
        ├── Services.jsx         # Composes all 4 levels + the bundle/enterprise closers
        ├── Clause.jsx           # Single contract clause row (reused by Rules)
        ├── Rules.jsx            # Rules & Onboarding, styled as a terminal log
        ├── Testimonials.jsx     # 3 client quotes
        ├── FinalCTA.jsx         # Closing call-to-action band
        └── Footer.jsx           # Footer links + copyright
```

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Outputs a static `dist/` folder you can deploy anywhere (Vercel, Netlify, GitHub Pages, etc).

## Editing content

- **Pricing & plans**: edit `src/data/pricing.js` — every plan, price, and level lives there, so `Services.jsx` never needs to change for content edits.
- **Other copy**: edit the arrays/JSX directly inside `Rules.jsx`, `Testimonials.jsx`.
- **Colors**: all design tokens live at the top of `src/styles/index.css` under `:root`.
- **Fonts**: swap the Google Fonts URL in `src/hooks/useBrandFonts.js`.
- **Links**: every `<a href="#">` should be pointed at your real Instagram DM link, mailto address, etc.
