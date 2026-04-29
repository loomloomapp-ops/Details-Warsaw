import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Icons } from "@/components/site/Icons";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      categories: { include: { category: true } },
    },
  });
  if (!product) notFound();

  const cover = product.images[0]?.url ?? "/design/bumper.png";

  const specs: Array<[string, string | null]> = [
    ["Номер деталі:", product.partNumber],
    ["Артикул:",      product.article],
    ["Колір:",        product.color],
    ["Матеріал:",     product.material],
  ];
  const visibleSpecs = specs.filter(([, v]) => v && v.trim() !== "");

  const categoryNames = product.categories.map((pc) => pc.category.nameRu).join(", ");

  return (
    <div style={{ background: "#fff", minWidth: 1440 }}>
      <Header current="catalog" />

      <div style={{ padding: "18px 70px", borderBottom: "1px solid var(--hd-hairline)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 16 }}>
          <Link href="/catalog" style={{ opacity: 0.6 }}>Каталог</Link>
          <span style={{ opacity: 0.6 }}>/</span>
          <span>{product.nameRu}</span>
        </div>
      </div>

      {/* HERO panel */}
      <section style={{
        background: "var(--hd-panel)", padding: "50px 70px 64px 70px",
        display: "grid", gridTemplateColumns: "550px 1fr", gap: 60,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{
            width: 550, height: 470, borderRadius: 8,
            background: "#fff", border: "1px solid var(--hd-hairline)",
            backgroundImage: `url(${cover})`,
            backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
          }} />
          {product.images.length > 1 && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {product.images.slice(0, 6).map((img) => (
                <div key={img.id} style={{
                  width: 80, height: 80, borderRadius: 8,
                  background: "#fff", border: "1px solid var(--hd-hairline)",
                  backgroundImage: `url(${img.url})`,
                  backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                }} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 style={{ margin: 0, fontSize: 40, fontWeight: 500, lineHeight: "44px" }}>
            {product.nameRu}
          </h1>

          {product.article && (
            <div style={{ marginTop: 14, fontSize: 15, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ color: "rgba(0,0,0,0.6)" }}>Артикул</span>
              <span style={{
                padding: "4px 10px", borderRadius: 6,
                background: "#fff", border: "1px solid var(--hd-hairline)", fontWeight: 500,
              }}>{product.article}</span>
            </div>
          )}

          {product.shortDescRu && (
            <p style={{
              marginTop: 24, fontSize: 16, lineHeight: "22px",
              color: "rgba(0,0,0,0.7)", maxWidth: 580,
            }}>
              {product.shortDescRu}
            </p>
          )}

          {(visibleSpecs.length > 0 || categoryNames) && (
            <ul style={{
              marginTop: 36, marginBottom: 0, paddingLeft: 18,
              display: "flex", flexDirection: "column", gap: 10, fontSize: 16,
            }}>
              {visibleSpecs.map(([k, v]) => (
                <li key={k} style={{ color: "rgba(0,0,0,0.7)" }}>
                  <span style={{ marginRight: 6 }}>{k}</span>
                  <span style={{ color: "#000", fontWeight: 500 }}>{v}</span>
                </li>
              ))}
              {categoryNames && (
                <li style={{ color: "rgba(0,0,0,0.7)" }}>
                  <span style={{ marginRight: 6 }}>Категорії:</span>
                  <span style={{ color: "#000", fontWeight: 500 }}>{categoryNames}</span>
                </li>
              )}
            </ul>
          )}

          <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 18 }}>
            <a href="https://wa.me/48578923625" target="_blank" rel="noreferrer noopener" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
              width: 380, height: 52, borderRadius: 40,
              background: "var(--hd-green)", color: "#fff",
              fontSize: 16, fontWeight: 500,
            }}>
              Заказать
            </a>

            <span style={{
              width: 38, height: 38, borderRadius: "50%", background: "#fff",
              border: "1px solid var(--hd-hairline)",
              display: "grid", placeItems: "center", color: "#000",
            }}>
              <Icons.Instagram size={18} />
            </span>
            <span style={{
              width: 38, height: 38, borderRadius: "50%", background: "#fff",
              border: "1px solid var(--hd-hairline)",
              display: "grid", placeItems: "center", color: "#000",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7Z" />
              </svg>
            </span>
            <a href="https://wa.me/48578923625" target="_blank" rel="noreferrer noopener" style={{
              width: 38, height: 38, borderRadius: "50%", background: "#fff",
              border: "1px solid var(--hd-hairline)",
              display: "grid", placeItems: "center",
            }}>
              <Icons.Whatsapp size={20} color="#00BC19" />
            </a>
          </div>
        </div>
      </section>

      {/* About + Feature grid */}
      <section style={{
        padding: "80px 70px",
        display: "grid", gridTemplateColumns: "1fr 380px", gap: 80,
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>Про товар</h2>
          {product.longDescRu ? (
            product.longDescRu.split(/\n\s*\n/).map((para, i) => (
              <p key={i} style={{
                marginTop: 18, fontSize: 16, lineHeight: "22px", color: "rgba(0,0,0,0.7)",
              }}>{para}</p>
            ))
          ) : (
            <p style={{ marginTop: 18, fontSize: 16, lineHeight: "22px", color: "rgba(0,0,0,0.6)" }}>
              Подробное описание товара будет добавлено.
            </p>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <FeatureRow Icon={Icons.Box}     title="Free Shipping"    body="You will love at great low prices" />
          <FeatureRow Icon={Icons.Card}    title="Flexible Payment" body="Pay with Multiple Credit Cards" />
          <FeatureRow Icon={Icons.Truck}   title="Fast Delivery"    body="Experience the joy of fast shipping" />
          <FeatureRow Icon={Icons.Headset} title="Premium Support"  body="Outstanding premium support" />
        </div>
      </section>

      {/* Contact block */}
      <section style={{ padding: "40px 70px 100px 70px" }}>
        <h2 style={{
          margin: 0, fontSize: 48, fontWeight: 500, lineHeight: "52px", letterSpacing: "-0.01em",
        }}>Готовы оформить заказ?</h2>

        <div style={{
          marginTop: 40, display: "grid", gridTemplateColumns: "440px 1fr", gap: 60,
          alignItems: "start",
        }}>
          <div style={{
            width: 440, height: 330, borderRadius: 10, overflow: "hidden",
            backgroundImage: "url(/design/partner-men.jpg)",
            backgroundSize: "cover", backgroundPosition: "center",
          }} />
          <div>
            <h3 style={{ margin: 0, fontSize: 28, fontWeight: 500, lineHeight: "34px" }}>
              Подтвердим совместимость и условия
            </h3>
            <p style={{
              marginTop: 14, fontSize: 15, lineHeight: "20px",
              color: "rgba(0,0,0,0.7)", maxWidth: 620,
            }}>
              Оставьте контакты — менеджер свяжется с вами, подтвердит
              наличие детали, проверит её совместимость с вашим автомобилем
              и согласует все условия перед оформлением
            </p>
            <Link href="/#contacts" style={{
              marginTop: 24, display: "inline-flex", alignItems: "center", gap: 10,
              height: 52, padding: "0 30px", borderRadius: 40,
              background: "var(--hd-green)", color: "#fff",
              fontSize: 16, fontWeight: 500,
            }}>
              Перейти к форме <Icons.ArrowRight size={18} color="#fff" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureRow({
  Icon, title, body,
}: {
  Icon: (p: { size?: number; color?: string }) => JSX.Element;
  title: string; body: string;
}) {
  return (
    <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
      <div style={{
        width: 44, height: 44, borderRadius: 8,
        border: "1px solid var(--hd-hairline)",
        display: "grid", placeItems: "center", flex: "0 0 44px",
      }}>
        <Icon size={22} color="#000" />
      </div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 600 }}>{title}</div>
        <div style={{ marginTop: 6, fontSize: 15, lineHeight: "20px", color: "rgba(0,0,0,0.6)" }}>
          {body}
        </div>
      </div>
    </div>
  );
}
