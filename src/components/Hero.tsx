"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { FadeIn } from "./FadeIn";
import { AppStoreButton } from "./AppStoreButton";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-chapter-highlights/[0.04] blur-[150px]" />

      <div className="relative flex flex-col items-center text-center">
        {/* Micro label */}
        <FadeIn>
          <div className="flex items-center gap-2.5">
            <img
              src="/app-icon.png"
              alt="Melior"
              width={36}
              height={36}
              className="rounded-[9px] shadow-soft"
            />
            <span className="text-[11px] font-medium tracking-[0.2em] text-melior-text-tertiary uppercase">
              {t.hero.label}
            </span>
          </div>
        </FadeIn>

        {/* Headline — editorial split: normal + italic */}
        <FadeIn delay={120} className="mt-10 md:mt-12">
          <h1 className="font-serif text-melior-text-primary">
            <span className="block text-[2.5rem] font-semibold leading-[1.08] tracking-tight md:text-[3.75rem] lg:text-[4.5rem]">
              {t.hero.taglineLine1}
            </span>
            <span className="block text-[2.5rem] font-semibold leading-[1.08] tracking-tight italic md:text-[3.75rem] lg:text-[4.5rem]">
              {t.hero.taglineLine2}
            </span>
          </h1>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={240} className="mt-6 md:mt-8">
          <p className="max-w-md text-base leading-relaxed text-melior-text-secondary md:text-lg">
            {t.hero.subtitle.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={360} className="mt-10">
          <AppStoreButton />
        </FadeIn>
      </div>

      {/* Scroll hint */}
      <FadeIn delay={600} className="absolute bottom-8">
        <button
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          className="flex flex-col items-center gap-2 text-melior-text-tertiary transition-colors duration-200 hover:text-melior-text-secondary"
        >
          <span className="text-[10px] tracking-[0.15em] uppercase">
            {t.hero.scrollHint}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
            style={{ animationDuration: "2s" }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </FadeIn>
    </section>
  );
}
