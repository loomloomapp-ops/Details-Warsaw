"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

type Opts = { makes: string[]; models: string[]; years: string[] };

export default function CatalogFilters({
  options,
  initial,
  applyLabel,
  placeholders,
}: {
  options: Opts;
  initial: { make?: string; model?: string; year?: string };
  applyLabel: string;
  placeholders: { make: string; model: string; year: string };
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const [make, setMake] = useState(initial.make ?? "");
  const [model, setModel] = useState(initial.model ?? "");
  const [year, setYear] = useState(initial.year ?? "");
  const [pending, start] = useTransition();

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(sp.toString());
    setOrDelete(params, "make", make);
    setOrDelete(params, "model", model);
    setOrDelete(params, "year", year);
    start(() => router.push(`/catalog?${params.toString()}`));
  }

  return (
    <form onSubmit={apply} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Select value={make} onChange={setMake} placeholder={placeholders.make} options={options.makes} />
      <Select value={model} onChange={setModel} placeholder={placeholders.model} options={options.models} />
      <Select value={year} onChange={setYear} placeholder={placeholders.year} options={options.years} />
      <button type="submit" disabled={pending} style={{
        marginTop: 6,
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
        width: "100%", height: 44, padding: "0 22px", borderRadius: 40,
        background: "var(--hd-green)", color: "#fff", border: 0,
        fontSize: 15, fontWeight: 500, cursor: "pointer",
        transition: "transform .2s ease, background .2s ease",
        opacity: pending ? 0.7 : 1,
      }}>
        {applyLabel}
      </button>
    </form>
  );
}

function setOrDelete(p: URLSearchParams, key: string, val: string) {
  if (val) p.set(key, val);
  else p.delete(key);
}

function Select({
  value, onChange, placeholder, options,
}: {
  value: string; onChange: (v: string) => void;
  placeholder: string; options: string[];
}) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", height: 42, padding: "0 36px 0 14px",
          border: "1px solid var(--hd-hairline)", borderRadius: 8,
          background: "#fff", fontSize: 14, fontWeight: 500,
          color: value ? "#000" : "rgba(0,0,0,0.5)",
          appearance: "none", WebkitAppearance: "none", MozAppearance: "none",
          fontFamily: "inherit", cursor: "pointer",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg
        width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5"
        style={{ position: "absolute", right: 12, top: 13, pointerEvents: "none", color: "rgba(0,0,0,0.6)" }}
      >
        <polyline points="6,9 12,15 18,9" />
      </svg>
    </div>
  );
}
