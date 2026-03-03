import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";
  const subdomain = host.split(".")[0];

  const slug =
    subdomain && subdomain !== "www" && subdomain !== "localhost"
      ? subdomain
      : "otm";

  // Resolve locale from path
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const locales: readonly string[] = routing.locales;
  const locale = locales.includes(segments[0])
    ? segments[0]
    : routing.defaultLocale;

  // Set request headers for server components
  request.headers.set("x-tenant-slug", slug);
  request.headers.set("x-locale", locale);

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(es|en|fr|it)/:path*"],
};
