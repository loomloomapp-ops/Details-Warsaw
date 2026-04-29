"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons, Logo } from "./Icons";
import { type Locale, t } from "@/lib/i18n";

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
      <Link href="/" style={{ display: "flex" }}><Logo /></Link>
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
        <form
          action="/catalog"
          method="get"
          style={{
            position: "absolute", top: 64, left: 12, right: 12,
            background: "#fff",
            border: "1px solid var(--hd-hairline)",
            borderRadius: 10, padding: 12,
            display: "flex", alignItems: "center", gap: 10,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <Icons.Search size={16} color="rgba(0,0,0,0.6)" />
          <input
            name="q"
            placeholder={t("searchPlaceholder", locale)}
            autoFocus
            style={{
              border: 0, outline: 0, background: "transparent",
              fontSize: 14, color: "#000", flex: 1, fontFamily: "inherit",
            }}
          />
          <button type="submit" style={{
            height: 32, padding: "0 14px", borderRadius: 999,
            background: "var(--hd-green)", color: "#fff", border: 0,
            fontSize: 13, fontWeight: 600,
          }}>OK</button>
        </form>
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
            { label: t("home", locale),       href: "/" },
            { label: t("catalog", locale),    href: "/catalog" },
            { label: t("categories", locale), href: "/categories" },
            { label: t("contacts", locale),   href: "/#contacts" },
          ].map((n) => (
            <Link key={n.label} href={n.href} style={{
              padding: "10px 12px", fontSize: 15, borderRadius: 8,
            }} onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
          <div style={{
            marginTop: 6, paddingTop: 10, borderTop: "1px solid var(--hd-hairline)",
            display: "flex", justifyContent: "space-around",
          }}>
            {(["ru", "ua", "pl"] as const).map((l) => (
              <a
                key={l}
                href={`/api/locale?l=${l}`}
                style={{
                  fontSize: 13, fontWeight: l === locale ? 700 : 500,
                  color: l === locale ? "#000" : "rgba(0,0,0,0.5)",
                  padding: "4px 8px",
                }}
              >{l.toUpperCase()}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
