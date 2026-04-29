import Link from "next/link";
import CategoryForm from "../_form/CategoryForm";
import { createCategory } from "../actions";

export default function NewCategoryPage() {
  return (
    <div>
      <Link href="/admin/categories" style={{ color: "var(--hd-muted)", fontSize: 13 }}>
        ← Все категории
      </Link>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: "8px 0 24px" }}>Новая категория</h1>
      <CategoryForm initial={{}} action={createCategory} />
    </div>
  );
}
