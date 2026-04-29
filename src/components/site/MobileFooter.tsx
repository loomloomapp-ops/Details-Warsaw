import Link from "next/link";
import { Icons, Logo } from "./Icons";
import { type Locale, t } from "@/lib/i18n";

export default function MobileFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="hd-mobile">
      <div style={{ background: "var(--hd-panel)", padding: "40px 20px 48px 20px" }}>
        <h3 style={{ margin: 0, fontSize: 18, lineHeight: "22px", fontWeight: 500 }}>
          {t("footerCTOTitle", locale)}
        </h3>
        <p style={{ marginTop: 14, marginBottom: 24, fontSize: 13, lineHeight: "18px", color: "rgba(0,0,0,0.6)" }}>
          {t("footerCTOBody", locale)}
        </p>
        <Link href="/#contacts" style={{
          display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 500, fontSize: 14, color: "#000",
        }}>
          {t("writeToUs", locale)} <Icons.ArrowRight size={16} />
        </Link>
      </div>

      <div style={{ background: "#000", color: "#fff", padding: "30px 20px 24px 20px" }}>
        <div style={{
          padding: "16px", border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 8, display: "inline-block",
        }}>
          <Logo onDark />
        </div>
        <div style={{ marginTop: 14, fontSize: 14, fontWeight: 500 }}>Hybrid Doktor</div>
        <p style={{ marginTop: 12, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.5)" }}>
          Мы специализируемся на гибридных автомобилях Toyota и Lexus.
          Поставляем проверенные запчасти и помогаем сервисам решать
          сложные задачи — от диагностики до полного восстановления систем.
        </p>

        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 15 }}>{t("ourContacts", locale)}</div>
          <div style={{ marginTop: 16, fontSize: 17 }}>+48 578 923 625</div>
          <div style={{ marginTop: 14, fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.7)" }}>
            Wolska 44<br />
            Stanisławów drugi 05-119<br />
            Polska
          </div>
          <div style={{ marginTop: 18, fontSize: 14, textDecoration: "underline" }}>
            hybrid.repair.company@gmail.com
          </div>
        </div>

        <div style={{
          marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
        }}>
          <div>
            <div style={{ fontSize: 15 }}>{t("pages", locale)}</div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
              <Link href="/catalog">{t("catalog", locale)}</Link>
              <Link href="/categories">{t("categories", locale)}</Link>
              <Link href="/#contacts">{t("contacts", locale)}</Link>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 15 }}>{t("socialNetworks", locale)}</div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
              <span>Facebook</span>
              <span>Instagram</span>
              <span>WhatsApp</span>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 26, height: 180, borderRadius: 10, overflow: "hidden",
          backgroundImage: "url(/design/footer-map.png)",
          backgroundSize: "cover", backgroundPosition: "center",
        }} />

        <div style={{
          marginTop: 24, paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex", justifyContent: "space-between",
          fontSize: 12, color: "rgba(255,255,255,0.7)",
        }}>
          <span>©Запчасти 2026</span>
          <span style={{ textDecoration: "underline" }}>Privacy & Policy</span>
        </div>
      </div>
    </footer>
  );
}
