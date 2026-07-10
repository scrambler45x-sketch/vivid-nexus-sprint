import React from "react";
import { useBrandFonts } from "../hooks/useBrandFonts.js";

import Nav from "../components/Nav.jsx";
import Hero from "../components/Hero.jsx";
import Stats from "../components/Stats.jsx";
import Services from "../components/Services.jsx";
import Rules from "../components/Rules.jsx";
import Testimonials from "../components/Testimonials.jsx";
import FinalCTA from "../components/FinalCTA.jsx";
import Footer from "../components/Footer.jsx";
import Chatbot from "../components/Chatbot.jsx";

export default function Home() {
  useBrandFonts();

  return (
    <div className="vn-root">
      <Nav />
      <Hero />
      <Stats />
      <Chatbot
        brandName="Vivid Nexus"
        brandColor="#22c55e"
      />
      <Services />
      <Rules />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}
