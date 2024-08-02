export { auth as middleware } from '@/lib/auth'

// Don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
