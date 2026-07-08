import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "Services & Pricing", id: "services" },
  { label: "Rules & Onboarding", id: "rules" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (e, id) => {
    e.preventDefault();

    // If already on homepage, just scroll
    if (window.location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Go back to homepage then scroll
      window.location.href = `/#${id}`;
    }

    setOpen(false);
  };

  return (
    <header className="vn-nav">
      <div className="vn-nav__inner">
        <Link to="/" className="vn-logo">
          Vivid<span>Nexus</span>
        </Link>

        <nav className="vn-nav__links">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="vn-nav__link"
              onClick={(e) => scrollToSection(e, l.id)}
            >
              {l.label}
            </a>
          ))}

          {/* Portfolio Page */}
          <Link className="vn-nav__link" to="/showcase">
            Sample-Sites
          </Link>
        </nav>

        <div className="vn-nav__cta">
          <a
            href="#services"
            className="vn-btn vn-btn--solid"
            onClick={(e) => scrollToSection(e, "services")}
          >
            Start Now
          </a>
        </div>

        <button
          className="vn-nav__burger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="vn-nav__mobile">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="vn-nav__link"
              onClick={(e) => scrollToSection(e, l.id)}
            >
              {l.label}
            </a>
          ))}

          <Link
            className="vn-nav__link"
            to="/showcase"
            onClick={() => setOpen(false)}
          >
            Portfolio
          </Link>

          <a
            href="#services"
            className="vn-btn vn-btn--solid"
            style={{ marginTop: 8 }}
            onClick={(e) => scrollToSection(e, "services")}
          >
            Start Now
          </a>
        </div>
      )}
    </header>
  );
}