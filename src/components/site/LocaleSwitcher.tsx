"use client";

import { usePathname, useRouter } from "next/navigation";
import { type Locale, LOCALES, stripLocalePrefix } from "@/lib/i18n";

export default function LocaleSwitcher({
  locale,
  dark = false,
}: {
  locale: Locale;
  dark?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const muted = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.7)";
  const active = dark ? "#fff" : "#000";
  const sep = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";

  function switchTo(l: Locale) {
    const stripped = stripLocalePrefix(pathname);
    const target = l === "ru" ? stripped : `/${l}${stripped === "/" ? "" : stripped}`;
    document.cookie = `locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.push(target || "/");
    router.refresh();
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
