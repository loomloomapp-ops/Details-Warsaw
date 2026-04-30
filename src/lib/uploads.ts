import { promises as fs } from "fs";
import os from "os";
import path from "path";
import sharp from "sharp";

// Куда пишем загрузки. ПОСТОЯННАЯ папка вне application root —
// иначе Hostinger при деплое из git стирает её вместе с файлами.
//
// Приоритет:
// 1. ENV `UPLOADS_DIR` — если задана, используем её
// 2. ~/hd-uploads — домашняя директория юзера, переживает деплой
// 3. process.cwd()/data/uploads — fallback (локально/dev)
function resolveUploadDir(): string {
  if (process.env.UPLOADS_DIR) return process.env.UPLOADS_DIR;
  const home = os.homedir();
  if (home && home !== "/") return path.join(home, "hd-uploads");
  return path.join(process.cwd(), "data", "uploads");
}

const UPLOAD_DIR = resolveUploadDir();

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

  return `/api/uploads/${filename}`;
}

export async function deleteImage(url: string): Promise<void> {
  // Поддерживаем и старые ссылки /uploads/... (если такие были),
  // и новые /api/uploads/...
  let filename = "";
  if (url.startsWith("/api/uploads/")) filename = url.replace("/api/uploads/", "");
  else if (url.startsWith("/uploads/")) filename = url.replace("/uploads/", "");
  if (!filename) return;
  const target = path.join(UPLOAD_DIR, filename);
  try { await fs.unlink(target); } catch { /* ignore */ }
}

export function uploadDir(): string {
  return UPLOAD_DIR;
}
