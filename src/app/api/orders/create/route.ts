import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "").slice(-10);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { saree, customer } = body;

    // 🔒 HARD VALIDATION
    if (
      !saree?.slug ||
      !saree?.name ||
      !saree?.price ||
      !customer?.name ||
      !customer?.phone ||
      !customer?.address
    ) {
      return NextResponse.json(
        { error: "Invalid order payload" },
        { status: 400 }
      );
    }

    // 🔎 Fetch saree (single source of truth)
    const dbSaree = await prisma.saree.findUnique({
      where: { slug: saree.slug },
    });

    if (!dbSaree || !dbSaree.isActive || dbSaree.stock <= 0) {
      return NextResponse.json(
        { error: "Saree unavailable" },
        { status: 400 }
      );
    }

    // 🧾 Create order
    const order = await prisma.order.create({
      data: {
        sareeId: dbSaree.id,
        sareeSlug: dbSaree.slug,
        sareeName: dbSaree.name,
        amount: dbSaree.price,

        customerName: customer.name,
        phone: normalizePhone(customer.phone),
        address: customer.address,

        status: "created",
      },
    });
    console.log("📦 CREATE ORDER REQUEST");
console.log("Incoming saree:", saree);
console.log("Incoming customer:", customer);
console.log("✅ Order created:", order.id);
    return NextResponse.json(order);
  } catch (err) {
    console.error("Order create error:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
