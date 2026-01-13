// lib/db/sarees.ts
import { prisma } from "./prisma";

export type SareeRecord = {
  id: string;
  slug: string;
  name: string;
  region: string;

  imageUrl: string;
  heroImage: string;

  reason: string;
  baseReason: string;

  fabric: string;
  weave: string;
  feel: string;
  weight: string;
  occasions: string[];

  price: number;

  // 👇 INVENTORY & CONTROL (CRITICAL)
  stock: number;
  isActive: boolean;
};

export async function getSareeBySlug(
  slug: string
): Promise<SareeRecord | null> {
  if (!slug) return null;

  const saree = await prisma.saree.findFirst({
    where: {
      slug,
      isActive: true,
    },
  });

  if (!saree) return null;

  return {
    id: saree.id,
    slug: saree.slug,
    name: saree.name,
    region: saree.region,

    imageUrl: saree.imageUrl,
    heroImage: saree.heroImage,

    reason: saree.reason,
    baseReason: saree.baseReason,

    fabric: saree.fabric,
    weave: saree.weave,
    feel: saree.feel,
    weight: saree.weight,
    occasions: saree.occasions,

    price: saree.price,

    // 👇 REQUIRED FOR FRONTEND GUARDS
    stock: saree.stock,
    isActive: saree.isActive,
  };
}
