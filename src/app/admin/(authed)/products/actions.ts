"use server";

import { prisma } from "@/lib/db";
import { saveImage, deleteImage } from "@/lib/uploads";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function requireAuth() {
  const s = await getServerSession(authOptions);
  if (!s) throw new Error("Unauthorized");
}

function str(form: FormData, key: string): string | null {
  const v = form.get(key);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t === "" ? null : t;
}

function strRequired(form: FormData, key: string): string {
  const v = str(form, key);
  if (!v) throw new Error(`Поле "${key}" обязательно`);
  return v;
}

function categoryIds(form: FormData): number[] {
  return form.getAll("categoryIds").map((v) => Number(v)).filter((n) => Number.isFinite(n));
}

export async function createProduct(form: FormData) {
  await requireAuth();

  const data = {
    nameRu: strRequired(form, "nameRu"),
    shortDescRu: str(form, "shortDescRu"),
    longDescRu: str(form, "longDescRu"),
    nameUa: str(form, "nameUa"),
    shortDescUa: str(form, "shortDescUa"),
    longDescUa: str(form, "longDescUa"),
    namePl: str(form, "namePl"),
    shortDescPl: str(form, "shortDescPl"),
    longDescPl: str(form, "longDescPl"),
    article: str(form, "article"),
    partNumber: str(form, "partNumber"),
    color: str(form, "color"),
    material: str(form, "material"),
    make: str(form, "make"),
    model: str(form, "model"),
    year: str(form, "year"),
  };

  const cats = categoryIds(form);

  const files = form.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  const imageUrls: string[] = [];
  for (const f of files) imageUrls.push(await saveImage(f));

  const product = await prisma.product.create({
    data: {
      ...data,
      categories: cats.length ? { create: cats.map((id) => ({ categoryId: id })) } : undefined,
      images: imageUrls.length
        ? { create: imageUrls.map((url, i) => ({ url, sortOrder: i })) }
        : undefined,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  redirect(`/admin/products/${product.id}`);
}

export async function updateProduct(id: number, form: FormData) {
  await requireAuth();

  const data = {
    nameRu: strRequired(form, "nameRu"),
    shortDescRu: str(form, "shortDescRu"),
    longDescRu: str(form, "longDescRu"),
    nameUa: str(form, "nameUa"),
    shortDescUa: str(form, "shortDescUa"),
    longDescUa: str(form, "longDescUa"),
    namePl: str(form, "namePl"),
    shortDescPl: str(form, "shortDescPl"),
    longDescPl: str(form, "longDescPl"),
    article: str(form, "article"),
    partNumber: str(form, "partNumber"),
    color: str(form, "color"),
    material: str(form, "material"),
    make: str(form, "make"),
    model: str(form, "model"),
    year: str(form, "year"),
  };

  const cats = categoryIds(form);

  const files = form.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  const newImageUrls: string[] = [];
  for (const f of files) newImageUrls.push(await saveImage(f));

  const removeImageIds = form.getAll("removeImageIds")
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n));

  await prisma.$transaction(async (tx) => {
    await tx.product.update({ where: { id }, data });

    // categories: replace all
    await tx.productCategory.deleteMany({ where: { productId: id } });
    if (cats.length) {
      await tx.productCategory.createMany({
        data: cats.map((categoryId) => ({ productId: id, categoryId })),
      });
    }

    if (removeImageIds.length) {
      const toRemove = await tx.productImage.findMany({
        where: { id: { in: removeImageIds }, productId: id },
      });
      await tx.productImage.deleteMany({ where: { id: { in: removeImageIds }, productId: id } });
      for (const img of toRemove) await deleteImage(img.url);
    }

    if (newImageUrls.length) {
      const max = await tx.productImage.aggregate({
        where: { productId: id }, _max: { sortOrder: true },
      });
      const start = (max._max.sortOrder ?? -1) + 1;
      await tx.productImage.createMany({
        data: newImageUrls.map((url, i) => ({ productId: id, url, sortOrder: start + i })),
      });
    }
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
  revalidatePath("/catalog");
  revalidatePath(`/catalog/${id}`);
  redirect(`/admin/products/${id}`);
}

export async function deleteProduct(id: number) {
  await requireAuth();
  const images = await prisma.productImage.findMany({ where: { productId: id } });
  await prisma.product.delete({ where: { id } });
  for (const img of images) await deleteImage(img.url);
  revalidatePath("/admin/products");
  revalidatePath("/catalog");
  redirect("/admin/products");
}

export async function deleteProductInline(id: number) {
  await requireAuth();
  const images = await prisma.productImage.findMany({ where: { productId: id } });
  await prisma.product.delete({ where: { id } });
  for (const img of images) await deleteImage(img.url);
  revalidatePath("/admin/products");
  revalidatePath("/catalog");
}

export async function deleteProducts(ids: number[]) {
  await requireAuth();
  const safeIds = ids.map((n) => Number(n)).filter((n) => Number.isFinite(n));
  if (safeIds.length === 0) return;
  const images = await prisma.productImage.findMany({ where: { productId: { in: safeIds } } });
  await prisma.product.deleteMany({ where: { id: { in: safeIds } } });
  for (const img of images) await deleteImage(img.url);
  revalidatePath("/admin/products");
  revalidatePath("/catalog");
}
