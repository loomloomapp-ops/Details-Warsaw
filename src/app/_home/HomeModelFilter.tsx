"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Icons } from "@/components/site/Icons";

type Product = {
  id: number;
  name: string;
  partNumber: string | null;
  image: string | null;
  make: string | null;
};

export default function HomeModelFilter({
  makes,
  products,
  viewLabel,
}: {
  makes: string[];
  products: Product[];
  viewLabel: string;
}) {
  const [active, setActive] = useState<string | null>(makes[0] ?? null);
  const sliderRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    if (!sliderRef.current) return;
    const w = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({ left: dir * Math.max(280, w * 0.7), behavior: "smooth" });
  }

  const filtered = active
    ? products.filter((p) => (p.make || "").toLowerCase() === active.toLowerCase())
    : products;

  return (
    <div className="hd-home-makes" style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
      {/* tabs row */}
      <div
        className="hd-makes-tabs"
        style={{
          display: "flex", gap: 10,
          overflowX: "auto", paddingBottom: 4,
          scrollBehavior: "smooth", scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {makes.length === 0 ? (
          <div style={{ color: "rgba(0,0,0,0.5)", fontSize: 14, padding: "8px 0" }}>—</div>
        ) : makes.map((m) => {
          const on = m === active;
          return (
            <button
              key={m}
              type="button"
              onClick={() => setActive(m)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 18px", borderRadius: 999,
                border: "1px solid " + (on ? "#000" : "var(--hd-hairline)"),
                background: on ? "#000" : "#fff",
                color: on ? "#fff" : "#000",
                fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", cursor: "pointer",
                transition: "background .2s ease, color .2s ease, border-color .2s ease",
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: on ? "#fff" : "#BABABA",
              }} />
              {m}
            </button>
          );
        })}
      </div>

      {/* products slider */}
      <div className="hd-makes-wrap" style={{ position: "relative" }}>
        <button
          type="button"
          aria-label="Prev"
          onClick={() => scroll(-1)}
          className="hd-makes-arrow hd-makes-arrow-left"
        ><span style={{ transform: "rotate(180deg)", display: "inline-flex" }}><Icons.ChevronRight size={18} color="#000" /></span></button>

        <div
          ref={sliderRef}
          className="hd-makes-slider"
          style={{
            display: "flex", gap: 24,
            overflowX: "auto", overflowY: "visible",
            paddingTop: 16, paddingBottom: 16,
            marginTop: -16, marginBottom: -16,
            scrollBehavior: "smooth", scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: "30px 0", color: "rgba(0,0,0,0.5)", fontSize: 14 }}>—</div>
          ) : filtered.map((p) => (
            <Link
              key={p.id}
              href={`/catalog/${p.id}`}
              className="hd-product-card hd-makes-item"
              style={{
                display: "flex", flexDirection: "column", gap: 14,
                scrollSnapAlign: "start",
              }}
            >
              <div className="hd-product-image" style={{
                width: "100%", aspectRatio: "202 / 200",
                borderRadius: 8,
                background: "var(--hd-panel)",
                border: "1px solid var(--hd-hairline)",
                backgroundImage: `url(${p.image || "/design/bumper.png"})`,
                backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
              }} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 500 }}>{p.name}</div>
                {p.partNumber && (
                  <div style={{ marginTop: 6, fontSize: 13, color: "rgba(0,0,0,0.6)" }}>№ {p.partNumber}</div>
                )}
              </div>
              <div className="hd-view-btn" style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                height: 40, padding: "0 14px",
                borderRadius: 8, background: "var(--hd-panel)",
                border: "1px solid var(--hd-border)",
                fontSize: 14, fontWeight: 500,
              }}>
                {viewLabel} <Icons.ChevronRight size={16} />
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Next"
          onClick={() => scroll(1)}
          className="hd-makes-arrow hd-makes-arrow-right"
        ><Icons.ChevronRight size={18} color="#000" /></button>
      </div>
    </div>
  );
}
