import { NextRequest, NextResponse } from "next/server";
import { isIP } from "node:net";
import { isLocale, LOCALE_COOKIE, type Locale } from "./lib/i18n";
import { isGeorgianIp } from "./lib/geo-ge";

function countryLocale(req: NextRequest): Locale | null {
  for (const header of ["cf-ipcountry", "x-vercel-ip-country"]) {
    const country = req.headers.get(header)?.trim().toUpperCase();
    if (country && /^[A-Z]{2}$/.test(country) && country !== "XX") {
      return country === "GE" ? "ka" : "en";
    }
  }

  const raw = req.headers.get("x-real-ip")?.trim()
    || req.headers.get("x-forwarded-for")?.split(",")[0].trim();
  const ip = raw?.replace(/^::ffff:/i, "");
  // The bundled country table covers IPv4 only. Unknown/private addresses
  // must not be mistaken for a foreign visitor.
  if (!ip || isIP(ip) !== 4) return null;
  const [a, b] = ip.split(".").map(Number);
  if (a === 0 || a === 10 || a === 127 || a >= 224
    || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31)
    || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127)) return null;
  return isGeorgianIp(ip) ? "ka" : "en";
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segment = pathname.split("/")[1];
  const current = isLocale(segment) ? segment : null;
  // Only the language switcher writes this cookie. Ignore the old automatic
  // `locale` cookie so previously visited URLs cannot override geolocation.
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  const locale = saved && isLocale(saved) ? saved : countryLocale(req) ?? current ?? "en";

  if (current === locale) return NextResponse.next();

  const url = req.nextUrl.clone();
  const rest = current ? pathname.slice(current.length + 1) : pathname;
  url.pathname = `/${locale}${rest === "/" ? "" : rest}`;
  const response = NextResponse.redirect(url, 307);
  // A visitor-specific redirect must never be shared by a browser/CDN cache.
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|img(?:/|$)|.*\\.[^/]+$).*)"],
};
