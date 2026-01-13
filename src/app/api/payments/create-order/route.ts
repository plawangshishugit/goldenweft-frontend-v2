import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId missing" },
        { status: 400 }
      );
    }

    // 1️⃣ Fetch order from DB (SOURCE OF TRUTH)
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.status !== "created") {
      return NextResponse.json(
        { error: "Order already processed" },
        { status: 400 }
      );
    }

    // 2️⃣ Create Razorpay order (amount from DB)
    const rpOrder = await razorpay.orders.create({
      amount: order.amount * 100, // INR → paise
      currency: "INR",
      receipt: order.id,
    });

    // 3️⃣ Update DB with Razorpay order ID
    await prisma.order.update({
      where: { id: order.id },
      data: {
        razorpayOrderId: rpOrder.id,
        status: "pending",
      },
    });

    // 4️⃣ Send only required info to frontend
    return NextResponse.json({
      razorpayOrderId: rpOrder.id,
      amount: rpOrder.amount,
      currency: rpOrder.currency,
    });

  } catch (error) {
    console.error("Create Razorpay order error:", error);
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
