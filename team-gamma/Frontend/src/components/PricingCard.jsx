import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { slugify } from "../utils/slug.js";

export default function PricingCard({ tag, title, audience, price, per, desc }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/checkout/${slugify(title)}`, {
      state: { title, price, per, audience, desc },
    });
  };

  return (
    <div className="vn-pcard">
      <span className="vn-tag">{tag}</span>
      <h4 className="vn-pcard__title">{title}</h4>
      <p className="vn-pcard__audience">{audience}</p>
      <div className="vn-price vn-price--sm">
        <span className="vn-price__currency">₹</span>
        {price}
        <span className="vn-price__per">/{per}</span>
      </div>
      <p className="vn-pcard__desc">{desc}</p>
      <a href="#" className="vn-btn vn-btn--ghost vn-btn--block" onClick={handleClick}>
        Get Started <ArrowRight size={14} />
      </a>
    </div>
  );
}
