// app/api/sarees/[slug]/route.ts
import { NextResponse } from "next/server";
import { getSareeBySlug } from "../../../../lib/db/sarees";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: "Saree slug is required" },
        { status: 400 }
      );
    }

    const saree = await getSareeBySlug(slug);

    if (!saree) {
      return NextResponse.json(
        { error: "Saree not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(saree, { status: 200 });
  } catch (error) {
    console.error("Error fetching saree:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
