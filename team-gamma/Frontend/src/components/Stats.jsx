import React from "react";

const STATS = [
  { n: "40+", l: "brands launched" },
  { n: "72h", l: "avg. turnaround" },
  { n: "4.9★", l: "client rating" },
  { n: "24/7", l: "chat coverage" },
];

export default function Stats() {
  return (
    <section className="vn-stats">
      {STATS.map((s) => (
        <div className="vn-stats__item" key={s.l}>
          <div className="vn-stats__n">{s.n}</div>
          <div className="vn-stats__l">{s.l}</div>
        </div>
      ))}
    </section>
  );
}
