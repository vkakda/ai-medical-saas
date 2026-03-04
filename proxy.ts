import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// 1. Define which routes require the user to be logged in
// This matches /dashboard, /dashboard/history, /medical-agent, etc.
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/medical-agent(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // 2. If the user is trying to access a protected route
  if (isProtectedRoute(req)) {
    // 3. This line triggers the automatic redirect to Sign-In 
    // if the user is not authenticated
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}