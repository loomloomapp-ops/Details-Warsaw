"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      style={{
        width: "100%", padding: "10px 14px", borderRadius: 8,
        background: "rgba(255,255,255,0.08)", color: "#fff", border: 0,
        fontSize: 13, textAlign: "left",
      }}
    >
      Выйти
    </button>
  );
}
