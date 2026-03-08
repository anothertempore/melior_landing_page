"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import type { Lang, I18nText } from "@/lib/i18n";
import { t, getSavedLang, saveLang } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const APPLE_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const i18n = {
  heroTag: { zh: "把每一年，写成一本书。", en: "Write your year into a book." },
  heroCta: { zh: "下载 Melior", en: "Download Melior" },
  showcaseLine: { zh: "不是年终总结，是一本关于你自己的书。", en: "Not a year-end review — a book about you." },
  chaptersLine: { zh: "30 个问题 · 6 个篇章", en: "30 Questions · 6 Chapters" },
  sChT: { zh: "高光时刻", en: "Highlights" },
  sQ1: { zh: "你今年去了哪些地方？", en: "Where did you go?" },
  sQ2: { zh: "最开心的事是什么？", en: "Happiest moment?" },
  sQ3: { zh: "最让你骄傲的事？", en: "Most proud of?" },
  sQ4: { zh: "你沉迷于什么？", en: "Obsessed with?" },
  sQ5: { zh: "哪张照片代表你的一年？", en: "Photo of the year?" },
  sSub: { zh: "这一年快过完了<br/>有些事值得记下来", en: "The year is ending<br/>Some things worth keeping" },
  sLbl1: { zh: "第一章 · 高光时刻", en: "Ch.1 · Highlights" },
  sCardQ1: { zh: "最开心的事是什么？", en: "What was the happiest thing?" },
  sHint: { zh: "✎ 轻触书写", en: "✎ Tap to write" },
  sLbl2: { zh: "第二章 · 深度羁绊", en: "Ch.2 · Bonds" },
  sCardQ2: { zh: "和谁在一起最自在？", en: "Who felt like home?" },
  sSumLbl: { zh: "年度总结", en: "Summary" },
  sSumCh1: { zh: "高光时刻", en: "Highlights" },
  sSumA1: { zh: "去了大理，在洱海边住了一个星期...", en: "Went to Dali, stayed by the lake..." },
  sSumCh2: { zh: "深度羁绊", en: "Bonds" },
  sSumA2: { zh: "和小林。不用说话也不尴尬...", en: "Xiao Lin. Silence isn't awkward..." },
  sSumCh3: { zh: "逆境重生", en: "Challenges" },
  sSumA3: { zh: "三月到五月，怀疑自己选错了方向...", en: "March to May, doubting my path..." },
  pqText: { zh: "那段时间，<br/>什么撑着你？", en: "What kept you<br/>going?" },
  pqChapter: { zh: "逆境重生", en: "Resilience" },
  yoyQ: { zh: "如果能回到年初，<br/>你想告诉自己什么？", en: "If you could go back to January,<br/>what would you tell yourself?" },
  yoy2024: { zh: "别怕。你以为过不去的那些事，后来都过去了。", en: "Don\u2019t be afraid. Everything you thought you couldn\u2019t survive \u2014 you did." },
  yoy2025: { zh: "少想一点，多做一点。你其实比自己以为的要勇敢。", en: "Think less, do more. You\u2019re braver than you think." },
  yoy2026: { zh: "慢一点没关系。按自己的节奏走就好。", en: "It\u2019s okay to go slow. Your own pace is enough." },
  yoyPending: { zh: "等你来写...", en: "Waiting for you..." },
  badge1: { zh: "无账号", en: "No Account" },
  badge2: { zh: "无广告", en: "No Ads" },
  badge3: { zh: "无追踪", en: "No Tracking" },
  badge4: { zh: "iCloud 存储", en: "iCloud Only" },
  endingTitle: { zh: "今年的你，<br/>有什么想说的？", en: "What would you like<br/>to say this year?" },
  endingCta: { zh: "下载 Melior", en: "Download Melior" },
} satisfies Record<string, I18nText>;

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const scrollLightRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const yoyRef = useRef<HTMLDivElement>(null);
  const heroLettersRef = useRef<HTMLDivElement>(null);
  const heroHlRef = useRef<HTMLDivElement>(null);
  const heroTagRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);

  const switchLang = useCallback((l: Lang) => {
    setLang(l);
    saveLang(l);
  }, []);

  // Restore saved language preference
  useEffect(() => {
    const saved = getSavedLang();
    setLang(saved);
    document.documentElement.lang = saved === "zh" ? "zh-Hans" : "en";
  }, []);

  // Hero animation sequence
  useEffect(() => {
    const letters = heroLettersRef.current?.querySelectorAll(".hero-l");
    if (!letters) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    letters.forEach((el, i) => {
      timers.push(setTimeout(() => el.classList.add("on"), 500 + i * 130));
    });
    const d = 500 + 6 * 130 + 350;
    timers.push(setTimeout(() => heroHlRef.current?.classList.add("on"), d));
    timers.push(setTimeout(() => heroTagRef.current?.classList.add("on"), d + 150));
    timers.push(setTimeout(() => heroCtaRef.current?.classList.add("on"), d + 750));
    timers.push(setTimeout(() => heroScrollRef.current?.classList.add("on"), d + 1250));
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

  // Scroll-responsive reading light + light leak parallax (combined)
  useEffect(() => {
    const light = scrollLightRef.current;
    const leaks = document.querySelectorAll<HTMLElement>(".leak");
    const speeds = [0.04, 0.025, 0.035, 0.02];
    if (!light) return;
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const docH = document.documentElement.scrollHeight - window.innerHeight;
          const pct = docH > 0 ? y / docH : 0;
          light!.style.top = 10 + pct * 75 + "vh";
          leaks.forEach((l, i) => {
            l.style.marginTop = -y * speeds[i] + "px";
          });
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mesh gradient */}
      <div className="mesh" aria-hidden="true">
        <div className="mesh-blob mesh-b1" />
        <div className="mesh-blob mesh-b2" />
        <div className="mesh-blob mesh-b3" />
        <div className="mesh-blob mesh-b4" />
        <div className="mesh-blob mesh-b5" />
      </div>

      {/* Light leaks */}
      <div className="leaks-container" aria-hidden="true">
        <div className="leak leak-1" />
        <div className="leak leak-2" />
        <div className="leak leak-3" />
        <div className="leak leak-4" />
      </div>
      <div className="scroll-light" ref={scrollLightRef} aria-hidden="true" />

      <Nav lang={lang} onLangChange={switchLang} navRef={navRef} />

      <main>
        {/* 1. HERO */}
        <section className="hero" aria-label={lang === "zh" ? "首页" : "Hero"}>
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-glow-2" aria-hidden="true" />
          <div className="hero-letters" ref={heroLettersRef} aria-label="Melior">
            <span className="hero-l" aria-hidden="true">M</span>
            <span className="hero-l" aria-hidden="true">e</span>
            <span className="hero-l" aria-hidden="true">l</span>
            <span className="hero-l hero-l-i" aria-hidden="true">i<span className="tittle" /></span>
            <span className="hero-l" aria-hidden="true">o</span>
            <span className="hero-l" aria-hidden="true">r</span>
          </div>
          <div className="hero-hl" ref={heroHlRef}><div className="hl" style={{ width: 60 }} /></div>
          <p className="hero-tag" ref={heroTagRef}>{t(i18n.heroTag, lang)}</p>
          <div className="hero-cta" ref={heroCtaRef}>
            <a href="#" className="cta-btn cta-btn-ring">
              {APPLE_ICON}
              <span>{t(i18n.heroCta, lang)}</span>
            </a>
          </div>
          <div className="hero-scroll" ref={heroScrollRef} aria-hidden="true">
            <span className="hero-scroll-text">Scroll</span>
            <span className="hero-scroll-arrow" />
          </div>
        </section>

        {/* 2. SHOWCASE */}
        <section className="showcase" aria-label={lang === "zh" ? "产品展示" : "Showcase"}>
          <div className="showcase-glow" aria-hidden="true" />
          <div className="showcase-glow-2" aria-hidden="true" />
          <div className="hl reveal mb-14" />
          <p className="showcase-line reveal">{t(i18n.showcaseLine, lang)}</p>
          <div className="phones reveal rd1" aria-hidden="true">
            {/* Left phone — Chapter list */}
            <div className="ph ph-2">
              <div className="ph-scr"><div className="ph-notch" />
                <div className="s-ch">
                  <div className="s-ch-t">{t(i18n.sChT, lang)}</div>
                  <div className="s-ch-s">Highlights</div>
                  <div className="s-qr"><span className="s-qd dn" /><span className="s-qt dn">{t(i18n.sQ1, lang)}</span></div>
                  <div className="s-qr"><span className="s-qd dn" /><span className="s-qt dn">{t(i18n.sQ2, lang)}</span></div>
                  <div className="s-qr"><span className="s-qd" /><span className="s-qt">{t(i18n.sQ3, lang)}</span></div>
                  <div className="s-qr"><span className="s-qd" /><span className="s-qt">{t(i18n.sQ4, lang)}</span></div>
                  <div className="s-qr"><span className="s-qd" /><span className="s-qt">{t(i18n.sQ5, lang)}</span></div>
                </div>
              </div>
            </div>
            {/* Center phone — Home */}
            <div className="ph ph-0">
              <div className="ph-scr"><div className="ph-notch" />
                <div className="s-home">
                  <div className="s-ink s-ink-1" />
                  <div className="s-ink s-ink-2" />
                  <div className="s-yr">2025</div>
                  <div className="s-sub" dangerouslySetInnerHTML={{ __html: t(i18n.sSub, lang) }} />
                  <div className="s-card">
                    <div className="s-lbl">{t(i18n.sLbl1, lang)}</div>
                    <div className="s-q">{t(i18n.sCardQ1, lang)}</div>
                    <div className="s-h">{t(i18n.sHint, lang)}</div>
                  </div>
                  <div className="s-card s-card-2">
                    <div className="s-lbl" style={{ color: "var(--ch2)" }}>{t(i18n.sLbl2, lang)}</div>
                    <div className="s-q">{t(i18n.sCardQ2, lang)}</div>
                    <div className="s-h">{t(i18n.sHint, lang)}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right phone — Summary */}
            <div className="ph ph-1">
              <div className="ph-scr"><div className="ph-notch" />
                <div className="s-sum">
                  <div className="s-sum-yr">2025</div>
                  <div className="s-sum-lbl">{t(i18n.sSumLbl, lang)}</div>
                  <div className="s-sum-ln" />
                  <div className="s-sum-ch">{t(i18n.sSumCh1, lang)}</div>
                  <div className="s-sum-a">{t(i18n.sSumA1, lang)}</div>
                  <div className="s-sum-ln" />
                  <div className="s-sum-ch" style={{ color: "var(--ch2)" }}>{t(i18n.sSumCh2, lang)}</div>
                  <div className="s-sum-a">{t(i18n.sSumA2, lang)}</div>
                  <div className="s-sum-ln" />
                  <div className="s-sum-ch" style={{ color: "var(--ch3)" }}>{t(i18n.sSumCh3, lang)}</div>
                  <div className="s-sum-a">{t(i18n.sSumA3, lang)}</div>
                </div>
              </div>
            </div>
          </div>
          <p className="chapters-line reveal rd2">{t(i18n.chaptersLine, lang)}</p>
        </section>

        {/* 3. PULL QUOTE */}
        <section className="pullquote" aria-label={lang === "zh" ? "引言" : "Quote"}>
          <div className="pq-mark reveal" aria-hidden="true">&ldquo;</div>
          <div className="pq-text reveal rd1" dangerouslySetInnerHTML={{ __html: t(i18n.pqText, lang) }} />
          <div className="pq-chapter reveal rd2">{t(i18n.pqChapter, lang)}</div>
        </section>

        {/* 4. YEAR-OVER-YEAR */}
        <section className="yoy" id="yoy" ref={yoyRef} aria-label={lang === "zh" ? "年度回顾" : "Year over Year"}>
          <div className="yoy-glow" aria-hidden="true" />
          <div className="yoy-glow-2" aria-hidden="true" />
          <div className="yoy-in">
            <div className="hl hl-dark reveal mb-10" />
            <div className="yoy-q reveal" dangerouslySetInnerHTML={{ __html: t(i18n.yoyQ, lang) }} />
            <div className="yoy-cards-wrap reveal">
              <div className="yoy-cards">
                <div className="yoy-card">
                  <div className="yoy-card-year">2024</div>
                  <div className="yoy-card-rule" />
                  <div className="yoy-card-text">{t(i18n.yoy2024, lang)}</div>
                </div>
                <div className="yoy-card">
                  <div className="yoy-card-year">2025</div>
                  <div className="yoy-card-rule" />
                  <div className="yoy-card-text">{t(i18n.yoy2025, lang)}</div>
                </div>
                <div className="yoy-card">
                  <div className="yoy-card-year">2026</div>
                  <div className="yoy-card-rule" />
                  <div className="yoy-card-text">{t(i18n.yoy2026, lang)}</div>
                </div>
                <div className="yoy-card">
                  <div className="yoy-card-year" style={{ color: "var(--dark-muted)" }}>2027</div>
                  <div className="yoy-card-rule" style={{ opacity: 0.15 }} />
                  <div className="yoy-pending">{t(i18n.yoyPending, lang)}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ENDING */}
        <section className="ending" aria-label={lang === "zh" ? "下载" : "Download"}>
          <div className="ending-glow" aria-hidden="true" />
          <div className="flex justify-center gap-7 mb-16 flex-wrap relative z-1 reveal">
            <span className="ending-badge">{t(i18n.badge1, lang)}</span>
            <span className="ending-badge">{t(i18n.badge2, lang)}</span>
            <span className="ending-badge">{t(i18n.badge3, lang)}</span>
            <span className="ending-badge">{t(i18n.badge4, lang)}</span>
          </div>
          <div className="hl reveal mb-14" />
          <h2 className="ending-title reveal" dangerouslySetInnerHTML={{ __html: t(i18n.endingTitle, lang) }} />
          <div className="relative z-1 mt-10 reveal">
            <a href="#" className="cta-btn">
              {APPLE_ICON}
              <span>{t(i18n.endingCta, lang)}</span>
            </a>
          </div>
        </section>
      </main>

      <Footer lang={lang} showLinks />
    </>
  );
}
