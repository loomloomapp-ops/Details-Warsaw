"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = sp.get("callbackUrl") || "/admin";
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const res = await signIn("credentials", {
      login, password, redirect: false, callbackUrl,
    });
    setLoading(false);
    if (res?.error) {
      setErr("Неверный логин или пароль");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <main style={{
      minHeight: "100vh", display: "grid", placeItems: "center",
      background: "var(--hd-panel)",
    }}>
      <form onSubmit={onSubmit} style={{
        background: "#fff", borderRadius: 16, padding: 32, width: 380,
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Вход в админку</h1>
        <p style={{ color: "var(--hd-muted)", fontSize: 13, marginTop: 4 }}>
          Hybrid Doktor · Details Warsaw
        </p>

        <label style={lbl}>Логин</label>
        <input
          value={login} onChange={(e) => setLogin(e.target.value)}
          autoFocus required style={inp}
        />

        <label style={lbl}>Пароль</label>
        <input
          type="password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          required style={inp}
        />

        {err && <div style={{ color: "#c00", fontSize: 13, marginTop: 12 }}>{err}</div>}

        <button type="submit" disabled={loading} style={{
          marginTop: 20, width: "100%", height: 44,
          background: "var(--hd-green)", color: "#fff", border: 0,
          borderRadius: 999, fontWeight: 600, fontSize: 14,
          opacity: loading ? 0.7 : 1,
        }}>
          {loading ? "Вход…" : "Войти"}
        </button>
      </form>
    </main>
  );
}

const lbl: React.CSSProperties = {
  display: "block", marginTop: 16, fontSize: 12,
  color: "var(--hd-muted)", textTransform: "uppercase", letterSpacing: 0.5,
};
const inp: React.CSSProperties = {
  marginTop: 6, width: "100%", height: 42, padding: "0 12px",
  border: "1px solid var(--hd-hairline)", borderRadius: 8, fontSize: 14,
  fontFamily: "inherit",
};
