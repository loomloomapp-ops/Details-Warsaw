import Link from "next/link";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductForm from "../_form/ProductForm";
import { updateProduct, deleteProduct } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        categories: true,
      },
    }),
    prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { nameRu: "asc" }],
      select: { id: true, nameRu: true },
    }),
  ]);

  if (!product) notFound();

  const update = updateProduct.bind(null, id);
  const remove = deleteProduct.bind(null, id);

  return (
    <div>
      <Link href="/admin/products" style={{ color: "var(--hd-muted)", fontSize: 13 }}>
        ← Все товары
      </Link>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "8px 0 24px" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>{product.nameRu}</h1>
        <Link href={`/catalog/${id}`} target="_blank" style={{ fontSize: 13, color: "var(--hd-green)", fontWeight: 600 }}>
          Открыть на сайте ↗
        </Link>
      </div>

      <ProductForm
        initial={{
          id: product.id,
          nameRu: product.nameRu,
          shortDescRu: product.shortDescRu,
          longDescRu: product.longDescRu,
          nameUa: product.nameUa,
          shortDescUa: product.shortDescUa,
          longDescUa: product.longDescUa,
          namePl: product.namePl,
          shortDescPl: product.shortDescPl,
          longDescPl: product.longDescPl,
          article: product.article,
          partNumber: product.partNumber,
          color: product.color,
          material: product.material,
          images: product.images.map((i) => ({ id: i.id, url: i.url })),
          categoryIds: product.categories.map((pc) => pc.categoryId),
        }}
        categories={categories}
        action={update}
        onDelete={remove}
      />
    </div>
  );
}
