import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;

  const images = await prisma.sareeImage.findMany({
    where: { sareeId: id },
    orderBy: { position: "asc" },
  });

  return NextResponse.json(images);
}

export async function POST(req: Request, { params }: Params) {
  const { id } = await params;
  const { imageUrl, position } = await req.json();

  if (!imageUrl) {
    return NextResponse.json(
      { error: "imageUrl required" },
      { status: 400 }
    );
  }

  const image = await prisma.sareeImage.create({
    data: {
      sareeId: id,
      imageUrl,
      position: position ?? 0,
    },
  });

  return NextResponse.json(image);
}

export async function PUT(req: Request, { params }: Params) {
  const { imageId, position } = await req.json();

  if (!imageId || typeof position !== "number") {
    return NextResponse.json(
      { error: "imageId and position required" },
      { status: 400 }
    );
  }

  await prisma.sareeImage.update({
    where: { id: imageId },
    data: { position },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: Params) {
  const { imageId } = await req.json();

  await prisma.sareeImage.delete({
    where: { id: imageId },
  });

  return NextResponse.json({ success: true });
}
