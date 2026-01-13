import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const saree = await prisma.saree.findUnique({
    where: { id: body.sareeId },
  });

  if (!saree || !saree.isActive || saree.stock < body.quantity) {
    return NextResponse.json({ error: "Saree unavailable" }, { status: 400 });
  }

  const order = await prisma.order.create({
    data: {
      sareeId: saree.id,
      sareeSlug: saree.slug,
      sareeName: saree.name,
      quantity: body.quantity,
      amount: saree.price * body.quantity,
      customerName: body.customerName,
      phone: body.phone,
      address: body.address,
      status: "created",
    },
  });

  return NextResponse.json(order);
}
