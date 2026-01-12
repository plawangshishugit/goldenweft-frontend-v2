// app/api/trial/session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type TrialFeatures = {
  silhouetteType: "balanced" | "vertical" | "petite";
  borderTolerance: "light" | "medium";
  colorProfile: "warm" | "neutral" | "cool";
  postureType: "upright" | "relaxed";
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { features?: TrialFeatures };

    if (!body?.features) {
      return NextResponse.json(
        { error: "Features are required" },
        { status: 400 }
      );
    }

    // ✅ cookies() is async in new App Router
    const cookieStore = await cookies();

    cookieStore.set({
      name: "gw_trial_features",
      value: JSON.stringify(body.features),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json(
      { ok: true, note: "Features stored for this session only" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Session store error:", err);
    return NextResponse.json(
      { error: "Unable to store features" },
      { status: 500 }
    );
  }
}
