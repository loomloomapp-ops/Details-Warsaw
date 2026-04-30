"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { slugify } from "@/lib/i18n";
import { saveImage, deleteImage } from "@/lib/uploads";

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

async function handleImage(form: FormData, prevUrl: string | null): Promise<string | null> {
  const remove = form.get("removeImage") === "1";
  const file = form.get("image");
  if (file instanceof File && file.size > 0) {
    const newUrl = await saveImage(file);
    if (prevUrl) await deleteImage(prevUrl);
    return newUrl;
  }
  if (remove && prevUrl) {
    await deleteImage(prevUrl);
    return null;
  }
  return prevUrl;
}

export async function createCategory(form: FormData) {
  await requireAuth();
  const nameRu = str(form, "nameRu");
  if (!nameRu) throw new Error("Название обязательно");
  const slugRaw = str(form, "slug") || slugify(nameRu);
  let slug = slugRaw;
  let n = 2;
  while (await prisma.category.findUnique({ where: { slug } })) {
    slug = `${slugRaw}-${n++}`;
  }
  const imageUrl = await handleImage(form, null);
  await prisma.category.create({
    data: {
      nameRu,
      nameUa: str(form, "nameUa"),
      namePl: str(form, "namePl"),
      imageUrl,
      slug,
      sortOrder: Number(str(form, "sortOrder") || "0") || 0,
    },
  });
  revalidatePath("/admin/categories");
  revalidatePath("/catalog");
  revalidatePath("/categories");
  revalidatePath("/");
  redirect("/admin/categories");
}

export async function updateCategory(id: number, form: FormData) {
  await requireAuth();
  const nameRu = str(form, "nameRu");
  if (!nameRu) throw new Error("Название обязательно");
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) throw new Error("not found");
  const imageUrl = await handleImage(form, existing.imageUrl);
  await prisma.category.update({
    where: { id },
    data: {
      nameRu,
      nameUa: str(form, "nameUa"),
      namePl: str(form, "namePl"),
      imageUrl,
      sortOrder: Number(str(form, "sortOrder") || "0") || 0,
    },
  });
  revalidatePath("/admin/categories");
  revalidatePath("/catalog");
  revalidatePath("/categories");
  revalidatePath("/");
  redirect("/admin/categories");
}

export async function deleteCategory(id: number) {
  await requireAuth();
  const cat = await prisma.category.findUnique({ where: { id } });
  await prisma.category.delete({ where: { id } });
  if (cat?.imageUrl) await deleteImage(cat.imageUrl);
  revalidatePath("/admin/categories");
  revalidatePath("/catalog");
  revalidatePath("/categories");
  revalidatePath("/");
  redirect("/admin/categories");
}
