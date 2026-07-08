import React from "react";

export default function Footer() {
  return (
    <footer className="vn-footer">
      <div className="vn-footer__inner">
        <div className="vn-logo vn-logo--footer">
          Vivid<span>Nexus</span>
        </div>
        <div className="vn-footer__links">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Terms</a>
          <a href="mailto:work@vividnexus.in">work@vividnexus.in</a>
        </div>
      </div>
      <div className="vn-footer__bottom">© 2026 Vivid Nexus. All rights reserved.</div>
    </footer>
  );
}
