"use client";

import Link from "next/link";
import { useState } from "react";

export type CategoryNavItem = {
  id: number;
  slug: string;
  name: string;
  count: number;
};

export default function CategoryNav({
  items,
  activeSlug,
  allLabel,
  showMoreLabel,
  showLessLabel,
}: {
  items: CategoryNavItem[];
  activeSlug: string;
  allLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 6;
  const overflow = items.length > LIMIT;
  const visible = !overflow || expanded ? items : items.slice(0, LIMIT);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Link href="/catalog" className="hd-nav-pill" style={navLink(!activeSlug)}>{allLabel}</Link>
      {visible.map((c) => {
        const active = c.slug === activeSlug;
        return (
          <Link
            key={c.id}
            href={`/catalog?category=${c.slug}`}
            className="hd-nav-pill"
            style={{ ...navLink(active), display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <span>{c.name}</span>
            <span style={{ fontSize: 12, opacity: active ? 0.7 : 0.5 }}>{c.count}</span>
          </Link>
        );
      })}
      {overflow && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={{
            marginTop: 4, padding: "10px 14px", borderRadius: 8,
            border: "1px dashed var(--hd-hairline)", background: "transparent",
            color: "var(--hd-green)", fontSize: 13, fontWeight: 600, cursor: "pointer",
            textAlign: "left",
          }}
        >
          {expanded ? showLessLabel : `${showMoreLabel} (${items.length - LIMIT})`}
        </button>
      )}
    </div>
  );
}

function navLink(active: boolean): React.CSSProperties {
  return {
    padding: "10px 14px", borderRadius: 8,
    fontSize: 14, fontWeight: active ? 600 : 500,
    background: active ? "#000" : "transparent",
    color: active ? "#fff" : "#000",
    transition: "background .25s ease, color .25s ease, transform .15s ease",
  };
}
