"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "./Icons";
import { type Locale, pickProductName, t } from "@/lib/i18n";

type Item = {
  id: number;
  nameRu: string; nameUa: string | null; namePl: string | null;
  partNumber: string | null; article: string | null;
  image: string | null;
};

export default function HeaderSearch({
  locale,
  placeholder,
  variant = "desktop",
}: {
  locale: Locale;
  placeholder: string;
  variant?: "desktop" | "mobile";
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const debouncer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aborter = useRef<AbortController | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!wrap.current) return;
      if (!wrap.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    if (debouncer.current) clearTimeout(debouncer.current);
    if (aborter.current) aborter.current.abort();
    const trimmed = q.trim();
    if (!trimmed) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debouncer.current = setTimeout(async () => {
      aborter.current = new AbortController();
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
          signal: aborter.current.signal,
        });
        const data = await res.json();
        setItems(data.items || []);
      } catch (e: any) {
        if (e?.name !== "AbortError") setItems([]);
      } finally {
        setLoading(false);
      }
    }, 180);
    return () => {
      if (debouncer.current) clearTimeout(debouncer.current);
    };
  }, [q]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed) router.push(`/catalog?q=${encodeURIComponent(trimmed)}`);
    setOpen(false);
  }

  const isMobile = variant === "mobile";

  return (
    <div ref={wrap} style={{ position: "relative", width: isMobile ? "100%" : 340 }}>
      <form
        onSubmit={submit}
        style={{
          width: "100%", height: isMobile ? 44 : 42,
          border: "1px solid var(--hd-hairline)", borderRadius: 10,
          display: "flex", alignItems: "center", gap: 10, padding: "0 14px",
          background: "#fff",
          transition: "border-color .2s ease, box-shadow .2s ease",
          ...(open ? { borderColor: "var(--hd-green)", boxShadow: "0 4px 14px rgba(68,122,68,0.12)" } : {}),
        }}
      >
        <Icons.Search size={16} color="rgba(0,0,0,0.6)" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => { if (q.trim()) setOpen(true); }}
          placeholder={placeholder}
          style={{
            border: 0, outline: 0, background: "transparent",
            fontSize: 14, color: "#000", flex: 1, fontFamily: "inherit",
          }}
        />
      </form>

      {open && q.trim() && (
        <div
          style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
            background: "#fff", border: "1px solid var(--hd-hairline)",
            borderRadius: 12, boxShadow: "0 14px 40px rgba(0,0,0,0.10)",
            overflow: "hidden", zIndex: 60,
            maxHeight: 420, overflowY: "auto",
          }}
        >
          {loading && (
            <div style={{ padding: 14, fontSize: 13, color: "rgba(0,0,0,0.5)" }}>...</div>
          )}
          {!loading && items.length === 0 && (
            <div style={{ padding: 14, fontSize: 13, color: "rgba(0,0,0,0.5)" }}>
              {t("searchNoResults", locale)}
            </div>
          )}
          {!loading && items.map((it) => {
            const name = pickProductName(it as any, locale);
            return (
              <Link
                key={it.id}
                href={`/catalog/${it.id}`}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 14px", borderBottom: "1px solid var(--hd-hairline)",
                  transition: "background .15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--hd-panel)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 8, flex: "0 0 44px",
                  background: "var(--hd-panel)",
                  backgroundImage: `url(${it.image ?? "/design/bumper.png"})`,
                  backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{
                    fontSize: 13, fontWeight: 500,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{name}</div>
                  {(it.partNumber || it.article) && (
                    <div style={{ marginTop: 2, fontSize: 11, color: "rgba(0,0,0,0.5)" }}>
                      {it.partNumber ? `№ ${it.partNumber}` : it.article}
                    </div>
                  )}
                </div>
                <Icons.ChevronRight size={14} color="rgba(0,0,0,0.4)" />
              </Link>
            );
          })}
          {!loading && items.length > 0 && (
            <Link
              href={`/catalog?q=${encodeURIComponent(q.trim())}`}
              onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "12px 14px", fontSize: 13, fontWeight: 600, color: "var(--hd-green)",
                background: "var(--hd-panel)",
              }}
            >
              {t("searchShowAll", locale)} <Icons.ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
