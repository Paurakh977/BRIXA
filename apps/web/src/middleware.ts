import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT, isTokenExpiring, ConfigurationError } from './utils/jwt';

/**
 * Type guard to check if error is a ConfigurationError
 */
function isConfigurationError(error: unknown): error is ConfigurationError {
  return error instanceof ConfigurationError;
}

// Define protected routes that require authentication
const protectedRoutes = ['/dashboard', '/admin', '/profile'];
const authRoutes = ['/login', '/register'];
const adminRoutes = ['/admin'];

/**
 * Stateless middleware - NO fetch calls, NO database queries
 * Only cryptographically verifies JWT tokens and extracts user data from payload
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Check if the current route is an auth route
  const isAuthRoute = authRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Check if the current route is an admin route
  const isAdminRoute = adminRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Get access token from cookies
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('brixa_refresh')?.value;

  // Handle auth routes (login/register)
  if (isAuthRoute) {
    // If user has a valid access token, redirect to dashboard
    if (accessToken) {
      try {
        const payload = await verifyJWT(accessToken);
        if (payload && !isTokenExpiring(payload)) {
          // Token is valid and not expiring, redirect to dashboard
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      } catch (error: unknown) {
        // Configuration error - fail closed
        if (isConfigurationError(error)) {
          console.error('CRITICAL: JWT_SECRET is missing in apps/web/.env');
          console.error('Configuration Error:', error.message);
          return new NextResponse(
            JSON.stringify({ 
              error: 'Internal Server Error',
              message: 'Server configuration error. Please contact support.' 
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
        // Token validation error - allow access to auth routes
      }
    }
    // Token is missing, invalid, or expiring - allow access to auth routes
    return NextResponse.next();
  }

  // Handle protected routes
  if (isProtectedRoute) {
    // No access token at all
    if (!accessToken) {
      // If refresh token exists, allow request through
      // Client-side code will handle token refresh
      if (refreshToken) {
        // Set a header to indicate token refresh is needed
        const response = NextResponse.next();
        response.headers.set('x-token-refresh-needed', 'true');
        return response;
      }
      // No tokens at all, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify token cryptographically
    let payload: Awaited<ReturnType<typeof verifyJWT>>;
    try {
      payload = await verifyJWT(accessToken);
    } catch (error: unknown) {
      // Configuration error - fail closed, do NOT fallback to refresh token
      if (isConfigurationError(error)) {
        console.error('CRITICAL: JWT_SECRET is missing in apps/web/.env');
        console.error('Configuration Error:', error.message);
        console.error('Request path:', pathname);
        console.error('This is a server misconfiguration. The middleware cannot verify tokens without JWT_SECRET.');
        
        return new NextResponse(
          JSON.stringify({ 
            error: 'Internal Server Error',
            message: 'Server configuration error. Please contact support.' 
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
      // Unexpected error - re-throw to be handled by Next.js error boundary
      throw error;
    }

    // Token is invalid or expired
    if (!payload || isTokenExpiring(payload)) {
      // If refresh token exists, allow request through for client-side refresh
      if (refreshToken) {
        const response = NextResponse.next();
        response.headers.set('x-token-refresh-needed', 'true');
        return response;
      }
      // No refresh token, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Token is valid - extract user data from payload (no DB call needed)
    const user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };

    // Check admin routes
    if (isAdminRoute && user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Create request headers with user data (CRITICAL: Use this pattern for Next.js)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user', JSON.stringify(user));

    // Create response with modified request headers
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // If token is expiring soon (but still valid), set flag for proactive refresh
    if (isTokenExpiring(payload, 60)) {
      response.headers.set('x-token-refresh-needed', 'true');
    }

    return response;
  }

  // Public routes - no authentication needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
