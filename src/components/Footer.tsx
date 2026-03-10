"use client";

import { useTranslations } from "next-intl";

interface FooterProps {
  showLinks?: boolean;
}

export default function Footer({ showLinks = false }: FooterProps) {
  const t = useTranslations("footer");

  return (
    <footer className="px-8 pt-20 pb-15 text-center relative">
      {/* Decorative rule */}
      <div className="hl" />

      <div className="font-serif text-xl font-normal tracking-[.14em] text-text opacity-80 mb-7">
        Melior
      </div>

      {showLinks && (
        <nav className="flex items-center justify-center gap-5 mb-7">
          <a href="/privacy" className="font-serif text-[13px] font-normal tracking-[.08em] text-muted no-underline transition-colors duration-300 hover:text-gold-warm">
            {t("privacy")}
          </a>
          <span className="w-0.5 h-0.5 rounded-full bg-stroke" />
          <a href="/support" className="font-serif text-[13px] font-normal tracking-[.08em] text-muted no-underline transition-colors duration-300 hover:text-gold-warm">
            {t("support")}
          </a>
          <span className="w-0.5 h-0.5 rounded-full bg-stroke" />
          <a href="mailto:xyzzy.baz@icloud.com" className="font-serif text-[13px] font-normal tracking-[.08em] text-muted no-underline transition-colors duration-300 hover:text-gold-warm">
            {t("contact")}
          </a>
        </nav>
      )}

      <p className="text-xs text-muted font-light tracking-[.03em] opacity-70">
        Made by{" "}
        <a href="https://kexin.li" className="text-muted no-underline border-b border-transparent pb-px transition-all duration-300 hover:text-gold-warm hover:border-gold-warm">
          Kexin
        </a>
      </p>
    </footer>
  );
}
