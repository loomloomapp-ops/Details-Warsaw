"use client";

import { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons";

type Img = { id: number; url: string };

export default function ProductGallery({
  images,
  alt,
  variant = "desktop",
}: {
  images: Img[];
  alt: string;
  variant?: "desktop" | "mobile";
}) {
  const safeImages: Img[] = images.length > 0
    ? images
    : [{ id: -1, url: "/design/bumper.png" }];

  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const startX = useRef<number | null>(null);

  const cur = safeImages[index];
  const total = safeImages.length;

  useEffect(() => {
    if (!lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  function prev() { setIndex((i) => (i - 1 + total) % total); }
  function next() { setIndex((i) => (i + 1) % total); }

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) {
      if (dx > 0) prev(); else next();
    }
  }

  const isMobile = variant === "mobile";
  const mainW = isMobile ? "100%" : 550;
  const mainH = isMobile ? undefined : 470;
  const mainAspect = isMobile ? "1 / 1" : undefined;
  const thumbSize = isMobile ? 56 : 80;

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 10 : 14 }}>
        <div
          onClick={() => setLightbox(true)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="hd-gallery-main"
          style={{
            width: mainW,
            height: mainH,
            aspectRatio: mainAspect,
            position: "relative",
            borderRadius: 8,
            background: "#fff",
            border: "1px solid var(--hd-hairline)",
            backgroundImage: `url(${cur.url})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            cursor: "zoom-in",
            overflow: "hidden",
          }}
        >
          {total > 1 && (
            <>
              <button
                type="button"
                aria-label="prev"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                style={navBtn("left", isMobile)}
                className="hd-gallery-arrow"
              >
                <svg width={isMobile ? 16 : 18} height={isMobile ? 16 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15,18 9,12 15,6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="next"
                onClick={(e) => { e.stopPropagation(); next(); }}
                style={navBtn("right", isMobile)}
                className="hd-gallery-arrow"
              >
                <svg width={isMobile ? 16 : 18} height={isMobile ? 16 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </button>

              <div style={{
                position: "absolute", bottom: 10, left: 0, right: 0,
                display: "flex", justifyContent: "center", gap: 6, pointerEvents: "none",
              }}>
                {safeImages.map((_, i) => (
                  <span key={i} style={{
                    width: i === index ? 18 : 6, height: 6, borderRadius: 999,
                    background: i === index ? "var(--hd-green)" : "rgba(0,0,0,0.25)",
                    transition: "width .25s ease, background .25s ease",
                  }} />
                ))}
              </div>
            </>
          )}
        </div>

        {total > 1 && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {safeImages.map((img, i) => {
              const active = i === index;
              return (
                <button
                  type="button"
                  key={img.id}
                  onClick={() => setIndex(i)}
                  className="hd-thumb"
                  style={{
                    width: thumbSize, height: thumbSize, borderRadius: isMobile ? 6 : 8,
                    background: "#fff",
                    border: `1px solid ${active ? "var(--hd-green)" : "var(--hd-hairline)"}`,
                    boxShadow: active ? "0 0 0 2px rgba(68,122,68,0.18)" : "none",
                    backgroundImage: `url(${img.url})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    padding: 0,
                    cursor: "pointer",
                    transition: "border-color .2s ease, box-shadow .2s ease, transform .2s ease",
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 999,
            background: "rgba(0,0,0,0.92)",
            display: "grid", placeItems: "center", padding: 24,
            cursor: "zoom-out",
          }}
        >
          <button
            type="button"
            aria-label="close"
            onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
            style={{
              position: "absolute", top: 18, right: 18,
              width: 42, height: 42, borderRadius: 999,
              border: 0, background: "rgba(255,255,255,0.12)", color: "#fff",
              fontSize: 22, cursor: "pointer",
            }}
          >×</button>

          {total > 1 && (
            <button
              type="button"
              aria-label="prev"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={lightboxNav("left")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,18 9,12 15,6" />
              </svg>
            </button>
          )}

          <img
            src={cur.url}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
              maxWidth: "min(1200px, 96vw)",
              maxHeight: "88vh",
              objectFit: "contain",
              borderRadius: 8,
              cursor: "default",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
            }}
          />

          {total > 1 && (
            <button
              type="button"
              aria-label="next"
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={lightboxNav("right")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </button>
          )}

          {total > 1 && (
            <div style={{
              position: "absolute", bottom: 24, left: 0, right: 0,
              textAlign: "center", color: "rgba(255,255,255,0.7)",
              fontSize: 13, letterSpacing: 1,
            }}>
              {index + 1} / {total}
            </div>
          )}
        </div>
      )}
    </>
  );
}

function navBtn(side: "left" | "right", isMobile: boolean): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: isMobile ? 8 : 12,
    width: isMobile ? 32 : 38, height: isMobile ? 32 : 38,
    borderRadius: 999, border: 0,
    background: "rgba(255,255,255,0.92)", color: "#000",
    display: "grid", placeItems: "center",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
    transition: "background .2s ease, transform .15s ease",
  } as React.CSSProperties;
}

function lightboxNav(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%", transform: "translateY(-50%)",
    [side]: 18,
    width: 50, height: 50, borderRadius: 999,
    border: 0, background: "rgba(255,255,255,0.12)", color: "#fff",
    display: "grid", placeItems: "center", cursor: "pointer",
    transition: "background .2s ease",
  } as React.CSSProperties;
}
