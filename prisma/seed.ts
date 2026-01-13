import { prisma } from "../src/lib/prisma";

async function seedDrapeArchetypes() {
  const archetypes = [
    {
      key: "soft-flowing",
      title: "Soft & Flowing",
      description:
        "Falls gently with ease, allowing the saree to move naturally and feel breathable across long rituals and gatherings.",
      imageUrl: "/drape/soft-flowing.jpg",
    },
    {
      key: "structured-poised",
      title: "Structured & Poised",
      description:
        "Holds its form with clarity, creating a composed and dignified presence suited for ceremonial moments.",
      imageUrl: "/drape/structured-poised.jpg",
    },
    {
      key: "pallu-forward",
      title: "Pallu-Forward Grace",
      description:
        "Places visual emphasis on the pallu, letting its weave and detail carry the story while the rest remains understated.",
      imageUrl: "/drape/pallu-forward.jpg",
    },
    {
      key: "minimal-balanced",
      title: "Minimal & Balanced",
      description:
        "Keeps every element subtle and in proportion, creating a quiet, modern balance that adapts across occasions.",
      imageUrl: "/drape/minimal-balanced.jpg",
    },
  ];

  for (const a of archetypes) {
    await prisma.drapeArchetype.upsert({
      where: { key: a.key },
      update: a,
      create: a,
    });
  }

  console.log("✅ Drape archetypes seeded");
}

async function main() {
  await seedDrapeArchetypes();
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
