import { NextRequest, NextResponse } from "next/server"

const AUTH_COOKIE = "tobiira_session"

const PUBLIC_PATHS = ["/auth/login", "/auth/verify", "/auth/accept-invite"]
const AUTH_ONLY_PREFIXES = ["/auth/"]

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "?"))
}

function isAuthOnly(pathname: string): boolean {
  return AUTH_ONLY_PREFIXES.some((p) => pathname.startsWith(p))
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasCookie = request.cookies.has(AUTH_COOKIE)

  // Logged-in users shouldn't see auth pages
  if (hasCookie && isAuthOnly(pathname)) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  // Unauthenticated users can't access app pages
  if (!hasCookie && !isPublic(pathname)) {
    const loginUrl = new URL("/auth/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static, _next/image (Next.js internals)
     * - favicon.ico, manifest.json, public assets
     * - API routes
     */
    "/((?!_next/static|_next/image|favicon|manifest|icons|.*\\.(?:png|jpg|jpeg|svg|ico|webp|woff2?|ttf)).*)",
  ],
}
