import Link from "next/link";
import { prisma } from "@/lib/db";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Icons } from "@/components/site/Icons";
import { PartnerCTA, FeatureStrip, ProductCard, WhatsappFab } from "@/components/site/Blocks";
import HomeModelFilter from "./_home/HomeModelFilter";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, latestProducts] = await Promise.all([
    prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { nameRu: "asc" }],
      take: 3,
      select: { id: true, slug: true, nameRu: true },
    }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
    }),
  ]);

  return (
    <div style={{ background: "#fff", minWidth: 1440 }}>
      <Header current="home" />

      {/* HERO */}
      <section style={{
        position: "relative", height: 827, overflow: "hidden",
        backgroundImage: "url(/design/hero-engine-bg.png)",
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%)",
        }} />

        <div style={{
          position: "absolute", left: 70, top: 125, width: 730, color: "#fff",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15 }}>
            <span>Гибрид без компромиссов</span>
            <span style={{ width: 30, height: 1, background: "#fff" }} />
          </div>

          <h1 style={{
            margin: "42px 0 0 0", fontSize: 62, lineHeight: "62px",
            fontWeight: 700, letterSpacing: "-0.02em",
          }}>
            Проверенные детали<br />для вашего гибрида
          </h1>

          <p style={{ marginTop: 24, maxWidth: 620, fontSize: 16, lineHeight: "22px", color: "rgba(255,255,255,0.9)" }}>
            Мы подбираем и проверяем ключевые узлы гибридного автомобиля
            так, чтобы каждая деталь работала корректно и предсказуемо.
            Без рисков, без догадок, с полной ответственностью за результат
          </p>

          <div style={{ marginTop: 38, display: "flex", alignItems: "center", gap: 30 }}>
            <Link href="/catalog" style={{
              display: "inline-flex", alignItems: "center", height: 52, padding: "0 30px",
              borderRadius: 40, background: "#fff", color: "#000",
              fontSize: 16, fontWeight: 500,
            }}>Каталог</Link>
            <Link href="/categories" style={{
              display: "flex", alignItems: "center", gap: 10, color: "#fff", fontSize: 16,
            }}>
              Категории <Icons.ChevronRight size={16} color="#fff" />
            </Link>
          </div>
        </div>

        <div style={{
          position: "absolute", left: 70, bottom: 42,
          padding: "18px 22px", borderRadius: 20,
          background: "rgba(255,255,255,0.14)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          display: "flex", gap: 30, alignItems: "center",
        }}>
          {[
            { icon: <Icons.Shield size={22} color="#fff" />, label: "ABS" },
            { icon: <Icons.Engine size={22} color="#fff" />, label: "Двигатель" },
            { icon: <Icons.Battery size={22} color="#fff" />, label: "Батареи" },
          ].map((t, i) => (
            <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 30 }}>
              {i > 0 && <span style={{ width: 1, height: 22, background: "rgba(255,255,255,0.3)" }} />}
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                color: "#fff", fontSize: 14, fontWeight: 500,
                textTransform: "uppercase", letterSpacing: 0.5,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "grid", placeItems: "center",
                }}>{t.icon}</div>
                {t.label}
              </div>
            </div>
          ))}
        </div>
        <WhatsappFab />
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: "80px 70px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <h2 style={{ margin: 0, fontSize: 36, lineHeight: "42px", fontWeight: 500 }}>Категории</h2>
          <Link href="/categories" style={{
            fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            Перейти в категории <Icons.ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 22 }}>
          {categories.length === 0
            ? [0, 1, 2].map((i) => <CategoryPlaceholder key={i} />)
            : categories.map((c) => (
              <Link key={c.id} href={`/catalog?category=${c.slug}`} style={{
                height: 196, borderRadius: 10, background: "var(--hd-panel)",
                display: "grid", gridTemplateColumns: "196px 1fr", overflow: "hidden",
              }}>
                <div style={{
                  backgroundImage: "url(/design/bumper.png)",
                  backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                }} />
                <div style={{
                  padding: "28px 20px",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                }}>
                  <div style={{ fontSize: 18, fontWeight: 500 }}>{c.nameRu}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "rgba(0,0,0,0.7)" }}>
                    Посмотерть все <Icons.ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* MODEL FILTER + LATEST PRODUCTS */}
      <section style={{
        padding: "20px 70px 80px 70px",
        display: "flex", flexDirection: "column", gap: 30, alignItems: "center",
      }}>
        <HomeModelFilter />

        <div style={{
          width: "100%", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
        }}>
          {latestProducts.length === 0
            ? Array.from({ length: 4 }).map((_, i) => <PlaceholderCard key={i} />)
            : latestProducts.map((p) => (
              <ProductCard
                key={p.id}
                href={`/catalog/${p.id}`}
                name={p.nameRu}
                image={p.images[0]?.url ?? null}
                partNumber={p.partNumber}
              />
            ))}
        </div>

        <Link href="/catalog" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          height: 52, padding: "0 30px", borderRadius: 40,
          background: "var(--hd-green)", color: "#fff",
          fontSize: 16, fontWeight: 500, marginTop: 20,
        }}>Каталог</Link>
      </section>

      <PartnerCTA />
      <FeatureStrip />
      <Footer />
    </div>
  );
}

function CategoryPlaceholder() {
  return (
    <div style={{
      height: 196, borderRadius: 10, background: "var(--hd-panel)",
      display: "grid", placeItems: "center", color: "var(--hd-subtle)", fontSize: 14,
    }}>
      Скоро…
    </div>
  );
}

function PlaceholderCard() {
  return (
    <div style={{
      aspectRatio: "202 / 200", borderRadius: 8,
      background: "var(--hd-panel)", border: "1px solid var(--hd-hairline)",
      backgroundImage: "url(/design/bumper.png)",
      backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
    }} />
  );
}
