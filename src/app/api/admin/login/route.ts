import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({}, { status: 401 });
  }

  const valid = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH!
  );

  if (!valid) {
    return NextResponse.json({}, { status: 401 });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.ADMIN_JWT_SECRET!,
    { expiresIn: "12h" }
  );

  const res = NextResponse.json({ ok: true });
  res.cookies.set("gw_admin", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return res;
}
