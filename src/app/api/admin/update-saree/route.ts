import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { sareeId, stock, isActive } = await req.json();

  if (!sareeId) {
    return NextResponse.json({ error: "Missing sareeId" }, { status: 400 });
  }

  await prisma.saree.update({
    where: { id: sareeId },
    data: {
      stock,
      isActive,
    },
  });

  return NextResponse.json({ ok: true });
}
