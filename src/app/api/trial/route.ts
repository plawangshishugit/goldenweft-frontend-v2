// app/api/trial/route.ts
import { NextResponse } from "next/server";
import { extractFeaturesFromImage } from "../../../lib/trial/extractFeatures";

export const runtime = "nodejs"; // required for native OpenCV

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    // Basic validation (size & type)
    const MAX_MB = 5;
    if (file.size > MAX_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image exceeds 5MB limit" },
        { status: 400 }
      );
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG or PNG images are allowed" },
        { status: 400 }
      );
    }

    // Read image into memory (no disk write)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract ethical features only
    const features = await extractFeaturesFromImage(buffer);

    // IMPORTANT: No image persistence. Buffer goes out of scope here.
    return NextResponse.json(
      {
        features,
        note: "Image processed briefly and not stored",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Trial processing error:", error);
    return NextResponse.json(
      { error: "Unable to process image at the moment" },
      { status: 500 }
    );
  }
}
