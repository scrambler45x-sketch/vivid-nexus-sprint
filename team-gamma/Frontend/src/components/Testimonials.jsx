import React from "react";
import { Star } from "lucide-react";

const QUOTES = [
  {
    q: "Live in three days, leads by the weekend. That's the whole pitch, and they delivered exactly that.",
    n: "Founder, boutique skincare label",
  },
  {
    q: "The chat assistant alone paid for itself in the first ten days — it never sleeps, and neither do our leads.",
    n: "Owner, home renovation studio",
  },
  {
    q: "No fluff decks, no endless calls. Just a brief, a build, and a site that actually converts.",
    n: "Co-founder, fitness coaching brand",
  },
];

export default function Testimonials() {
  return (
    <section className="vn-section">
      <div className="vn-section__head">
        <div className="vn-eyebrow vn-eyebrow--center">CLIENT NOTES</div>
        <h2 className="vn-h2">What clients notice.</h2>
      </div>
      <div className="vn-quotes">
        {QUOTES.map((t) => (
          <div className="vn-quote" key={t.n}>
            <div className="vn-quote__stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </div>
            <p>“{t.q}”</p>
            <span>{t.n}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
