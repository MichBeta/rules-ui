import { NextResponse, NextRequest } from 'next/server';
import * as jose from "jose";

export async function middleware(request: NextRequest) {
    if (request.cookies.get('token') === undefined || request.cookies.get('credentials') === undefined) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    const jwt = request.cookies.get('token')!.value; // Use non-null assertion operator (!)
    const credentials = request.cookies.get('credentials')!.value; // Use non-null assertion operator (!)
    if (jwt === undefined && credentials === undefined) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    try {
        //decode jwt token and get the payload
        const payload = jose.decodeJwt(jwt);
        const roles = credentials.split('|')[0];
        const username = credentials.split('|')[1];
        if (roles.includes('Administrator') && payload.sub === username) {
            return NextResponse.next();
        } else {
            //delete token and roles cookies
            request.cookies.delete('token');
            request.cookies.delete('credentials');
            return NextResponse.redirect(new URL("/login", request.nextUrl));
        }
    } catch (e) {
        console.log(e);
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    ],
};
