import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define public paths that don't require authentication
const publicPaths = [
  '/auth/signin',
  '/auth/signup',
  '/auth/error',
  '/auth/signout',
  '/auth/forgot-password',
  '/api/auth',
  '/api/setup'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is a public path or an asset (like images, etc.)
  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path) || pathname.includes('_next') || pathname.includes('favicon')
  );
  
  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Get the authentication token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  // If there's no token, redirect to sign-in page
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }
  
  // If the user is authenticated, allow access
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/((?!api/setup|_next/static|_next/image|favicon.ico).*)'],
}; 