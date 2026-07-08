import React, { useEffect, useState } from "react";

const DOMAINS = [
  "yourbrand.in",
  "loading assets…",
  "deploying…",
  "yourbrand.in — LIVE",
];

/**
 * Cycles through a typewriter effect inside the hero's browser mock,
 * simulating a site being built and deployed in real time.
 */
export default function TypingURL() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = DOMAINS[i];
    const speed = deleting ? 28 : 55;
    const t = setTimeout(() => {
      if (!deleting) {
        if (text.length < full.length) {
          setText(full.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 900);
        }
      } else if (text.length > 0) {
        setText(full.slice(0, text.length - 1));
      } else {
        setDeleting(false);
        setI((prev) => (prev + 1) % DOMAINS.length);
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return (
    <span>
      {text}
      <span className="vn-caret">|</span>
    </span>
  );
}
