"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

interface FaqItem {
  q: string;
  a: string;
}

const faqEn: FaqItem[] = [
  {
    q: "Is my data private?",
    a: "Yes. Your reflections are stored only on your device and in your personal iCloud account. We never see, access, or store your data on any server.",
  },
  {
    q: "Do you collect any data or track me?",
    a: "No. Melior has no analytics, no tracking, no advertising identifiers, and no third-party SDKs. We don\u2019t even have a server to send data to.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. Melior works without any account or sign-up. Your data stays on your device and syncs via your personal iCloud.",
  },
  {
    q: "Does Melior sync across my devices?",
    a: "Yes. If iCloud is enabled, your reflections sync automatically across all your Apple devices. This is handled entirely by Apple\u2019s CloudKit \u2014 we have no access to your iCloud data.",
  },
  {
    q: "My data isn\u2019t syncing across devices",
    a: "Make sure iCloud is enabled for Melior: go to Settings \u2192 [your name] \u2192 iCloud \u2192 Apps Using iCloud, and check that Melior is turned on. If the issue persists, try signing out of iCloud and signing back in.",
  },
  {
    q: "How do I delete my data?",
    a: "Delete the app to remove all local data. To also remove iCloud data, go to Settings \u2192 [your name] \u2192 iCloud \u2192 Manage Storage and delete the Melior data. Since there is no account or server, nothing else remains.",
  },
  {
    q: "What devices does Melior support?",
    a: "Melior is available for iPhone running iOS 18.6 or later.",
  },
  {
    q: "Can I export my reflections?",
    a: "Yes. You can share individual reflection cards as images via the system share sheet, or export your full year summary.",
  },
];

const faqZh: FaqItem[] = [
  {
    q: "我的数据安全吗？",
    a: "是的。你的回忆只存储在你的设备和个人 iCloud 账户中。我们没有服务器，不会看到、访问或存储你的任何数据。",
  },
  {
    q: "你们会收集数据或追踪我吗？",
    a: "不会。Melior 没有分析工具、没有追踪、没有广告标识符、没有第三方 SDK。我们甚至没有服务器来接收数据。",
  },
  {
    q: "需要注册账号吗？",
    a: "不需要。Melior 无需注册或登录。你的数据保存在设备本地，通过 iCloud 同步。",
  },
  {
    q: "Melior 可以跨设备同步吗？",
    a: "可以。如果启用了 iCloud，你的回忆会自动同步到所有 Apple 设备。同步完全由 Apple 的 CloudKit 管理，我们无法访问你的 iCloud 数据。",
  },
  {
    q: "数据无法跨设备同步",
    a: "请确认 Melior 的 iCloud 已启用：前往「设置 → [你的名字] → iCloud → 使用 iCloud 的 App」，确认 Melior 已打开。如果问题持续，尝试退出 iCloud 后重新登录。",
  },
  {
    q: "如何删除我的数据？",
    a: "删除应用即可移除所有本地数据。如需同时删除 iCloud 数据，前往「设置 → [你的名字] → iCloud → 管理存储空间」删除 Melior 数据。由于没有账户和服务器，不会有其他残留。",
  },
  {
    q: "Melior 支持哪些设备？",
    a: "Melior 适用于运行 iOS 18.6 或更高版本的 iPhone。",
  },
  {
    q: "可以导出我的回忆吗？",
    a: "可以。你可以通过系统分享功能将单个回忆卡片作为图片分享，也可以导出完整的年度总结。",
  },
];

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="faq-item">
            <button
              className="faq-q"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <span className={`faq-arrow ${isOpen ? "faq-arrow-open" : ""}`} aria-hidden="true" />
            </button>
            <div className={`faq-a ${isOpen ? "faq-a-open" : ""}`}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Support() {
  const lang = useLocale();

  return (
    <>
      <Nav />

      <main>
        <article className="prose-page">
          {lang === "zh" ? (
            <>
              <h1>支持与帮助</h1>
              <div className="hl" style={{ margin: "0 0 32px" }} />

              <p className="prose-lead">
                有关于 Melior 的问题？希望这些解答能帮到你。
              </p>

              <h2 id="faq">常见问题</h2>
              <FaqAccordion items={faqZh} />

              <h2 id="contact">联系我们</h2>
              <p>
                没有找到你要的答案？随时联系我们，我们通常会在 24 小时内回复。
              </p>
              <p>
                <a href="mailto:xyzzy.baz@icloud.com">xyzzy.baz@icloud.com</a>
              </p>

              <h2 id="links">相关链接</h2>
              <ul>
                <li><a href="/privacy">隐私政策</a></li>
              </ul>
            </>
          ) : (
            <>
              <h1>Support</h1>
              <div className="hl" style={{ margin: "0 0 32px" }} />

              <p className="prose-lead">
                Have a question about Melior? Hopefully you&apos;ll find your answer here.
              </p>

              <h2 id="faq">Frequently Asked Questions</h2>
              <FaqAccordion items={faqEn} />

              <h2 id="contact">Contact Us</h2>
              <p>
                Can&apos;t find what you&apos;re looking for? Reach out anytime &mdash; we typically respond within 24 hours.
              </p>
              <p>
                <a href="mailto:xyzzy.baz@icloud.com">xyzzy.baz@icloud.com</a>
              </p>

              <h2 id="links">Helpful Links</h2>
              <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
              </ul>
            </>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
