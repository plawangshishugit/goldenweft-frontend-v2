import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const archetypes = await prisma.drapeArchetype.findMany({
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(archetypes);
}
