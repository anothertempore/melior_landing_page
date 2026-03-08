import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Melior — 把每一年，写成一本书",
  description:
    "Melior is a year-end reflection app for iOS. 30 questions, 6 chapters — write your year into a book.",
  openGraph: {
    title: "Melior — 把每一年，写成一本书",
    description:
      "Melior is a year-end reflection app for iOS. 30 questions, 6 chapters — write your year into a book.",
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans" className={cormorant.variable}>
      <body>{children}</body>
    </html>
  );
}
