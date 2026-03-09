import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  let locale: string;

  if (cookie === "en" || cookie === "zh") {
    locale = cookie;
  } else {
    // First visit — detect from Accept-Language
    const acceptLang = request.headers.get("accept-language") || "";
    locale = /\bzh\b/i.test(acceptLang) ? "zh" : "en";
  }

  // Pass locale to server components via request header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Set/refresh cookie for future visits
  if (cookie !== locale) {
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
