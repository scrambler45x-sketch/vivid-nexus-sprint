import React from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Bot, Palette, Check, ArrowRight } from "lucide-react";
import BrowserWindow from "./BrowserWindow.jsx";
import PricingLevel from "./PricingLevel.jsx";
import EnterpriseCard from "./EnterpriseCard.jsx";
import { LEVELS, BUNDLE, ENTERPRISE } from "../data/pricing.js";
import { slugify } from "../utils/slug.js";

const LEVEL_ICONS = {
  architecture: <Globe size={20} />,
  automation: <Bot size={20} />,
  identity: <Palette size={20} />,
};

export default function Services() {
  const navigate = useNavigate();

  const goToCheckout = (e, planData) => {
    e.preventDefault();
    navigate(`/checkout/${slugify(planData.title)}`, { state: planData });
  };

  return (
    <section className="vn-section" id="services">
      <div className="vn-section__head">
        <div className="vn-eyebrow vn-eyebrow--center">PRICING ENGINE</div>
        <h2 className="vn-h2">
          Every layer of your
          <br />
          growth stack, priced.
        </h2>
        <p className="vn-section__sub">
          Four levels, fifteen plans, zero hidden costs — pick a single
          module or stack the whole engine.
        </p>
      </div>

      <div className="vn-levels">
        {LEVELS.map((level) => (
          <PricingLevel key={level.key} icon={LEVEL_ICONS[level.key]} {...level} />
        ))}
      </div>

      <div className="vn-section__head vn-section__head--tight">
        <span className="vn-tag vn-tag--solid">LEVEL 04</span>
        <h3 className="vn-h3">Unified Architecture Machines</h3>
        <p className="vn-section__sub">The closers — a fast bundled launch, or a fully custom build.</p>
      </div>

      <div className="vn-closers">
        <BrowserWindow url="vividnexus.in/bundle" tone="light" className="vn-bundle">
          <div className="vn-bundle__inner">
            <div>
              <span className="vn-tag vn-tag--dark">{BUNDLE.tag}</span>
              <h3 className="vn-bundle__title">{BUNDLE.title}</h3>
              <p className="vn-bundle__desc">{BUNDLE.desc}</p>
              <ul className="vn-bundle__list">
                {BUNDLE.items.map((item) => (
                  <li key={item}>
                    <Check size={16} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="vn-bundle__right">
              <div className="vn-price vn-price--dark">
                <span className="vn-price__currency">₹</span>
                {BUNDLE.price}
              </div>
              <div className="vn-bundle__note">{BUNDLE.note}</div>
              <a
                href="#"
                className="vn-btn vn-btn--dark"
                onClick={(e) =>
                  goToCheckout(e, {
                    title: BUNDLE.title,
                    price: BUNDLE.price,
                    per: "one-time",
                    desc: BUNDLE.desc,
                  })
                }
              >
                Claim This Deal <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </BrowserWindow>

        <EnterpriseCard
          data={ENTERPRISE}
          onGetQuote={(e) =>
            goToCheckout(e, {
              title: ENTERPRISE.title,
              price: ENTERPRISE.price,
              per: "starting at",
              desc: ENTERPRISE.desc,
            })
          }
        />
      </div>
    </section>
  );
}
