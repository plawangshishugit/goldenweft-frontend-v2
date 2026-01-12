// src/app/api/sarees/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sarees = await prisma.saree.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(sarees);
  } catch (error) {
    console.error("Error fetching sarees:", error);
    return NextResponse.json(
      { error: "Failed to fetch sarees" },
      { status: 500 }
    );
  }
}
