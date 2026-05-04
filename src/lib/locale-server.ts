import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./i18n";

export function getLocale(): Locale {
  // Middleware sets x-locale on the rewritten request when /ua or /pl prefix
  // is in the URL — read it first so the very render reflects the new locale,
  // not just the next one (cookies alone would lag by a navigation).
  const fromHeader = headers().get("x-locale");
  if (isLocale(fromHeader)) return fromHeader;
  const c = cookies().get("locale")?.value;
  return isLocale(c) ? c : DEFAULT_LOCALE;
}
