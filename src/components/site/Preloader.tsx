"use client";

import { useEffect, useState } from "react";

/**
 * Premium preloader: логотип + лінія прогресу у стилі автодіагностики.
 * - показується при першому завантаженні (поки sessionStorage не встановлено)
 * - симулює прогрес з easing 0→100 + чекає window.load
 * - плавно зникає (opacity → display:none)
 *
 * Кастомізація:
 *  - кольори: --hd-green, --hd-panel у globals.css
 *  - тривалість: PROGRESS_DURATION_MS нижче
 *  - вимкнути: видалити <Preloader/> з src/app/layout.tsx
 */

const PROGRESS_DURATION_MS = 2200;   // швидкість симуляції 0→92%
const MIN_VISIBLE_MS = 2000;          // мінімум часу на екрані
const HARD_TIMEOUT_MS = 6000;         // максимум часу — після цього прелоадер закриється у будь-якому разі
const FADE_OUT_MS = 500;

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setActive(true);

    const start = performance.now();
    let pageLoaded = document.readyState === "complete";
    const onLoad = () => { pageLoaded = true; };
    if (!pageLoaded) window.addEventListener("load", onLoad, { once: true });

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      // ease-out quad
      const tProg = Math.min(elapsed / PROGRESS_DURATION_MS, 1);
      const eased = 1 - (1 - tProg) * (1 - tProg);
      // Доходимо до 92% за час, далі чекаємо load + min час → 100%
      const minElapsed = elapsed >= MIN_VISIBLE_MS;
      const hardElapsed = elapsed >= HARD_TIMEOUT_MS;
      let target = ((pageLoaded && minElapsed) || hardElapsed) ? 100 : Math.min(eased * 92, 92);
      setProgress((p) => (target > p ? target : p));

      if (target >= 100) {
        setHidden(true);
        if (typeof document !== "undefined") {
          document.body.setAttribute("data-hero-ready", "true");
        }
        setTimeout(() => setRemoved(true), FADE_OUT_MS);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (removed || !active) return null;

  const pct = Math.round(progress);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#0a0a0a",
        display: "grid", placeItems: "center",
        opacity: hidden ? 0 : 1,
        transition: `opacity ${FADE_OUT_MS}ms ease`,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      {/* technical grid backdrop */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
      }} />

      <div style={{
        position: "relative", display: "flex", flexDirection: "column",
        alignItems: "center", gap: 32, padding: 24,
      }}>
        {/* logo */}
        <div style={{ position: "relative", width: 220, height: 220, background: "#fff", borderRadius: 16, padding: 12, display: "grid", placeItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Hybrid Doktor" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
        </div>

        {/* Progress: tachometer-style scale */}
        <div style={{ width: 260, marginTop: 8 }}>
          <div style={{
            position: "relative", height: 4, borderRadius: 999,
            background: "rgba(255,255,255,0.08)", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0, width: `${pct}%`,
              background: "linear-gradient(90deg, #447A44 0%, #7fff7f 100%)",
              boxShadow: "0 0 14px rgba(127,255,127,0.5)",
              transition: "width .15s linear",
            }} />
            {/* scale ticks */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 26px)",
              pointerEvents: "none",
            }} />
          </div>
          <div style={{
            marginTop: 12, display: "flex", justifyContent: "space-between",
            fontFamily: "Manrope, monospace", fontSize: 11,
            color: "rgba(255,255,255,0.5)", letterSpacing: 1.5,
          }}>
            <span>SYSTEM CHECK</span>
            <span style={{ color: "#fff", fontWeight: 600, minWidth: 32, textAlign: "right" }}>
              {String(pct).padStart(3, "0")}%
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes hd-sweep-anim {
          0%   { transform: translateX(0); }
          100% { transform: translateX(220px); }
        }
        .hd-sweep {
          animation: hd-sweep-anim 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
