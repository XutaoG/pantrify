import { NextRequest, NextResponse } from "next/server";
import { getUser, refresh } from "./api";
import { loginRoute, signUpRoute } from "./constants";

export const middleware = async (request: NextRequest) => {
	const pathname = request.nextUrl.pathname;

	if (pathname.startsWith(loginRoute) || pathname.startsWith(signUpRoute)) {
		if ((await getUser()) == null) {
			// Attempt to refresh token
			if ((await refresh()).errorMessage == null) {
				return NextResponse.redirect(new URL("/", request.url));
			}
		} else {
			// User is already signed in, redirect to "/"

			return NextResponse.redirect(new URL("/", request.url));
		}
	} else if (request.nextUrl.pathname.startsWith("/")) {
		if ((await getUser()) == null) {
			// User is not signed in, redirect to "/login"

			// Attempt to refresh token
			if ((await refresh()).errorMessage != null) {
				return NextResponse.redirect(new URL(loginRoute, request.url));
			}
		}
	}

	return NextResponse.next();
};

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		{
			source: "/((?!api|_next/static|_next/image|logo|icons|temp-recipe-images|favicon.ico|sitemap.xml|robots.txt).*)",
			missing: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" },
			],
		},

		{
			source: "/((?!api|_next/static|_next/image|logo|icons|temp-recipe-images|favicon.ico|sitemap.xml|robots.txt).*)",
			has: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" },
			],
		},

		{
			source: "/((?!api|_next/static|_next/image|logo|icons|temp-recipe-images|favicon.ico|sitemap.xml|robots.txt).*)",
			has: [{ type: "header", key: "x-present" }],
			missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
		},
	],
};
