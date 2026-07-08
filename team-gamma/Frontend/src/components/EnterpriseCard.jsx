import React from "react";
import { Check, ArrowRight } from "lucide-react";

export default function EnterpriseCard({ data, onGetQuote }) {
  return (
    <div className="vn-enterprise">
      <span className="vn-tag vn-tag--outline">{data.tag}</span>
      <h3 className="vn-enterprise__title">{data.title}</h3>
      <p className="vn-enterprise__desc">{data.desc}</p>
      <ul className="vn-enterprise__list">
        {data.items.map((item) => (
          <li key={item}>
            <Check size={15} /> {item}
          </li>
        ))}
      </ul>
      <div className="vn-enterprise__price">
        <span className="vn-enterprise__note">{data.priceNote}</span>
        <span>
          <span className="vn-price__currency">₹</span>
          {data.price}
          <span className="vn-price__per">+</span>
        </span>
      </div>
      <a href="#" className="vn-btn vn-btn--solid" onClick={onGetQuote}>
        Get a Custom Quote <ArrowRight size={15} />
      </a>
    </div>
  );
}
