import { useState, useMemo, useRef, useEffect } from "react";
import { ShoppingBag, X, Plus, Minus, Menu, ArrowRight, Search } from "lucide-react";

/* ---------------------------------- DATA ---------------------------------- */

const PRODUCTS = [
  { id: "chef-225", name: "Forge Chef 225", cat: "Knives", icon: "knife", steel: "52100 Carbon", spec: "225mm · 148g", price: 23999, blurb: "The one knife that does everything. Full flat grind, thin behind the edge." },
  { id: "petty-120", name: "Petty 120", cat: "Knives", icon: "knife", steel: "White #2 Carbon", spec: "120mm · 62g", price: 13999, blurb: "Board work, garnish, tight peeling. Balances a hair forward of centre." },
  { id: "santoku-180", name: "Santoku 180", cat: "Knives", icon: "knife", steel: "Aogami Super", spec: "180mm · 130g", price: 25999, blurb: "Flatter profile for a push-cut. Laminated for a harder, thinner core." },
  { id: "bread-260", name: "Bread Saw 260", cat: "Knives", icon: "knife", steel: "VG-10 Stainless", spec: "260mm · 175g", price: 16499, blurb: "Offset serration cuts crust clean without crushing the crumb." },
  { id: "cleaver-200", name: "Cleaver 200", cat: "Knives", icon: "knife", steel: "52100 Carbon", spec: "200mm · 310g", price: 21999, blurb: "Weight forward for joints and squash. Not for bone — for produce." },
  { id: "skillet-8", name: "Skillet No. 8", cat: "Cookware", icon: "skillet", steel: "Cast Iron", spec: "10in · 2.6kg", price: 11999, blurb: "Pre-seasoned three times over. Gets better every year you own it." },
  { id: "sauteuse-24", name: "Sauteuse 24", cat: "Cookware", icon: "pan", steel: "Blue Carbon Steel", spec: "24cm · 1.1kg", price: 9999, blurb: "Thin carbon heats fast and answers instantly. Season before first use." },
  { id: "copper-18", name: "Copper Sauce 18", cat: "Cookware", icon: "pan", steel: "90% Copper, tin-lined", spec: "18cm · 1.4kg", price: 18499, blurb: "Unmatched heat control for sauces that split if you look away." },
  { id: "whetstone", name: "Combo Whetstone", cat: "Care", icon: "stone", steel: "Aluminum Oxide", spec: "1000 / 6000 grit", price: 6999, blurb: "One stone from repair to polish. Flatten it — it will dish." },
  { id: "board-oil", name: "Board & Handle Oil", cat: "Care", icon: "bottle", steel: "Food-grade mineral", spec: "250ml", price: 1499, blurb: "Feed dry wood monthly. Feed new wood weekly for the first month." },
  { id: "end-grain", name: "End-Grain Board", cat: "Care", icon: "board", steel: "Hard Maple", spec: "45 × 30cm", price: 10999, blurb: "End-grain closes around the edge instead of dulling it." },
];

const CATEGORIES = ["All", "Knives", "Cookware", "Care"];

/* ---------------------------------- ICONS ---------------------------------- */

function ToolIcon({ type, className }) {
  switch (type) {
    case "knife":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none">
          <path d="M4 26 L70 26 C88 26 108 18 116 12 L116 14 C110 22 90 30 70 30 L4 30 Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <path d="M4 26 L4 34 L20 34 L20 30" stroke="currentColor" strokeWidth="1.4" />
          <line x1="4" y1="30" x2="20" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case "skillet":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none">
          <circle cx="46" cy="22" r="16" stroke="currentColor" strokeWidth="1.4" />
          <line x1="62" y1="22" x2="112" y2="14" stroke="currentColor" strokeWidth="1.4" />
          <line x1="106" y1="10" x2="112" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </svg>
      );
    case "pan":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none">
          <path d="M20 20 C20 10 30 6 44 6 C58 6 68 10 68 20 L68 26 L20 26 Z" stroke="currentColor" strokeWidth="1.4" />
          <line x1="68" y1="16" x2="112" y2="10" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "stone":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none">
          <rect x="30" y="10" width="60" height="20" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <line x1="30" y1="17" x2="90" y2="17" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          <line x1="30" y1="23" x2="90" y2="23" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        </svg>
      );
    case "bottle":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none">
          <path d="M52 6 L68 6 L68 12 L72 18 L72 34 L48 34 L48 18 L52 12 Z" stroke="currentColor" strokeWidth="1.4" />
          <line x1="48" y1="22" x2="72" y2="22" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        </svg>
      );
    case "board":
      return (
        <svg viewBox="0 0 120 40" className={className} fill="none">
          <rect x="24" y="8" width="72" height="24" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="90" cy="20" r="2.4" stroke="currentColor" strokeWidth="1" />
          <line x1="24" y1="14" x2="96" y2="14" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
          <line x1="24" y1="26" x2="96" y2="26" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------ TEMPER LINE -------------------------------- */

function TemperLine({ flat }) {
  return (
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className={`temper-line ${flat ? "flat" : ""}`}>
      <defs>
        <linearGradient id="temperGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3E5C76" />
          <stop offset="45%" stopColor="#EDE8E0" />
          <stop offset="55%" stopColor="#EDE8E0" />
          <stop offset="100%" stopColor="#C1622D" />
        </linearGradient>
      </defs>
      <path d="M0 20 C 150 5, 300 35, 450 18 S 750 2, 900 22 S 1100 34, 1200 18" stroke="url(#temperGrad)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/* --------------------------------- APP -------------------------------------- */

export default function ForgeAndTable() {
  const [cart, setCart] = useState({});
  const [activeCat, setActiveCat] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const toastTimer = useRef(null);

  const products = useMemo(
    () => (activeCat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === activeCat)),
    [activeCat]
  );

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty })),
    [cart]
  );

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const subtotal = cartItems.reduce((s, i) => s + i.qty * i.price, 0);

  function addToCart(id, name) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setToast(`Added ${name}`);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }

  function changeQty(id, delta) {
    setCart((c) => {
      const next = Math.max(0, (c[id] || 0) + delta);
      return { ...c, [id]: next };
    });
  }

  function placeOrder() {
    setOrderPlaced(true);
    setCart({});
  }

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  return (
    <div className="ft-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .ft-root {
          --ink: #1C1B1A;
          --ink-2: #262422;
          --paper: #EDE8E0;
          --paper-dim: #B9B3A8;
          --steel: #3E5C76;
          --steel-dim: #6E8399;
          --ember: #C1622D;
          --hair: rgba(237,232,224,0.14);
          font-family: 'IBM Plex Sans', sans-serif;
          background: var(--ink);
          color: var(--paper);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        .ft-root * { box-sizing: border-box; }
        .mono { font-family: 'IBM Plex Mono', monospace; }
        .display { font-family: 'Fraunces', serif; }

        /* ---------- header ---------- */
        .ft-header {
          position: sticky; top: 0; z-index: 40;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px clamp(20px, 5vw, 56px);
          background: rgba(28,27,26,0.92);
          backdrop-filter: blur(6px);
          border-bottom: 1px solid var(--hair);
        }
        .ft-logo { display: flex; flex-direction: column; line-height: 1; cursor: default; }
        .ft-logo .name { font-family: 'Fraunces', serif; font-weight: 600; font-size: 21px; letter-spacing: 0.01em; }
        .ft-logo .tag { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; color: var(--steel-dim); text-transform: uppercase; margin-top: 4px; }
        .ft-nav { display: flex; gap: 32px; align-items: center; }
        .ft-nav button {
          background: none; border: none; color: var(--paper); opacity: 0.75;
          font-size: 14px; cursor: pointer; padding: 6px 2px; position: relative;
          transition: opacity 0.2s;
        }
        .ft-nav button:hover, .ft-nav button.active { opacity: 1; }
        .ft-nav button.active::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -4px; height: 1px; background: var(--ember);
        }
        .ft-cart-btn {
          display: flex; align-items: center; gap: 8px; background: none; border: 1px solid var(--hair);
          color: var(--paper); padding: 9px 16px; border-radius: 2px; cursor: pointer; font-size: 13px;
          transition: border-color 0.2s, background 0.2s;
        }
        .ft-cart-btn:hover { border-color: var(--steel-dim); background: rgba(62,92,118,0.12); }
        .ft-cart-count { font-family: 'IBM Plex Mono', monospace; color: var(--ember); }

        /* ---------- hero ---------- */
        .ft-hero {
          display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 40px; align-items: center;
          padding: 72px clamp(20px, 5vw, 56px) 40px;
        }
        .ft-hero .eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--steel-dim); margin-bottom: 18px; }
        .ft-hero h1 {
          font-family: 'Fraunces', serif; font-weight: 600; font-size: clamp(40px, 5.4vw, 68px);
          line-height: 1.03; margin: 0 0 22px; letter-spacing: -0.01em;
        }
        .ft-hero h1 em { font-style: italic; color: var(--ember); }
        .ft-hero p.lede { font-size: 16px; line-height: 1.7; color: var(--paper-dim); max-width: 46ch; margin-bottom: 30px; }
        .ft-cta {
          display: inline-flex; align-items: center; gap: 10px; background: var(--ember); color: var(--ink);
          border: none; padding: 14px 24px; font-size: 14px; font-weight: 600; cursor: pointer;
          border-radius: 2px; transition: transform 0.15s, background 0.2s;
        }
        .ft-cta:hover { background: #d67440; transform: translateY(-1px); }

        .ft-drawing {
          position: relative; border: 1px solid var(--hair); border-radius: 3px; padding: 36px 20px;
          background: linear-gradient(180deg, rgba(62,92,118,0.06), transparent 60%);
        }
        .ft-drawing svg.big-knife { width: 100%; height: auto; color: var(--paper); }
        .callout { position: absolute; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--steel-dim); }
        .callout .line { position: absolute; background: var(--hair); }
        .c1 { top: 10%; left: 6%; }
        .c2 { top: 52%; right: 4%; text-align: right; }
        .c3 { bottom: 8%; left: 30%; }

        .temper-line { width: 100%; height: 26px; display: block; opacity: 0.9; }
        .temper-line.flat { height: 16px; opacity: 0.5; }

        /* ---------- catalog ---------- */
        .ft-catalog { padding: 8px clamp(20px, 5vw, 56px) 100px; }
        .ft-catalog-head { display: flex; align-items: baseline; justify-content: space-between; margin: 46px 0 26px; flex-wrap: wrap; gap: 16px; }
        .ft-catalog-head h2 { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 600; margin: 0; }
        .ft-tabs { display: flex; gap: 6px; }
        .ft-tabs button {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.04em;
          background: none; border: 1px solid var(--hair); color: var(--paper-dim);
          padding: 8px 14px; border-radius: 2px; cursor: pointer; transition: all 0.2s;
        }
        .ft-tabs button:hover { border-color: var(--steel-dim); color: var(--paper); }
        .ft-tabs button.active { background: var(--paper); color: var(--ink); border-color: var(--paper); }

        .ft-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1px; background: var(--hair); border: 1px solid var(--hair); }
        .ft-card { background: var(--ink); padding: 26px 22px 22px; display: flex; flex-direction: column; gap: 14px; position: relative; transition: background 0.25s; }
        .ft-card:hover { background: var(--ink-2); }
        .ft-card .icon-wrap { color: var(--steel-dim); height: 40px; display: flex; align-items: center; transition: color 0.25s; }
        .ft-card:hover .icon-wrap { color: var(--ember); }
        .ft-card .icon-wrap svg { width: 100%; max-width: 130px; height: 34px; }
        .ft-card h3 { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 600; margin: 0; }
        .ft-card .spec-line { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--steel-dim); display: flex; justify-content: space-between; border-top: 1px dashed var(--hair); padding-top: 10px; }
        .ft-card p.blurb { font-size: 13px; color: var(--paper-dim); line-height: 1.55; margin: 0; flex: 1; }
        .ft-card-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }
        .ft-price { font-family: 'IBM Plex Mono', monospace; font-size: 16px; }
        .ft-add { background: none; border: 1px solid var(--steel-dim); color: var(--paper); font-size: 12px; padding: 8px 14px; border-radius: 2px; cursor: pointer; transition: all 0.2s; }
        .ft-add:hover { background: var(--ember); border-color: var(--ember); color: var(--ink); }

        /* ---------- footer ---------- */
        .ft-footer { border-top: 1px solid var(--hair); padding: 40px clamp(20px, 5vw, 56px) 50px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
        .ft-footer .quote { font-family: 'Fraunces', serif; font-style: italic; color: var(--paper-dim); max-width: 40ch; font-size: 15px; }
        .ft-footer .fine { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--steel-dim); }

        /* ---------- drawer ---------- */
        .ft-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 50; opacity: 0; pointer-events: none; transition: opacity 0.25s; }
        .ft-overlay.open { opacity: 1; pointer-events: auto; }
        .ft-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; width: min(400px, 92vw); background: var(--ink-2);
          border-left: 1px solid var(--hair); z-index: 51; display: flex; flex-direction: column;
          transform: translateX(100%); transition: transform 0.3s cubic-bezier(.4,0,.2,1);
        }
        .ft-drawer.open { transform: translateX(0); }
        .ft-drawer-head { display: flex; justify-content: space-between; align-items: center; padding: 22px 24px; border-bottom: 1px solid var(--hair); }
        .ft-drawer-head h3 { font-family: 'Fraunces', serif; font-size: 19px; margin: 0; }
        .ft-drawer-head button { background: none; border: none; color: var(--paper); cursor: pointer; padding: 4px; }
        .ft-drawer-body { flex: 1; overflow-y: auto; padding: 8px 24px; }
        .ft-line-item { display: flex; gap: 14px; padding: 16px 0; border-bottom: 1px solid var(--hair); }
        .ft-line-item .icon-wrap { color: var(--steel-dim); width: 56px; flex-shrink: 0; display: flex; align-items: center; }
        .ft-line-item .icon-wrap svg { width: 56px; height: 22px; }
        .ft-line-item .info { flex: 1; }
        .ft-line-item h4 { margin: 0 0 4px; font-family: 'Fraunces', serif; font-size: 15px; font-weight: 600; }
        .ft-line-item .spec { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--steel-dim); }
        .qty-row { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
        .qty-row button { background: none; border: 1px solid var(--hair); color: var(--paper); width: 24px; height: 24px; cursor: pointer; border-radius: 2px; display: flex; align-items: center; justify-content: center; }
        .qty-row button:hover { border-color: var(--ember); }
        .qty-row .n { font-family: 'IBM Plex Mono', monospace; font-size: 13px; min-width: 18px; text-align: center; }
        .li-price { font-family: 'IBM Plex Mono', monospace; font-size: 13px; }
        .ft-drawer-foot { padding: 20px 24px 26px; border-top: 1px solid var(--hair); }
        .ft-subtotal { display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 14px; margin-bottom: 16px; }
        .ft-checkout { width: 100%; background: var(--ember); color: var(--ink); border: none; padding: 14px; font-size: 14px; font-weight: 600; cursor: pointer; border-radius: 2px; }
        .ft-checkout:hover { background: #d67440; }
        .ft-empty { padding: 60px 0; text-align: center; color: var(--paper-dim); font-size: 14px; }
        .ft-empty .icon-wrap { color: var(--hair); margin-bottom: 14px; justify-content: center; }
        .ft-order-done { text-align: center; padding: 60px 20px; }
        .ft-order-done h3 { font-family: 'Fraunces', serif; font-size: 22px; margin-bottom: 10px; }
        .ft-order-done p { color: var(--paper-dim); font-size: 13px; margin-bottom: 20px; }
        .ft-order-done button { background: none; border: 1px solid var(--hair); color: var(--paper); padding: 10px 18px; border-radius: 2px; cursor: pointer; font-size: 13px; }

        /* ---------- toast ---------- */
        .ft-toast {
          position: fixed; bottom: 26px; left: 50%; transform: translateX(-50%);
          background: var(--paper); color: var(--ink); padding: 12px 20px; border-radius: 2px;
          font-size: 13px; font-family: 'IBM Plex Mono', monospace; z-index: 60;
          box-shadow: 0 8px 24px rgba(0,0,0,0.35);
        }

        @media (max-width: 820px) {
          .ft-hero { grid-template-columns: 1fr; }
          .ft-nav .ft-links { display: none; }
        }
      `}</style>

      {/* ---------------- header ---------------- */}
      <header className="ft-header">
        <div className="ft-logo">
          <span className="name">Forge &amp; Table</span>
          <span className="tag">Hand-forged kitchen steel</span>
        </div>
        <nav className="ft-nav">
          <div className="ft-links" style={{ display: "flex", gap: 32 }}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={activeCat === c ? "active" : ""}
                onClick={() => {
                  setActiveCat(c);
                  document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <button className="ft-cart-btn" onClick={() => setDrawerOpen(true)} aria-label="Open cart">
            <ShoppingBag size={16} />
            <span className="mono ft-cart-count">{cartCount}</span>
          </button>
        </nav>
      </header>

      {/* ---------------- hero ---------------- */}
      <section className="ft-hero">
        <div>
          <h1>
            Steel, <em>tempered</em><br />by hand.
          </h1>
          <p className="lede">
            Forged, ground, and sharpened kitchen tools built to hold an edge and last for years.
          </p>
          <button className="ft-cta" onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}>
            Shop the forge <ArrowRight size={15} />
          </button>
        </div>
        <div className="ft-drawing">
          <svg className="big-knife" viewBox="0 0 400 160" fill="none">
            <path d="M20 92 L250 92 C300 92 360 68 388 48 L388 54 C368 78 306 100 250 100 L20 100 Z" stroke="currentColor" strokeWidth="1.2" />
            <path d="M20 92 L20 118 L62 118 L62 100" stroke="currentColor" strokeWidth="1.2" />
            <line x1="20" y1="100" x2="62" y2="100" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <line x1="20" y1="130" x2="388" y2="130" stroke="#3E5C76" strokeWidth="1" opacity="0.6" />
            <line x1="20" y1="126" x2="20" y2="134" stroke="#3E5C76" strokeWidth="1" opacity="0.6" />
            <line x1="388" y1="126" x2="388" y2="134" stroke="#3E5C76" strokeWidth="1" opacity="0.6" />
          </svg>
          <div className="callout mono c1">52100 CARBON STEEL</div>
          <div className="callout mono c2">3.2mm SPINE, FULL FLAT GRIND</div>
          <div className="callout mono c3" style={{ bottom: "2%" }}>225mm EDGE</div>
        </div>
      </section>

      <div style={{ padding: "0 clamp(20px, 5vw, 56px)" }}>
        <TemperLine />
      </div>

      {/* ---------------- catalog ---------------- */}
      <section className="ft-catalog" id="catalog">
        <div className="ft-catalog-head">
          <h2>{activeCat === "All" ? "The full catalog" : activeCat}</h2>
          <div className="ft-tabs">
            {CATEGORIES.map((c) => (
              <button key={c} className={activeCat === c ? "active" : ""} onClick={() => setActiveCat(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="ft-grid">
          {products.map((p) => (
            <div className="ft-card" key={p.id}>
              <div className="icon-wrap"><ToolIcon type={p.icon} /></div>
              <h3>{p.name}</h3>
              <p className="blurb">{p.blurb}</p>
              <div className="spec-line">
                <span>{p.steel}</span>
                <span>{p.spec}</span>
              </div>
              <div className="ft-card-foot">
                <span className="ft-price">₹{p.price.toLocaleString("en-IN")}</span>
                <button className="ft-add" onClick={() => addToCart(p.id, p.name)}>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ padding: "0 clamp(20px, 5vw, 56px)" }}>
        <TemperLine flat />
      </div>

      {/* ---------------- footer ---------------- */}
      <footer className="ft-footer">
        <p className="quote">Kitchen tools made to be used, sharpened, and passed down.</p>
        <div className="fine">FORGE &amp; TABLE — HAND-FORGED KITCHEN STEEL</div>
      </footer>

      {/* ---------------- cart drawer ---------------- */}
      <div className={`ft-overlay ${drawerOpen ? "open" : ""}`} onClick={() => setDrawerOpen(false)} />
      <aside className={`ft-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="ft-drawer-head">
          <h3>Your order</h3>
          <button onClick={() => setDrawerOpen(false)} aria-label="Close cart"><X size={20} /></button>
        </div>

        {orderPlaced ? (
          <div className="ft-order-done">
            <h3>Order placed.</h3>
            <p className="mono">Your order will ship within three working days.</p>
            <button onClick={() => { setOrderPlaced(false); setDrawerOpen(false); }}>Keep browsing</button>
          </div>
        ) : (
          <>
            <div className="ft-drawer-body">
              {cartItems.length === 0 ? (
                <div className="ft-empty">
                  <div className="icon-wrap" style={{ justifyContent: "center" }}><ShoppingBag size={28} /></div>
                  Nothing in here yet. Add a blade or a pan.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div className="ft-line-item" key={item.id}>
                    <div className="icon-wrap"><ToolIcon type={item.icon} /></div>
                    <div className="info">
                      <h4>{item.name}</h4>
                      <div className="spec">{item.steel} · {item.spec}</div>
                      <div className="qty-row">
                        <button onClick={() => changeQty(item.id, -1)}><Minus size={12} /></button>
                        <span className="n">{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)}><Plus size={12} /></button>
                      </div>
                    </div>
                    <div className="li-price">₹{(item.price * item.qty).toLocaleString("en-IN")}</div>
                  </div>
                ))
              )}
            </div>
            <div className="ft-drawer-foot">
              <div className="ft-subtotal">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <button className="ft-checkout" disabled={cartItems.length === 0} style={cartItems.length === 0 ? { opacity: 0.4, cursor: "not-allowed" } : {}} onClick={placeOrder}>
                Place order
              </button>
            </div>
          </>
        )}
      </aside>

      {toast && <div className="ft-toast">{toast}</div>}
    </div>
  );
}
