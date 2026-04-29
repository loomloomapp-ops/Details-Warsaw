"use client";

import { useTransition } from "react";

type Initial = {
  id?: number;
  nameRu?: string;
  nameUa?: string | null;
  namePl?: string | null;
  slug?: string;
  sortOrder?: number;
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
  const isEdit = typeof initial.id === "number";

  return (
    <form action={(fd) => start(() => { action(fd); })} style={{ display: "grid", gap: 16, maxWidth: 640 }}>
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
