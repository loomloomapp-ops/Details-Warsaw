import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import CategoryForm from "../_form/CategoryForm";
import { updateCategory, deleteCategory } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: { select: { products: true } },
      products: {
        include: { product: { select: { id: true, nameRu: true, partNumber: true } } },
        take: 50,
      },
    },
  });
  if (!category) notFound();

  const update = updateCategory.bind(null, id);
  const remove = deleteCategory.bind(null, id);

  return (
    <div>
      <Link href="/admin/categories" style={{ color: "var(--hd-muted)", fontSize: 13 }}>
        ← Все категории
      </Link>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: "8px 0 24px" }}>{category.nameRu}</h1>

      <CategoryForm
        initial={{
          id: category.id,
          nameRu: category.nameRu,
          nameUa: category.nameUa,
          namePl: category.namePl,
          slug: category.slug,
          sortOrder: category.sortOrder,
        }}
        action={update}
        onDelete={remove}
        productCount={category._count.products}
      />

      <div style={{ marginTop: 32, background: "#fff", borderRadius: 12, padding: 24, maxWidth: 640 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: 0, marginBottom: 12, textTransform: "uppercase", color: "var(--hd-muted)" }}>
          Товары в категории ({category._count.products})
        </h2>
        {category.products.length === 0 ? (
          <p style={{ color: "var(--hd-muted)", fontSize: 14, margin: 0 }}>Пока нет товаров в этой категории.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {category.products.map((pc) => (
              <li key={pc.product.id} style={{ padding: "8px 0", borderBottom: "1px solid var(--hd-hairline)" }}>
                <Link href={`/admin/products/${pc.product.id}`} style={{ fontWeight: 500 }}>
                  {pc.product.nameRu}
                  {pc.product.partNumber && <span style={{ color: "var(--hd-muted)" }}> · {pc.product.partNumber}</span>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
