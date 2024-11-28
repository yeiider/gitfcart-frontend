import { NextResponse } from "next/server";
import { isLoggedInServer } from "./lib/useAuth";

export async function middleware(req) {
    const url = req.nextUrl.clone();
    const user = await isLoggedInServer(req);

    if (user) {
        const response = NextResponse.next();
        response.cookies.set('user', JSON.stringify(user), { httpOnly: false, path: '/' });
        return response;
    }

    if (!user && url.pathname.startsWith("/dashboard")) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};
