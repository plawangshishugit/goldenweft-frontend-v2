import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { sareeId } = body;

if (!sareeId) {
  return NextResponse.json(
    { error: "Missing sareeId" },
    { status: 400 }
  );
}

  const saree = await prisma.saree.findUnique({
    where: { id: sareeId },
  });

  if (!saree) {
    return NextResponse.json(
      { error: "Saree not found" },
      { status: 404 }
    );
  }

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
