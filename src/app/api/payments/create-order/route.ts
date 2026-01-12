import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { orderId, amount } = await req.json();

    if (!orderId || !amount) {
      return NextResponse.json(
        { error: "orderId or amount missing" },
        { status: 400 }
      );
    }

    const rpOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: orderId,
    });

    await prisma.order.update({
      where: { id: orderId },
      data: {
        razorpayOrderId: rpOrder.id,
        status: "created",
      },
    });

    return NextResponse.json({
      id: rpOrder.id,
      amount: rpOrder.amount,
      currency: rpOrder.currency,
      receipt: rpOrder.receipt,
    });
  } catch (error) {
    console.error("Create Razorpay order error:", error);
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
