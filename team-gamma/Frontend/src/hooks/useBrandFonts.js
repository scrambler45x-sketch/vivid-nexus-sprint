import { useEffect } from "react";

/**
 * Injects the brand type system (Archivo / Inter / JetBrains Mono)
 * once per document, so any component tree can call this hook safely.
 */
export function useBrandFonts() {
  useEffect(() => {
    const id = "vn-font-link";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}
