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
    <nav className="nav" ref={navRef} aria-label="Main navigation">
      <Link className="nav-logo" href="/">Melior</Link>
      <div className="nav-right" role="group" aria-label="Language">
        <button
          className={locale === "zh" ? "on" : ""}
          onClick={() => switchLang("zh")}
          aria-label="切换到中文"
          aria-pressed={locale === "zh"}
        >
          中
        </button>
        <button
          className={locale === "en" ? "on" : ""}
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
