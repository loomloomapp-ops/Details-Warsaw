import { Icons } from "./Icons";
import { type Locale, t } from "@/lib/i18n";

export function MobilePartnerCTA({
  locale,
  heading,
  subheading,
  body,
}: {
  locale: Locale;
  heading?: string;
  subheading?: string;
  body?: string;
}) {
  return (
    <section id="contacts" style={{ padding: "40px 20px" }}>
      <h2 style={{ margin: 0, fontSize: 26, fontWeight: 500, lineHeight: "30px" }}>
        {heading ?? t("partnerHeading", locale)}
      </h2>

      <div style={{
        marginTop: 24, width: "100%", aspectRatio: "1 / 1",
        borderRadius: 10, overflow: "hidden",
        backgroundImage: "url(/design/partner-men.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
      }} />

      <h3 style={{ marginTop: 28, marginBottom: 0, fontSize: 20, fontWeight: 500, lineHeight: "26px" }}>
        {subheading ?? t("partnerSub", locale)}
      </h3>
      <p style={{ marginTop: 12, marginBottom: 0, fontSize: 13, lineHeight: "18px", color: "rgba(0,0,0,0.7)" }}>
        {body ?? t("partnerBody", locale)}
      </p>

      <form style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 22 }}>
        <Row><Icons.User /><input placeholder={t("contactPerson", locale)} style={inp} /></Row>
        <Row><Icons.Mail /><input placeholder={t("yourEmail", locale)} style={inp} /></Row>
        <Row><Icons.Phone /><input placeholder={t("phoneNumber", locale)} style={inp} /></Row>
        <Row><Icons.MapPin /><input placeholder={t("countryCity", locale)} style={inp} /></Row>
        <Row alignTop><Icons.Comment /><textarea rows={3} placeholder={t("partsComment", locale)} style={ta} /></Row>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            height: 44, padding: "0 22px", borderRadius: 40,
            background: "var(--hd-green)", color: "#fff", border: 0,
            fontSize: 14, fontWeight: 500,
          }}>
            {t("send", locale)} <Icons.ArrowRight size={16} color="#fff" />
          </button>
        </div>
      </form>
    </section>
  );
}

export function MobileFeatureStrip({ locale }: { locale: Locale }) {
  const items = [
    { icon: <Icons.Shield size={24} color="#000" />, title: t("feature1Title", locale), body: t("feature1Body", locale) },
    { icon: <Icons.Wrench size={24} color="#000" />, title: t("feature2Title", locale), body: t("feature2Body", locale) },
    { icon: <Icons.Headset size={24} color="#000" />, title: t("feature3Title", locale), body: t("feature3Body", locale) },
  ];
  return (
    <section style={{
      background: "var(--hd-panel)", padding: "32px 20px",
      display: "flex", flexDirection: "column", gap: 26,
    }}>
      {items.map((it) => (
        <div key={it.title} style={{
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "#fff", border: "1px solid var(--hd-hairline)",
            display: "grid", placeItems: "center",
          }}>{it.icon}</div>
          <div style={{ fontSize: 15, lineHeight: "18px" }}>{it.title}</div>
          <div style={{ fontSize: 12, lineHeight: "16px", color: "rgba(0,0,0,0.6)" }}>{it.body}</div>
        </div>
      ))}
    </section>
  );
}

function Row({ children, alignTop = false }: { children: React.ReactNode; alignTop?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: alignTop ? "flex-start" : "center", gap: 10,
      paddingTop: alignTop ? 10 : 0, paddingBottom: 10,
      borderBottom: "1px solid var(--hd-input-border)",
    }}>{children}</div>
  );
}

const inp: React.CSSProperties = {
  flex: 1, border: 0, outline: 0, background: "transparent",
  fontFamily: "inherit", fontSize: 15, color: "#000",
};
const ta: React.CSSProperties = { ...inp, resize: "none" };
