"use client";

import { useTranslations } from "next-intl";

interface FooterProps {
  showLinks?: boolean;
}

const footLinkClass = "text-[11px] font-light text-[var(--faint)] no-underline tracking-[.06em] transition-colors duration-300 hover:text-[var(--muted)]";

export default function Footer({ showLinks = false }: FooterProps) {
  const t = useTranslations("footer");

  return (
    <footer className="pt-20 pb-16 text-center">
      <div className="mx-auto mb-12" style={{ width: "48px", height: "0.5px", background: "linear-gradient(90deg, transparent, var(--gold-warm) 50%, transparent)", opacity: 0.3 }} />
      <div className="font-[family-name:var(--font-cormorant)] text-[18px] font-normal tracking-[.1em] text-[var(--text)] mb-5">
        Melior
      </div>
      {showLinks && (
        <div className="flex justify-center gap-8 mb-5">
          <a className={footLinkClass} href="/privacy">{t("privacy")}</a>
          <a className={footLinkClass} href="/support">{t("support")}</a>
          <a className={footLinkClass} href="mailto:xyzzy.baz@icloud.com">{t("contact")}</a>
        </div>
      )}
      <p className="text-[10px] text-[var(--faint)] mt-5 font-light tracking-wide">
        Made by{" "}
        <a
          className="text-[var(--muted)] no-underline border-b border-[var(--stroke)] transition-colors duration-300 pb-px hover:text-[var(--gold-warm)]"
          href="https://kexin.li"
        >
          Kexin
        </a>
      </p>
    </footer>
  );
}
