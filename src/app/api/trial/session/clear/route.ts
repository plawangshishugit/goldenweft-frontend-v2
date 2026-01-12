// app/api/trial/session/clear/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "gw_trial_features",
    value: "",
    maxAge: 0,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
