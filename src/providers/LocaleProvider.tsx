"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Locale, Translations } from "@/i18n/locales";
import { defaultLocale } from "@/i18n/locales";
import { en } from "@/i18n/en";
import { zh } from "@/i18n/zh";

const translations: Record<Locale, Translations> = { en, zh };

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  t: en,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.documentElement.lang = l === "zh" ? "zh-Hans" : "en";
  }, []);

  const t = translations[locale];

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
