export type Lang = "zh" | "en";

export interface I18nText {
  zh: string;
  en: string;
}

export function t(texts: I18nText, lang: Lang) {
  return texts[lang];
}

const LANG_KEY = "melior-lang";

export function getSavedLang(): Lang {
  if (typeof window === "undefined") return "zh";
  const saved = localStorage.getItem(LANG_KEY);
  return saved === "en" ? "en" : "zh";
}

export function saveLang(lang: Lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
}
