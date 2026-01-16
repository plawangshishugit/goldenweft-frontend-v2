import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🔥 create-order body:", body);

    const { orderId, amount } = body;

    if (!orderId || !amount) {
      console.error("❌ Missing orderId or amount");
      return NextResponse.json(
        { error: "orderId or amount missing" },
        { status: 400 }
      );
    }
console.log("🔥 create-order body:", { orderId, amount });

    // 🔹 Create Razorpay order
    const rpOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: orderId,
    });

    console.log("✅ Razorpay order created:", rpOrder.id);

    // 🔹 SAVE razorpayOrderId
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        razorpayOrderId: rpOrder.id,
      },
    });

    console.log("✅ Order updated in DB:", updated.id);
console.log("✅ Order updated with razorpayOrderId:", orderId);

    return NextResponse.json({
      id: rpOrder.id,
      amount: rpOrder.amount,
      currency: rpOrder.currency,
    });

  } catch (err) {
    console.error("🔥 create-order ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
