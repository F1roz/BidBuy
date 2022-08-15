import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { baseApiUrl, baseUrl } from "../../consts";
import { getCookie } from "cookies-next";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const Authorization = getCookie("Authorization")?.toString();
  console.log("middle: " + Authorization);
  if (Authorization != null) return NextResponse.next();
  const currentUser = await (
    await fetch(`${baseApiUrl}auth/current-user-type`, {
      headers: { Authorization },
    })
  ).json();
  console.log("middle: " + currentUser.data);
  if (currentUser.data)
    return NextResponse.redirect(
      `${baseUrl}dashboard/${(currentUser.data.Role as string).toLowerCase()}`,
      301
    );
  return NextResponse.next();
}
