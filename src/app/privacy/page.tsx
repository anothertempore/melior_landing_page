"use client";

import { useState, useEffect, useCallback } from "react";
import type { Lang } from "@/lib/i18n";
import { getSavedLang, saveLang } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

interface TocItem {
  id: string;
  label: string;
}

const tocZh: TocItem[] = [
  { id: "overview", label: "概述" },
  { id: "collect", label: "我们收集什么" },
  { id: "local", label: "本地存储的数据" },
  { id: "icloud", label: "iCloud 同步" },
  { id: "donts", label: "我们不做的事" },
  { id: "permissions", label: "权限使用" },
  { id: "sharing", label: "用户主动分享" },
  { id: "deletion", label: "数据删除" },
  { id: "children", label: "儿童隐私" },
  { id: "changes", label: "隐私政策变更" },
  { id: "contact", label: "联系我们" },
];

const tocEn: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "collect", label: "What We Collect" },
  { id: "local", label: "Data Stored Locally" },
  { id: "icloud", label: "iCloud Sync" },
  { id: "donts", label: "What We Don\u2019t Do" },
  { id: "permissions", label: "Permissions" },
  { id: "sharing", label: "User-Initiated Sharing" },
  { id: "deletion", label: "Data Deletion" },
  { id: "children", label: "Children\u2019s Privacy" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
];

const h2Class = "font-[family-name:var(--font-cormorant)] text-[clamp(18px,2.5vw,22px)] font-normal text-[var(--text)] tracking-[.02em] mt-12 mb-3 scroll-mt-20";
const pClass = "text-base leading-[1.9] text-[var(--muted)] mb-3";
const ulClass = "list-none p-0 mb-3";
const liClass = "text-base leading-[1.9] text-[var(--muted)] pl-4 relative mb-1 before:content-[''] before:absolute before:left-0 before:top-[11px] before:w-1 before:h-1 before:rounded-full before:bg-[var(--gold-warm)] before:opacity-50";
const aClass = "text-[var(--gold)] no-underline border-b border-transparent transition-all duration-300 hover:text-[var(--gold-light)] hover:border-[var(--gold-light)]";
const strongClass = "text-[var(--text)] font-medium";

function Toc({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="Table of contents" className="mb-10 pb-8 border-b border-[var(--stroke)]">
      <ol className="list-none p-0 m-0 columns-2 gap-x-8 max-sm:columns-1">
        {items.map((item, i) => (
          <li key={item.id} className="mb-1.5 break-inside-avoid">
            <a
              href={`#${item.id}`}
              className="text-sm text-[var(--muted)] no-underline transition-colors duration-300 hover:text-[var(--gold)] flex items-baseline gap-2"
            >
              <span className="text-[var(--faint)] text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function Privacy() {
  const [lang, setLang] = useState<Lang>("zh");

  useEffect(() => {
    const saved = getSavedLang();
    setLang(saved);
    document.documentElement.lang = saved === "zh" ? "zh-Hans" : "en";
  }, []);

  const switchLang = useCallback((l: Lang) => {
    setLang(l);
    saveLang(l);
  }, []);

  return (
    <>
      <Nav lang={lang} onLangChange={switchLang} />

      <main>
        <article className="max-w-[680px] mx-auto pt-20 px-8 pb-15 relative z-1">
          {lang === "zh" ? (
            <>
              <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,4vw,40px)] font-light text-[var(--text)] mb-2 leading-[1.3]">Melior 隐私政策</h1>
              <p className="text-[13px] text-[var(--faint)] mb-6">最后更新：2026年3月8日</p>
              <div className="hl mb-8" />

              <p className={`${pClass} text-[var(--text)] italic mb-8`}>
                简而言之：Melior 不收集你的任何数据。你的回忆只属于你自己。
              </p>

              <Toc items={tocZh} />

              <h2 id="overview" className={h2Class}>概述</h2>
              <p className={pClass}>
                Melior（以下简称&ldquo;本应用&rdquo;）是一款年度回顾反思应用。我们深知反思内容的私密性，因此在设计之初就将隐私保护作为核心原则。本应用不收集、不追踪、不分享你的任何个人数据。
              </p>

              <h2 id="collect" className={h2Class}>我们收集什么</h2>
              <p className={pClass}><strong className={strongClass}>简短回答：什么都不收集。</strong></p>
              <p className={pClass}>
                你在本应用中创建的所有内容——包括反思回答、附加的照片、以及主题偏好设置——全部存储在你的设备本地。我们没有服务器，不会接收或存储你的任何数据。
              </p>

              <h2 id="local" className={h2Class}>本地存储的数据</h2>
              <p className={pClass}>以下数据仅存在于你的设备上：</p>
              <ul className={ulClass}>
                <li className={liClass}><strong className={strongClass}>反思回答</strong>：你对每个问题的文字回答</li>
                <li className={liClass}><strong className={strongClass}>照片</strong>：你选择附加到回答中的图片</li>
                <li className={liClass}><strong className={strongClass}>应用设置</strong>：外观主题偏好（跟随系统/浅色/深色）</li>
                <li className={liClass}><strong className={strongClass}>引导状态</strong>：是否已完成首次使用引导</li>
              </ul>

              <h2 id="icloud" className={h2Class}>iCloud 同步</h2>
              <p className={pClass}>
                如果你在设备上启用了 iCloud，本应用的数据可能会通过 Apple 的 CloudKit 服务同步到你的 iCloud 账户，以便在你的多台 Apple 设备间保持一致。这一同步完全由 Apple 管理和加密，我们无法访问你的 iCloud 数据。你可以在系统设置中关闭本应用的 iCloud 同步。
              </p>

              <h2 id="donts" className={h2Class}>我们不做的事</h2>
              <ul className={ulClass}>
                <li className={liClass}><strong className={strongClass}>不使用分析工具</strong>：没有 Firebase、没有 Mixpanel、没有任何第三方分析 SDK</li>
                <li className={liClass}><strong className={strongClass}>不追踪用户</strong>：没有广告标识符、没有用户画像、没有行为追踪</li>
                <li className={liClass}><strong className={strongClass}>不投放广告</strong>：本应用不包含任何形式的广告</li>
                <li className={liClass}><strong className={strongClass}>不与第三方共享数据</strong>：你的数据不会被出售、出租或以任何方式提供给第三方</li>
              </ul>

              <h2 id="permissions" className={h2Class}>权限使用</h2>
              <p className={pClass}>本应用仅请求以下权限：</p>
              <ul className={ulClass}>
                <li className={liClass}><strong className={strongClass}>相册写入</strong>：当你选择将年度回顾分享卡片保存到相册时使用。这是可选操作，完全由你主动触发。本应用不会读取你的相册内容。</li>
              </ul>

              <h2 id="sharing" className={h2Class}>用户主动分享</h2>
              <p className={pClass}>以下情况下，数据可能离开你的设备，但均由你主动发起：</p>
              <ul className={ulClass}>
                <li className={liClass}><strong className={strongClass}>分享卡片</strong>：你可以通过系统分享功能将年度回顾卡片发送给他人，分享方式和对象完全由你控制</li>
                <li className={liClass}><strong className={strongClass}>发送反馈</strong>：你可以选择通过邮件发送反馈，邮件中会自动附带设备型号和系统版本信息，以帮助我们排查问题</li>
              </ul>

              <h2 id="deletion" className={h2Class}>数据删除</h2>
              <ul className={ulClass}>
                <li className={liClass}><strong className={strongClass}>删除应用</strong>：卸载本应用将删除设备上的所有本地数据</li>
                <li className={liClass}><strong className={strongClass}>iCloud 数据</strong>：可在&ldquo;系统设置 → Apple ID → iCloud → 管理存储空间&rdquo;中删除</li>
              </ul>

              <h2 id="children" className={h2Class}>儿童隐私</h2>
              <p className={pClass}>本应用不专门面向 13 岁以下的儿童，也不会有意收集儿童的个人信息。</p>

              <h2 id="changes" className={h2Class}>隐私政策变更</h2>
              <p className={pClass}>如果我们对本隐私政策进行重大修改，将在应用内通知你。你可以随时在应用设置中查看最新的隐私政策。</p>

              <h2 id="contact" className={h2Class}>联系我们</h2>
              <p className={pClass}>如果你对本隐私政策有任何疑问，请通过以下方式联系我们：</p>
              <p className={pClass}><a className={aClass} href="mailto:hello@kexin.li">hello@kexin.li</a></p>
            </>
          ) : (
            <>
              <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,4vw,40px)] font-light text-[var(--text)] mb-2 leading-[1.3]">Melior Privacy Policy</h1>
              <p className="text-[13px] text-[var(--faint)] mb-6">Last updated: March 8, 2026</p>
              <div className="hl mb-8" />

              <p className={`${pClass} text-[var(--text)] italic mb-8`}>
                In short: Melior collects none of your data. Your memories belong to you alone.
              </p>

              <Toc items={tocEn} />

              <h2 id="overview" className={h2Class}>Overview</h2>
              <p className={pClass}>
                Melior (&ldquo;the App&rdquo;) is a year-end reflection app. We understand the deeply personal nature of self-reflection, which is why privacy is a core design principle. This App does not collect, track, or share any of your personal data.
              </p>

              <h2 id="collect" className={h2Class}>What We Collect</h2>
              <p className={pClass}><strong className={strongClass}>The short answer: nothing.</strong></p>
              <p className={pClass}>
                Everything you create in this App — your reflection answers, attached photos, and theme preferences — is stored locally on your device. We have no servers and do not receive or store any of your data.
              </p>

              <h2 id="local" className={h2Class}>Data Stored Locally</h2>
              <p className={pClass}>The following data exists only on your device:</p>
              <ul className={ulClass}>
                <li className={liClass}><strong className={strongClass}>Reflection answers</strong>: Your written responses to each question</li>
                <li className={liClass}><strong className={strongClass}>Photos</strong>: Images you choose to attach to your answers</li>
                <li className={liClass}><strong className={strongClass}>App settings</strong>: Appearance theme preference (system/light/dark)</li>
                <li className={liClass}><strong className={strongClass}>Onboarding state</strong>: Whether you have completed the first-launch guide</li>
              </ul>

              <h2 id="icloud" className={h2Class}>iCloud Sync</h2>
              <p className={pClass}>
                If you have iCloud enabled on your device, your data may sync to your iCloud account via Apple&apos;s CloudKit service, allowing consistency across your Apple devices. This sync is entirely managed and encrypted by Apple — we cannot access your iCloud data. You can disable iCloud sync for this App in your system settings.
              </p>

              <h2 id="donts" className={h2Class}>What We Don&apos;t Do</h2>
              <ul className={ulClass}>
                <li className={liClass}><strong className={strongClass}>No analytics</strong>: No Firebase, no Mixpanel, no third-party analytics SDKs of any kind</li>
                <li className={liClass}><strong className={strongClass}>No tracking</strong>: No advertising identifiers, no user profiling, no behavioral tracking</li>
                <li className={liClass}><strong className={strongClass}>No ads</strong>: This App contains no advertising whatsoever</li>
                <li className={liClass}><strong className={strongClass}>No third-party data sharing</strong>: Your data is never sold, rented, or provided to any third party</li>
              </ul>

              <h2 id="permissions" className={h2Class}>Permissions</h2>
              <p className={pClass}>This App requests only the following permission:</p>
              <ul className={ulClass}>
                <li className={liClass}><strong className={strongClass}>Photo Library (write only)</strong>: Used when you choose to save your year-end recap card to your photo library. This is optional and entirely user-initiated. The App does not read your photo library.</li>
              </ul>

              <h2 id="sharing" className={h2Class}>User-Initiated Sharing</h2>
              <p className={pClass}>Data may leave your device only in these user-initiated scenarios:</p>
              <ul className={ulClass}>
                <li className={liClass}><strong className={strongClass}>Share card</strong>: You can share your year-end recap card via the system share sheet — you control the method and recipient</li>
                <li className={liClass}><strong className={strongClass}>Send feedback</strong>: You can optionally send feedback via email, which automatically includes your device model and system version to help us troubleshoot</li>
              </ul>

              <h2 id="deletion" className={h2Class}>Data Deletion</h2>
              <ul className={ulClass}>
                <li className={liClass}><strong className={strongClass}>Delete the App</strong>: Uninstalling the App removes all local data from your device</li>
                <li className={liClass}><strong className={strongClass}>iCloud data</strong>: Can be deleted in Settings → Apple ID → iCloud → Manage Storage</li>
              </ul>

              <h2 id="children" className={h2Class}>Children&apos;s Privacy</h2>
              <p className={pClass}>This App is not directed at children under 13 and does not knowingly collect personal information from children.</p>

              <h2 id="changes" className={h2Class}>Changes to This Policy</h2>
              <p className={pClass}>If we make significant changes to this privacy policy, we will notify you within the App. You can always view the latest privacy policy in the App&apos;s settings.</p>

              <h2 id="contact" className={h2Class}>Contact Us</h2>
              <p className={pClass}>If you have any questions about this privacy policy, please contact us at:</p>
              <p className={pClass}><a className={aClass} href="mailto:hello@kexin.li">hello@kexin.li</a></p>
            </>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
