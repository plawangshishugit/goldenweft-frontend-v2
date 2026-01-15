import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  // ✅ unwrap params (REQUIRED in Next.js 15+)
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json(
      { error: "Saree slug is required" },
      { status: 400 }
    );
  }

  const saree = await prisma.saree.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { position: "asc" },
      },
    },
  });

  if (!saree) {
    return NextResponse.json(
      { error: "Saree not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(saree);
}
