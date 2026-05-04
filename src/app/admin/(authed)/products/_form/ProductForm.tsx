"use client";

import { useState, useTransition } from "react";

type Category = { id: number; nameRu: string };
type Image = { id: number; url: string };

type Initial = {
  id?: number;
  nameRu?: string;
  shortDescRu?: string | null;
  longDescRu?: string | null;
  nameUa?: string | null;
  shortDescUa?: string | null;
  longDescUa?: string | null;
  namePl?: string | null;
  shortDescPl?: string | null;
  longDescPl?: string | null;
  article?: string | null;
  partNumber?: string | null;
  color?: string | null;
  material?: string | null;
  make?: string | null;
  model?: string | null;
  year?: string | null;
  images?: Image[];
  categoryIds?: number[];
};

export default function ProductForm({
  initial,
  categories,
  action,
  onDelete,
  knownMakes = [],
  knownModels = [],
  knownYears = [],
  knownColors = [],
  knownMaterials = [],
}: {
  initial: Initial;
  categories: Category[];
  action: (form: FormData) => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
  knownMakes?: string[];
  knownModels?: string[];
  knownYears?: string[];
  knownColors?: string[];
  knownMaterials?: string[];
}) {
  const [tab, setTab] = useState<"ru" | "ua" | "pl">("ru");
  const [removeImageIds, setRemoveImageIds] = useState<number[]>([]);
  const [pending, start] = useTransition();
  const [delPending, startDel] = useTransition();

  return (
    <form
      action={(fd) => start(() => { action(fd); })}
      style={{ display: "grid", gap: 24 }}
      encType="multipart/form-data"
    >
      <Card title="Основное (русский)">
        <Field label="Название *">
          <input name="nameRu" required defaultValue={initial.nameRu || ""} style={inp} />
        </Field>
        <Field label="Короткое описание">
          <textarea name="shortDescRu" rows={2} defaultValue={initial.shortDescRu || ""} style={ta} />
        </Field>
        <Field label="Детальное описание">
          <textarea name="longDescRu" rows={6} defaultValue={initial.longDescRu || ""} style={ta} />
        </Field>
      </Card>

      <Card title="Переводы">
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {(["ua", "pl"] as const).map((l) => (
            <button
              type="button"
              key={l}
              onClick={() => setTab(l)}
              style={{
                padding: "6px 14px", borderRadius: 999,
                border: "1px solid var(--hd-hairline)",
                background: tab === l ? "#000" : "#fff",
                color: tab === l ? "#fff" : "#000",
                fontSize: 13, fontWeight: 500,
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ display: tab === "ua" ? "block" : "none" }}>
          <Field label="Назва (UA)">
            <input name="nameUa" defaultValue={initial.nameUa || ""} style={inp} />
          </Field>
          <Field label="Короткий опис (UA)">
            <textarea name="shortDescUa" rows={2} defaultValue={initial.shortDescUa || ""} style={ta} />
          </Field>
          <Field label="Детальний опис (UA)">
            <textarea name="longDescUa" rows={6} defaultValue={initial.longDescUa || ""} style={ta} />
          </Field>
        </div>
        <div style={{ display: tab === "pl" ? "block" : "none" }}>
          <Field label="Nazwa (PL)">
            <input name="namePl" defaultValue={initial.namePl || ""} style={inp} />
          </Field>
          <Field label="Krótki opis (PL)">
            <textarea name="shortDescPl" rows={2} defaultValue={initial.shortDescPl || ""} style={ta} />
          </Field>
          <Field label="Szczegółowy opis (PL)">
            <textarea name="longDescPl" rows={6} defaultValue={initial.longDescPl || ""} style={ta} />
          </Field>
        </div>
        <p style={{ marginTop: 8, fontSize: 12, color: "var(--hd-subtle)" }}>
          Если перевод не заполнен — на сайте будет показан русский вариант.
        </p>
      </Card>

      <Card title="Технические поля">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Артикул">
            <input name="article" defaultValue={initial.article || ""} style={inp} />
          </Field>
          <Field label="Номер детали">
            <input name="partNumber" defaultValue={initial.partNumber || ""} style={inp} />
          </Field>
          <Field label="Цвет (можно выбрать или ввести новое)">
            <input name="color" defaultValue={initial.color || ""} style={inp} list="dl-color" autoComplete="off" />
            <datalist id="dl-color">{knownColors.map((v) => <option key={v} value={v} />)}</datalist>
          </Field>
          <Field label="Материал (можно выбрать или ввести новое)">
            <input name="material" defaultValue={initial.material || ""} style={inp} list="dl-material" autoComplete="off" />
            <datalist id="dl-material">{knownMaterials.map((v) => <option key={v} value={v} />)}</datalist>
          </Field>
        </div>
      </Card>

      <Card title="Совместимость авто (для фильтров каталога)">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <Field label="Марка авто (выберите из списка или введите новую)">
            <input
              name="make"
              defaultValue={initial.make || ""}
              style={inp}
              placeholder="Toyota"
              list="dl-make"
              autoComplete="off"
            />
            <datalist id="dl-make">{knownMakes.map((v) => <option key={v} value={v} />)}</datalist>
          </Field>
          <Field label="Модель (выберите из списка или введите новую)">
            <input
              name="model"
              defaultValue={initial.model || ""}
              style={inp}
              placeholder="Prius 30"
              list="dl-model"
              autoComplete="off"
            />
            <datalist id="dl-model">{knownModels.map((v) => <option key={v} value={v} />)}</datalist>
          </Field>
          <Field label="Год (выберите или введите новый диапазон)">
            <input
              name="year"
              defaultValue={initial.year || ""}
              style={inp}
              placeholder="2009-2015"
              list="dl-year"
              autoComplete="off"
            />
            <datalist id="dl-year">{knownYears.map((v) => <option key={v} value={v} />)}</datalist>
          </Field>
        </div>
        <p style={{ marginTop: 4, fontSize: 12, color: "var(--hd-subtle)" }}>
          По этим полям работают выпадающие фильтры в каталоге. Можно выбрать ранее использованное значение из списка или ввести новое — оно сразу появится в подсказках для следующих товаров.
        </p>
      </Card>

      <Card title="Категории">
        {categories.length === 0 ? (
          <p style={{ color: "var(--hd-muted)", fontSize: 14, margin: 0 }}>
            Категорий пока нет. Создайте их в разделе «Категории».
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {categories.map((c) => (
              <label key={c.id} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 12px", border: "1px solid var(--hd-hairline)", borderRadius: 8,
                cursor: "pointer", fontSize: 14,
              }}>
                <input
                  type="checkbox"
                  name="categoryIds"
                  value={c.id}
                  defaultChecked={initial.categoryIds?.includes(c.id)}
                />
                {c.nameRu}
              </label>
            ))}
          </div>
        )}
      </Card>

      <Card title="Фото">
        {initial.images && initial.images.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            {initial.images.map((img) => {
              const isRemoved = removeImageIds.includes(img.id);
              return (
                <div key={img.id} style={{ position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt=""
                    style={{
                      width: 100, height: 100, objectFit: "cover", borderRadius: 8,
                      opacity: isRemoved ? 0.3 : 1,
                    }}
                  />
                  {isRemoved && <input type="hidden" name="removeImageIds" value={img.id} />}
                  <button
                    type="button"
                    onClick={() =>
                      setRemoveImageIds((prev) =>
                        prev.includes(img.id) ? prev.filter((x) => x !== img.id) : [...prev, img.id]
                      )
                    }
                    style={{
                      position: "absolute", top: 4, right: 4,
                      width: 24, height: 24, borderRadius: 999, border: 0,
                      background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: 12,
                    }}
                  >
                    {isRemoved ? "↺" : "×"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <input type="file" name="images" accept="image/*" multiple style={{ fontSize: 14 }} />
        <p style={{ marginTop: 8, fontSize: 12, color: "var(--hd-subtle)" }}>
          Можно загрузить несколько изображений сразу. Они будут оптимизированы автоматически.
        </p>
      </Card>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8 }}>
        {onDelete ? (
          <button
            type="button"
            onClick={() => {
              if (confirm("Удалить товар безвозвратно?")) startDel(() => { onDelete(); });
            }}
            disabled={delPending}
            style={{
              height: 42, padding: "0 18px", borderRadius: 999,
              border: "1px solid #c00", background: "#fff", color: "#c00",
              fontWeight: 600, fontSize: 14,
            }}
          >
            {delPending ? "Удаляем…" : "Удалить товар"}
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

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 24 }}>
      <h2 style={{ fontSize: 14, fontWeight: 700, margin: 0, marginBottom: 16, textTransform: "uppercase", color: "var(--hd-muted)", letterSpacing: 0.5 }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{label}</div>
      {children}
    </label>
  );
}

const inp: React.CSSProperties = {
  width: "100%", height: 40, padding: "0 12px",
  border: "1px solid var(--hd-hairline)", borderRadius: 8,
  fontSize: 14, fontFamily: "inherit", background: "#fff",
};
const ta: React.CSSProperties = {
  width: "100%", padding: 12,
  border: "1px solid var(--hd-hairline)", borderRadius: 8,
  fontSize: 14, fontFamily: "inherit", background: "#fff",
  resize: "vertical",
};
