import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const login = process.env.ADMIN_LOGIN || "adminwar";
  const password = process.env.ADMIN_PASSWORD || "x1311973X!";

  const existing = await prisma.admin.findUnique({ where: { login } });
  if (existing) {
    console.log(`Admin "${login}" already exists, skipping.`);
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  await prisma.admin.create({ data: { login, password: hash } });
  console.log(`Admin "${login}" created.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
