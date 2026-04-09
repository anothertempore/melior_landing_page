"use client";

import { useLocale } from "next-intl";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

interface ChangelogVersion {
  version: string;
  date: string;
  items: string[];
}

const versionsZh: ChangelogVersion[] = [
  {
    version: "1.1.0",
    date: "2026 年 4 月",
    items: [
      "新增年份选择，可在首页和设置中切换回顾年份，回顾过去任意年份的内容",
      "修复首次启动时的界面闪烁",
      "界面细节优化",
    ],
  },
  {
    version: "1.0.3",
    date: "2026 年 3 月",
    items: [
      "新增繁体中文支持（台湾地区）",
      "优化引导页，新增可点击的继续按钮，更易发现",
      "全面支持 VoiceOver 无障碍功能",
    ],
  },
];

const versionsEn: ChangelogVersion[] = [
  {
    version: "1.1.0",
    date: "April 2026",
    items: [
      "Year picker: switch between years to revisit reflections from any past year",
      "Fixed a visual flash on app launch",
      "Interface refinements",
    ],
  },
  {
    version: "1.0.3",
    date: "March 2026",
    items: [
      "Added Traditional Chinese (zh-Hant) support for Taiwan users",
      "Improved onboarding with a tappable continue button",
      "Full VoiceOver accessibility support across all views",
    ],
  },
];

export default function Changelog() {
  const lang = useLocale();
  const versions = lang === "zh" ? versionsZh : versionsEn;

  return (
    <>
      <Nav />

      <main>
        <article className="prose-page">
          {lang === "zh" ? (
            <>
              <h1>更新记录</h1>
              <p className="prose-date">每一次更新，都是为了更好地陪你回顾这一年。</p>
            </>
          ) : (
            <>
              <h1>Changelog</h1>
              <p className="prose-date">Every update, a quieter way to reflect.</p>
            </>
          )}

          <div className="hl" style={{ margin: "0 0 48px" }} />

          {versions.map((v, idx) => (
            <div key={v.version} style={{ marginTop: idx === 0 ? 0 : "80px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
                <h2 style={{ margin: 0 }}>{v.version}</h2>
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--faint)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {v.date}
                </span>
              </div>
              <ul style={{ marginTop: "24px" }}>
                {v.items.map((item, i) => (
                  <li key={i} style={{ marginBottom: "12px" }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </article>
      </main>

      <Footer />
    </>
  );
}
