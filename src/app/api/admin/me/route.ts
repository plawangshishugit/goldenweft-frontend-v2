import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const token = req.headers
    .get("cookie")
    ?.match(/admin_token=([^;]+)/)?.[1];

  if (!token) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.ADMIN_JWT_SECRET!);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
}
