import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

const execAsync = promisify(exec);

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");

  // Защита: токен берётся из NEXTAUTH_SECRET
  if (!process.env.NEXTAUTH_SECRET || secret !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const log: string[] = [];

  // 1. Создать/обновить таблицы — вызываем prisma CLI напрямую через node
  try {
    const prismaCli = path.join(process.cwd(), "node_modules", "prisma", "build", "index.js");
    const { stdout, stderr } = await execAsync(
      `"${process.execPath}" "${prismaCli}" db push --skip-generate --accept-data-loss`,
      { env: process.env, cwd: process.cwd(), maxBuffer: 10 * 1024 * 1024 }
    );
    log.push("✓ prisma db push OK");
    if (stdout) log.push(stdout.trim());
    if (stderr) log.push(stderr.trim());
  } catch (e: any) {
    return NextResponse.json(
      { error: "db push failed", message: e?.message, stderr: e?.stderr, stdout: e?.stdout, log },
      { status: 500 }
    );
  }

  // 2. Создать первого админа (если ещё нет)
  try {
    const login = process.env.ADMIN_LOGIN || "adminwar";
    const password = process.env.ADMIN_PASSWORD || "x1311973X!";
    const existing = await prisma.admin.findUnique({ where: { login } });
    if (existing) {
      log.push(`Admin "${login}" already exists`);
    } else {
      const hash = await bcrypt.hash(password, 10);
      await prisma.admin.create({ data: { login, password: hash } });
      log.push(`✓ Admin "${login}" created`);
    }
  } catch (e: any) {
    return NextResponse.json(
      { error: "seed failed", message: e?.message, log },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, log });
}
