import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  console.log("🔥 WEBHOOK HIT");
  console.log("🔥 RAW BODY:", body);
  console.log("🔥 SIGNATURE:", signature);

  if (!signature) {
    console.error("❌ Missing signature");
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (expected !== signature) {
    console.error("❌ Signature mismatch");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);
  console.log("🔥 Razorpay webhook event:", event.event);

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    console.log("💰 Payment captured:", payment.id);

    const order = await prisma.order.findFirst({
      where: { razorpayOrderId: payment.order_id },
    });

    if (!order) {
      console.error("❌ Order not found for Razorpay order:", payment.order_id);
      return NextResponse.json({ status: "ignored" });
    }

    if (order.status === "paid") {
      console.log("ℹ️ Order already paid:", order.id);
      return NextResponse.json({ status: "duplicate" });
    }

    await prisma.$transaction([
      prisma.order.update({
        where: { id: order.id },
        data: {
          status: "paid",
          razorpayPaymentId: payment.id,
        },
      }),

      prisma.saree.update({
        where: { slug: order.sareeSlug },
        data: { stock: { decrement: 1 } },
      }),
    ]);

    console.log("✅ ORDER MARKED PAID:", order.id);
  }

  return NextResponse.json({ status: "ok" });
}
