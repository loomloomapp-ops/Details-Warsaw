import Link from "next/link";
import { Icons, Logo } from "./Icons";
import { type Locale, t, DEFAULT_LOCALE, localeHref } from "@/lib/i18n";

export default function Footer({ locale = DEFAULT_LOCALE }: { locale?: Locale } = {}) {
  return (
    <footer id="footer">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{
          background: "var(--hd-panel)",
          padding: "80px 70px",
          display: "flex", flexDirection: "column",
          justifyContent: "center", gap: 40,
        }}>
          <div style={{ maxWidth: 520 }}>
            <h3 style={{ margin: 0, fontSize: 22, lineHeight: "26px", fontWeight: 500, color: "#000" }}>
              {t("footerCTOTitle", locale)}
            </h3>
            <p style={{ marginTop: 18, marginBottom: 0, fontSize: 15, lineHeight: "22px", color: "rgba(0,0,0,0.6)" }}>
              {t("footerCTOBody", locale)}
            </p>
          </div>
          <Link href={localeHref("/#contacts", locale)} className="hd-arrow-link" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 15, color: "#000", fontWeight: 500,
          }}>
            {t("writeToUs", locale)} <Icons.ArrowRight size={18} />
          </Link>
        </div>
        <div style={{
          backgroundImage: "url(/design/cto-engine.jpg)",
          backgroundSize: "cover", backgroundPosition: "center", minHeight: 320,
        }} />
      </div>

      <div style={{ background: "#000", color: "#fff", padding: "70px 70px 30px 70px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "316px 254px 1fr 240px",
          gap: 40, alignItems: "start",
        }}>
          <div>
            <div style={{
              padding: "18px 18px 22px 18px",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8, display: "inline-block",
            }}>
              <Logo onDark />
            </div>
            <div style={{ marginTop: 16, fontSize: 15, lineHeight: "17px", fontWeight: 500, color: "#fff" }}>
              {t("brandTagline", locale)}
            </div>
            <p style={{ marginTop: 16, fontSize: 14, lineHeight: "20px", color: "rgba(255,255,255,0.5)" }}>
              {t("brandAbout", locale)}
            </p>
          </div>

          <div>
            <div style={{ fontSize: 16, color: "#fff" }}>{t("ourContacts", locale)}</div>
            <div style={{ marginTop: 30 }}>
              <a href="tel:+48578923625" className="hd-footer-link" style={{ fontSize: 18, color: "#fff", display: "inline-block" }}>+48 578 923 625</a>
              <a
                href="https://maps.google.com/?q=Wolska+44+Stanis%C5%82aw%C3%B3w+drugi+05-119+Polska"
                target="_blank" rel="noreferrer noopener"
                className="hd-footer-link"
                style={{ marginTop: 20, fontSize: 14, lineHeight: "20px", color: "rgba(255,255,255,0.7)", display: "block" }}
              >
                Wolska 44<br />
                Stanisławów drugi 05-119<br />
                Polska
              </a>
              <a
                href="mailto:hybrid.repair.company@gmail.com"
                className="hd-footer-link"
                style={{ marginTop: 32, fontSize: 15, color: "#fff", textDecoration: "underline", display: "inline-block" }}
              >
                hybrid.repair.company@gmail.com
              </a>
            </div>
          </div>

          <div style={{ display: "flex", gap: 60 }}>
            <div>
              <div style={{ fontSize: 16, color: "#fff" }}>{t("pages", locale)}</div>
              <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 15 }}>
                <Link href={localeHref("/catalog", locale)}    className="hd-footer-link" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>{t("catalog", locale)}</Link>
                <Link href={localeHref("/categories", locale)} className="hd-footer-link" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>{t("categories", locale)}</Link>
                <Link href={localeHref("/#footer", locale)}    className="hd-footer-link" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>{t("contacts", locale)}</Link>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 16, color: "#fff" }}>{t("socialNetworks", locale)}</div>
              <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 15 }}>
                <a href="https://www.facebook.com/share/1BXYaXFPiT/" target="_blank" rel="noreferrer noopener" className="hd-footer-link" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>Facebook</a>
                <a href="https://www.instagram.com/hybrid__doctor" target="_blank" rel="noreferrer noopener" className="hd-footer-link" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>Instagram</a>
                <a href="https://wa.me/48578923625" target="_blank" rel="noreferrer noopener" className="hd-footer-link" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>WhatsApp</a>
              </div>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Wolska+44+Stanis%C5%82aw%C3%B3w+drugi+05-119+Polska"
            target="_blank" rel="noreferrer noopener"
            className="hd-footer-link"
            style={{
              width: 240, height: 234, borderRadius: 10, overflow: "hidden",
              backgroundImage: "url(/design/footer-map.png)",
              backgroundSize: "cover", backgroundPosition: "center",
              display: "block",
            }}
            aria-label="Open map"
          />
        </div>

        <div style={{
          marginTop: 40, paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex", justifyContent: "space-between",
          fontSize: 14, color: "rgba(255,255,255,0.7)",
        }}>
          <span>{t("copyright", locale)}</span>
          <span style={{ textDecoration: "underline" }}>{t("privacyPolicy", locale)}</span>
        </div>
      </div>
    </footer>
  );
}
