import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { uploadDir } from "@/lib/uploads";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { name: string } }) {
  const name = params.name;
  // защита от path traversal
  if (!name || name.includes("/") || name.includes("..") || name.includes("\\")) {
    return new NextResponse("not found", { status: 404 });
  }

  const target = path.join(uploadDir(), name);
  let file: Buffer;
  try {
    file = await fs.readFile(target);
  } catch {
    return new NextResponse("not found", { status: 404 });
  }

  const ext = path.extname(name).toLowerCase();
  const type =
    ext === ".webp" ? "image/webp" :
    ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" :
    ext === ".png" ? "image/png" :
    ext === ".gif" ? "image/gif" :
    "application/octet-stream";

  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
