import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) return;

  const token = req.cookies.get("gw_admin")?.value;
  if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));

  try {
    jwt.verify(token, process.env.ADMIN_JWT_SECRET!);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}
