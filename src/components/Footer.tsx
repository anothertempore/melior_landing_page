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
        Made by{" "}
        <a href="https://kexin.li">Kexin</a>
      </p>
    </footer>
  );
}
