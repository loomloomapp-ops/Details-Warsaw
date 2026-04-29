import Link from "next/link";
import LogoutButton from "../_components/LogoutButton";

export const dynamic = "force-dynamic";

export default function AuthedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--hd-panel)" }}>
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 240,
        background: "#000", color: "#fff", padding: "24px 0",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "0 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>Hybrid Doktor</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Админ-панель</div>
        </div>
        <nav style={{ padding: "16px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <Link href="/admin" style={nav()}>Дашборд</Link>
          <Link href="/admin/products" style={nav()}>Товары</Link>
          <Link href="/admin/categories" style={nav()}>Категории</Link>
          <Link href="/" style={nav()}>← На сайт</Link>
        </nav>
        <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <LogoutButton />
        </div>
      </aside>
      <main style={{ marginLeft: 240, padding: 32 }}>{children}</main>
    </div>
  );
}

function nav(): React.CSSProperties {
  return { padding: "10px 14px", borderRadius: 8, fontSize: 14, color: "rgba(255,255,255,0.85)" };
}
