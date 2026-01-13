import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  // 1️⃣ Read raw body
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing signature" },
      { status: 400 }
    );
  }

  // 2️⃣ Verify signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // 3️⃣ Parse event
  const event = JSON.parse(body);

  // 4️⃣ Handle payment success
  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    const razorpayOrderId = payment.order_id;

    // 5️⃣ Fetch order (IDEMPOTENCY CHECK)
    const order = await prisma.order.findUnique({
      where: { razorpayOrderId },
    });

    if (!order || order.status === "paid") {
      // Prevent double processing
      return NextResponse.json({ status: "ignored" });
    }

    // 6️⃣ Atomic transaction (ORDER + INVENTORY)
    await prisma.$transaction([
      prisma.order.update({
        where: { id: order.id },
        data: {
          status: "paid",
          razorpayPaymentId: payment.id,
        },
      }),

      prisma.saree.update({
        where: { id: order.sareeId },
        data: {
          stock: {
            decrement: order.quantity,
          },
        },
      }),
    ]);
  }

  return NextResponse.json({ status: "ok" });
}
