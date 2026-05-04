"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteProductInline, deleteProducts } from "../actions";

type Row = {
  id: number;
  nameRu: string;
  article: string | null;
  partNumber: string | null;
  imageUrl: string | null;
  categories: string;
};

export default function ProductsTable({ rows }: { rows: Row[] }) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [confirmIds, setConfirmIds] = useState<number[] | null>(null);
  const [pending, start] = useTransition();

  const allSelected = rows.length > 0 && selected.size === rows.length;
  const someSelected = selected.size > 0 && !allSelected;

  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)));
  }

  function askDeleteOne(id: number) { setConfirmIds([id]); }
  function askDeleteSelected() {
    if (selected.size === 0) return;
    setConfirmIds(Array.from(selected));
  }
  function performDelete() {
    if (!confirmIds) return;
    const ids = confirmIds;
    start(async () => {
      if (ids.length === 1) await deleteProductInline(ids[0]);
      else await deleteProducts(ids);
      setSelected((prev) => {
        const n = new Set(prev);
        for (const id of ids) n.delete(id);
        return n;
      });
      setConfirmIds(null);
    });
  }

  return (
    <>
      {selected.size > 0 && (
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "#fff", borderRadius: 12, padding: "12px 16px", marginBottom: 12,
          border: "1px solid var(--hd-hairline)",
        }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Вибрано: {selected.size}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              style={btnGhost}
            >Скасувати вибір</button>
            <button
              type="button"
              onClick={askDeleteSelected}
              style={btnDanger}
            >Видалити вибрані</button>
          </div>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "var(--hd-panel)", textAlign: "left" }}>
              <th style={{ ...th, width: 44 }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected; }}
                  onChange={toggleAll}
                />
              </th>
              <th style={th}>Фото</th>
              <th style={th}>Название</th>
              <th style={th}>Артикул</th>
              <th style={th}>№ детали</th>
              <th style={th}>Категории</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const isSel = selected.has(p.id);
              return (
                <tr key={p.id} style={{
                  borderTop: "1px solid var(--hd-hairline)",
                  background: isSel ? "rgba(68,122,68,0.06)" : "transparent",
                }}>
                  <td style={td}>
                    <input type="checkbox" checked={isSel} onChange={() => toggle(p.id)} />
                  </td>
                  <td style={td}>
                    {p.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imageUrl} alt="" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }} />
                    ) : (
                      <div style={{ width: 48, height: 48, background: "var(--hd-panel)", borderRadius: 6 }} />
                    )}
                  </td>
                  <td style={td}>
                    <Link href={`/admin/products/${p.id}`} style={{ fontWeight: 600 }}>
                      {p.nameRu}
                    </Link>
                  </td>
                  <td style={{ ...td, color: "var(--hd-muted)" }}>{p.article || "—"}</td>
                  <td style={{ ...td, color: "var(--hd-muted)" }}>{p.partNumber || "—"}</td>
                  <td style={{ ...td, color: "var(--hd-muted)" }}>{p.categories || "—"}</td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 14, alignItems: "center" }}>
                      <Link href={`/admin/products/${p.id}`} style={{ color: "var(--hd-green)", fontWeight: 600 }}>
                        Открыть
                      </Link>
                      <button
                        type="button"
                        onClick={() => askDeleteOne(p.id)}
                        title="Удалить"
                        style={{
                          width: 30, height: 30, borderRadius: 999,
                          border: "1px solid rgba(204,0,0,0.3)", background: "#fff",
                          color: "#c00", cursor: "pointer",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                        }}
                      >×</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {confirmIds !== null && (
        <div style={overlay} onClick={() => !pending && setConfirmIds(null)}>
          <div style={dialog} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
              {confirmIds.length === 1 ? "Удалить товар?" : `Удалить выбранные товары (${confirmIds.length})?`}
            </h3>
            <p style={{ marginTop: 12, fontSize: 14, color: "var(--hd-muted)" }}>
              Действие безвозвратно: все фото и связанные данные будут удалены.
            </p>
            <div style={{ marginTop: 22, display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button type="button" disabled={pending} onClick={() => setConfirmIds(null)} style={btnGhost}>Отмена</button>
              <button type="button" disabled={pending} onClick={performDelete} style={btnDanger}>
                {pending ? "Удаляем…" : "Удалить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const th: React.CSSProperties = { padding: "12px 16px", fontWeight: 600, fontSize: 12, color: "var(--hd-muted)", textTransform: "uppercase" };
const td: React.CSSProperties = { padding: "12px 16px", verticalAlign: "middle" };

const btnGhost: React.CSSProperties = {
  height: 38, padding: "0 16px", borderRadius: 999,
  border: "1px solid var(--hd-hairline)", background: "#fff",
  fontSize: 13, fontWeight: 600, cursor: "pointer",
};
const btnDanger: React.CSSProperties = {
  height: 38, padding: "0 18px", borderRadius: 999,
  border: 0, background: "#c00", color: "#fff",
  fontSize: 13, fontWeight: 600, cursor: "pointer",
};

const overlay: React.CSSProperties = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
  display: "grid", placeItems: "center", zIndex: 1000, padding: 20,
};
const dialog: React.CSSProperties = {
  width: "min(480px, 100%)", background: "#fff", borderRadius: 14, padding: 26,
  boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
};
