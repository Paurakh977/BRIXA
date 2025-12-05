import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = ['/dashboard', '/admin', '/profile'];
const authRoutes = ['/login', '/register'];
const adminRoutes = ['/admin'];

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
  
  // Get the access token from cookies
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('brixa_refresh')?.value;
  
  // Handle auth routes (login/register)
  if (isAuthRoute) {
    // If user is already authenticated, redirect to dashboard
    if (accessToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }
  
  // Handle protected routes
  if (isProtectedRoute) {
    // If no access token, redirect to login
    if (!accessToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Validate token with backend
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Invalid token');
      }
      
      const user = await response.json();
      
      // Check admin routes
      if (isAdminRoute && user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      
      // Add user data to headers for server components
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user', JSON.stringify(user));
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      // Token is invalid, try to refresh
      if (refreshToken) {
        try {
          const refreshResponse = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          
          if (refreshResponse.ok) {
            const { access_token } = await refreshResponse.json();
            
            // Retry the original request with new token
            const retryResponse = await fetch(`${request.nextUrl.origin}/api/auth/me`, {
              headers: {
                'Authorization': `Bearer ${access_token}`,
              },
            });
            
            if (retryResponse.ok) {
              const user = await retryResponse.json();
              
              // Check admin routes
              if (isAdminRoute && user.role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/dashboard', request.url));
              }
              
              // Create response with new token
              const response = NextResponse.next();
              response.cookies.set('access_token', access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 15, // 15 minutes
              });
              
              return response;
            }
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
        }
      }
      
      // Refresh failed, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};