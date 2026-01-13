import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { id, ...update } = data;

  await prisma.saree.update({
    where: { id },
    data: update,
  });

  return NextResponse.json({ ok: true });
}
