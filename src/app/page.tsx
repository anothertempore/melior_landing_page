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
      {/* Ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-screen pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(200,195,185,.07), transparent 70%)" }}
        aria-hidden="true"
      />

      <Nav navRef={navRef} />

      <main>
        {/* ── 1. HERO ── */}
        <section
          className="hero relative min-h-screen flex flex-col justify-center items-center text-center px-8 pt-[100px] pb-20 overflow-hidden"
          aria-label={t("ariaHero")}
        >
          <div className="book mb-12" ref={bookRef} aria-hidden="true">
            <div className="book-cover">
              <div className="book-spine" />
              <div className="book-inner">
                <span className="font-serif text-[clamp(22px,3.5vw,30px)] font-light tracking-[.15em] text-gold drop-shadow-[0_1px_1px_rgba(0,0,0,.06)]">2025</span>
                <span className="w-6 h-px bg-gold opacity-35" />
                <span className="font-serif text-[clamp(11px,1.8vw,14px)] font-normal tracking-[.25em] text-gold drop-shadow-[0_1px_1px_rgba(0,0,0,.06)]">Melior</span>
              </div>
              <div className="book-ribbon" />
            </div>
            <div className="book-pages" />
            <div className="book-shadow" />
          </div>

          <h1
            className="hero-title-anim font-serif text-[clamp(48px,9vw,80px)] font-light tracking-[.06em] text-text z-1"
            ref={heroTitleRef}
          >
            Melior
          </h1>
          <p
            className="hero-tag-anim zh-font zh-hero-tag font-serif text-[clamp(18px,2.2vw,22px)] font-normal text-text tracking-[.03em] z-1 mt-3.5 leading-relaxed"
            ref={heroTagRef}
          >
            {t("heroTag")}
          </p>

          <div className="hero-cta-anim mt-12 z-1" ref={heroCtaRef}>
            <a href="#" className="cta-btn cta-btn-ring">
              {APPLE_ICON}
              <span>{t("heroCta")}</span>
            </a>
          </div>

          <div
            className="hero-scroll-anim absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            ref={heroScrollRef}
            aria-hidden="true"
          >
            <span className="font-serif text-[10px] tracking-[.25em] uppercase text-faint opacity-50">Scroll</span>
            <span className="w-px h-6 opacity-40 animate-[breathe_2.4s_ease-in-out_infinite]" style={{ background: "linear-gradient(to bottom, var(--color-faint), transparent)" }} />
          </div>
        </section>

        {/* ── 2. SHOWCASE ── */}
        <section
          className="relative overflow-hidden text-center px-8 pt-[100px] pb-[60px] max-sm:px-5 max-sm:pt-20 max-sm:pb-10"
          aria-label={t("ariaShowcase")}
        >
          <div className="hl reveal" />
          <h2 className="zh-section-title font-serif text-[clamp(28px,4.5vw,40px)] font-normal tracking-[.04em] text-text text-center mb-4 leading-tight reveal">
            {t("showcaseTitle")}
          </h2>
          <p className="zh-font zh-showcase-line font-serif text-[clamp(19px,2.4vw,24px)] font-light text-muted leading-[1.7] mb-14 reveal">
            {t("showcaseLine")}
          </p>

          <div className="phones flex justify-center items-center relative z-1 min-h-[460px] reveal rd1" aria-hidden="true">
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
                    <div className="s-lbl" style={{ color: "var(--color-ch2)" }}>{t("sLbl2")}</div>
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
                  <div className="s-sum-ch" style={{ color: "var(--color-ch2)" }}>{t("sSumCh2")}</div>
                  <div className="s-sum-a">{t("sSumA2")}</div>
                  <div className="s-sum-ln" />
                  <div className="s-sum-ch" style={{ color: "var(--color-ch3)" }}>{t("sSumCh3")}</div>
                  <div className="s-sum-a">{t("sSumA3")}</div>
                </div>
              </div>
            </div>
          </div>

          <p className="zh-font zh-chapters-line font-serif text-[clamp(15px,1.8vw,18px)] font-normal text-muted text-center pt-9 px-5 tracking-[.04em] leading-relaxed reveal rd2">
            {t("chaptersLine")}
          </p>
        </section>

        {/* ── 3. TABLE OF CONTENTS ── */}
        <section
          className="flex justify-center relative px-8 py-[100px] pb-[120px] max-sm:px-5 max-sm:py-20 max-sm:pb-[100px]"
          style={{ background: "linear-gradient(180deg, var(--color-bg) 0%, #F3F2F0 50%, var(--color-bg) 100%)" }}
          aria-label={t("ariaChapters")}
        >
          <div className="toc-page reveal">
            <div className="zh-font font-serif text-[clamp(14px,1.6vw,16px)] font-normal tracking-[.35em] text-muted text-center mb-[clamp(32px,4vw,48px)]">
              {t("tocTitle")}
            </div>
            <div className="flex flex-col">
              {([
                { num: "一", name: t("ch1Name"), q: t("ch1Q"), color: "toc-c1", delay: "" },
                { num: "二", name: t("ch2Name"), q: t("ch2Q"), color: "toc-c2", delay: "rd1" },
                { num: "三", name: t("ch3Name"), q: t("ch3Q"), color: "toc-c3", delay: "rd1" },
                { num: "四", name: t("ch4Name"), q: t("ch4Q"), color: "toc-c4", delay: "rd2" },
                { num: "五", name: t("ch5Name"), q: t("ch5Q"), color: "toc-c5", delay: "rd2" },
                { num: "六", name: t("ch6Name"), q: t("ch6Q"), color: "toc-c6", delay: "rd3" },
              ] as const).map((ch, i, arr) => (
                <div
                  key={ch.num}
                  className={`reveal ${ch.delay} flex items-baseline gap-[clamp(10px,2vw,16px)] py-[clamp(13px,1.8vw,18px)] ${i < arr.length - 1 ? "border-b border-stroke/50" : ""}`}
                >
                  <span className="font-serif text-[clamp(12px,1.3vw,14px)] font-normal text-muted min-w-4 shrink-0">{ch.num}</span>
                  <span className={`zh-font zh-toc-name font-serif text-[clamp(17px,2.2vw,22px)] font-medium tracking-[.04em] shrink-0 whitespace-nowrap ${ch.color}`}>{ch.name}</span>
                  <span className="flex-1 border-b border-dotted border-stroke mb-1 min-w-5 opacity-40 max-sm:hidden" />
                  <span className="zh-font zh-toc-q text-[clamp(14px,1.5vw,16px)] font-light text-muted whitespace-nowrap overflow-hidden text-ellipsis max-w-[clamp(140px,22vw,220px)] max-sm:hidden">{ch.q}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. BOOKSHELF — Year over Year ── */}
        <section
          className="yoy-grain bg-dark text-dark-text px-8 py-30 relative overflow-hidden max-sm:px-5 max-sm:py-[100px]"
          id="yoy"
          ref={yoyRef}
          aria-label={t("ariaYoy")}
        >
          <div className="max-w-[900px] mx-auto relative z-1">
            <h2 className="zh-section-title font-serif text-[clamp(28px,4.5vw,40px)] font-normal tracking-[.04em] text-dark-text text-center mb-4 leading-tight reveal">
              {t("yoyTitle")}
            </h2>
            <p className="zh-section-sub font-serif text-[clamp(16px,1.9vw,19px)] font-light text-dark-muted text-center mb-12 tracking-[.03em] leading-relaxed reveal">
              {t("yoySub")}
            </p>

            {/* Shelf with book spines */}
            <div className="flex items-end justify-center gap-[clamp(4px,1.2vw,8px)] relative pb-6 mb-14 reveal" aria-hidden="true">
              <div className="shelf-book shelf-b1"><span>2024</span></div>
              <div className="shelf-book shelf-b2"><span>2025</span></div>
              <div className="shelf-book shelf-b3"><span>2026</span></div>
              <div className="shelf-book shelf-b4"><span>2027</span></div>
              <div className="shelf-board" />
            </div>

            <div
              className="yoy-q-mark zh-font zh-yoy-q text-center mb-14 relative font-serif text-[clamp(23px,3.2vw,30px)] font-normal italic text-dark-text leading-[1.7] reveal"
              dangerouslySetInnerHTML={{ __html: t.raw("yoyQ") }}
            />

            <div className="grid grid-cols-4 gap-4 items-start max-[700px]:grid-cols-2 max-[700px]:gap-3 max-sm:grid-cols-1 reveal">
              {([
                { year: "2024", text: t("yoy2024"), opacity: "opacity-60 hover:opacity-[.78]" },
                { year: "2025", text: t("yoy2025"), opacity: "opacity-75 hover:opacity-90" },
                { year: "2026", text: t("yoy2026"), opacity: "opacity-90 hover:opacity-100" },
              ] as const).map((card) => (
                <div
                  key={card.year}
                  className={`yoy-card-texture relative overflow-hidden rounded-2xl p-7 px-6 max-sm:p-[22px] max-sm:px-[18px] border border-dark-stroke transition-all duration-600 hover:-translate-y-1 ${card.opacity}`}
                  style={{
                    background: "linear-gradient(170deg, #302E32, var(--color-dark-card))",
                    boxShadow: "0 2px 8px rgba(0,0,0,.2), 0 8px 24px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.03)",
                  }}
                >
                  <div className="font-serif text-[clamp(28px,3.5vw,40px)] font-light text-dark-text mb-4 leading-none">{card.year}</div>
                  <div className="w-5 h-px mb-4 opacity-30" style={{ background: "linear-gradient(90deg, var(--color-gold-light), transparent)" }} />
                  <div className="zh-font zh-yoy-card-text text-base font-light text-dark-text leading-[1.9] tracking-[.01em]">{card.text}</div>
                </div>
              ))}
              <div
                className="yoy-card-texture relative overflow-hidden rounded-2xl p-7 px-6 max-sm:p-[22px] max-sm:px-[18px] border border-dashed border-dark-stroke opacity-40 hover:opacity-55 hover:-translate-y-1 transition-all duration-600"
                style={{ background: "transparent" }}
              >
                <div className="font-serif text-[clamp(28px,3.5vw,40px)] font-light text-dark-text mb-4 leading-none">2027</div>
                <div className="w-5 h-px mb-4 opacity-30" style={{ background: "linear-gradient(90deg, var(--color-gold-light), transparent)" }} />
                <div className="zh-font font-serif text-[15px] italic text-dark-muted">{t("yoyPending")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. PROMISE — Privacy principles ── */}
        <section className="bg-bg relative">
          <div className="max-w-[880px] mx-auto px-8 py-30 relative z-1 max-sm:px-5 max-sm:py-20">
            <h2 className="zh-section-title font-serif text-[clamp(28px,4.5vw,40px)] font-normal tracking-[.04em] text-text text-center mb-4 leading-tight reveal">
              {t("promiseTitle")}
            </h2>
            <p className="zh-section-sub font-serif text-[clamp(16px,1.9vw,19px)] font-light text-muted text-center mb-12 tracking-[.03em] leading-relaxed reveal">
              {t("promiseSub")}
            </p>
            <div className="grid grid-cols-4 gap-[clamp(20px,3vw,40px)] max-[700px]:grid-cols-2 max-sm:grid-cols-1">
              {([
                {
                  label: t("badge1"), desc: t("badge1Desc"), delay: "",
                  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="2" y1="2" x2="22" y2="22"/></svg>,
                },
                {
                  label: t("badge2"), desc: t("badge2Desc"), delay: "rd1",
                  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="3" y1="9" x2="9" y2="9"/><line x1="2" y1="2" x2="22" y2="22"/></svg>,
                },
                {
                  label: t("badge3"), desc: t("badge3Desc"), delay: "rd2",
                  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><line x1="2" y1="2" x2="22" y2="22"/></svg>,
                },
                {
                  label: t("badge4"), desc: t("badge4Desc"), delay: "rd3",
                  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
                },
              ] as const).map((item, i) => (
                <div
                  key={i}
                  className={`promise-card-texture reveal ${item.delay} text-center p-8 px-5 max-sm:p-6 max-sm:px-4 rounded-lg relative border border-black/4 transition-all duration-400 hover:-translate-y-[3px] hover:shadow-[0_2px_6px_rgba(0,0,0,.04),0_8px_20px_rgba(0,0,0,.05)]`}
                  style={{
                    background: "linear-gradient(170deg, rgba(255,255,255,.8), rgba(250,249,247,.5))",
                    boxShadow: "0 1px 3px rgba(0,0,0,.03), 0 4px 12px rgba(0,0,0,.03)",
                  }}
                >
                  <div className="w-9 h-9 mx-auto mb-6 text-muted opacity-50">{item.svg}</div>
                  <div className="zh-font zh-promise-label font-serif text-[clamp(18px,2.4vw,24px)] font-semibold tracking-[.04em] text-text mb-3">{item.label}</div>
                  <div className="zh-font zh-promise-desc text-[14px] font-light text-faint leading-[1.8] tracking-[.01em]">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. ENDING ── */}
        <section
          className="ending-glow relative text-center max-w-[600px] mx-auto px-8 py-20 max-sm:px-5 max-sm:py-[100px]"
          aria-label={t("ariaDownload")}
        >
          <h2
            className="zh-font zh-ending-title font-serif text-[clamp(30px,5vw,48px)] font-normal leading-[1.4] mb-4 relative z-1 reveal"
            dangerouslySetInnerHTML={{ __html: t.raw("endingTitle") }}
          />
          <div className="relative z-1 mt-10 reveal">
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
