// lib/db/sarees.ts
import { prisma } from "./prisma";

export type SareeRecord = {
  id: string;
  slug: string;
  name: string;
  region: string;
  imageUrl: string;
  reason: string;
  fabric: string;
  weave: string;
  feel: string;
  weight: string;
  occasions: string[];
  price: number;
};

export async function getSareeBySlug(
  slug: string
): Promise<SareeRecord | null> {
  if (!slug) return null;

  const saree = await prisma.saree.findUnique({
    where: { slug },
  });

  if (!saree) return null;

  return {
    id: saree.id,
    slug: saree.slug,
    name: saree.name,
    region: saree.region,
    imageUrl: saree.imageUrl,
    reason: saree.reason,
    fabric: saree.fabric,
    weave: saree.weave,
    feel: saree.feel,
    weight: saree.weight,
    occasions: saree.occasions,
    price: saree.price,
  };
}
