import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { baseApiUrl, baseUrl } from "./consts";

export async function middleware(req: NextRequest) {
  const Authorization = req.cookies.get("Authorization") as string;
  console.log(
    "middleaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa   :   " + Authorization
  );
  // if (!Authorization)
  //   return NextResponse.redirect(new URL("/auth/login", req.url));
  const currUserRes = await fetch(`${baseApiUrl}auth/current-user-type`, {
    headers: [["Authorization", Authorization]],
  });

  const currentUser = await currUserRes.text();
  // if (
  //   req.url.includes("/dashboard") ||
  //   (req.url.includes("/auth") && currentUser && Authorization)
  // ) {
  //   if (currentUser === "admin") {
  //     return NextResponse.redirect(new URL("/dashboard/admin", req.url));

  //   }
  //   if (currentUser === "user") {
  //     return NextResponse.redirect(new URL("/dashboard/user", req.url));
  //   }
  // }
  if (req.url.includes("/auth")) {
    if (!Authorization) return NextResponse.next();
    if (currentUser)
      return NextResponse.redirect(
        `${baseUrl}dashboard/${currentUser.toLowerCase()}`,
        301
      );
    return NextResponse.next();
  }
  if (req.url.includes("/dashboard")) {
    if (Authorization === undefined || Authorization === null) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    try {
      const currentUser = await currUserRes.text();
      const validUrl = `/dashboard/${(currentUser as string).toLowerCase()}`;
      // if (currentUser === "admin") {
      //   return NextResponse.next();
      // }
      // if (currentUser === "user") {
      //   return NextResponse.redirect(new URL("/dashboard/user", req.url));
      // }
      if (!Authorization) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
