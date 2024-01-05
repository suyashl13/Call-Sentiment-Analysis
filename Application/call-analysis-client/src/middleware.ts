import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./utils";
import { User } from "./types/user.types";

export async function middleware(request: NextRequest) {
  const jwt: string = request.cookies.get("jwt")?.value as string;

  if (!jwt) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else if (request.nextUrl.pathname === "/") {
    const { payload }: any = await validateToken(jwt);
    const user: User = payload.user as User;

    if (user.role === 1) {
      return NextResponse.redirect(new URL("/employee", request.url));
    } else if (user.role === 0) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/employee", "/admin"],
};
