import { NextResponse } from "next/server";
import { isLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const l = url.searchParams.get("l");
  const back = url.searchParams.get("back") || "/";
  if (!isLocale(l)) {
    return NextResponse.redirect(new URL(back, url.origin));
  }
  const res = NextResponse.redirect(new URL(back, url.origin));
  res.cookies.set("locale", l, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}
