import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { checkRoute, NOT_FOUND_SEGMENT } from "./lib/routing/route-guard";
import { createMockSlugIndex } from "./repositories/mock/slug-index";

const intlMiddleware = createMiddleware(routing);
const slugIndex = createMockSlugIndex();

export default function proxy(request: NextRequest) {
  const check = checkRoute(request.nextUrl.pathname, slugIndex);
  if (check.status === "bad-request") {
    return new NextResponse("Bad Request", { status: 400 });
  }
  if (check.status === "not-found") {
    const url = request.nextUrl.clone();
    url.pathname = `/${check.locale}/${NOT_FOUND_SEGMENT}`;
    url.search = "";
    return NextResponse.rewrite(url, { status: 404 });
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
