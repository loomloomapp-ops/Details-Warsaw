import Link from "next/link";
import { Logo } from "./Icons";
import HeaderSearch from "./HeaderSearch";
import { type Locale, t } from "@/lib/i18n";

type Current = "home" | "catalog" | "categories" | "contacts";

export default function Header({ current = "home", locale }: { current?: Current; locale: Locale }) {
  const nav: { id: Current; label: string; href: string }[] = [
    { id: "catalog",    label: t("catalog", locale),    href: "/catalog" },
    { id: "categories", label: t("categories", locale), href: "/categories" },
    { id: "contacts",   label: t("contacts", locale),   href: "/#footer" },
  ];
  return (
    <header className="hd-desktop" style={{
      height: 66, padding: "10px 70px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid var(--hd-hairline)", background: "#fff",
      position: "relative", zIndex: 5,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 70 }}>
        <Link href="/" style={{ display: "flex" }}><Logo /></Link>
        <nav style={{ display: "flex", gap: 32 }}>
          {nav.map((n) => (
            <Link key={n.id} href={n.href} style={{
              fontSize: 16, fontWeight: current === n.id ? 600 : 500, color: "#000",
            }}>{n.label}</Link>
          ))}
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <LocaleSwitcher locale={locale} />
        <HeaderSearch locale={locale} placeholder={t("searchPlaceholder", locale)} />
      </div>
    </header>
  );
}

export function LocaleSwitcher({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  const muted = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.7)";
  const active = dark ? "#fff" : "#000";
  const sep = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
  const list: Locale[] = ["ru", "ua", "pl"];
  return (
    <div style={{ display: "flex", gap: 10, fontSize: 14, color: muted }}>
      {list.map((l, i) => (
        <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <a
            href={`/api/locale?l=${l}`}
            className="hd-link-hover"
            style={{
              fontWeight: l === locale ? 600 : 500,
              color: l === locale ? active : muted,
            }}
          >{l.toUpperCase()}</a>
          {i < list.length - 1 && <span style={{ color: sep }}>/</span>}
        </span>
      ))}
    </div>
  );
}
