import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { baseApiUrl, baseUrl } from "../../consts";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const Authorization = req.cookies.toString();
  if (!Authorization) return NextResponse.next();
  const currentUser = await (
    await fetch(`${baseApiUrl}/auth/current-role`, {
      headers: { Authorization },
    })
  ).json();
  if (currentUser.data) console.log(currentUser.data);
  return NextResponse.redirect(
    `${baseUrl}dashboard/${(currentUser.data.Role as string).toLowerCase()}`,
    301
  );
  return NextResponse.next();
}
