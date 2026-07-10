import React from "react";
import { Instagram, ArrowRight } from "lucide-react";
import BrowserWindow from "./BrowserWindow.jsx";
import TypingURL from "./TypingURL.jsx";

export default function Hero() {
  const scrollToServices = (e) => {
    e.preventDefault();
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="vn-section vn-hero" id="home">
      <div className="vn-hero__grid">
        <div>
          <div className="vn-eyebrow">
            <span className="vn-dot" />
            GROWTH STUDIO — INDIA
          </div>

          <h1 className="vn-h1">
            We build sites.
            <br />
            We build brands.
            <br />
            <span className="vn-outline">We build growth.</span>
          </h1>

          <p className="vn-lede">
            One-page websites, scroll-stopping social content, and always-on
            chat assistants — engineered to turn attention into paying
            customers. No fluff, no filler decks. Just shipped work.
          </p>

          <div className="vn-hero__actions">
            <a
              href="https://www.instagram.com/vividnexus.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="vn-btn vn-btn--solid"
            >
              <Instagram size={16} /> DM Us on Instagram
            </a>
            <a href="#services" className="vn-btn vn-btn--ghost" onClick={scrollToServices}>
              View Pricing <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <BrowserWindow url="vividnexus.in/preview" className="vn-hero__window">
          <div className="vn-mock">
            <div className="vn-mock__eyebrow">
              <TypingURL />
            </div>
            <div className="vn-mock__title-line vn-mock__title-line--w1" />
            <div className="vn-mock__title-line vn-mock__title-line--w2" />
            <div className="vn-mock__row">
              <div className="vn-mock__pill" />
              <div className="vn-mock__pill vn-mock__pill--ghost" />
            </div>
            <div className="vn-mock__cards">
              <div className="vn-mock__card" />
              <div className="vn-mock__card" />
              <div className="vn-mock__card" />
            </div>
          </div>
        </BrowserWindow>
      </div>
    </section>
  );
}
