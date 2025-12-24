import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;

    // 1. Protected Admin Routes
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
        // If logged in but not admin, go to dashboard
        if (token) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        // If not logged in, go to login
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 2. Protected User Routes
    if (pathname.startsWith("/user") && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 3. General Dashboard Route Protection
    if (pathname === "/dashboard" && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 4. Booking Protection
    if (pathname.startsWith("/booking") && !token) {
        return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/user/:path*",
        "/dashboard",
        "/booking/:path*",
    ],
};
