import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
	if (request.nextUrl.pathname === "/studio-details") {
		return NextResponse.redirect(new URL("/studios", request.url));
	}

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard",
		"/add-new-studio",
		"/my-listings",
		"/my-bookings",
		"/studio-details",
		"/studio-details/:path+",
	],
};
