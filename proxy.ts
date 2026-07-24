/**
 * Locale Routing Proxy
 * ====================
 * Every page lives under a locale segment (`/en/...`, `/ar/...`). This is what
 * makes an unprefixed URL land somewhere sensible.
 *
 * File name note: Next 16.1 renamed the `middleware` convention to `proxy`,
 * with the exported function renamed to match. Same runtime, same API.
 *
 * Redirect policy, and why the status codes differ:
 *
 *  - `/` uses **307 (temporary)**. The root is a routing decision, not a moved
 *    document. Keeping it temporary means a browser will not cache it forever,
 *    so switching to Accept-Language detection later takes effect immediately
 *    instead of being shadowed by stale permanent redirects in every returning
 *    visitor's cache.
 *
 *  - Everything else uses **308 (permanent)**. `/about` genuinely MOVED to
 *    `/en/about`. A permanent redirect is what consolidates ranking signals
 *    onto the new URL, which matters because these paths are already indexed.
 *    308 rather than 301 so the method and body are preserved.
 *
 * The matcher deliberately skips `_next`, `api`, and any path containing a dot.
 * That last rule covers every static asset plus `/robots.txt`, `/sitemap.xml`,
 * and `/llms.txt`, none of which should ever be locale-prefixed.
 *
 * Requests that already carry a locale pass through UNTOUCHED. An earlier
 * version attached the pathname as a request header so the 404 could read it,
 * but the 404 now resolves its own locale client-side; leaving the request
 * unmodified keeps this as a pure routing decision.
 */

import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";

/** True when the path already starts with a supported locale segment. */
function hasLocalePrefix(pathname: string): boolean {
  return LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (hasLocalePrefix(pathname)) {
    return NextResponse.next();
  }

  const isRoot = pathname === "/";
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${isRoot ? "" : pathname}`;

  return NextResponse.redirect(url, isRoot ? 307 : 308);
}

export const config = {
  matcher: [
    /*
     * Match every request path EXCEPT:
     *  - _next/*        Next.js internals (static chunks, image optimizer)
     *  - api/*          route handlers
     *  - anything.ext   files with an extension: /logo.svg, /images/*.webp,
     *                   /robots.txt, /sitemap.xml, /llms.txt, /favicon.svg
     */
    "/((?!_next|api|.*\\.).*)",
  ],
};
