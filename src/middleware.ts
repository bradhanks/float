import { NextRequest, NextResponse } from 'next/server'

// Generate a random nonce using Web Crypto API (available in Edge runtime)
function generateNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
}

export async function middleware(request: NextRequest) {
  const nonce = generateNonce()
  const isDevelopment = process.env.NODE_ENV === 'development'

  // More permissive CSP for development, strict for production
  const cspHeader = isDevelopment
    ? `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://assets.calendly.com;
      style-src 'self' 'unsafe-inline' https://assets.calendly.com;
      img-src 'self' blob: data: https://*.calendly.com;
      font-src 'self' https://assets.calendly.com;
      connect-src 'self' ws://localhost:* https://calendly.com;
      frame-src https://calendly.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
    `
    : `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://assets.calendly.com;
      style-src 'self' 'nonce-${nonce}' https://assets.calendly.com;
      img-src 'self' blob: data: https://*.calendly.com;
      font-src 'self' https://assets.calendly.com;
      connect-src 'self' https://calendly.com;
      frame-src https://calendly.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  // Clone the request headers and add any new request headers if needed
  const requestHeaders = new Headers(request.headers)

  // Create response with the modified request headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Set response headers
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  )

  // Only set nonce header in production where it's actually used
  if (!isDevelopment) {
    response.headers.set('x-nonce', nonce)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
