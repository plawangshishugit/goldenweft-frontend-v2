import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { orderId } = await req.json();

  await prisma.order.update({
    where: { id: orderId },
    data: { status: "dispatched" },
  });

  return NextResponse.json({ ok: true });
}
