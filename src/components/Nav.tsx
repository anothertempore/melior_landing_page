"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

interface NavProps {
  navRef?: React.RefObject<HTMLElement | null>;
}

export default function Nav({ navRef }: NavProps) {
  const locale = useLocale();

  function switchLang(newLocale: "zh" | "en") {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    window.location.reload();
  }

  return (
    <nav
      className="nav absolute top-0 left-0 right-0 z-100 flex items-center justify-between px-7 py-[18px] max-sm:px-5 max-sm:py-3.5 transition-colors duration-300"
      ref={navRef}
      aria-label="Main navigation"
    >
      <Link className="nav-logo font-serif text-[17px] font-normal tracking-[.08em] text-text no-underline transition-colors duration-300" href="/">
        Melior
      </Link>
      <div className="nav-right flex items-center gap-1" role="group" aria-label="Language">
        <button
          className={`font-serif text-[11px] font-medium tracking-[.08em] px-3 py-1 border-none bg-transparent text-faint cursor-pointer rounded-full transition-all duration-300 ${locale === "zh" ? "on !bg-text !text-bg" : ""}`}
          onClick={() => switchLang("zh")}
          aria-label="切换到中文"
          aria-pressed={locale === "zh"}
        >
          中
        </button>
        <button
          className={`font-serif text-[11px] font-medium tracking-[.08em] px-3 py-1 border-none bg-transparent text-faint cursor-pointer rounded-full transition-all duration-300 ${locale === "en" ? "on !bg-text !text-bg" : ""}`}
          onClick={() => switchLang("en")}
          aria-label="Switch to English"
          aria-pressed={locale === "en"}
        >
          EN
        </button>
      </div>
    </nav>
  );
}
