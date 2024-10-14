import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/signup" || path === "/login" || path === "/verifyemail";

    const token = request.cookies.get("token")?.value || "";


    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isPublicPath && !token) {

        return NextResponse.redirect(new URL('/login/', request.url));
    }
}

// ---------- Protected Routes Here
export const config = {
    matcher: [
        "/logout",
        "/me",
        "/profile",
        "/profile/:path*",
    ]
};