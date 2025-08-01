import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Define route types
type AuthRoute = "/login" | "/signup" | "/forgot-password";

// Define routes configuration
export class RouteConfig {
  // Authentication routes (login, signup, etc.)
  static readonly AUTH_ROUTES: AuthRoute[] = [
    "/login",
    "/signup",
    "/forgot-password",
  ];

  // Public routes that don't require authentication
  static readonly PUBLIC_ROUTES: string[] = [...this.AUTH_ROUTES];

  /**
   * Check if the given pathname is an auth route
   */
  static isAuthRoute(pathname: string): boolean {
    return this.AUTH_ROUTES.includes(pathname as AuthRoute);
  }

  /**
   * Check if the given pathname is a public route
   */
  static isPublicRoute(pathname: string): boolean {
    return this.PUBLIC_ROUTES.includes(pathname);
  }

  /**
   * Create a login redirect URL with callback
   */
  static createLoginRedirect(request: NextRequest, pathname: string): URL {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return loginUrl;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Get token from cookies on server-side
  const token = request.cookies.get("token")?.value;

  // Handle public routes (including auth routes)
  if (RouteConfig.isPublicRoute(pathname)) {
    // Redirect authenticated users away from auth pages
    if (token && RouteConfig.isAuthRoute(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Protect private routes
  if (!token) {
    return NextResponse.redirect(
      RouteConfig.createLoginRedirect(request, pathname)
    );
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - anything with a dot (static files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
