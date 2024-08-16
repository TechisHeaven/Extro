import { updateSession } from "@/helpers/session/handleJWTsession";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const isAuthorized = request.cookies.get("session")?.value;

  const url = request.nextUrl.clone();
  const CurrentUrlIsLogin = url.pathname.startsWith("/login");

  if (isAuthorized) {
    if (CurrentUrlIsLogin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (!isAuthorized) {
    if (!CurrentUrlIsLogin) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  await updateSession(request);
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/", "/settings/:path*", "/analyze"],
};
