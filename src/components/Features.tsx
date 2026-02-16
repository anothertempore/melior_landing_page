"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { FadeIn } from "./FadeIn";

const featureIcons = [
  <svg key="write" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>,
  <svg key="lock" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  <svg key="sparkle" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  <svg key="sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
];

export function Features() {
  const { t } = useLocale();

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <p className="text-center text-[11px] font-medium tracking-[0.2em] text-melior-text-tertiary uppercase">
            {t.features.label}
          </p>
          <h2 className="mt-4 text-center font-serif text-3xl font-semibold text-melior-text-primary md:text-4xl">
            {t.features.title}
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {t.features.items.map((item, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="group rounded-card-md border border-melior-border/40 bg-melior-bg-light/50 p-6 transition-all duration-300 hover:border-melior-border/70 hover:bg-melior-bg-light hover:shadow-soft">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-melior-surface text-melior-text-secondary transition-colors duration-300 group-hover:text-melior-text-primary">
                  {featureIcons[i]}
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-melior-text-primary">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-melior-text-secondary">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
