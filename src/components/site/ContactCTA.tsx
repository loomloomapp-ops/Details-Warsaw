"use client";

import { useState } from "react";
import { Icons } from "./Icons";
import ContactPopup from "./ContactPopup";
import { type Locale } from "@/lib/i18n";

export default function ContactCTA({
  label,
  locale,
  variant = "link",
}: {
  label: string;
  locale: Locale;
  variant?: "link" | "pill";
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {variant === "link" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hd-link-hover"
          style={{
            background: "transparent", border: 0, padding: 0,
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 13, fontWeight: 600, color: "#000", cursor: "pointer",
          }}
        >
          {label} <Icons.ArrowRight size={14} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hd-cta-pill"
          data-variant="green"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            height: 50, padding: "0 26px", borderRadius: 40,
            background: "var(--hd-green)", color: "#fff",
            fontSize: 15, fontWeight: 600, border: 0, cursor: "pointer",
          }}
        >
          {label} <Icons.ArrowRight size={18} color="#fff" />
        </button>
      )}
      <ContactPopup open={open} onClose={() => setOpen(false)} locale={locale} />
    </>
  );
}
