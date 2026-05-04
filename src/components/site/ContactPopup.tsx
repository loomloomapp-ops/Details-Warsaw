"use client";

import { useEffect, useState } from "react";
import { Icons } from "./Icons";
import { type Locale, t } from "@/lib/i18n";

export default function ContactPopup({
  open,
  onClose,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean }>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = true;
    if (!phone.trim()) errs.phone = true;
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const text = encodeURIComponent(
      `${t("contactPerson", locale)}: ${name}\n${t("phoneNumber", locale)}: ${phone}\n${comment ? t("additionalComment", locale) + ": " + comment : ""}`
    );
    window.open(`https://wa.me/48578923625?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => {
      setName(""); setPhone(""); setComment(""); setSent(false); onClose();
    }, 1400);
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.6)",
        display: "grid", placeItems: "center",
        padding: 20, animation: "hd-fade-in .25s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(520px, 100%)", background: "#fff",
          borderRadius: 18, padding: "30px 30px 26px 30px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <button
          aria-label={t("close", locale)}
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14,
            width: 36, height: 36, borderRadius: 999,
            border: "1px solid var(--hd-hairline)", background: "#fff",
            display: "grid", placeItems: "center", cursor: "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <h3 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em" }}>
          {t("popupTitle", locale)}
        </h3>
        <p style={{ marginTop: 8, marginBottom: 24, fontSize: 14, lineHeight: "20px", color: "rgba(0,0,0,0.6)" }}>
          {t("popupSub", locale)}
        </p>

        {sent ? (
          <div style={{
            padding: "30px 16px", textAlign: "center",
            background: "var(--hd-panel)", borderRadius: 12,
            color: "var(--hd-green)", fontWeight: 600, fontSize: 15,
          }}>
            ✓ {t("thanks", locale)}
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              icon={<Icons.User color="rgba(0,0,0,0.6)" />}
              hasError={!!errors.name}
              errorText={t("required", locale)}
            >
              <input
                value={name}
                onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: false }); }}
                placeholder={t("contactPerson", locale)}
                style={inp}
              />
            </Field>
            <Field
              icon={<Icons.Phone color="rgba(0,0,0,0.6)" />}
              hasError={!!errors.phone}
              errorText={t("required", locale)}
            >
              <input
                value={phone}
                onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors({ ...errors, phone: false }); }}
                placeholder={t("phoneNumber", locale)}
                inputMode="tel"
                style={inp}
              />
            </Field>
            <Field icon={<Icons.Comment color="rgba(0,0,0,0.6)" />} alignTop>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t("additionalComment", locale)}
                rows={3}
                style={ta}
              />
            </Field>
            <button
              type="submit"
              className="hd-cta-pill"
              data-variant="green"
              style={{
                marginTop: 6,
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                height: 50, borderRadius: 40,
                background: "var(--hd-green)", color: "#fff",
                fontSize: 15, fontWeight: 600, border: 0, cursor: "pointer",
              }}
            >
              {t("send", locale)} <Icons.ArrowRight size={18} color="#fff" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  icon, children, alignTop, hasError, errorText,
}: {
  icon: React.ReactNode; children: React.ReactNode;
  alignTop?: boolean; hasError?: boolean; errorText?: string;
}) {
  return (
    <div>
      <div style={{
        display: "flex", alignItems: alignTop ? "flex-start" : "center", gap: 12,
        padding: "12px 14px", borderRadius: 10,
        border: `1px solid ${hasError ? "#c00" : "var(--hd-hairline)"}`,
        background: "#fff",
      }}>
        <div style={{ paddingTop: alignTop ? 4 : 0 }}>{icon}</div>
        {children}
      </div>
      {hasError && errorText && (
        <div style={{ marginTop: 6, fontSize: 12, color: "#c00" }}>{errorText}</div>
      )}
    </div>
  );
}

const inp: React.CSSProperties = {
  flex: 1, border: 0, outline: 0, background: "transparent",
  fontFamily: "inherit", fontSize: 15, color: "#000",
};
const ta: React.CSSProperties = {
  flex: 1, border: 0, outline: 0, background: "transparent",
  fontFamily: "inherit", fontSize: 15, color: "#000", resize: "vertical",
};
