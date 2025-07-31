import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

async function verifyJWT(token: string) {
  const encoder = new TextEncoder();
  const secret = encoder.encode(JWT_SECRET);

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;
  console.log("auth token middleware ===> ", token);

  if (pathname.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/collage-image" || pathname === "/crop-face") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decoded = await verifyJWT(token);

    if (!decoded) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const plan = decoded.plan;

    console.log("User plan ===> ", plan === "PROFESSIONAL");

    if (plan === "PROFESSIONAL" || plan === "BUSINESS") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/pricing", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/collage-image", "/crop-face"],
};
