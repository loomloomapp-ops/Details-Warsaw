import { prisma } from "@/lib/db";

export async function loadKnownAttributes() {
  const [makes, models, years, colors, materials] = await Promise.all([
    prisma.product.findMany({ where: { make: { not: null } }, select: { make: true }, distinct: ["make"], orderBy: { make: "asc" } }),
    prisma.product.findMany({ where: { model: { not: null } }, select: { model: true }, distinct: ["model"], orderBy: { model: "asc" } }),
    prisma.product.findMany({ where: { year: { not: null } }, select: { year: true }, distinct: ["year"], orderBy: { year: "desc" } }),
    prisma.product.findMany({ where: { color: { not: null } }, select: { color: true }, distinct: ["color"], orderBy: { color: "asc" } }),
    prisma.product.findMany({ where: { material: { not: null } }, select: { material: true }, distinct: ["material"], orderBy: { material: "asc" } }),
  ]);
  return {
    knownMakes:     makes.map((p) => p.make!).filter(Boolean),
    knownModels:    models.map((p) => p.model!).filter(Boolean),
    knownYears:     years.map((p) => p.year!).filter(Boolean),
    knownColors:    colors.map((p) => p.color!).filter(Boolean),
    knownMaterials: materials.map((p) => p.material!).filter(Boolean),
  };
}
