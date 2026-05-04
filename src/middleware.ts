import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const LOCALES = ["ru", "ua", "pl"] as const;
type Loc = (typeof LOCALES)[number];

function isAdminProtected(pathname: string) {
  if (!pathname.startsWith("/admin")) return false;
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) return false;
  return true;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) Auth gate for /admin (incl. bare /admin) — applies BEFORE any locale handling
  if (isAdminProtected(pathname)) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 2) Locale URL prefix — /ua/... and /pl/... rewrite to /... + set cookie.
  const seg = pathname.split("/")[1];
  if ((LOCALES as readonly string[]).includes(seg)) {
    const locale = seg as Loc;
    const stripped = pathname.slice(("/" + seg).length) || "/";
    const url = req.nextUrl.clone();
    url.pathname = stripped;

    // Inject x-locale into the *request* headers so getLocale() reads the new
    // locale during this very render (cookie alone would only apply to the
    // next request, which is why language used to lag by one navigation).
    const reqHeaders = new Headers(req.headers);
    reqHeaders.set("x-locale", locale);

    const res = NextResponse.rewrite(url, { request: { headers: reqHeaders } });
    res.cookies.set("locale", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match everything except next internals, static assets, and next-auth API
    "/((?!_next/static|_next/image|favicon|design|uploads|api/auth).*)",
  ],
};
