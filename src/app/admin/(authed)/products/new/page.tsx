import Link from "next/link";
import { prisma } from "@/lib/db";
import ProductForm from "../_form/ProductForm";
import { loadKnownAttributes } from "../_form/loadKnown";
import { createProduct } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const [categories, known] = await Promise.all([
    prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { nameRu: "asc" }],
      select: { id: true, nameRu: true },
    }),
    loadKnownAttributes(),
  ]);

  return (
    <div>
      <Link href="/admin/products" style={{ color: "var(--hd-muted)", fontSize: 13 }}>
        ← Все товары
      </Link>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: "8px 0 24px" }}>Новый товар</h1>
      <ProductForm initial={{}} categories={categories} action={createProduct} {...known} />
    </div>
  );
}
