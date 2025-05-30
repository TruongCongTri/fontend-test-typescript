import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const auth = req.cookies.get("auth")?.value === "true";

  const isAuthPage = pathname === "/login";
  const isProtectedPage = ["/search", "/dashboard"].includes(pathname);

  if (isAuthPage && auth) {
    // Authenticated user trying to access login — redirect to /search
    return NextResponse.redirect(new URL("/search", req.url));
  }

  if (isProtectedPage && !auth) {
    // Unauthenticated user trying to access protected page — redirect to /login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/login", "/search", "/dashboard"],
};
