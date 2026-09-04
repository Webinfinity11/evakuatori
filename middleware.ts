import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE, COUNTRY_LOCALE, isLocale, type Locale } from "./lib/i18n";
import { isGeorgianIp } from "./lib/geo-ge";

const COOKIE = "locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** კლიენტის IP — Railway x-real-ip-ს გვაწვდის, x-forwarded-for პირველი მისამართია. */
function clientIp(req: NextRequest): string | null {
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return null;
}

/** ბრაუზერის ენა — Accept-Language-ის პირველი ცნობადი ტეგი. */
function fromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  const tags = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of tags) {
    const base = tag.split("-")[0];
    if (base === "ka") return "ka";
    if (base === "ru") return "ru";
    if (base === "en") return "en";
  }
  return null;
}

/**
 * ლოკალის შერჩევა, პრიორიტეტით:
 *   1. მომხმარებლის არჩევანი (cookie)
 *   2. ქვეყნის ჰედერი, თუ წინ CDN დგას (Cloudflare / Vercel)
 *   3. IP საქართველოს დიაპაზონში — ლოკალური ცხრილი, ქსელის გარეშე
 *   4. ბრაუზერის ენა
 *   5. ინგლისური
 */
function pickLocale(req: NextRequest): Locale {
  const saved = req.cookies.get(COOKIE)?.value;
  if (saved && isLocale(saved)) return saved;

  const country = (
    req.headers.get("cf-ipcountry") ||
    req.headers.get("x-vercel-ip-country") ||
    ""
  ).toUpperCase();
  if (country && COUNTRY_LOCALE[country]) return COUNTRY_LOCALE[country];

  const ip = clientIp(req);
  if (ip && isGeorgianIp(ip)) return "ka";

  return fromAcceptLanguage(req.headers.get("accept-language")) ?? "en";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // უკვე ლოკალიზებული მისამართი — ვინახავთ არჩევანს და ვუშვებთ
  const seg = pathname.split("/")[1];
  if (isLocale(seg)) {
    const res = NextResponse.next();
    if (req.cookies.get(COOKIE)?.value !== seg) {
      res.cookies.set(COOKIE, seg, { maxAge: COOKIE_MAX_AGE, path: "/", sameSite: "lax" });
    }
    return res;
  }

  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.redirect(url, 307);
  res.cookies.set(COOKIE, locale, { maxAge: COOKIE_MAX_AGE, path: "/", sameSite: "lax" });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|img|favicon.ico|icon.png|robots.txt|sitemap.xml).*)"],
};

export { LOCALES, DEFAULT_LOCALE };
