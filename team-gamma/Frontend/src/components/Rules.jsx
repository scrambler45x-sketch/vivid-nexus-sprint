import React from "react";
import { Wallet, ShieldCheck, Clock } from "lucide-react";
import BrowserWindow from "./BrowserWindow.jsx";
import Clause from "./Clause.jsx";

export default function Rules() {
  return (
    <section className="vn-section" id="rules">
      <div className="vn-section__head">
        <div className="vn-eyebrow vn-eyebrow--center">RULES &amp; ONBOARDING</div>
        <h2 className="vn-h2">
          Our simple rules
          <br />
          of the game.
        </h2>
        <p className="vn-section__sub">
          We operate with complete transparency. Read this before we begin —
          it protects both parties and keeps things clean.
        </p>
      </div>

      <BrowserWindow url="vividnexus.in/contract.log" className="vn-terminal">
        <div className="vn-terminal__body">
          <Clause index="01" icon={<Wallet size={16} />} title="Payment Structure">
            A <strong>40% advance</strong> is required before any planning or
            development begins. The remaining <strong>60% balance</strong> is
            settled on completion, prior to final asset delivery or code
            handover. No exceptions.
          </Clause>
          <Clause index="02" icon={<ShieldCheck size={16} />} title="Refund Policy">
            <strong>100% non-refundable</strong> once internal design assets
            are allocated and work begins. We commit our full resources to
            your project from day one — we ask that you do the same.
          </Clause>
          <Clause index="03" icon={<Clock size={16} />} title="Client Turnaround">
            To protect delivery timelines, please share brand details, media,
            and feedback <strong>within 48 hours</strong> of request. Delays
            on your end may shift the schedule proportionally.
          </Clause>
        </div>
      </BrowserWindow>

      <div className="vn-agree">
        <h3>Agree with the terms?</h3>
        <p>DM us on Instagram or email to begin your onboarding.</p>
        <div className="vn-hero__actions" style={{ justifyContent: "center" }}>
          <a href="#" className="vn-btn vn-btn--solid">
            Message on Instagram
          </a>
          <a href="#" className="vn-btn vn-btn--ghost">
            Email Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
