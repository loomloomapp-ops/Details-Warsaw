import { NextResponse } from "next/server";
import { isLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

function resolveBackUrl(req: Request, back: string): URL {
  const referer = req.headers.get("referer");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "http";

  if (referer) {
    try {
      const r = new URL(referer);
      const target = new URL(back, r.origin);
      // keep referer's path if back is just "/"
      if (back === "/" && r.pathname) {
        target.pathname = r.pathname;
        target.search = r.search;
      }
      return target;
    } catch {}
  }
  if (host) {
    return new URL(back, `${proto}://${host}`);
  }
  return new URL(back, new URL(req.url).origin);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const l = url.searchParams.get("l");
  const back = url.searchParams.get("back") || "/";

  const target = resolveBackUrl(req, back);

  if (!isLocale(l)) {
    return NextResponse.redirect(target);
  }
  const res = NextResponse.redirect(target);
  res.cookies.set("locale", l, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}
