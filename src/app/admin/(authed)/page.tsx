import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [productCount, categoryCount, recent] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, nameRu: true, partNumber: true, createdAt: true },
    }),
  ]);

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Дашборд</h1>
      <p style={{ color: "var(--hd-muted)", marginTop: 4 }}>Обзор каталога</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 24 }}>
        <Card label="Товары" value={productCount} href="/admin/products" />
        <Card label="Категории" value={categoryCount} href="/admin/categories" />
      </div>

      <div style={{ marginTop: 32, background: "#fff", borderRadius: 12, padding: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Последние товары</h2>
        {recent.length === 0 ? (
          <p style={{ color: "var(--hd-muted)", fontSize: 14, marginTop: 12 }}>
            Товаров пока нет.{" "}
            <Link href="/admin/products/new" style={{ color: "var(--hd-green)", fontWeight: 600 }}>
              Добавить первый →
            </Link>
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0" }}>
            {recent.map((p) => (
              <li key={p.id} style={{
                display: "flex", justifyContent: "space-between",
                padding: "10px 0", borderBottom: "1px solid var(--hd-hairline)",
              }}>
                <Link href={`/admin/products/${p.id}`} style={{ fontWeight: 500 }}>
                  {p.nameRu} {p.partNumber && <span style={{ color: "var(--hd-muted)" }}>· {p.partNumber}</span>}
                </Link>
                <span style={{ color: "var(--hd-subtle)", fontSize: 13 }}>
                  {new Date(p.createdAt).toLocaleDateString("ru-RU")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Card({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} style={{
      background: "#fff", borderRadius: 12, padding: 20, display: "block",
    }}>
      <div style={{ fontSize: 13, color: "var(--hd-muted)" }}>{label}</div>
      <div style={{ fontSize: 36, fontWeight: 800, marginTop: 4 }}>{value}</div>
    </Link>
  );
}
