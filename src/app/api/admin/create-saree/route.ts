import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  await prisma.saree.create({
    data: {
      ...data,
      imageUrl: "/placeholder.jpg",
      heroImage: "/placeholder.jpg",
      baseReason: "",
      reason: "",
      fabric: "",
      weave: "",
      feel: "",
      weight: "",
      occasions: [],
      borderWeight: "",
      drape: "",
      colorTone: "",
    },
  });

  return NextResponse.json({ ok: true });
}
