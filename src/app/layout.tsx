import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Melior — Write your year into a book",
  description:
    "Melior is a year-end reflection app for iOS. 30 questions, 6 chapters — write your year into a book.",
  openGraph: {
    title: "Melior — Write your year into a book",
    description:
      "Melior is a year-end reflection app for iOS. 30 questions, 6 chapters — write your year into a book.",
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Melior — Write your year into a book",
    description:
      "A year-end reflection app for iOS. 30 questions, 6 chapters — no account, no tracking, no ads.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F9F7F2",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const htmlLang = locale === "zh" ? "zh-Hans" : "en";

  return (
    <html lang={htmlLang} className={cormorant.variable}>
      <head>
        <meta name="apple-itunes-app" content="app-id=6759236940" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
