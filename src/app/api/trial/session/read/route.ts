// app/api/trial/session/read/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("gw_trial_features")?.value;

  if (!raw) {
    return NextResponse.json({ features: null });
  }

  try {
    return NextResponse.json({ features: JSON.parse(raw) });
  } catch {
    return NextResponse.json({ features: null });
  }
}
