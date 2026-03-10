"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const APPLE_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

export default function Home() {
  const t = useTranslations("home");
  const navRef = useRef<HTMLElement>(null);
  const yoyRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroTagRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);

  // Hero animation — the book appears
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => bookRef.current?.classList.add("on"), 300));
    timers.push(setTimeout(() => heroTitleRef.current?.classList.add("on"), 1200));
    timers.push(setTimeout(() => heroTagRef.current?.classList.add("on"), 1600));
    timers.push(setTimeout(() => heroCtaRef.current?.classList.add("on"), 2200));
    timers.push(setTimeout(() => heroScrollRef.current?.classList.add("on"), 2800));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) {
      document.querySelectorAll(".reveal").forEach((e) => e.classList.add("v"));
      return;
    }
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (x.isIntersecting) x.target.classList.add("v");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((e) => ob.observe(e));
    return () => ob.disconnect();
  }, []);

  // Nav dark mode on YOY section
  useEffect(() => {
    const nav = navRef.current;
    const yoy = yoyRef.current;
    if (!nav || !yoy) return;
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => nav.classList.toggle("dk", x.isIntersecting));
      },
      { threshold: 0.3 }
    );
    ob.observe(yoy);
    return () => ob.disconnect();
  }, []);

  return (
    <>
      <div className="ambient" aria-hidden="true" />

      <Nav navRef={navRef} />

      <main>
        {/* ── 1. HERO — The Book ── */}
        <section className="hero" aria-label={t("ariaHero")}>
          <div className="book" ref={bookRef} aria-hidden="true">
            <div className="book-cover">
              <div className="book-spine" />
              <div className="book-inner">
                <span className="book-year">2025</span>
                <span className="book-rule" />
                <span className="book-brand">Melior</span>
              </div>
              <div className="book-ribbon" />
            </div>
            <div className="book-pages" />
            <div className="book-shadow" />
          </div>

          <h1 className="hero-title" ref={heroTitleRef}>Melior</h1>
          <p className="hero-tag" ref={heroTagRef}>{t("heroTag")}</p>

          <div className="hero-cta" ref={heroCtaRef}>
            <a href="#" className="cta-btn cta-btn-ring">
              {APPLE_ICON}
              <span>{t("heroCta")}</span>
            </a>
          </div>

          <div className="hero-scroll" ref={heroScrollRef} aria-hidden="true">
            <span className="hero-scroll-text">Scroll</span>
            <span className="hero-scroll-arrow" />
          </div>
        </section>

        {/* ── 2. SHOWCASE — Inside the Book ── */}
        <section className="showcase" aria-label={t("ariaShowcase")}>
          <div className="hl reveal" />
          <p className="showcase-line reveal">{t("showcaseLine")}</p>

          <div className="phones reveal rd1" aria-hidden="true">
            {/* Left — Chapter list */}
            <div className="ph ph-2">
              <div className="ph-scr"><div className="ph-notch" />
                <div className="s-ch">
                  <div className="s-ch-t">{t("sChT")}</div>
                  <div className="s-ch-s">Highlights</div>
                  <div className="s-qr"><span className="s-qd dn" /><span className="s-qt dn">{t("sQ1")}</span></div>
                  <div className="s-qr"><span className="s-qd dn" /><span className="s-qt dn">{t("sQ2")}</span></div>
                  <div className="s-qr"><span className="s-qd" /><span className="s-qt">{t("sQ3")}</span></div>
                  <div className="s-qr"><span className="s-qd" /><span className="s-qt">{t("sQ4")}</span></div>
                  <div className="s-qr"><span className="s-qd" /><span className="s-qt">{t("sQ5")}</span></div>
                </div>
              </div>
            </div>
            {/* Center — Home */}
            <div className="ph ph-0">
              <div className="ph-scr"><div className="ph-notch" />
                <div className="s-home">
                  <div className="s-ink s-ink-1" />
                  <div className="s-ink s-ink-2" />
                  <div className="s-yr">2025</div>
                  <div className="s-sub" dangerouslySetInnerHTML={{ __html: t.raw("sSub") }} />
                  <div className="s-card">
                    <div className="s-lbl">{t("sLbl1")}</div>
                    <div className="s-q">{t("sCardQ1")}</div>
                    <div className="s-h">{t("sHint")}</div>
                  </div>
                  <div className="s-card s-card-2">
                    <div className="s-lbl" style={{ color: "var(--ch2)" }}>{t("sLbl2")}</div>
                    <div className="s-q">{t("sCardQ2")}</div>
                    <div className="s-h">{t("sHint")}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right — Summary */}
            <div className="ph ph-1">
              <div className="ph-scr"><div className="ph-notch" />
                <div className="s-sum">
                  <div className="s-sum-yr">2025</div>
                  <div className="s-sum-lbl">{t("sSumLbl")}</div>
                  <div className="s-sum-ln" />
                  <div className="s-sum-ch">{t("sSumCh1")}</div>
                  <div className="s-sum-a">{t("sSumA1")}</div>
                  <div className="s-sum-ln" />
                  <div className="s-sum-ch" style={{ color: "var(--ch2)" }}>{t("sSumCh2")}</div>
                  <div className="s-sum-a">{t("sSumA2")}</div>
                  <div className="s-sum-ln" />
                  <div className="s-sum-ch" style={{ color: "var(--ch3)" }}>{t("sSumCh3")}</div>
                  <div className="s-sum-a">{t("sSumA3")}</div>
                </div>
              </div>
            </div>
          </div>

          <p className="chapters-line reveal rd2">{t("chaptersLine")}</p>
        </section>

        {/* ── 3. PULL QUOTE — One page, one question ── */}
        <section className="pullquote" aria-label={t("ariaQuote")}>
          <div className="pq-mark reveal" aria-hidden="true">&ldquo;</div>
          <div className="pq-text reveal rd1" dangerouslySetInnerHTML={{ __html: t.raw("pqText") }} />
          <div className="pq-chapter reveal rd2">{t("pqChapter")}</div>
        </section>

        {/* ── 4. BOOKSHELF — Year over Year ── */}
        <section className="yoy" id="yoy" ref={yoyRef} aria-label={t("ariaYoy")}>
          <div className="yoy-in">
            {/* Shelf with book spines */}
            <div className="shelf reveal" aria-hidden="true">
              <div className="shelf-book shelf-b1"><span>2024</span></div>
              <div className="shelf-book shelf-b2"><span>2025</span></div>
              <div className="shelf-book shelf-b3"><span>2026</span></div>
              <div className="shelf-book shelf-b4"><span>2027</span></div>
              <div className="shelf-board" />
            </div>

            <div className="yoy-q reveal" dangerouslySetInnerHTML={{ __html: t.raw("yoyQ") }} />

            <div className="yoy-cards reveal">
              <div className="yoy-card">
                <div className="yoy-card-year">2024</div>
                <div className="yoy-card-rule" />
                <div className="yoy-card-text">{t("yoy2024")}</div>
              </div>
              <div className="yoy-card">
                <div className="yoy-card-year">2025</div>
                <div className="yoy-card-rule" />
                <div className="yoy-card-text">{t("yoy2025")}</div>
              </div>
              <div className="yoy-card">
                <div className="yoy-card-year">2026</div>
                <div className="yoy-card-rule" />
                <div className="yoy-card-text">{t("yoy2026")}</div>
              </div>
              <div className="yoy-card yoy-card-pending">
                <div className="yoy-card-year">2027</div>
                <div className="yoy-card-rule" />
                <div className="yoy-pending">{t("yoyPending")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. ENDING ── */}
        <section className="ending" aria-label={t("ariaDownload")}>
          <div className="ending-badges reveal">
            <span className="ending-badge">{t("badge1")}</span>
            <span className="ending-badge">{t("badge2")}</span>
            <span className="ending-badge">{t("badge3")}</span>
            <span className="ending-badge">{t("badge4")}</span>
          </div>
          <div className="hl reveal mb-14" />
          <h2 className="ending-title reveal" dangerouslySetInnerHTML={{ __html: t.raw("endingTitle") }} />
          <div className="ending-cta reveal">
            <a href="#" className="cta-btn">
              {APPLE_ICON}
              <span>{t("endingCta")}</span>
            </a>
          </div>
        </section>
      </main>

      <Footer showLinks />
    </>
  );
}
