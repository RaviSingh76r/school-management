import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Default export for NextAuth.js middleware
export { default } from "next-auth/middleware";

// Middleware function to handle authentication and redirection based on user role
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const token = await getToken({ req: request });
  const publicPaths = ["/auth/sign-in", "/auth/register"];
  const protectedPaths = ["/student", "/teacher", "/principal", "/parent"];
  const apiPaths = ["/api"];
  const staticPaths = ["/static", "/_next", "/favicon.ico"];

  // Check if the requested path is a public path
  const isPublicPath = publicPaths.some(path => url.pathname.startsWith(path));
  const isProtectedPath = protectedPaths.some(path => url.pathname.startsWith(path));
  const isApiPath = apiPaths.some(path => url.pathname.startsWith(path));
  const isStaticPath = staticPaths.some(path => url.pathname.startsWith(path));

  // Allow access to static assets without any redirection
  if (isStaticPath) {
    return NextResponse.next();
  }

  // Handle authentication and redirection for public paths
  if (isPublicPath) {
    // If user is authenticated and trying to access an auth path, redirect to their role-based dashboard
    if (token) {
      const roleBasedPath = `/${token.role}`;
      return NextResponse.redirect(new URL(roleBasedPath, request.url));
    }
    // Allow unauthenticated access to public paths
    return NextResponse.next();
  }

  // Handle authentication and redirection for protected paths
  if (!token) {
    // If user is not authenticated and trying to access a protected path, redirect to sign-in page
    if (isProtectedPath) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    // Allow access to other paths for unauthenticated users
    return NextResponse.next();
  }

  // Handle role-based redirection for authenticated users
  if (token) {
    const roleBasedPath = `/${token.role}`;

    // Redirect to the role-based dashboard if trying to access a different role's dashboard
    if (isProtectedPath && !url.pathname.startsWith(roleBasedPath)) {
      return NextResponse.redirect(new URL(roleBasedPath, request.url));
    }
  }

  // Allow access to API paths for authenticated users
  if (isApiPath) {
    return NextResponse.next();
  }

  // Default action: Allow access to all other paths
  return NextResponse.next();
}

// Configure the middleware to match specific routes
export const config = {
  matcher: [
    "/((?!api|static|_next|favicon.ico).*)", // Match all pages except API and static assets
    "/auth/(.*)" // Match all auth routes
  ],
};
