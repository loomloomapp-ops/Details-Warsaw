import Link from "next/link";
import { prisma } from "@/lib/db";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Icons } from "@/components/site/Icons";
import { ProductCard } from "@/components/site/Blocks";

export const dynamic = "force-dynamic";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string };
}) {
  const q = (searchParams.q || "").trim();
  const categorySlug = (searchParams.category || "").trim();

  const [category, allCategories] = await Promise.all([
    categorySlug
      ? prisma.category.findUnique({ where: { slug: categorySlug } })
      : Promise.resolve(null),
    prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { nameRu: "asc" }],
      select: { id: true, slug: true, nameRu: true, _count: { select: { products: true } } },
    }),
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
  if (category) {
    where.categories = { some: { categoryId: category.id } };
  }

  const products = await prisma.product.findMany({
    where: Object.keys(where).length ? where : undefined,
    include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ background: "#fff", minWidth: 1440 }}>
      <Header current="catalog" />

      {/* breadcrumb + search + sort */}
      <div style={{
        borderBottom: "1px solid var(--hd-hairline)",
        padding: "18px 70px",
        display: "grid",
        gridTemplateColumns: "331px 400px 1fr",
        alignItems: "center", gap: 30,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 16 }}>
          <Link href="/" style={{ opacity: 0.6 }}>Главная</Link>
          <span style={{ opacity: 0.6 }}>/</span>
          <span>Каталог</span>
          {category && (
            <>
              <span style={{ opacity: 0.6 }}>/</span>
              <span>{category.nameRu}</span>
            </>
          )}
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
            name="q"
            defaultValue={q}
            placeholder="Код деталі, назва або автомобіль"
            style={{
              border: 0, outline: 0, background: "transparent",
              fontSize: 14, color: "#000", flex: 1, fontFamily: "inherit",
            }}
          />
        </form>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "flex-end", gap: 16, fontSize: 15,
        }}>
          <span style={{ color: "rgba(0,0,0,0.6)" }}>Сортировка по:</span>
          <button type="button" style={{
            height: 38, padding: "0 14px",
            border: "1px solid var(--hd-hairline)", borderRadius: 8, background: "#fff",
            display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 500,
          }}>
            По Популярности <Icons.ChevronDown size={16} />
          </button>
        </div>
      </div>

      <section style={{
        padding: "48px 70px 80px 70px",
        display: "grid", gridTemplateColumns: "250px 1fr", gap: 60, alignItems: "start",
      }}>
        <aside>
          <h1 style={{ margin: 0, fontSize: 36, fontWeight: 500, lineHeight: "40px" }}>
            {category ? category.nameRu : "Каталог"}
          </h1>
          <div style={{ marginTop: 10, fontSize: 14, color: "rgba(0,0,0,0.6)" }}>
            Найдено: <span style={{ color: "#000" }}>{products.length} {pluralize(products.length)}</span>
          </div>

          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 8 }}>
            <Link href="/catalog" style={{
              padding: "10px 14px", borderRadius: 8,
              fontSize: 14, fontWeight: !category ? 600 : 500,
              background: !category ? "#000" : "transparent",
              color: !category ? "#fff" : "#000",
            }}>
              Все товары
            </Link>
            {allCategories.map((c) => {
              const active = c.slug === categorySlug;
              return (
                <Link key={c.id} href={`/catalog?category=${c.slug}`} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 14px", borderRadius: 8,
                  fontSize: 14, fontWeight: active ? 600 : 500,
                  background: active ? "#000" : "transparent",
                  color: active ? "#fff" : "#000",
                }}>
                  <span>{c.nameRu}</span>
                  <span style={{ fontSize: 12, opacity: active ? 0.7 : 0.5 }}>{c._count.products}</span>
                </Link>
              );
            })}
          </div>

          <div style={{
            marginTop: 40, padding: 20, borderRadius: 10,
            border: "1px solid var(--hd-hairline)",
          }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Не нашли деталь?</div>
            <p style={{ marginTop: 8, fontSize: 13, lineHeight: "18px", color: "rgba(0,0,0,0.6)" }}>
              Оставьте контакты — менеджер подберёт нужную деталь и свяжется с вами.
            </p>
            <Link href="/#contacts" style={{
              marginTop: 14, display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 13, fontWeight: 600,
            }}>
              Связаться <Icons.ArrowRight size={14} />
            </Link>
          </div>
        </aside>

        <div>
          {products.length === 0 ? (
            <div style={{
              padding: "60px 40px", borderRadius: 12, background: "var(--hd-panel)",
              textAlign: "center", color: "rgba(0,0,0,0.6)",
            }}>
              {q ? `Ничего не найдено по запросу «${q}»` : "Товаров пока нет"}
            </div>
          ) : (
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30, rowGap: 44,
            }}>
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  href={`/catalog/${p.id}`}
                  name={p.nameRu}
                  image={p.images[0]?.url ?? null}
                  partNumber={p.partNumber}
                  big
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function pluralize(n: number): string {
  const last = n % 10;
  const tens = Math.floor((n % 100) / 10);
  if (tens === 1) return "позиций";
  if (last === 1) return "позиция";
  if (last >= 2 && last <= 4) return "позиции";
  return "позиций";
}
