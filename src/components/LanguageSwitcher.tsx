"use client";

import { useLocale } from "@/providers/LocaleProvider";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-0.5 text-[13px]">
      <button
        onClick={() => setLocale("en")}
        className={`rounded-md px-2 py-1 transition-all duration-200 ${
          locale === "en"
            ? "font-medium text-melior-text-primary"
            : "text-melior-text-tertiary hover:text-melior-text-secondary"
        }`}
      >
        EN
      </button>
      <span className="text-melior-border">/</span>
      <button
        onClick={() => setLocale("zh")}
        className={`rounded-md px-2 py-1 transition-all duration-200 ${
          locale === "zh"
            ? "font-medium text-melior-text-primary"
            : "text-melior-text-tertiary hover:text-melior-text-secondary"
        }`}
      >
        中
      </button>
    </div>
  );
}
