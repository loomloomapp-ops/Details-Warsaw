import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ProductsListPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q || "").trim();

  const products = await prisma.product.findMany({
    where: q
      ? {
          OR: [
            { nameRu: { contains: q } },
            { nameUa: { contains: q } },
            { namePl: { contains: q } },
            { article: { contains: q } },
            { partNumber: { contains: q } },
          ],
        }
      : undefined,
    include: {
      images: { take: 1, orderBy: { sortOrder: "asc" } },
      categories: { include: { category: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Товары</h1>
        <Link href="/admin/products/new" style={{
          height: 40, padding: "0 18px", borderRadius: 999,
          background: "var(--hd-green)", color: "#fff",
          display: "inline-flex", alignItems: "center", fontWeight: 600, fontSize: 14,
        }}>
          + Добавить товар
        </Link>
      </div>

      <form method="get" style={{ marginTop: 20, marginBottom: 20 }}>
        <input
          name="q"
          defaultValue={q}
          placeholder="Поиск по названию или номеру детали"
          style={{
            width: 420, height: 42, padding: "0 14px",
            border: "1px solid var(--hd-hairline)", borderRadius: 8,
            background: "#fff", fontSize: 14,
          }}
        />
      </form>

      {products.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 12, padding: 40, textAlign: "center", color: "var(--hd-muted)" }}>
          {q ? "Ничего не найдено" : "Товаров пока нет"}
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "var(--hd-panel)", textAlign: "left" }}>
                <th style={th}>Фото</th>
                <th style={th}>Название</th>
                <th style={th}>Артикул</th>
                <th style={th}>№ детали</th>
                <th style={th}>Категории</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderTop: "1px solid var(--hd-hairline)" }}>
                  <td style={td}>
                    {p.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0].url} alt="" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }} />
                    ) : (
                      <div style={{ width: 48, height: 48, background: "var(--hd-panel)", borderRadius: 6 }} />
                    )}
                  </td>
                  <td style={td}>
                    <Link href={`/admin/products/${p.id}`} style={{ fontWeight: 600 }}>
                      {p.nameRu}
                    </Link>
                  </td>
                  <td style={{ ...td, color: "var(--hd-muted)" }}>{p.article || "—"}</td>
                  <td style={{ ...td, color: "var(--hd-muted)" }}>{p.partNumber || "—"}</td>
                  <td style={{ ...td, color: "var(--hd-muted)" }}>
                    {p.categories.map((pc) => pc.category.nameRu).join(", ") || "—"}
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <Link href={`/admin/products/${p.id}`} style={{ color: "var(--hd-green)", fontWeight: 600 }}>
                      Открыть
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const th: React.CSSProperties = { padding: "12px 16px", fontWeight: 600, fontSize: 12, color: "var(--hd-muted)", textTransform: "uppercase" };
const td: React.CSSProperties = { padding: "12px 16px", verticalAlign: "middle" };
