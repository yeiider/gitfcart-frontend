import { NextResponse } from "next/server";
import { isLoggedInServer } from "./lib/useAuth";

export async function middleware(req) {
    const url = req.nextUrl.clone();

    const jwt = req.cookies.get('jwt')?.value;

    if (!jwt && url.pathname.startsWith("/login")) {
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    if (!jwt && url.pathname.startsWith("/dashboard")) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    const user = await isLoggedInServer(req);

    if (user) {
        const response = NextResponse.next();
        response.cookies.set('user', JSON.stringify(user), { httpOnly: false, path: '/' });
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};
