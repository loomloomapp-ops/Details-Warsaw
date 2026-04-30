import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "").trim();
  if (!q) return NextResponse.json({ items: [] });

  const items = await prisma.product.findMany({
    where: {
      OR: [
        { nameRu: { contains: q } },
        { nameUa: { contains: q } },
        { namePl: { contains: q } },
        { article: { contains: q } },
        { partNumber: { contains: q } },
      ],
    },
    take: 6,
    orderBy: { createdAt: "desc" },
    include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
  });

  return NextResponse.json({
    items: items.map((p) => ({
      id: p.id,
      nameRu: p.nameRu,
      nameUa: p.nameUa,
      namePl: p.namePl,
      partNumber: p.partNumber,
      article: p.article,
      image: p.images[0]?.url ?? null,
    })),
  });
}
