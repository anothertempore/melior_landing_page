"use client";

import Link from "next/link";
import type { Lang } from "@/lib/i18n";

interface NavProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  navRef?: React.RefObject<HTMLElement | null>;
}

export default function Nav({ lang, onLangChange, navRef }: NavProps) {
  return (
    <nav className="nav" ref={navRef} aria-label="Main navigation">
      <Link className="nav-logo" href="/">Melior</Link>
      <div className="nav-right" role="group" aria-label="Language">
        <button
          className={lang === "zh" ? "on" : ""}
          onClick={() => onLangChange("zh")}
          aria-label="切换到中文"
          aria-pressed={lang === "zh"}
        >
          中
        </button>
        <button
          className={lang === "en" ? "on" : ""}
          onClick={() => onLangChange("en")}
          aria-label="Switch to English"
          aria-pressed={lang === "en"}
        >
          EN
        </button>
      </div>
    </nav>
  );
}
