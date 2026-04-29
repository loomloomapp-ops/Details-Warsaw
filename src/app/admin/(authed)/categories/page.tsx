import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { nameRu: "asc" }],
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Категории</h1>
        <Link href="/admin/categories/new" style={{
          height: 40, padding: "0 18px", borderRadius: 999,
          background: "var(--hd-green)", color: "#fff",
          display: "inline-flex", alignItems: "center", fontWeight: 600, fontSize: 14,
        }}>
          + Новая категория
        </Link>
      </div>

      {categories.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 12, padding: 40, marginTop: 20, textAlign: "center", color: "var(--hd-muted)" }}>
          Категорий пока нет
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 12, marginTop: 20, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "var(--hd-panel)", textAlign: "left" }}>
                <th style={th}>Название</th>
                <th style={th}>Slug</th>
                <th style={th}>Товаров</th>
                <th style={th}>Порядок</th>
                <th style={th}></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} style={{ borderTop: "1px solid var(--hd-hairline)" }}>
                  <td style={td}>
                    <div style={{ fontWeight: 600 }}>{c.nameRu}</div>
                    {(c.nameUa || c.namePl) && (
                      <div style={{ fontSize: 12, color: "var(--hd-muted)" }}>
                        {c.nameUa && <>UA: {c.nameUa} </>}
                        {c.namePl && <>· PL: {c.namePl}</>}
                      </div>
                    )}
                  </td>
                  <td style={{ ...td, color: "var(--hd-muted)", fontFamily: "monospace", fontSize: 13 }}>{c.slug}</td>
                  <td style={td}>{c._count.products}</td>
                  <td style={td}>{c.sortOrder}</td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <Link href={`/admin/categories/${c.id}`} style={{ color: "var(--hd-green)", fontWeight: 600 }}>
                      Редактировать
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
