"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { FadeIn } from "./FadeIn";

const chapterColors = [
  "#B58C65",
  "#6B8F83",
  "#8A7CA4",
  "#9C8A63",
  "#7A93AE",
  "#B08A6D",
];

export function Chapters() {
  const { t } = useLocale();

  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-melior-surface/30" />

      <div className="relative mx-auto max-w-3xl px-6">
        <FadeIn>
          <p className="text-center text-[11px] font-medium tracking-[0.2em] text-melior-text-tertiary uppercase">
            {t.chapters.label}
          </p>
          <h2 className="mt-4 text-center font-serif text-3xl font-semibold text-melior-text-primary md:text-4xl">
            {t.chapters.title}
          </h2>
        </FadeIn>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3">
          {t.chapters.items.map((chapter, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="group relative overflow-hidden rounded-card-md border border-melior-border/30 bg-melior-bg-light/60 p-5 transition-all duration-300 hover:border-melior-border/60 hover:bg-melior-bg-light hover:shadow-soft">
                {/* Color bar at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                  style={{ backgroundColor: chapterColors[i] }}
                />

                {/* Color dot with glow */}
                <div className="relative inline-block">
                  <div
                    className="absolute inset-0 -m-2 rounded-full blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-40"
                    style={{ backgroundColor: chapterColors[i] }}
                  />
                  <div
                    className="relative h-2.5 w-2.5 rounded-full transition-transform duration-300 ease-out group-hover:scale-[1.4]"
                    style={{ backgroundColor: chapterColors[i] }}
                  />
                </div>

                <h3 className="mt-3 text-sm font-semibold text-melior-text-primary">
                  {chapter.name}
                </h3>
                <p className="mt-0.5 text-[10px] tracking-[0.1em] text-melior-text-tertiary uppercase">
                  {chapter.subtitle}
                </p>

                {/* Sample question */}
                <p className="mt-3 text-xs leading-relaxed text-melior-text-secondary italic">
                  &ldquo;{chapter.sampleQuestion}&rdquo;
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
