"use client";

import { useState, useTransition } from "react";

type Initial = {
  id?: number;
  nameRu?: string;
  nameUa?: string | null;
  namePl?: string | null;
  slug?: string;
  sortOrder?: number;
  imageUrl?: string | null;
};

export default function CategoryForm({
  initial,
  action,
  onDelete,
  productCount,
}: {
  initial: Initial;
  action: (form: FormData) => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
  productCount?: number;
}) {
  const [pending, start] = useTransition();
  const [delPending, startDel] = useTransition();
  const [removeImage, setRemoveImage] = useState(false);
  const isEdit = typeof initial.id === "number";

  return (
    <form
      action={(fd) => start(() => { action(fd); })}
      style={{ display: "grid", gap: 16, maxWidth: 640 }}
      encType="multipart/form-data"
    >
      <div style={{ background: "#fff", borderRadius: 12, padding: 24 }}>
        <Field label="Название (RU) *">
          <input name="nameRu" required defaultValue={initial.nameRu || ""} style={inp} />
        </Field>
        <Field label="Назва (UA)">
          <input name="nameUa" defaultValue={initial.nameUa || ""} style={inp} />
        </Field>
        <Field label="Nazwa (PL)">
          <input name="namePl" defaultValue={initial.namePl || ""} style={inp} />
        </Field>

        {!isEdit && (
          <Field label="Slug (необязательно — будет создан автоматически)">
            <input name="slug" defaultValue={initial.slug || ""} style={inp} placeholder="напр. bumpers" />
          </Field>
        )}

        <Field label="Порядок сортировки">
          <input name="sortOrder" type="number" defaultValue={initial.sortOrder ?? 0} style={{ ...inp, width: 120 }} />
        </Field>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: 24 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: 0, marginBottom: 16, textTransform: "uppercase", color: "var(--hd-muted)", letterSpacing: 0.5 }}>
          Фото категории
        </h2>
        {initial.imageUrl && !removeImage && (
          <div style={{ marginBottom: 16, position: "relative", display: "inline-block" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={initial.imageUrl} alt="" style={{
              width: 140, height: 140, objectFit: "cover", borderRadius: 8,
              border: "1px solid var(--hd-hairline)",
            }} />
            <button
              type="button"
              onClick={() => setRemoveImage(true)}
              style={{
                position: "absolute", top: 6, right: 6,
                width: 24, height: 24, borderRadius: 999, border: 0,
                background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: 12,
              }}
            >×</button>
          </div>
        )}
        {removeImage && <input type="hidden" name="removeImage" value="1" />}
        <input type="file" name="image" accept="image/*" style={{ fontSize: 14 }} />
        <p style={{ marginTop: 8, fontSize: 12, color: "var(--hd-subtle)" }}>
          Если загрузить новое — заменит текущее. Без фото покажется бампер по умолчанию.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {onDelete ? (
          <button
            type="button"
            disabled={delPending}
            onClick={() => {
              if (productCount && productCount > 0) {
                if (!confirm(`В категории ${productCount} товар(ов). Они потеряют связь с этой категорией. Продолжить?`)) return;
              } else if (!confirm("Удалить категорию?")) return;
              startDel(() => { onDelete(); });
            }}
            style={{
              height: 42, padding: "0 18px", borderRadius: 999,
              border: "1px solid #c00", background: "#fff", color: "#c00",
              fontWeight: 600, fontSize: 14,
            }}
          >
            {delPending ? "Удаляем…" : "Удалить"}
          </button>
        ) : <div />}
        <button type="submit" disabled={pending} style={{
          height: 44, padding: "0 24px", borderRadius: 999,
          background: "var(--hd-green)", color: "#fff", border: 0,
          fontWeight: 600, fontSize: 14, opacity: pending ? 0.7 : 1,
        }}>
          {pending ? "Сохраняем…" : "Сохранить"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{label}</div>
      {children}
    </label>
  );
}

const inp: React.CSSProperties = {
  width: "100%", height: 40, padding: "0 12px",
  border: "1px solid var(--hd-hairline)", borderRadius: 8,
  fontSize: 14, fontFamily: "inherit",
};
