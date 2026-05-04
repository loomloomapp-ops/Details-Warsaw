import Link from "next/link";
import { prisma } from "@/lib/db";
import ProductsTable from "./_list/ProductsTable";

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
        <ProductsTable
          rows={products.map((p) => ({
            id: p.id,
            nameRu: p.nameRu,
            article: p.article,
            partNumber: p.partNumber,
            imageUrl: p.images[0]?.url ?? null,
            categories: p.categories.map((pc) => pc.category.nameRu).join(", "),
          }))}
        />
      )}
    </div>
  );
}
