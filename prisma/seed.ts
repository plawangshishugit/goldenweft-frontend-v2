import { PrismaClient } from "@prisma/client";
import { DUMMY_SAREES } from "../src/lib/db/seedSarees";

const prisma = new PrismaClient();

async function main() {
  for (const saree of DUMMY_SAREES) {
    await prisma.saree.upsert({
      where: { slug: saree.slug },
      update: {},
      create: saree,
    });
  }

  console.log("✅ Dummy sarees seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
