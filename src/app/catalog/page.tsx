import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type Search = { q?: string };

export default async function CatalogPage({ searchParams }: { searchParams: Search }) {
  const q = (searchParams.q || "").trim();
  const where = q
    ? {
        OR: [
          { nameRu: { contains: q } },
          { nameUa: { contains: q } },
          { namePl: { contains: q } },
          { article: { contains: q } },
          { partNumber: { contains: q } },
        ],
      }
    : {};

  const products = await prisma.product
    .findMany({
      where,
      include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
      orderBy: { createdAt: "desc" },
      take: 60,
    })
    .catch(() => []);

  return (
    <main style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Каталог</h1>
      <form method="get" style={{ marginTop: 16, marginBottom: 24 }}>
        <input
          name="q"
          defaultValue={q}
          placeholder="Поиск по названию или номеру детали"
          style={{
            width: 420, height: 42, padding: "0 14px",
            border: "1px solid var(--hd-hairline)", borderRadius: 10,
            fontSize: 14,
          }}
        />
      </form>

      {products.length === 0 ? (
        <div style={{ color: "var(--hd-muted)" }}>
          {q ? "Ничего не найдено." : "Пока нет товаров. Добавьте их в админке."}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/catalog/${p.id}`}
              style={{ border: "1px solid var(--hd-hairline)", borderRadius: 12, overflow: "hidden", background: "#fff" }}
            >
              <div style={{ aspectRatio: "1 / 1", background: "var(--hd-panel)", display: "grid", placeItems: "center" }}>
                {p.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.images[0].url} alt={p.nameRu} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ color: "var(--hd-subtle)", fontSize: 12 }}>Нет фото</span>
                )}
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.nameRu}</div>
                {p.partNumber && (
                  <div style={{ fontSize: 12, color: "var(--hd-muted)", marginTop: 4 }}>№ {p.partNumber}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
