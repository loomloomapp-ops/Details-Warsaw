import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function ensureUploadDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

export async function saveImage(file: File): Promise<string> {
  await ensureUploadDir();
  const buf = Buffer.from(await file.arrayBuffer());

  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const filename = `${id}.webp`;
  const out = path.join(UPLOAD_DIR, filename);

  await sharp(buf)
    .rotate()
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);

  return `/uploads/${filename}`;
}

export async function deleteImage(url: string): Promise<void> {
  if (!url.startsWith("/uploads/")) return;
  const filename = url.replace("/uploads/", "");
  const target = path.join(UPLOAD_DIR, filename);
  try {
    await fs.unlink(target);
  } catch {
    /* ignore */
  }
}
