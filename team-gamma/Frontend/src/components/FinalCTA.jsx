import React from "react";
import { Instagram, Mail } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="vn-final">
      <div className="vn-final__inner">
        <h2>
          Ready to <span className="vn-outline">dominate online?</span>
        </h2>
        <p>
          We only take a limited number of brands each month, to ensure every
          single one gets elite-quality attention.
        </p>
        <div className="vn-hero__actions" style={{ justifyContent: "center" }}>
          <a href="#" className="vn-btn vn-btn--solid">
            <Instagram size={16} /> Message on Instagram
          </a>
          <a href="#" className="vn-btn vn-btn--ghost">
            <Mail size={16} /> Email Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
