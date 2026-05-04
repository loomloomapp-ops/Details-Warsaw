"use client";

import { useEffect, useId, useRef, useState } from "react";

export default function Combobox({
  name,
  defaultValue,
  options,
  placeholder,
  emptyHint = "Нет совпадений — будет сохранено как новое значение",
}: {
  name: string;
  defaultValue?: string | null;
  options: string[];
  placeholder?: string;
  emptyHint?: string;
}) {
  const id = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const norm = (s: string) => s.trim().toLowerCase();
  const filtered = value.trim()
    ? options.filter((o) => norm(o).includes(norm(value)))
    : options;
  const showCreate =
    value.trim().length > 0 &&
    !options.some((o) => norm(o) === norm(value));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => { setHighlight(0); }, [value, open]);

  function pick(v: string) {
    setValue(v);
    setOpen(false);
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(filtered.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(0, h - 1));
    } else if (e.key === "Enter" && open) {
      if (filtered[highlight]) {
        e.preventDefault();
        pick(filtered[highlight]);
      }
    }
  }

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <input type="hidden" name={name} value={value} />
      <div
        onClick={() => { setOpen(true); inputRef.current?.focus(); }}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          height: 40, padding: "0 10px 0 12px",
          border: `1px solid ${open ? "var(--hd-green)" : "var(--hd-hairline)"}`,
          borderRadius: 8, background: "#fff",
          transition: "border-color .15s ease, box-shadow .15s ease",
          boxShadow: open ? "0 0 0 3px rgba(68,122,68,0.12)" : "none",
          cursor: "text",
        }}
      >
        <input
          ref={inputRef}
          autoComplete="off"
          spellCheck={false}
          value={value}
          placeholder={placeholder}
          aria-controls={`${id}-list`}
          aria-expanded={open}
          onFocus={() => setOpen(true)}
          onChange={(e) => { setValue(e.target.value); setOpen(true); }}
          onKeyDown={onKeyDown}
          style={{
            flex: 1, height: "100%", border: 0, outline: 0,
            background: "transparent", fontSize: 14, fontFamily: "inherit",
            color: "#000",
          }}
        />
        {value && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setValue(""); inputRef.current?.focus(); }}
            aria-label="Очистить"
            style={{
              width: 22, height: 22, borderRadius: 999,
              border: 0, background: "rgba(0,0,0,0.06)", color: "rgba(0,0,0,0.6)",
              display: "grid", placeItems: "center", cursor: "pointer",
              fontSize: 12, lineHeight: 1,
            }}
          >×</button>
        )}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); inputRef.current?.focus(); }}
          aria-label={open ? "Свернуть" : "Раскрыть"}
          style={{
            width: 28, height: 28, borderRadius: 6,
            border: 0, background: "transparent",
            display: "grid", placeItems: "center", cursor: "pointer",
            transition: "transform .2s ease",
            transform: open ? "rotate(180deg)" : "none",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </button>
      </div>

      {open && (
        <div
          id={`${id}-list`}
          role="listbox"
          style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
            zIndex: 30,
            background: "#fff",
            border: "1px solid var(--hd-hairline)",
            borderRadius: 10,
            boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
            overflow: "hidden",
            maxHeight: 260,
            display: "flex", flexDirection: "column",
          }}
        >
          {filtered.length === 0 && !showCreate && (
            <div style={{ padding: "12px 14px", fontSize: 13, color: "var(--hd-subtle)" }}>
              Список пуст
            </div>
          )}

          <div style={{ overflowY: "auto", maxHeight: 220 }}>
            {filtered.map((o, i) => {
              const on = i === highlight;
              return (
                <button
                  key={o}
                  type="button"
                  role="option"
                  aria-selected={on}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(o)}
                  style={{
                    width: "100%", textAlign: "left",
                    padding: "10px 14px", border: 0,
                    background: on ? "var(--hd-panel)" : "#fff",
                    color: on ? "var(--hd-green)" : "#000",
                    fontSize: 14, fontWeight: 500, cursor: "pointer",
                    transition: "background .15s ease, color .15s ease",
                  }}
                >
                  {highlightMatch(o, value)}
                </button>
              );
            })}
          </div>

          {showCreate && (
            <div
              style={{
                borderTop: filtered.length ? "1px solid var(--hd-hairline)" : 0,
                padding: "10px 14px", fontSize: 12,
                color: "var(--hd-subtle)", background: "var(--hd-panel)",
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              <span style={{
                width: 18, height: 18, borderRadius: 999,
                background: "var(--hd-green)", color: "#fff",
                display: "grid", placeItems: "center",
                fontSize: 12, lineHeight: 1, fontWeight: 700,
              }}>+</span>
              <span>
                Будет добавлено новое значение: <b style={{ color: "#000" }}>«{value.trim()}»</b>
                <span style={{ display: "block", marginTop: 2, color: "var(--hd-subtle)" }}>{emptyHint}</span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function highlightMatch(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span style={{ background: "rgba(68,122,68,0.18)", color: "var(--hd-green)", fontWeight: 700, borderRadius: 3, padding: "0 2px" }}>
        {text.slice(i, i + q.length)}
      </span>
      {text.slice(i + q.length)}
    </>
  );
}
