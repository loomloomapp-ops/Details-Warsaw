import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

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

  // Поля, которые пустые — не отображаются (по требованию)
  const rows: Array<[string, string | null | undefined]> = [
    ["Артикул", product.article],
    ["Номер детали", product.partNumber],
    ["Цвет", product.color],
    ["Материал", product.material],
  ];

  return (
    <main style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div>
          {product.images[0] ? (
            <div style={{ aspectRatio: "1 / 1", background: "var(--hd-panel)", borderRadius: 12, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.images[0].url} alt={product.nameRu} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ) : (
            <div style={{ aspectRatio: "1 / 1", background: "var(--hd-panel)", borderRadius: 12, display: "grid", placeItems: "center", color: "var(--hd-subtle)" }}>
              Нет фото
            </div>
          )}
          {product.images.length > 1 && (
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {product.images.slice(1).map((img) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={img.id} src={img.url} alt="" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>{product.nameRu}</h1>
          {product.shortDescRu && (
            <p style={{ marginTop: 12, color: "var(--hd-body)" }}>{product.shortDescRu}</p>
          )}

          <dl style={{ marginTop: 24, display: "grid", gridTemplateColumns: "max-content 1fr", gap: "8px 24px" }}>
            {rows.map(([label, value]) =>
              value ? (
                <div style={{ display: "contents" }} key={label}>
                  <dt style={{ color: "var(--hd-muted)", fontSize: 14 }}>{label}</dt>
                  <dd style={{ margin: 0, fontSize: 14 }}>{value}</dd>
                </div>
              ) : null
            )}
          </dl>

          {product.categories.length > 0 && (
            <div style={{ marginTop: 16, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {product.categories.map((pc) => (
                <span key={pc.categoryId} style={{
                  padding: "4px 12px", borderRadius: 999,
                  border: "1px solid var(--hd-hairline)", fontSize: 12,
                }}>
                  {pc.category.nameRu}
                </span>
              ))}
            </div>
          )}

          {product.longDescRu && (
            <div style={{ marginTop: 32 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Описание</h2>
              <div style={{ marginTop: 8, whiteSpace: "pre-wrap", color: "var(--hd-body)" }}>
                {product.longDescRu}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
