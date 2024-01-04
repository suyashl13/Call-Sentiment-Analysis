import { NextRequest } from "next/server";
import { validateToken } from "./utils";

export async function middleware(request: NextRequest) {
  const { payload } = await validateToken(request.cookies.get("jwt")?.value as string);
}


export const config = {
  matcher: ["/employee", '/admin'],
};
