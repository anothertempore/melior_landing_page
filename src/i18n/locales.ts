export type Locale = "en" | "zh";
export const defaultLocale: Locale = "en";

export interface FeatureItem {
  title: string;
  description: string;
}

export interface ChapterItem {
  name: string;
  subtitle: string;
  sampleQuestion: string;
}

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  header: {
    appName: string;
  };
  hero: {
    label: string;
    taglineLine1: string;
    taglineLine2: string;
    subtitle: string;
    cta: string;
    scrollHint: string;
  };
  features: {
    label: string;
    title: string;
    items: FeatureItem[];
  };
  chapters: {
    label: string;
    title: string;
    items: ChapterItem[];
  };
  footer: {
    lead: string;
    closing: string;
    privacy: string;
    developer: string;
    copyright: string;
  };
}
