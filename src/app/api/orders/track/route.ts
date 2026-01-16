import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, phone } = body;

    console.log("📦 TRACK REQUEST:", body);

    // 1️⃣ Internal tracking (success page polling)
    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(order);
    }

    // 2️⃣ Public tracking (by phone)
    if (phone) {
      const FIFTEEN_DAYS_AGO = new Date();
      FIFTEEN_DAYS_AGO.setDate(FIFTEEN_DAYS_AGO.getDate() - 15);

      const orders = await prisma.order.findMany({
        where: {
          phone,
          OR: [
            {
              status: {
                in: ["created", "paid", "dispatched"], // ✅ VALID ENUMS ONLY
              },
            },
            {
              AND: [
                { status: "delivered" },
                { updatedAt: { gte: FIFTEEN_DAYS_AGO } },
              ],
            },
          ],
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({ orders });
    }

    return NextResponse.json(
      { error: "orderId or phone required" },
      { status: 400 }
    );
  } catch (err) {
    console.error("❌ TRACK ORDER ERROR:", err);
    return NextResponse.json(
      { error: "Failed to track order" },
      { status: 500 }
    );
  }
}
