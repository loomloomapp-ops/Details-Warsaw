import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [productCount, categoryCount] = await Promise.all([
    prisma.product.count().catch(() => 0),
    prisma.category.count().catch(() => 0),
  ]);

  return (
    <main style={{ padding: 60, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ borderBottom: "1px solid var(--hd-hairline)", paddingBottom: 24, marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>Hybrid Doktor</h1>
        <p style={{ color: "var(--hd-muted)", marginTop: 8 }}>
          Toyota hybrid parts marketplace · Этап 1 готов · публичный дизайн на Этапе 2
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Stat label="Товары в БД" value={productCount} />
        <Stat label="Категории в БД" value={categoryCount} />
      </div>

      <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link href="/admin" style={btnPrimary}>Перейти в админку →</Link>
        <Link href="/catalog" style={btnGhost}>Каталог (заглушка)</Link>
      </div>

      <p style={{ marginTop: 40, fontSize: 13, color: "var(--hd-subtle)" }}>
        После Этапа 2 эта страница станет точной копией Figma-дизайна Home.
      </p>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ border: "1px solid var(--hd-hairline)", borderRadius: 12, padding: 20 }}>
      <div style={{ fontSize: 13, color: "var(--hd-muted)" }}>{label}</div>
      <div style={{ fontSize: 36, fontWeight: 700, marginTop: 4 }}>{value}</div>
    </div>
  );
}

const btnPrimary: React.CSSProperties = {
  height: 44, padding: "0 22px", borderRadius: 999,
  background: "var(--hd-green)", color: "#fff", display: "inline-flex",
  alignItems: "center", fontWeight: 600, fontSize: 14,
};
const btnGhost: React.CSSProperties = {
  height: 44, padding: "0 22px", borderRadius: 999,
  border: "1px solid var(--hd-hairline)", background: "#fff", color: "#000",
  display: "inline-flex", alignItems: "center", fontWeight: 500, fontSize: 14,
};
