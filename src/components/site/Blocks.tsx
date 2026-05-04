import Link from "next/link";
import { Icons } from "./Icons";
import { type Locale, t, DEFAULT_LOCALE } from "@/lib/i18n";

export function PartnerCTA({
  heading,
  subheading,
  body,
  locale = DEFAULT_LOCALE,
}: {
  heading?: string;
  subheading?: string;
  body?: string;
  locale?: Locale;
}) {
  return (
    <section id="contacts" style={{
      padding: "100px 70px",
      display: "flex", flexDirection: "column", gap: 50,
    }}>
      <h2 style={{ margin: 0, fontSize: 48, fontWeight: 500, lineHeight: "52px", letterSpacing: "-0.01em" }}>
        {heading ?? t("partnerHeading", locale)}
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "623px 1fr", gap: 54, alignItems: "start" }}>
        <div style={{
          width: 623, height: 623, borderRadius: 10, overflow: "hidden",
          backgroundImage: "url(/design/partner-men.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
        }} />

        <div style={{ paddingTop: 40 }}>
          <h3 style={{ margin: 0, fontSize: 36, fontWeight: 500, lineHeight: "42px" }}>{subheading ?? t("partnerSub", locale)}</h3>
          <p style={{ marginTop: 22, fontSize: 16, lineHeight: "22px", color: "rgba(0,0,0,0.7)", maxWidth: 580 }}>
            {body ?? t("partnerBody", locale)}
          </p>

          <form style={{ marginTop: 46, display: "flex", flexDirection: "column", gap: 28 }}>
            <Row><Icons.User /><input placeholder={t("contactPerson", locale)} style={hdInp} /></Row>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <Row><Icons.Mail /><input placeholder={t("yourEmail", locale)} style={hdInp} /></Row>
              <Row><Icons.Phone /><input placeholder={t("phoneNumber", locale)} style={hdInp} /></Row>
            </div>
            <Row><Icons.MapPin /><input placeholder={t("countryCity", locale)} style={hdInp} /></Row>
            <Row alignTop>
              <Icons.Comment />
              <textarea rows={3} placeholder={t("partsComment", locale)} style={hdTa} />
            </Row>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
              <button type="button" style={pillGreen}>
                {t("send", locale)} <Icons.ArrowRight size={18} color="#fff" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export function FeatureStrip({ locale = DEFAULT_LOCALE }: { locale?: Locale } = {}) {
  const items = [
    { icon: <Icons.Shield size={28} color="#000" />, title: t("feature1Title", locale), body: t("feature1Body", locale) },
    { icon: <Icons.Wrench size={28} color="#000" />, title: t("feature2Title", locale), body: t("feature2Body", locale) },
    { icon: <Icons.Headset size={28} color="#000" />, title: t("feature3Title", locale), body: t("feature3Body", locale) },
  ];
  return (
    <section style={{
      background: "var(--hd-panel)", padding: "80px 70px",
      display: "grid", gridTemplateColumns: "1fr 1fr 1fr", columnGap: 60,
    }}>
      {items.map((it) => (
        <div key={it.title} style={{
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20,
        }}>
          <div style={{
            width: 70, height: 70, borderRadius: "50%",
            background: "#fff", border: "1px solid var(--hd-hairline)",
            display: "grid", placeItems: "center",
          }}>{it.icon}</div>
          <div style={{ fontSize: 17, lineHeight: "22px" }}>{it.title}</div>
          <div style={{ fontSize: 14, lineHeight: "20px", color: "rgba(0,0,0,0.6)", maxWidth: 340 }}>
            {it.body}
          </div>
        </div>
      ))}
    </section>
  );
}

export function ProductCard({
  href,
  name,
  image,
  partNumber,
  big = false,
  viewLabel,
}: {
  href: string;
  name: string;
  image: string | null;
  partNumber: string | null;
  big?: boolean;
  viewLabel?: string;
}) {
  const label = viewLabel ?? t("view", DEFAULT_LOCALE);
  return (
    <Link href={href} className="hd-product-card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="hd-product-image" style={{
        width: "100%",
        aspectRatio: big ? "1 / 1" : "202 / 200",
        borderRadius: 8,
        background: "var(--hd-panel)",
        border: "1px solid var(--hd-hairline)",
        backgroundImage: `url(${image || "/design/bumper.png"})`,
        backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
      }} />
      <div>
        <div style={{ fontSize: 16, fontWeight: 500 }}>{name}</div>
        {partNumber && (
          <div style={{ marginTop: 6, fontSize: 13, color: "rgba(0,0,0,0.6)" }}>№ {partNumber}</div>
        )}
      </div>
      <div className="hd-view-btn" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        height: 40, padding: "0 14px",
        borderRadius: 8, background: "var(--hd-panel)",
        border: "1px solid var(--hd-border)",
        fontSize: 14, fontWeight: 500,
      }}>
        {label} <Icons.ChevronRight size={16} />
      </div>
    </Link>
  );
}

export function WhatsappFab() {
  return (
    <a href="https://wa.me/48578923625" target="_blank" rel="noreferrer noopener" className="hd-fab" style={{
      position: "fixed", right: 24, bottom: 70,
      width: 56, height: 56, borderRadius: 12,
      background: "var(--hd-green-btn)",
      display: "grid", placeItems: "center",
      boxShadow: "0 6px 18px rgba(0,188,25,0.35)",
      zIndex: 1100,
    }}>
      <Icons.Whatsapp size={30} color="#fff" />
    </a>
  );
}

function Row({ children, alignTop = false }: { children: React.ReactNode; alignTop?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: alignTop ? "flex-start" : "center", gap: 10,
      paddingTop: alignTop ? 10 : 0, paddingBottom: 10,
      borderBottom: "1px solid var(--hd-input-border)",
    }}>
      {children}
    </div>
  );
}

const hdInp: React.CSSProperties = {
  flex: 1, border: 0, outline: 0, background: "transparent",
  fontFamily: "inherit", fontSize: 15, color: "#000",
};

const hdTa: React.CSSProperties = {
  flex: 1, border: 0, outline: 0, background: "transparent",
  fontFamily: "inherit", fontSize: 15, color: "#000", resize: "none",
};

const pillGreen: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 10,
  height: 52, padding: "0 30px", borderRadius: 40,
  background: "var(--hd-green)", color: "#fff",
  fontSize: 16, fontWeight: 500, border: 0, cursor: "pointer", whiteSpace: "nowrap",
};
