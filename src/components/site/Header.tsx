import Link from "next/link";
import { Icons, Logo } from "./Icons";

type Current = "home" | "catalog" | "categories" | "contacts";

export default function Header({ current = "home" }: { current?: Current }) {
  const nav: { id: Current; label: string; href: string }[] = [
    { id: "catalog",    label: "Каталог",    href: "/catalog" },
    { id: "categories", label: "Категории",  href: "/categories" },
    { id: "contacts",   label: "Контакты",   href: "/#contacts" },
  ];
  return (
    <header style={{
      height: 66, padding: "10px 70px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid var(--hd-hairline)", background: "#fff",
      position: "relative", zIndex: 5,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 70 }}>
        <Link href="/" style={{ display: "flex" }}><Logo /></Link>
        <nav style={{ display: "flex", gap: 32 }}>
          {nav.map((n) => (
            <Link key={n.id} href={n.href} style={{
              fontSize: 16, fontWeight: current === n.id ? 600 : 500, color: "#000",
            }}>{n.label}</Link>
          ))}
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <div style={{ display: "flex", gap: 10, fontSize: 14, color: "rgba(0,0,0,0.7)" }}>
          <span style={{ fontWeight: 600, color: "#000" }}>RU</span>
          <span style={{ opacity: 0.3 }}>/</span>
          <span>PL</span>
          <span style={{ opacity: 0.3 }}>/</span>
          <span>EN</span>
        </div>
        <form action="/catalog" method="get" style={{
          width: 340, height: 42,
          border: "1px solid var(--hd-hairline)", borderRadius: 10,
          display: "flex", alignItems: "center", gap: 10, padding: "0 14px", background: "#fff",
        }}>
          <Icons.Search size={16} color="rgba(0,0,0,0.6)" />
          <input
            name="q"
            placeholder="Код деталі, назва або автомобіль"
            style={{
              border: 0, outline: 0, background: "transparent",
              fontSize: 14, color: "#000", flex: 1, fontFamily: "inherit",
            }}
          />
        </form>
      </div>
    </header>
  );
}
