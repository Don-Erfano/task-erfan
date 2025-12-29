import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const DASHBOARD_PREFIX = "/dashboard";
const HOME_ROUTE = "/";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authCookie = request.cookies.get("auth");
  const isAuthenticated = authCookie?.value === "true";

  if (pathname === HOME_ROUTE) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (!isAuthenticated && pathname.startsWith(DASHBOARD_PREFIX)) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (
    isAuthenticated &&
    AUTH_ROUTES.some((route) => pathname.startsWith(route))
  ) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/login", "/auth/register"],
};
