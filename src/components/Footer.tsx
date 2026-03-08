import type { Lang } from "@/lib/i18n";

interface FooterProps {
  lang?: Lang;
  showLinks?: boolean;
}

const footLinkClass = "text-[11px] font-light text-[var(--faint)] no-underline tracking-[.06em] transition-colors duration-300 hover:text-[var(--muted)]";

export default function Footer({ lang = "zh", showLinks = false }: FooterProps) {
  return (
    <footer className="pt-12 px-8 pb-10 text-center border-t border-[var(--stroke)] max-w-[600px] mx-auto">
      <div className="font-[family-name:var(--font-cormorant)] text-[17px] font-normal tracking-[.08em] text-[var(--text)]">
        Melior
      </div>
      {showLinks && (
        <div className="flex justify-center gap-6 mt-3.5">
          <a className={footLinkClass} href="/privacy">
            {lang === "zh" ? "隐私政策" : "Privacy"}
          </a>
          <a className={footLinkClass} href="#">
            {lang === "zh" ? "关于" : "About"}
          </a>
          <a className={footLinkClass} href="mailto:hello@kexin.li">
            {lang === "zh" ? "联系" : "Contact"}
          </a>
        </div>
      )}
      <p className="text-[10px] text-[var(--faint)] mt-4 font-light">
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
