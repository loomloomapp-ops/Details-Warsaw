"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons, Logo } from "./Icons";
import HeaderSearch from "./HeaderSearch";
import { type Locale, LOCALES, t, localeHref, stripLocalePrefix } from "@/lib/i18n";

function GlobeIcon({ size = 20, color = "#000" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
}

export default function MobileHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname() || "/";

  function switchTo(l: Locale) {
    const stripped = stripLocalePrefix(pathname);
    const target =
      l === "ru" ? (stripped || "/") : `/${l}${stripped === "/" ? "" : stripped}`;
    document.cookie = `locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    window.location.assign(target + search + hash);
  }

  return (
    <header className="hd-mobile" style={{
      height: 64, padding: "0 20px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid var(--hd-hairline)", background: "#fff",
      position: "relative", zIndex: 5,
    }}>
      <Link href={localeHref("/", locale)} style={{ display: "flex" }}><Logo compact /></Link>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          aria-label="Search"
          onClick={() => { setSearchOpen((v) => !v); setLangOpen(false); setOpen(false); }}
          style={{
            width: 36, height: 36, border: 0, background: "transparent",
            display: "grid", placeItems: "center", padding: 0,
          }}
        >
          <Icons.Search size={18} color="#000" />
        </button>
        <button
          aria-label="Language"
          onClick={() => { setLangOpen((v) => !v); setOpen(false); setSearchOpen(false); }}
          style={{
            height: 36, border: 0, background: "transparent",
            display: "inline-flex", alignItems: "center", gap: 4, padding: "0 4px",
            fontSize: 13, fontWeight: 600, color: "#000", fontFamily: "inherit",
          }}
        >
          <GlobeIcon size={18} color="#000" />
          <span style={{ fontSize: 13 }}>{locale.toUpperCase()}</span>
        </button>
        <button
          aria-label="Menu"
          onClick={() => { setOpen((o) => !o); setLangOpen(false); setSearchOpen(false); }}
          style={{
            width: 36, height: 36, border: 0, background: "transparent",
            display: "grid", placeItems: "center", padding: 0,
          }}
        >
          <Icons.Menu size={22} color="#000" />
        </button>
      </div>

      {searchOpen && (
        <div style={{
          position: "absolute", top: 64, left: 12, right: 12,
          background: "#fff",
          border: "1px solid var(--hd-hairline)",
          borderRadius: 10, padding: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}>
          <HeaderSearch
            locale={locale}
            placeholder={t("searchPlaceholder", locale)}
            variant="mobile"
          />
        </div>
      )}

      {langOpen && (
        <div style={{
          position: "absolute", top: 64, right: 60, width: 140,
          background: "#fff", border: "1px solid var(--hd-hairline)",
          borderRadius: 12, padding: 6,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          display: "flex", flexDirection: "column", gap: 2,
        }}>
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => { setLangOpen(false); switchTo(l); }}
              style={{
                background: l === locale ? "#f3f3f3" : "transparent",
                border: 0, padding: "10px 12px", borderRadius: 8,
                textAlign: "left", cursor: "pointer",
                fontFamily: "inherit", fontSize: 14,
                fontWeight: l === locale ? 600 : 500,
                color: "#000",
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {open && (
        <div style={{
          position: "absolute", top: 64, right: 12, width: 220,
          background: "#fff", border: "1px solid var(--hd-hairline)",
          borderRadius: 12, padding: 10,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {[
            { label: t("home", locale),       href: localeHref("/", locale) },
            { label: t("catalog", locale),    href: localeHref("/catalog", locale) },
            { label: t("categories", locale), href: localeHref("/categories", locale) },
            { label: t("contacts", locale),   href: localeHref("/#footer", locale) },
          ].map((n) => (
            <Link key={n.label} href={n.href} style={{
              padding: "10px 12px", fontSize: 15, borderRadius: 8,
            }} onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
