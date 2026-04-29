"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { slugify } from "@/lib/i18n";

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
  await prisma.category.create({
    data: {
      nameRu,
      nameUa: str(form, "nameUa"),
      namePl: str(form, "namePl"),
      slug,
      sortOrder: Number(str(form, "sortOrder") || "0") || 0,
    },
  });
  revalidatePath("/admin/categories");
  revalidatePath("/catalog");
  redirect("/admin/categories");
}

export async function updateCategory(id: number, form: FormData) {
  await requireAuth();
  const nameRu = str(form, "nameRu");
  if (!nameRu) throw new Error("Название обязательно");
  await prisma.category.update({
    where: { id },
    data: {
      nameRu,
      nameUa: str(form, "nameUa"),
      namePl: str(form, "namePl"),
      sortOrder: Number(str(form, "sortOrder") || "0") || 0,
    },
  });
  revalidatePath("/admin/categories");
  revalidatePath("/catalog");
  redirect("/admin/categories");
}

export async function deleteCategory(id: number) {
  await requireAuth();
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/catalog");
  redirect("/admin/categories");
}
