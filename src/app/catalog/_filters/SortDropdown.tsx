"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export type SortKey = "popular" | "newest" | "oldest" | "name_asc" | "name_desc";

export default function SortDropdown({
  current,
  labels,
  sortByLabel,
}: {
  current: SortKey;
  labels: Record<SortKey, string>;
  sortByLabel: string;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const [open, setOpen] = useState(false);
  const [, start] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function pick(key: SortKey) {
    setOpen(false);
    const params = new URLSearchParams(sp.toString());
    if (key === "popular") params.delete("sort");
    else params.set("sort", key);
    const qs = params.toString();
    start(() => router.push(qs ? `?${qs}` : "?"));
  }

  const items: SortKey[] = ["popular", "newest", "oldest", "name_asc", "name_desc"];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 15, position: "relative" }} ref={ref}>
      <span style={{ color: "rgba(0,0,0,0.6)" }}>{sortByLabel}</span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          height: 38, padding: "0 14px",
          border: "1px solid var(--hd-hairline)", borderRadius: 8, background: "#fff",
          display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 500,
          cursor: "pointer", fontFamily: "inherit",
        }}
      >
        {labels[current]}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: 44, right: 0, zIndex: 20,
          minWidth: 220, background: "#fff",
          border: "1px solid var(--hd-hairline)", borderRadius: 8,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)", overflow: "hidden",
        }}>
          {items.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => pick(k)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "10px 14px", fontSize: 14,
                background: k === current ? "var(--hd-panel)" : "#fff",
                color: "#000", border: 0, cursor: "pointer", fontFamily: "inherit",
              }}
            >
              {labels[k]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
