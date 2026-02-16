import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LocaleProvider } from "@/providers/LocaleProvider";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Melior — A quiet space for year-end reflection",
  description:
    "Melior guides you through 30 thoughtful reflection questions across 6 life dimensions. Private, offline, and beautifully simple. Available on iOS.",
  keywords: [
    "year-end reflection",
    "annual review",
    "journaling app",
    "iOS app",
    "self-reflection",
    "year in review",
  ],
  authors: [{ name: "Kexin", url: "https://kexin.li" }],
  openGraph: {
    title: "Melior — A quiet space for year-end reflection",
    description:
      "30 guided questions. 6 life dimensions. Your year, in your words.",
    siteName: "Melior",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Melior — A quiet space for year-end reflection",
    description:
      "30 guided questions. 6 life dimensions. Your year, in your words.",
  },
  icons: {
    icon: "/app-icon.png",
    apple: "/app-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Melior",
              operatingSystem: "iOS",
              applicationCategory: "LifestyleApplication",
              description: "A quiet space for year-end reflection",
              author: {
                "@type": "Person",
                name: "Kexin",
                url: "https://kexin.li",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${lora.variable} ${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
