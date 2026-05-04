import Link from "next/link";
import { prisma } from "@/lib/db";
import Header from "@/components/site/Header";
import MobileHeader from "@/components/site/MobileHeader";
import HeaderWrap from "@/components/site/HeaderWrap";
import Footer from "@/components/site/Footer";
import MobileFooter from "@/components/site/MobileFooter";
import { Icons } from "@/components/site/Icons";
import { getLocale } from "@/lib/locale-server";
import { t, pickCategoryName } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const locale = getLocale();
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { nameRu: "asc" }],
  });

  return (
    <>
      {/* DESKTOP */}
      <div className="hd-desktop" style={{ background: "#fff", minWidth: 1440 }}>
        <HeaderWrap><Header current="categories" locale={locale} /></HeaderWrap>

        <div style={{
          padding: "40px 70px 20px 70px",
          borderBottom: "1px solid var(--hd-hairline)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 18, color: "#000" }}>
            <Link href="/" style={{ opacity: 0.6 }}>{t("home", locale)}</Link>
            <span style={{ opacity: 0.6 }}>/</span>
            <span>{t("categories", locale)}</span>
          </div>
        </div>

        <section style={{ padding: "48px 70px 80px 70px" }}>
          <h1 style={{ margin: 0, fontSize: 36, fontWeight: 500, lineHeight: "40px" }}>{t("categories", locale)}</h1>

          {categories.length === 0 ? (
            <p style={{ marginTop: 40, color: "rgba(0,0,0,0.6)" }}>—</p>
          ) : (
            <div style={{
              marginTop: 48,
              display: "grid", gridTemplateColumns: "repeat(4, 250px)",
              gap: 30, rowGap: 55, justifyContent: "space-between",
            }}>
              {categories.map((c) => (
                <Link key={c.id} href={`/catalog?category=${c.slug}`} style={{
                  width: 250, display: "flex", flexDirection: "column", gap: 15,
                }}>
                  <div className="hd-cat-tile" style={{
                    width: 250, height: 250, borderRadius: 10,
                    background: "var(--hd-panel)", border: "1px solid var(--hd-hairline)",
                    backgroundImage: `url(${c.imageUrl || "/design/bumper.png"})`,
                    backgroundSize: c.imageUrl ? "cover" : "contain",
                    backgroundRepeat: "no-repeat", backgroundPosition: "center",
                  }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 18, fontWeight: 500 }}>{pickCategoryName(c, locale)}</span>
                    <Icons.ArrowRight size={18} color="rgba(0,0,0,0.6)" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <Footer locale={locale} />
      </div>

      {/* MOBILE */}
      <div className="hd-mobile" style={{ background: "#fff" }}>
        <HeaderWrap><MobileHeader locale={locale} /></HeaderWrap>

        <div style={{ padding: "20px" }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>{t("categories", locale)}</h1>
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, rowGap: 20 }}>
            {categories.map((c) => (
              <Link key={c.id} href={`/catalog?category=${c.slug}`} style={{
                display: "flex", flexDirection: "column", gap: 8,
              }}>
                <div style={{
                  aspectRatio: "1 / 1", borderRadius: 8,
                  background: "var(--hd-panel)", border: "1px solid var(--hd-hairline)",
                  backgroundImage: `url(${c.imageUrl || "/design/bumper.png"})`,
                  backgroundSize: c.imageUrl ? "cover" : "contain",
                  backgroundRepeat: "no-repeat", backgroundPosition: "center",
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{pickCategoryName(c, locale)}</span>
                  <Icons.ArrowRight size={14} color="rgba(0,0,0,0.6)" />
                </div>
                <div style={{ fontSize: 11, color: "rgba(0,0,0,0.6)" }}>{t("viewAll", locale)}</div>
              </Link>
            ))}
            {categories.length === 0 && (
              <div style={{ gridColumn: "1 / -1", padding: 24, color: "rgba(0,0,0,0.5)", fontSize: 13, textAlign: "center" }}>
                —
              </div>
            )}
          </div>
        </div>

        <MobileFooter locale={locale} />
      </div>
    </>
  );
}
