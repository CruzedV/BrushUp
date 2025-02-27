import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  
  if (!token && !req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (req.nextUrl.pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/create",
    "/favorite",
    "/subs",
    "/user/settings",
    "/auth/login",
    "/auth/register",
  ],
};