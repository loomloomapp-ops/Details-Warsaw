import Link from "next/link";
import { prisma } from "@/lib/db";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Icons } from "@/components/site/Icons";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { nameRu: "asc" }],
  });

  return (
    <div style={{ background: "#fff", minWidth: 1440 }}>
      <Header current="categories" />

      <div style={{
        padding: "40px 70px 20px 70px",
        borderBottom: "1px solid var(--hd-hairline)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 18, color: "#000" }}>
          <Link href="/" style={{ opacity: 0.6 }}>Главная</Link>
          <span style={{ opacity: 0.6 }}>/</span>
          <span>Категории</span>
        </div>
      </div>

      <section style={{ padding: "48px 70px 80px 70px" }}>
        <h1 style={{ margin: 0, fontSize: 36, fontWeight: 500, lineHeight: "40px" }}>Категории</h1>

        {categories.length === 0 ? (
          <p style={{ marginTop: 40, color: "rgba(0,0,0,0.6)" }}>
            Категорий пока нет. Добавьте их в админке.
          </p>
        ) : (
          <div style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(4, 250px)",
            gap: 30, rowGap: 55,
            justifyContent: "space-between",
          }}>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/catalog?category=${c.slug}`}
                style={{ width: 250, display: "flex", flexDirection: "column", gap: 15 }}
              >
                <div style={{
                  width: 250, height: 250, borderRadius: 10,
                  background: "var(--hd-panel)",
                  border: "1px solid var(--hd-hairline)",
                  backgroundImage: "url(/design/bumper.png)",
                  backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center",
                }} />
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontSize: 18, fontWeight: 500 }}>{c.nameRu}</span>
                  <Icons.ArrowRight size={18} color="rgba(0,0,0,0.6)" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
