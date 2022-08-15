import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { baseApiUrl, baseUrl } from "./consts";

export async function middleware(req: NextRequest) {
  const Authorization = req.cookies.get("Authorization") as string;
  const currUserRes = await fetch(`${baseApiUrl}auth/current-user-type`, {
    headers: [["token", Authorization]],
  });
  const currentUser = await currUserRes.text();

  if (req.url.includes("/auth")) {
    if (currUserRes.status === 200)
      return NextResponse.redirect(new URL("/dashboard", req.url));
    return NextResponse.next();
  }
  if (req.url.includes("/dashboard")) {
    if (currUserRes.status !== 200)
      return NextResponse.redirect(new URL("/auth/login", req.url));
    const validUrl = `http://${req.headers.get(
      "host"
    )}/dashboard/${currentUser.toLowerCase()}`;
    if (req.url === validUrl) return NextResponse.next();
    return NextResponse.redirect(validUrl);
  }
}
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
