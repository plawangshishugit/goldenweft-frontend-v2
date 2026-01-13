import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const formData = await req.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const origin = req.headers.get("origin") || "http://localhost:3000";

  if (email !== process.env.ADMIN_EMAIL) {
    return NextResponse.redirect(`${origin}/admin/login`);
  }

  const valid = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH!
  );

  if (!valid) {
    return NextResponse.redirect(`${origin}/admin/login`);
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.ADMIN_JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const res = NextResponse.redirect(`${origin}/admin/orders`);

  res.cookies.set({
    name: "admin_token",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res;
}
