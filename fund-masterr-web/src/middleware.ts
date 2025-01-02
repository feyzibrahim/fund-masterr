import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "./lib/auth-utils";
import { redirectUrls } from "./lib/constants";

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const publicPaths = [
		"/",
		"/login",
		"/sign-up",
		"/not-authorized",
		"/logo.png",
		"/file-upload",
		"/_next",
		"/_next/image",
	];
	const isPublicPath = publicPaths.includes(path);

	if (isPublicPath) {
		return NextResponse.next();
	}
	const session = await getSession();
	if (!session) {
		return NextResponse.redirect(new URL("/", request.nextUrl));
	}
	const { role } = session;
	const allowedUrls = redirectUrls.find((url) => url.role === role)?.allowedUrls;
	const defaultUrl = redirectUrls.find((url) => url.role === role)?.defaultUrl;
	const isAuthorized =
		(allowedUrls && allowedUrls.find((url) => path.startsWith(url))) || path === "/";
	if (!isAuthorized) {
		return NextResponse.redirect(new URL("/not-authorized", request.nextUrl));
	}
	if (path === "/" && defaultUrl) {
		return NextResponse.redirect(new URL(defaultUrl, request.nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.png|_next).*)"],
};
