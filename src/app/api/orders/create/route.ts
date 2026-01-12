import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const order = await prisma.order.create({
    data: {
      sareeSlug: body.saree.slug,
      sareeName: body.saree.name,
      amount: body.saree.price,

      customerName: body.customer.name,
      phone: body.customer.phone,
      address: body.customer.address,

      status: "created",
    },
  });

  return NextResponse.json(order);
}
