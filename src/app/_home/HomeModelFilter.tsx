"use client";

import { useState } from "react";

const MODELS = ["Prius", "Corolla", "Auris", "C-HR", "Camry", "RAV4", "Lexus", "CT", "ES", "RX"];

export default function HomeModelFilter() {
  const [active, setActive] = useState("Prius");
  return (
    <div style={{
      width: "100%", display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4,
    }}>
      {MODELS.map((m) => {
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
  );
}
