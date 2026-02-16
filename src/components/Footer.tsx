"use client";

import { useLocale } from "@/providers/LocaleProvider";
import { FadeIn } from "./FadeIn";
import { AppStoreButton } from "./AppStoreButton";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="relative py-28 md:py-36">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6">
        {/* Short divider */}
        <div className="mb-16 h-px w-12 bg-melior-border/50" />

        <FadeIn>
          <p className="text-center text-sm text-melior-text-secondary">
            {t.footer.lead}
          </p>
        </FadeIn>

        <FadeIn delay={80}>
          <p className="mt-4 text-center font-serif text-3xl font-semibold italic leading-snug text-melior-text-primary md:text-4xl">
            {t.footer.closing}
          </p>
        </FadeIn>

        <FadeIn delay={160} className="mt-10">
          <AppStoreButton />
        </FadeIn>

        <FadeIn delay={240}>
          <div className="mt-20 flex items-center gap-6 text-[12px] text-melior-text-tertiary">
            <a
              href="#"
              className="transition-colors duration-200 hover:text-melior-text-secondary"
            >
              {t.footer.privacy}
            </a>
            <span className="text-melior-border/40">·</span>
            <a
              href="https://kexin.li"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-melior-text-secondary"
            >
              {t.footer.developer}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <p className="mt-4 text-[11px] text-melior-text-tertiary/50">
            {t.footer.copyright}
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}
