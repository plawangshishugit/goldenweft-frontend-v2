import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone } = await req.json();

  const order = await prisma.order.findFirst({
    where: { phone },
    orderBy: { createdAt: "desc" },
  });

  if (!order) {
    return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.json({
    sareeName: order.sareeName,
    status: order.status,
  });
}
