"use client";

import { usePathname } from "next/navigation";
import { type Locale, LOCALES, stripLocalePrefix } from "@/lib/i18n";

export default function LocaleSwitcher({
  locale,
  dark = false,
}: {
  locale: Locale;
  dark?: boolean;
}) {
  const pathname = usePathname() || "/";
  const muted = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.7)";
  const active = dark ? "#fff" : "#000";
  const sep = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";

  function switchTo(l: Locale) {
    const stripped = stripLocalePrefix(pathname);
    const target =
      l === "ru" ? (stripped || "/") : `/${l}${stripped === "/" ? "" : stripped}`;
    // Persist cookie immediately and force a full reload so the server re-renders
    // every server component (layout + page) with the new locale.
    document.cookie = `locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    window.location.assign(target + search + hash);
  }

  return (
    <div style={{ display: "flex", gap: 10, fontSize: 14, color: muted }}>
      {LOCALES.map((l, i) => (
        <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            onClick={() => switchTo(l)}
            className="hd-link-hover"
            style={{
              background: "transparent", border: 0, padding: 0, cursor: "pointer",
              fontWeight: l === locale ? 600 : 500,
              color: l === locale ? active : muted,
              fontSize: 14, fontFamily: "inherit",
            }}
          >{l.toUpperCase()}</button>
          {i < LOCALES.length - 1 && <span style={{ color: sep }}>/</span>}
        </span>
      ))}
    </div>
  );
}
