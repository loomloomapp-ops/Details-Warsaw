import Link from "next/link";
import { prisma } from "@/lib/db";
import Header from "@/components/site/Header";
import MobileHeader from "@/components/site/MobileHeader";
import HeaderWrap from "@/components/site/HeaderWrap";
import Footer from "@/components/site/Footer";
import MobileFooter from "@/components/site/MobileFooter";
import { Icons } from "@/components/site/Icons";
import { PartnerCTA, FeatureStrip, ProductCard } from "@/components/site/Blocks";
import { MobilePartnerCTA, MobileFeatureStrip } from "@/components/site/MobileBlocks";
import Preloader from "@/components/site/Preloader";
import Reveal from "@/components/site/Reveal";
import HomeModelFilter from "./_home/HomeModelFilter";
import { getLocale } from "@/lib/locale-server";
import { t, pickProductName, pickCategoryName } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const locale = getLocale();
  const [categories, latestProducts, modelProducts, distinctModels] = await Promise.all([
    prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { nameRu: "asc" }],
      take: 4,
      select: { id: true, slug: true, nameRu: true, nameUa: true, namePl: true, imageUrl: true },
    }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
    }),
    prisma.product.findMany({
      where: { make: { not: null } },
      orderBy: { createdAt: "desc" },
      take: 60,
      include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
    }),
    prisma.product.findMany({
      where: { make: { not: null } },
      select: { make: true },
      distinct: ["make"],
      orderBy: { make: "asc" },
    }),
  ]);

  const homeMakes = distinctModels.map((p) => p.make!).filter(Boolean);
  const homeProducts = modelProducts.map((p) => ({
    id: p.id,
    name: pickProductName(p, locale),
    partNumber: p.partNumber,
    image: p.images[0]?.url ?? null,
    make: p.make,
  }));

  const heroChips = [
    { icon: <Icons.Shield size={22} color="#fff" />, label: t("abs", locale) },
    { icon: <Icons.Engine size={22} color="#fff" />, label: t("engine", locale) },
    { icon: <Icons.Battery size={22} color="#fff" />, label: t("batteries", locale) },
  ];

  return (
    <>
      <Preloader />
      {/* DESKTOP */}
      <div className="hd-desktop" style={{ background: "#fff", minWidth: 1440 }}>
        <HeaderWrap><Header current="home" locale={locale} /></HeaderWrap>

        <section className="hd-hero" style={{ height: 827 }}>
          <div className="hd-hero-bg" style={{ backgroundImage: "url(/design/hero-engine-bg.png)" }} />
          <div className="hd-hero-overlay" />

          <div className="hd-hero-content" style={{ position: "absolute", left: 70, top: 125, width: 730, color: "#fff" }}>
            <div className="hd-hero-reveal" data-d="1" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15 }}>
              <span>{t("heroTagline", locale)}</span>
              <span style={{ width: 30, height: 1, background: "#fff" }} />
            </div>
            <h1 className="hd-hero-reveal" data-d="2" style={{
              margin: "42px 0 0 0", fontSize: 62, lineHeight: "62px",
              fontWeight: 700, letterSpacing: "-0.02em",
              textShadow: "0 4px 28px rgba(0,0,0,0.35)",
            }}>
              {t("heroTitle1", locale)}<br />{t("heroTitle2", locale)}
            </h1>
            <p className="hd-hero-reveal" data-d="3" style={{ marginTop: 24, maxWidth: 620, fontSize: 16, lineHeight: "22px", color: "rgba(255,255,255,0.92)" }}>
              {t("heroBody", locale)}
            </p>
            <div className="hd-hero-reveal" data-d="4" style={{ marginTop: 38, display: "flex", alignItems: "center", gap: 30 }}>
              <Link href="/catalog" className="hd-cta-pill" data-variant="white" style={{
                display: "inline-flex", alignItems: "center", height: 52, padding: "0 30px",
                borderRadius: 40, background: "#fff", color: "#000", fontSize: 16, fontWeight: 500,
              }}>{t("catalog", locale)}</Link>
              <Link href="/categories" className="hd-cta-pill" data-variant="ghost-light" style={{
                display: "flex", alignItems: "center", gap: 10, color: "#fff", fontSize: 16,
              }}>{t("categories", locale)} <Icons.ChevronRight size={16} color="#fff" /></Link>
            </div>
          </div>

          <div className="hd-hero-content hd-hero-reveal" data-d="5" style={{
            position: "absolute", left: 70, bottom: 42,
            padding: "18px 22px", borderRadius: 20,
            background: "rgba(255,255,255,0.14)",
            backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
            display: "flex", gap: 30, alignItems: "center",
          }}>
            {heroChips.map((c, i) => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 30 }}>
                {i > 0 && <span style={{ width: 1, height: 22, background: "rgba(255,255,255,0.3)" }} />}
                <div style={{
                  display: "flex", alignItems: "center", gap: 10, color: "#fff",
                  fontSize: 14, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "grid", placeItems: "center",
                  }}>{c.icon}</div>
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Reveal as="section" style={{ padding: "80px 70px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <h2 style={{ margin: 0, fontSize: 36, lineHeight: "42px", fontWeight: 500 }}>{t("categories", locale)}</h2>
            <Link href="/categories" className="hd-arrow-link" style={{
              fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: 8,
            }}>{t("goToCategories", locale)} <Icons.ArrowRight size={16} /></Link>
          </div>

          <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 22 }}>
            {categories.length === 0
              ? [0, 1, 2].map((i) => <div key={i} style={catEmpty} />)
              : categories.slice(0, 3).map((c) => (
                <Link key={c.id} href={`/catalog?category=${c.slug}`} className="hd-cat-card" style={{
                  height: 196, borderRadius: 10, background: "var(--hd-panel)",
                  display: "grid", gridTemplateColumns: "196px 1fr", overflow: "hidden",
                }}>
                  <div style={{
                    backgroundImage: `url(${c.imageUrl || "/design/bumper.png"})`,
                    backgroundSize: c.imageUrl ? "cover" : "contain",
                    backgroundRepeat: "no-repeat", backgroundPosition: "center",
                  }} />
                  <div style={{
                    padding: "28px 20px",
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 500 }}>{pickCategoryName(c, locale)}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "rgba(0,0,0,0.7)" }}>
                      {t("viewAll", locale)} <Icons.ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </Reveal>

        <Reveal as="section" style={{
          padding: "20px 70px 80px 70px",
          display: "flex", flexDirection: "column", gap: 30, alignItems: "center",
        }}>
          <HomeModelFilter
            makes={homeMakes}
            products={homeProducts}
            viewLabel={t("view", locale)}
          />

          <Link href="/catalog" className="hd-cta-pill" data-variant="green" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            height: 52, padding: "0 30px", borderRadius: 40,
            background: "var(--hd-green)", color: "#fff",
            fontSize: 16, fontWeight: 500, marginTop: 20,
          }}>{t("catalog", locale)}</Link>
        </Reveal>

        <PartnerCTA locale={locale} />
        <FeatureStrip locale={locale} />
        <Footer locale={locale} />
      </div>

      {/* MOBILE */}
      <div className="hd-mobile" style={{ background: "#fff" }}>
        <HeaderWrap><MobileHeader locale={locale} /></HeaderWrap>

        <section style={{ position: "relative" }}>
          <div style={{
            height: 240,
            backgroundImage: "url(/design/hero-engine-bg.png)",
            backgroundSize: "cover", backgroundPosition: "center",
          }} />
          <div style={{ padding: "22px 20px 0 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(0,0,0,0.7)" }}>
              {t("heroTagline", locale)}
              <span style={{ width: 20, height: 1, background: "rgba(0,0,0,0.3)" }} />
            </div>
            <h1 style={{ margin: "14px 0 0 0", fontSize: 32, lineHeight: "34px", fontWeight: 700, letterSpacing: "-0.02em" }}>
              {t("heroTitle1", locale)} {t("heroTitle2", locale)}
            </h1>
            <p style={{ marginTop: 14, marginBottom: 0, fontSize: 13, lineHeight: "18px", color: "rgba(0,0,0,0.7)" }}>
              {t("heroBody", locale)}
            </p>
            <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 22 }}>
              <Link href="/catalog" className="hd-cta-pill" data-variant="green" style={{
                display: "inline-flex", alignItems: "center",
                height: 44, padding: "0 24px", borderRadius: 40,
                background: "var(--hd-green)", color: "#fff", fontSize: 14, fontWeight: 500,
              }}>{t("catalog", locale)}</Link>
              <Link href="/categories" className="hd-arrow-link" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
                {t("categories", locale)} <Icons.ChevronRight size={14} />
              </Link>
            </div>

            <div style={{
              marginTop: 22, padding: "12px 14px", borderRadius: 14,
              background: "var(--hd-panel)",
              display: "flex", justifyContent: "space-around", alignItems: "center",
            }}>
              {heroChips.map((c, i) => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  {i > 0 && <div style={{ width: 1, height: 24, background: "rgba(0,0,0,0.1)", marginRight: 8 }} />}
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.3,
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "#fff", border: "1px solid var(--hd-hairline)",
                      display: "grid", placeItems: "center", color: "#000",
                    }}>
                      {/* render dark variants for mobile */}
                      {i === 0 && <Icons.Shield size={18} color="#000" />}
                      {i === 1 && <Icons.Engine size={18} color="#000" />}
                      {i === 2 && <Icons.Battery size={18} color="#000" />}
                    </div>
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "36px 20px 24px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>{t("categories", locale)}</h2>
            <Link href="/categories" style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
            }}>{t("showAll", locale)} <Icons.ArrowRight size={13} /></Link>
          </div>
          <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {(categories.length > 0 ? categories : []).slice(0, 4).map((c) => (
              <Link key={c.id} href={`/catalog?category=${c.slug}`} className="hd-card-mobile" style={{
                position: "relative",
                height: 160, borderRadius: 12, overflow: "hidden",
                background: "var(--hd-panel)",
                border: "1px solid var(--hd-hairline)",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                color: "#000",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${c.imageUrl || "/design/bumper.png"})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }} />
                <div style={{
                  position: "relative",
                  margin: 8,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                }}>
                  <div style={{
                    fontSize: 13, fontWeight: 600, color: "#000",
                    overflow: "hidden", textOverflow: "ellipsis",
                    display: "-webkit-box", WebkitLineClamp: 2 as any, WebkitBoxOrient: "vertical" as any,
                  }}>{pickCategoryName(c, locale)}</div>
                  <div style={{
                    marginTop: 4, display: "flex", alignItems: "center", gap: 6, fontSize: 11,
                    color: "var(--hd-green)", fontWeight: 600,
                  }}>
                    {t("viewAll", locale)} <Icons.ChevronRight size={12} color="var(--hd-green)" />
                  </div>
                </div>
              </Link>
            ))}
            {categories.length === 0 && (
              <div style={{ gridColumn: "1 / -1", padding: 24, color: "rgba(0,0,0,0.5)", fontSize: 13, textAlign: "center" }}>
                —
              </div>
            )}
          </div>
        </section>

        <section style={{ padding: "8px 20px 30px 20px" }}>
          <div style={{ marginTop: 8 }}>
            <HomeModelFilter
              makes={homeMakes}
              products={homeProducts}
              viewLabel={t("view", locale)}
            />
          </div>
          <div style={{ display: "none" }}>
            {(latestProducts.length > 0 ? latestProducts.slice(0, 4) : []).map((p) => (
              <Link key={p.id} href={`/catalog/${p.id}`} style={{
                display: "flex", flexDirection: "column", gap: 8,
              }}>
                <div style={{
                  aspectRatio: "1 / 1", borderRadius: 8,
                  background: "var(--hd-panel)", border: "1px solid var(--hd-hairline)",
                  backgroundImage: `url(${p.images[0]?.url ?? "/design/bumper.png"})`,
                  backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{pickProductName(p, locale)}</div>
                  {p.partNumber && (
                    <div style={{ marginTop: 2, fontSize: 11, color: "rgba(0,0,0,0.6)" }}>№ {p.partNumber}</div>
                  )}
                </div>
                <div style={{
                  height: 34, borderRadius: 6, border: "1px solid var(--hd-border)",
                  background: "var(--hd-panel)", fontSize: 12, fontWeight: 500,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0 10px",
                }}>{t("view", locale)} <Icons.ChevronRight size={12} /></div>
              </Link>
            ))}
          </div>
          <Link href="/catalog" className="hd-cta-pill" data-variant="green" style={{
            marginTop: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            height: 42, width: "100%", borderRadius: 40,
            background: "var(--hd-green)", color: "#fff", fontSize: 14, fontWeight: 500,
          }}>{t("goToCatalog", locale)} <Icons.ArrowRight size={14} color="#fff" /></Link>
        </section>

        <MobilePartnerCTA locale={locale} />
        <MobileFeatureStrip locale={locale} />
        <MobileFooter locale={locale} />
      </div>
    </>
  );
}

const catEmpty: React.CSSProperties = {
  height: 196, borderRadius: 10, background: "var(--hd-panel)",
};
const cardEmpty: React.CSSProperties = {
  aspectRatio: "202 / 200", borderRadius: 8,
  background: "var(--hd-panel)", border: "1px solid var(--hd-hairline)",
  backgroundImage: "url(/design/bumper.png)",
  backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
};
