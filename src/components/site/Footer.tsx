import Link from "next/link";
import { Icons, Logo } from "./Icons";

export default function Footer() {
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
              Специальные условия для СТО
            </h3>
            <p style={{ marginTop: 18, marginBottom: 0, fontSize: 15, lineHeight: "22px", color: "rgba(0,0,0,0.6)" }}>
              Если вы работаете с гибридными автомобилями или регулярно
              заказываете детали, оставьте заявку и получите индивидуальные
              условия для оптовых поставок и постоянного сотрудничества
            </p>
          </div>
          <Link href="/#contacts" className="hd-arrow-link" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 15, color: "#000", fontWeight: 500,
          }}>
            Написать нам <Icons.ArrowRight size={18} />
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
              Hybrid Doktor
            </div>
            <p style={{ marginTop: 16, fontSize: 14, lineHeight: "20px", color: "rgba(255,255,255,0.5)" }}>
              Мы специализируемся на гибридных автомобилях Toyota и Lexus.
              Поставляем проверенные запчасти и помогаем сервисам решать
              сложные задачи — от диагностики до полного восстановления
              систем. Каждая деталь проходит проверку и отбор, чтобы вы
              могли быть уверены в результате и не тратить время на
              эксперименты
            </p>
          </div>

          <div>
            <div style={{ fontSize: 16, color: "#fff" }}>Наши контакты</div>
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
              <div style={{ fontSize: 16, color: "#fff" }}>Страницы</div>
              <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 15 }}>
                <Link href="/catalog"    className="hd-footer-link" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>Каталог</Link>
                <Link href="/categories" className="hd-footer-link" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>Категории</Link>
                <Link href="/#footer"    className="hd-footer-link" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>Контакты</Link>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 16, color: "#fff" }}>Социальные сети</div>
              <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 15 }}>
                <a href="https://facebook.com" target="_blank" rel="noreferrer noopener" className="hd-footer-link" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>Facebook</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer noopener" className="hd-footer-link" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>Instagram</a>
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
          <span>©Запчасти 2026</span>
          <span style={{ textDecoration: "underline" }}>Privacy & Policy</span>
        </div>
      </div>
    </footer>
  );
}
