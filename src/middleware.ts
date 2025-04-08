import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    // Only check for token on admin routes (configured via matcher below)
    const token = request.cookies.get("token")?.value

    if (!token) {
        // If token is absent, redirect to the admin login page
        return NextResponse.redirect(new URL("/login", request.url))
    }

    // Otherwise, allow the request to continue.
    return NextResponse.next()
}

export const config = {
    // Only match admin paths. Public pages (like /home, /product) are not affected.
    matcher: ["/admin/:path*"],
}
