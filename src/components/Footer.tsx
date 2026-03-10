"use client";

import { useTranslations } from "next-intl";

interface FooterProps {
  showLinks?: boolean;
}

export default function Footer({ showLinks = false }: FooterProps) {
  const t = useTranslations("footer");

  return (
    <footer className="site-footer">
      <div className="footer-rule" />

      <div className="footer-brand">Melior</div>

      {showLinks && (
        <nav className="footer-links">
          <a href="/privacy">{t("privacy")}</a>
          <span className="footer-dot" />
          <a href="/support">{t("support")}</a>
          <span className="footer-dot" />
          <a href="mailto:xyzzy.baz@icloud.com">{t("contact")}</a>
        </nav>
      )}

      <p className="footer-credit">
        Crafted with{" "}
        <svg className="footer-heart" viewBox="0 0 16 15" aria-label="love">
          <path d="M8 14s-5.5-3.5-6.8-6.4C.2 5.5.8 3.2 2.6 2.2a3.6 3.6 0 0 1 4.2.5L8 3.8l1.2-1.1a3.6 3.6 0 0 1 4.2-.5c1.8 1 2.4 3.3 1.4 5.4C13.5 10.5 8 14 8 14z" />
        </svg>
        {" "}by{" "}
        <a href="https://kexin.li">Kexin</a>
      </p>
    </footer>
  );
}
