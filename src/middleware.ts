import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = [
    "/",
    "/login",
    "/api/auth",
    "/favicon.ico",
    "/_next",
    "/public",
  ];

  // Check if the current path is public
  const isPublicPath = publicPaths.some(
    (publicPath) => 
      path === publicPath || 
      path.startsWith(publicPath + "/")
  );

  // Get the authentication session
  const session = await auth();
  const isAuthenticated = !!session;

  // If the path is not public and the user is not authenticated,
  // redirect to the login page
  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the path is /login and the user is authenticated,
  // redirect to the dashboard
  if (path === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
