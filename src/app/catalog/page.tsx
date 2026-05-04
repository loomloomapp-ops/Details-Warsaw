import Link from "next/link";
import { prisma } from "@/lib/db";
import Header from "@/components/site/Header";
import MobileHeader from "@/components/site/MobileHeader";
import HeaderWrap from "@/components/site/HeaderWrap";
import Footer from "@/components/site/Footer";
import MobileFooter from "@/components/site/MobileFooter";
import { Icons } from "@/components/site/Icons";
import { ProductCard } from "@/components/site/Blocks";
import { getLocale } from "@/lib/locale-server";
import { t, pickProductName, pickCategoryName } from "@/lib/i18n";
import CatalogFilters from "./_filters/CatalogFilters";
import CategoryNav from "./_filters/CategoryNav";
import ContactCTA from "@/components/site/ContactCTA";

export const dynamic = "force-dynamic";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; make?: string; model?: string; year?: string };
}) {
  const locale = getLocale();
  const q = (searchParams.q || "").trim();
  const categorySlug = (searchParams.category || "").trim();
  const make = (searchParams.make || "").trim();
  const model = (searchParams.model || "").trim();
  const year = (searchParams.year || "").trim();

  const [category, allCategories, distinctMakes, distinctModels, distinctYears] = await Promise.all([
    categorySlug ? prisma.category.findUnique({ where: { slug: categorySlug } }) : Promise.resolve(null),
    prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { nameRu: "asc" }],
      select: { id: true, slug: true, nameRu: true, nameUa: true, namePl: true, _count: { select: { products: true } } },
    }),
    prisma.product.findMany({ where: { make: { not: null } }, select: { make: true }, distinct: ["make"], orderBy: { make: "asc" } }),
    prisma.product.findMany({ where: { model: { not: null } }, select: { model: true }, distinct: ["model"], orderBy: { model: "asc" } }),
    prisma.product.findMany({ where: { year: { not: null } }, select: { year: true }, distinct: ["year"], orderBy: { year: "desc" } }),
  ]);

  const where: any = {};
  if (q) {
    where.OR = [
      { nameRu: { contains: q } },
      { nameUa: { contains: q } },
      { namePl: { contains: q } },
      { article: { contains: q } },
      { partNumber: { contains: q } },
    ];
  }
  if (category) where.categories = { some: { categoryId: category.id } };
  if (make) where.make = make;
  if (model) where.model = model;
  if (year) where.year = year;

  const products = await prisma.product.findMany({
    where: Object.keys(where).length ? where : undefined,
    include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  const categoryName = category ? pickCategoryName(category, locale) : null;
  const filterOptions = {
    makes:  distinctMakes.map((p) => p.make!).filter(Boolean),
    models: distinctModels.map((p) => p.model!).filter(Boolean),
    years:  distinctYears.map((p) => p.year!).filter(Boolean),
  };
  const placeholders = {
    make: t("filterMake", locale),
    model: t("filterModel", locale),
    year: t("filterYear", locale),
  };
  const applyLabel = t("apply", locale);

  return (
    <>
      {/* DESKTOP */}
      <div className="hd-desktop" style={{ background: "#fff", minWidth: 1440 }}>
        <HeaderWrap><Header current="catalog" locale={locale} /></HeaderWrap>

        <div style={{
          borderBottom: "1px solid var(--hd-hairline)",
          padding: "18px 70px",
          display: "grid", gridTemplateColumns: "331px 400px 1fr",
          alignItems: "center", gap: 30,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 16 }}>
            <Link href="/" className="hd-link-hover" style={{ opacity: 0.6 }}>{t("home", locale)}</Link>
            <span style={{ opacity: 0.6 }}>/</span>
            <span>{t("catalog", locale)}</span>
            {categoryName && (<>
              <span style={{ opacity: 0.6 }}>/</span>
              <span>{categoryName}</span>
            </>)}
          </div>
          <form action="/catalog" method="get" style={{
            height: 38, padding: "0 15px",
            borderRadius: 10, background: "var(--hd-panel)",
            border: "1px solid var(--hd-border)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            {category && <input type="hidden" name="category" value={category.slug} />}
            <Icons.Search size={14} color="rgba(0,0,0,0.8)" />
            <input
              name="q" defaultValue={q} placeholder={t("searchPlaceholder", locale)}
              style={{ border: 0, outline: 0, background: "transparent", fontSize: 14, color: "#000", flex: 1, fontFamily: "inherit" }}
            />
          </form>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16, fontSize: 15,
          }}>
            <span style={{ color: "rgba(0,0,0,0.6)" }}>{t("sortBy", locale)}</span>
            <button type="button" style={{
              height: 38, padding: "0 14px",
              border: "1px solid var(--hd-hairline)", borderRadius: 8, background: "#fff",
              display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 500,
            }}>
              {t("byPopularity", locale)} <Icons.ChevronDown size={16} />
            </button>
          </div>
        </div>

        <section style={{
          padding: "48px 70px 80px 70px",
          display: "grid", gridTemplateColumns: "250px 1fr", gap: 60, alignItems: "start",
        }}>
          <aside>
            <h1 style={{ margin: 0, fontSize: 36, fontWeight: 500, lineHeight: "40px" }}>
              {categoryName ?? t("catalog", locale)}
            </h1>
            <div style={{ marginTop: 10, fontSize: 14, color: "rgba(0,0,0,0.6)" }}>
              {t("found", locale)}: <span style={{ color: "#000" }}>{products.length}</span>
            </div>

            <div style={{ marginTop: 28 }}>
              <CatalogFilters
                options={filterOptions}
                initial={{ make, model, year }}
                applyLabel={applyLabel}
                placeholders={placeholders}
              />
            </div>

            <div style={{ marginTop: 36 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--hd-muted)", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 12 }}>
                {t("categories", locale)}
              </div>
              <CategoryNav
                items={allCategories.map((c) => ({
                  id: c.id, slug: c.slug,
                  name: pickCategoryName(c, locale),
                  count: c._count.products,
                }))}
                activeSlug={categorySlug}
                allLabel={t("allItems", locale)}
                showMoreLabel={t("showMore", locale)}
                showLessLabel={t("showLess", locale)}
              />
            </div>

            <div style={{
              marginTop: 32, padding: 20, borderRadius: 10,
              border: "1px solid var(--hd-hairline)",
            }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t("cantFindPart", locale)}</div>
              <p style={{ marginTop: 8, fontSize: 13, lineHeight: "18px", color: "rgba(0,0,0,0.6)" }}>
                {t("cantFindBody", locale)}
              </p>
              <div style={{ marginTop: 14 }}>
                <ContactCTA label={t("contactUs", locale)} locale={locale} />
              </div>
            </div>
          </aside>

          <div>
            {products.length === 0 ? (
              <div style={{
                padding: "60px 40px", borderRadius: 12, background: "var(--hd-panel)",
                textAlign: "center", color: "rgba(0,0,0,0.6)",
              }}>
                {q ? `${t("notFoundQ", locale)} «${q}»` : t("noProductsYet", locale)}
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30, rowGap: 44 }}>
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    href={`/catalog/${p.id}`}
                    name={pickProductName(p, locale)}
                    image={p.images[0]?.url ?? null}
                    partNumber={p.partNumber}
                    viewLabel={t("view", locale)}
                    big
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer locale={locale} />
      </div>

      {/* MOBILE */}
      <div className="hd-mobile" style={{ background: "#fff" }}>
        <HeaderWrap><MobileHeader locale={locale} /></HeaderWrap>

        <div style={{ padding: "20px 20px 8px 20px" }}>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 500, textAlign: "center" }}>
            {categoryName ?? t("catalog", locale)}
          </h1>
          <div style={{
            marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13,
          }}>
            <span style={{ color: "rgba(0,0,0,0.6)" }}>
              {t("found", locale)}: <span style={{ color: "#000" }}>{products.length}</span>
            </span>
          </div>
          <form action="/catalog" method="get" style={{
            marginTop: 12,
            height: 38, padding: "0 12px", borderRadius: 8,
            background: "var(--hd-panel)", border: "1px solid var(--hd-border)",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            {category && <input type="hidden" name="category" value={category.slug} />}
            <Icons.Search size={14} color="rgba(0,0,0,0.6)" />
            <input
              name="q" defaultValue={q} placeholder={t("searchPlaceholder", locale)}
              style={{ border: 0, outline: 0, background: "transparent", fontSize: 13, flex: 1, fontFamily: "inherit" }}
            />
          </form>

          <div style={{ marginTop: 12, display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            <Link href="/catalog" style={chip(!categorySlug)}>{t("allItems", locale)}</Link>
            {allCategories.map((c) => (
              <Link key={c.id} href={`/catalog?category=${c.slug}`} style={chip(c.slug === categorySlug)}>
                {pickCategoryName(c, locale)}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 12 }}>
            <CatalogFilters
              options={filterOptions}
              initial={{ make, model, year }}
              applyLabel={applyLabel}
              placeholders={placeholders}
            />
          </div>
        </div>

        {products.length === 0 ? (
          <div style={{
            margin: "20px", padding: "40px 20px", borderRadius: 10,
            background: "var(--hd-panel)", textAlign: "center", color: "rgba(0,0,0,0.6)", fontSize: 13,
          }}>
            {q ? `${t("notFoundQ", locale)} «${q}»` : t("noProductsYet", locale)}
          </div>
        ) : (
          <div style={{
            padding: "14px 20px 28px 20px",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, rowGap: 26,
          }}>
            {products.map((p) => (
              <Link key={p.id} href={`/catalog/${p.id}`} className="hd-card-mobile" style={{
                display: "flex", flexDirection: "column", gap: 8,
              }}>
                <div style={{
                  aspectRatio: "1 / 1", borderRadius: 8,
                  background: "var(--hd-panel)", border: "1px solid var(--hd-hairline)",
                  backgroundImage: `url(${p.images[0]?.url ?? "/design/bumper.png"})`,
                  backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{pickProductName(p, locale)}</div>
                  {p.partNumber && (
                    <div style={{ marginTop: 2, fontSize: 11, color: "rgba(0,0,0,0.6)" }}>№ {p.partNumber}</div>
                  )}
                </div>
                <div style={{
                  height: 32, borderRadius: 6, border: "1px solid var(--hd-border)",
                  background: "var(--hd-panel)", fontSize: 12, fontWeight: 500,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0 10px",
                }}>{t("view", locale)} <Icons.ChevronRight size={12} /></div>
              </Link>
            ))}
          </div>
        )}

        <MobileFooter locale={locale} />
      </div>
    </>
  );
}

function chip(active: boolean): React.CSSProperties {
  return {
    padding: "6px 14px", borderRadius: 999, fontSize: 12,
    border: `1px solid ${active ? "#000" : "var(--hd-hairline)"}`,
    background: active ? "#000" : "#fff",
    color: active ? "#fff" : "#000", whiteSpace: "nowrap",
    transition: "background .2s ease, color .2s ease, border-color .2s ease",
  };
}
