import React from "react";
import { Globe } from "lucide-react";

/**
 * Signature element: an animated "browser window" chrome.
 * Every section reuses this frame — because the product being
 * sold IS a website, so the site keeps showing you one.
 */
export default function BrowserWindow({
  url,
  children,
  className = "",
  tone = "dark",
}) {
  return (
    <div className={`vn-window ${tone === "light" ? "vn-window--light" : ""} ${className}`}>
      <div className="vn-window__bar">
        <div className="vn-window__dots">
          <span />
          <span />
          <span />
        </div>
        <div className="vn-window__url">
          <Globe size={12} strokeWidth={2} />
          <span>{url}</span>
        </div>
        <div className="vn-window__spacer" />
      </div>
      <div className="vn-window__body">{children}</div>
    </div>
  );
}
