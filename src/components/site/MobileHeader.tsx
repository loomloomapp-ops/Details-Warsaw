"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons, Logo } from "./Icons";
import HeaderSearch from "./HeaderSearch";
import LocaleSwitcherClient from "./LocaleSwitcher";
import { type Locale, t, localeHref } from "@/lib/i18n";

export default function MobileHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="hd-mobile" style={{
      height: 64, padding: "0 20px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid var(--hd-hairline)", background: "#fff",
      position: "relative", zIndex: 5,
    }}>
      <Link href={localeHref("/", locale)} style={{ display: "flex" }}><Logo /></Link>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          aria-label="Search"
          onClick={() => setSearchOpen((v) => !v)}
          style={{
            width: 36, height: 36, border: 0, background: "transparent",
            display: "grid", placeItems: "center", padding: 0,
          }}
        >
          <Icons.Search size={18} color="#000" />
        </button>
        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
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
          <div style={{
            marginTop: 6, paddingTop: 10, borderTop: "1px solid var(--hd-hairline)",
            display: "flex", justifyContent: "space-around",
          }}>
            <LocaleSwitcherClient locale={locale} />
          </div>
        </div>
      )}
    </header>
  );
}
