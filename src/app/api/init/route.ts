import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SQL_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS \`Admin\` (
    \`id\` INT NOT NULL AUTO_INCREMENT,
    \`login\` VARCHAR(191) NOT NULL,
    \`password\` VARCHAR(191) NOT NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX \`Admin_login_key\`(\`login\`),
    PRIMARY KEY (\`id\`)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`Category\` (
    \`id\` INT NOT NULL AUTO_INCREMENT,
    \`slug\` VARCHAR(191) NOT NULL,
    \`nameRu\` VARCHAR(191) NOT NULL,
    \`nameUa\` VARCHAR(191) NULL,
    \`namePl\` VARCHAR(191) NULL,
    \`sortOrder\` INT NOT NULL DEFAULT 0,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX \`Category_slug_key\`(\`slug\`),
    PRIMARY KEY (\`id\`)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`Product\` (
    \`id\` INT NOT NULL AUTO_INCREMENT,
    \`nameRu\` VARCHAR(191) NOT NULL,
    \`shortDescRu\` TEXT NULL,
    \`longDescRu\` TEXT NULL,
    \`nameUa\` VARCHAR(191) NULL,
    \`shortDescUa\` TEXT NULL,
    \`longDescUa\` TEXT NULL,
    \`namePl\` VARCHAR(191) NULL,
    \`shortDescPl\` TEXT NULL,
    \`longDescPl\` TEXT NULL,
    \`article\` VARCHAR(191) NULL,
    \`partNumber\` VARCHAR(191) NULL,
    \`color\` VARCHAR(191) NULL,
    \`material\` VARCHAR(191) NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL,
    INDEX \`Product_nameRu_idx\`(\`nameRu\`),
    INDEX \`Product_article_idx\`(\`article\`),
    INDEX \`Product_partNumber_idx\`(\`partNumber\`),
    PRIMARY KEY (\`id\`)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`ProductImage\` (
    \`id\` INT NOT NULL AUTO_INCREMENT,
    \`productId\` INT NOT NULL,
    \`url\` VARCHAR(191) NOT NULL,
    \`sortOrder\` INT NOT NULL DEFAULT 0,
    INDEX \`ProductImage_productId_idx\`(\`productId\`),
    PRIMARY KEY (\`id\`),
    CONSTRAINT \`ProductImage_productId_fkey\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`ProductCategory\` (
    \`productId\` INT NOT NULL,
    \`categoryId\` INT NOT NULL,
    INDEX \`ProductCategory_categoryId_idx\`(\`categoryId\`),
    PRIMARY KEY (\`productId\`, \`categoryId\`),
    CONSTRAINT \`ProductCategory_productId_fkey\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT \`ProductCategory_categoryId_fkey\` FOREIGN KEY (\`categoryId\`) REFERENCES \`Category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");

  if (!process.env.NEXTAUTH_SECRET || secret !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const log: string[] = [];

  // 1. Создать таблицы (raw SQL — без child_process)
  for (const sql of SQL_STATEMENTS) {
    try {
      await prisma.$executeRawUnsafe(sql);
      const match = sql.match(/CREATE TABLE IF NOT EXISTS `(\w+)`/);
      log.push(`✓ table ${match?.[1] || "?"} OK`);
    } catch (e: any) {
      return NextResponse.json(
        { error: "table create failed", message: e?.message, sql: sql.slice(0, 80), log },
        { status: 500 }
      );
    }
  }

  // 2. Создать админа
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
