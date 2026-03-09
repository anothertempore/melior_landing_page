import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { routing } from "./routing";

export default getRequestConfig(async () => {
  // Prefer x-locale header (always available, set by middleware on every request)
  // Fall back to cookie (for edge cases), then default
  const headerStore = await headers();
  const headerLocale = headerStore.get("x-locale");

  if (headerLocale && routing.locales.includes(headerLocale as "en" | "zh")) {
    return {
      locale: headerLocale,
      messages: (await import(`./messages/${headerLocale}.json`)).default,
    };
  }

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale =
    cookieLocale && routing.locales.includes(cookieLocale as "en" | "zh")
      ? cookieLocale
      : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
