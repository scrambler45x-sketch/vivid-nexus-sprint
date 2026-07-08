import React from "react";
import BrowserWindow from "./BrowserWindow.jsx";
import PricingCard from "./PricingCard.jsx";

export default function PricingLevel({ id, title, subtitle, url, plans, icon }) {
  return (
    <BrowserWindow url={url} className="vn-level">
      <div className="vn-level__inner">
        <div className="vn-level__head">
          <span className="vn-tag vn-tag--solid">LEVEL {id}</span>
          <div className="vn-level__title-row">
            {icon}
            <h3>{title}</h3>
          </div>
          <p>{subtitle}</p>
        </div>
        <div className="vn-level__grid">
          {plans.map((p) => (
            <PricingCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </BrowserWindow>
  );
}
