# Melior Landing Page SEO 深度审计报告

> 审计日期：2026-03-15
> 站点技术栈：Next.js 16.1.6 (App Router) + TypeScript + Tailwind CSS 4
> 部署平台：Vercel
> App Store ID：6759236940
> 域名：https://getmelior.app

---

## 目录

1. [现状总结](#1-现状总结)
2. [技术 SEO](#2-技术-seo)
   - 2.1 Meta 标签与 Metadata API
   - 2.2 Canonical URL 与 metadataBase
   - 2.3 Hreflang 多语言标记
   - 2.4 Sitemap.xml
   - 2.5 Robots.txt
   - 2.6 结构化数据 / JSON-LD
   - 2.7 OG 图片生成
   - 2.8 Favicon 与 App Icons
   - 2.9 安全头 (Security Headers)
   - 2.10 URL 结构与尾部斜杠
3. [内容 SEO](#3-内容-seo)
   - 3.1 标题层级 (H1/H2/H3)
   - 3.2 图片 Alt 文本
   - 3.3 关键词策略
   - 3.4 内部链接
4. [性能 SEO (Core Web Vitals)](#4-性能-seo-core-web-vitals)
   - 4.1 图片优化 (next/image)
   - 4.2 字体加载策略
   - 4.3 客户端组件与 SSR
   - 4.4 CLS 优化
   - 4.5 LCP 优化
5. [App 生态 SEO](#5-app-生态-seo)
   - 5.1 Smart App Banner
   - 5.2 Apple App Site Association
   - 5.3 App Links Meta 标签
   - 5.4 ASO 与 Web SEO 联动
6. [索引与爬虫](#6-索引与爬虫)
   - 6.1 Google Search Console
   - 6.2 Bing Webmaster Tools
   - 6.3 IndexNow 协议
7. [社交媒体预览](#7-社交媒体预览)
8. [SEO 验证工具与检查流程](#8-seo-验证工具与检查流程)
9. [优先级汇总表](#9-优先级汇总表)

---

## 1. 现状总结

### 已实现

| 项目 | 状态 | 文件与行号 | 说明 |
|------|------|-----------|------|
| `<title>` + `<meta description>` | 已有 | `src/app/layout.tsx:16-20` | 静态 `metadata` 导出，title 为 "Melior — Write your year into a book" |
| Open Graph (title/description/type/locale) | 已有 | `src/app/layout.tsx:21-27` | 包含 `alternateLocale: "zh_CN"` |
| Twitter Card (summary_large_image) | 已有 | `src/app/layout.tsx:28-33` | title + description 已配置 |
| `<html lang>` 动态设置 | 已有 | `src/app/layout.tsx:47-50` | 根据 locale 设为 `en` 或 `zh-Hans` |
| Smart App Banner meta 标签 | 已有 | `src/app/layout.tsx:52` | `<meta name="apple-itunes-app" content="app-id=6759236940" />` |
| Viewport / themeColor | 已有 | `src/app/layout.tsx:36-38` | 使用 Next.js 的 `viewport` export |
| 字体 display:swap | 已有 | `src/app/layout.tsx:8-14` | Cormorant Garamond 配置了 `display: "swap"` |
| Vercel Analytics | 已有 | `src/app/layout.tsx:58` | `@vercel/analytics/react` 已集成 |
| prefers-reduced-motion | 已有 | `src/app/globals.css:645-655` | CSS 中有完善的 reduced motion 支持 |
| 语义化 aria-label | 已有 | `src/app/page.tsx:87,139,177,222,302` | 各 section 有 aria-label |
| i18n 中间件 | 已有 | `src/middleware.ts:1-37` | 自定义中间件，cookie + Accept-Language 检测 |

### 缺失（按严重程度排序）

| 项目 | 优先级 | 影响 |
|------|--------|------|
| metadataBase | P0 | OG 图片等需要绝对 URL 的字段无法正确解析，Next.js 构建时会发出警告 |
| Canonical URL | P0 | 搜索引擎无法确定权威 URL，可能导致重复内容判定 |
| Sitemap.xml | P0 | 搜索引擎无法高效发现所有页面（`/privacy`、`/support`） |
| Robots.txt | P0 | 搜索引擎无法获知爬取规则和 sitemap 位置 |
| OG 图片 | P0 | 社交分享无预览图，严重影响点击率（CTR） |
| Favicon / Apple Touch Icon | P1 | `public/` 目录下无 `favicon.ico`，无 `apple-touch-icon.png`，浏览器标签页显示默认空图标 |
| 子页面独立 metadata | P1 | `/privacy` 和 `/support` 继承首页 title/description，Google 搜索结果中所有页面显示相同标题 |
| JSON-LD 结构化数据 | P1 | 缺少 MobileApplication schema，失去 Google 富搜索结果展示机会 |
| next/image 替代 img | P1 | 6 张截图使用原生 `<img>`，无 WebP/AVIF 转换、无响应式 srcset、无懒加载优化 |
| 图片 Alt 文本 | P1 | 当前 alt 文本过于泛化（"Home screen"、"Chapter screen"、"Summary screen"） |
| Hreflang 标记 | P1 | 中英文内容无法被搜索引擎正确关联 |
| Google Search Console 验证 | P1 | 未知验证状态，metadata 中无 `verification` 字段 |
| Security Headers | P2 | `next.config.ts` 无安全头配置，SecurityHeaders.io 评分低 |
| FAQPage Schema | P2 | Support 页面有 8 个 FAQ 但未标注结构化数据 |
| IndexNow | P2 | 内容更新后 Bing/Yandex 发现延迟 |
| App Links meta 标签 | P2 | 缺失，社交平台无法关联 app |
| 模板残留文件 | P2 | `public/` 下有 5 个 Next.js 默认 SVG（`file.svg`、`globe.svg`、`next.svg`、`vercel.svg`、`window.svg`），浪费部署体积 |

---

## 2. 技术 SEO

### 2.1 Meta 标签与 Metadata API

**现状审计：**

`src/app/layout.tsx:16-34` 使用 Next.js Metadata API 的静态 `metadata` 导出。当前包含：
- `title`（纯字符串，非模板模式）
- `description`
- `openGraph`（title, description, type, locale, alternateLocale）
- `twitter`（card, title, description）

**缺失的关键字段：**
- `metadataBase` — 没有它，所有相对路径的 OG 图片 URL 无法被解析为绝对 URL
- `title.template` — 子页面无法自动继承品牌后缀
- `alternates`（canonical + hreflang）
- `keywords`
- `applicationName`
- `robots` 指令
- `verification`（Google/Bing 验证码）
- `openGraph.url`、`openGraph.siteName`、`openGraph.images`
- `twitter.images`

子页面 `/privacy`（`src/app/privacy/page.tsx`）和 `/support`（`src/app/support/page.tsx`）标记为 `"use client"`，无法直接导出 metadata，继承了首页的 title 和 description。这意味着在 Google 搜索结果中，隐私政策页面也会显示 "Melior — Write your year into a book" 作为标题。

**P0 - 修复 layout.tsx metadata：**

```typescript
// src/app/layout.tsx
import type { Metadata, Viewport } from "next";

const SITE_URL = "https://getmelior.app"; // 替换为实际域名

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Melior — Write your year into a book",
    template: "%s | Melior",
  },
  description:
    "Melior is a year-end reflection app for iOS. 30 questions, 6 chapters — write your year into a book. No account, no tracking, no ads.",
  applicationName: "Melior",
  keywords: [
    "year-end reflection",
    "annual review app",
    "journaling app iOS",
    "year in review",
    "reflection journal",
    "年终回顾",
    "年度总结 app",
    "年终反思",
    "Melior",
  ],
  authors: [{ name: "Kexin", url: "https://kexin.li" }],
  creator: "Kexin",
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "zh-Hans": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Melior — Write your year into a book",
    description:
      "A year-end reflection app for iOS. 30 questions, 6 chapters — no account, no tracking, no ads.",
    url: SITE_URL,
    siteName: "Melior",
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Melior — Write your year into a book",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melior — Write your year into a book",
    description:
      "A year-end reflection app for iOS. 30 questions, 6 chapters — no account, no tracking, no ads.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  itunes: {
    appId: "6759236940",
  },
  category: "productivity",
};
```

使用 `itunes` 字段后，可以移除 `src/app/layout.tsx:52` 中手动添加的 `<meta name="apple-itunes-app">` 标签。

> 参考：
> - [Next.js generateMetadata API 文档](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)（v16.1.6，更新于 2026-02-27）
> - [Next.js Metadata 与 OG 图片入门](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
> - [How to Configure SEO in Next.js 16 (the Right Way)](https://jsdevspace.substack.com/p/how-to-configure-seo-in-nextjs-16)

**P1 - 为子页面添加独立 metadata：**

由于 `/privacy` 和 `/support` 的 `page.tsx` 是 `"use client"` 组件，无法直接导出 metadata。解决方案：为每个路由创建一个 server component `layout.tsx`，在其中导出 metadata。

```typescript
// src/app/privacy/layout.tsx (新建)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Melior collects none of your data. Your memories belong to you alone. Read our full privacy policy.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

```typescript
// src/app/support/layout.tsx (新建)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & FAQ",
  description:
    "Get help with Melior — frequently asked questions about privacy, iCloud syncing, data deletion, and more.",
  alternates: {
    canonical: "/support",
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

由于根 layout 设置了 `title.template: "%s | Melior"`，子页面 title 会自动渲染为 "Privacy Policy | Melior" 和 "Support & FAQ | Melior"。

> 参考：[Next.js App Router Metadata 学习教程](https://nextjs.org/learn/dashboard-app/adding-metadata)

---

### 2.2 Canonical URL 与 metadataBase

**现状审计：** 完全缺失。`src/app/layout.tsx` 中没有 `metadataBase`，没有 `alternates.canonical`。

**P0 - 问题说明：**
- 没有 `metadataBase`，Next.js 构建时会在控制台发出警告："metadata.metadataBase is not set"
- 所有使用相对路径的 metadata 字段（如 OG image URL `/og-image.png`）无法被解析为绝对 URL，社交平台无法抓取图片
- 没有 canonical URL，搜索引擎可能将 `http://` 和 `https://`、`www` 和非 `www`、带/不带尾部斜杠视为不同页面
- 不同的 Vercel 预览 URL（`*.vercel.app`）也可能被索引为独立页面

解决方案已在 2.1 节的代码中包含（`metadataBase` + `alternates.canonical`）。

> 参考：
> - [Next.js metadataBase 文档](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase)
> - [Next.js 16 Canonical & Hreflang 指南](https://www.buildwithmatija.com/blog/nextjs-advanced-seo-multilingual-canonical-tags)

---

### 2.3 Hreflang 多语言标记

**现状审计：** 完全缺失。网站支持英文和中文两种语言（通过 cookie 切换），但没有任何 hreflang 标记告知搜索引擎。

**P1 - 问题分析：**

本项目使用 `localePrefix: "never"`——中英文共享同一 URL（`/`、`/privacy`、`/support`），语言通过 cookie 切换。这对 hreflang 来说是一个根本性挑战：标准 hreflang 要求不同语言版本有不同的 URL。

**当前架构下的可选方案：**

**方案 A（不改变 URL 结构，最低成本）：**

在 `alternates.languages` 中指向同一 URL，并设置 `x-default`。已在 2.1 节代码中包含：

```typescript
alternates: {
  canonical: "/",
  languages: {
    "en": "/",
    "zh-Hans": "/",
    "x-default": "/",
  },
},
```

虽然所有语言指向同一 URL 不是 hreflang 的最佳实践，但至少向搜索引擎声明该页面支持多语言。Google 爬虫通常使用英文的 `Accept-Language`，因此它看到的内容始终是英文版。

**方案 B（更好的 SEO，需要改 URL 结构）：**

添加 `?lang=zh` 查询参数或 `/zh` 路径前缀，使不同语言有独立的可索引 URL。这需要修改 `src/middleware.ts` 的路由逻辑和 `next-intl` 配置。工作量较大，建议作为长期优化。

**关于 sitemap 中的 hreflang：**

Next.js 的 `sitemap.ts` 支持 `alternates.languages` 字段（见 2.4 节），可在 sitemap 中为每个 URL 标注语言替代版本。但同样受限于当前的 URL 结构——如果中英文共用同一 URL，sitemap 中的 hreflang 意义有限。

> 参考：
> - [Next.js 16 Canonical & Hreflang 详解](https://www.buildwithmatija.com/blog/nextjs-advanced-seo-multilingual-canonical-tags)
> - [next-intl App Router i18n Guide (2026)](https://nextjslaunchpad.com/article/nextjs-internationalization-next-intl-app-router-i18n-guide)
> - [Next.js Sitemap 多语言支持](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)（v16.1.6 文档，展示了 `alternates.languages` 字段生成 `xhtml:link` 标签）

---

### 2.4 Sitemap.xml

**现状审计：** 完全缺失。`src/app/` 目录下没有 `sitemap.ts` 或 `sitemap.xml`，`public/` 目录下也没有。

**P0 - 创建 sitemap.ts：**

```typescript
// src/app/sitemap.ts (新建)
import type { MetadataRoute } from "next";

const SITE_URL = "https://getmelior.app"; // 替换为实际域名

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      images: [`${SITE_URL}/screen-home.png`],
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date("2026-03-08"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
```

此文件利用 Next.js 的 file convention，自动在 `/sitemap.xml` 路由生成标准 XML sitemap。`sitemap.ts` 是一个特殊的 Route Handler，默认会被缓存。

注：`images` 字段会生成 [Image Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps) 标记，有助于截图出现在 Google 图片搜索中。

> 参考：
> - [Next.js Sitemap 文件约定](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)（v16.1.6，更新于 2026-02-27）
> - [Next.js generateSitemaps API](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps)
> - [Vercel: 如何为 Next.js 生成 sitemap](https://vercel.com/kb/guide/how-do-i-generate-a-sitemap-for-my-nextjs-app-on-vercel)

---

### 2.5 Robots.txt

**现状审计：** 完全缺失。`src/app/` 和 `public/` 目录下均无 robots 文件。

**P0 - 创建 robots.ts：**

```typescript
// src/app/robots.ts (新建)
import type { MetadataRoute } from "next";

const SITE_URL = "https://getmelior.app"; // 替换为实际域名

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

`robots.ts` 同样利用 Next.js 的 file convention，自动在 `/robots.txt` 路由生成标准格式的 robots.txt。默认会被缓存。

> 参考：[Next.js Robots.txt 文件约定](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)（v16.1.6，更新于 2026-02-27）

---

### 2.6 结构化数据 / JSON-LD

**现状审计：** 完全缺失。页面中没有任何 `<script type="application/ld+json">` 标签。

**P1 - 首页添加 MobileApplication schema：**

Next.js 官方推荐在 `layout.js` 或 `page.js` 中渲染 `<script type="application/ld+json">` 标签。由于 `page.tsx` 是 `"use client"`，JSON-LD 可以在客户端组件中通过 `dangerouslySetInnerHTML` 渲染——SSR 时 `<script>` 标签会被包含在初始 HTML 中，搜索引擎可以正常读取。

注意安全：Next.js 官方文档建议对 JSON-LD payload 中的 `<` 字符进行转义以防范 XSS：

```typescript
// src/components/JsonLd.tsx (新建)
export function HomeJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Melior",
    description:
      "A year-end reflection app for iOS. 30 questions across 6 chapters — write your year into a book. No account, no tracking, no ads.",
    operatingSystem: "iOS 17.0+",
    applicationCategory: "LifestyleApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: "https://apps.apple.com/app/melior/id6759236940",
    downloadUrl: "https://apps.apple.com/app/melior/id6759236940",
    screenshot: "https://getmelior.app/screen-home.png",
    featureList: "Year-end reflection, 30 guided questions, 6 chapters, iCloud sync, no account needed, no tracking, no ads",
    author: {
      "@type": "Person",
      name: "Kexin",
      url: "https://kexin.li",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
```

然后在 `src/app/page.tsx` 的 JSX 中引入：

```tsx
import { HomeJsonLd } from "@/components/JsonLd";

// 在 return 的 JSX 中添加：
<HomeJsonLd />
```

**关于 Google 富搜索结果的限制：** Google 的 [SoftwareApplication 结构化数据文档](https://developers.google.com/search/docs/appearance/structured-data/software-app) 要求必须包含 `name`、`offers.price`、以及 `aggregateRating` 或 `review` 之一才能触发富搜索结果。由于 Melior 是新应用，可能暂时没有足够的评分数据。但添加 schema 仍然对 AI 搜索引擎（ChatGPT、Perplexity、Google AI Overviews）理解内容有价值。

**P2 - Support 页面添加 FAQPage schema：**

```typescript
// 在 src/app/support/page.tsx 中添加
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqEn.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

// 在 JSX 中渲染
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
  }}
/>
```

注意：自 2023 年 8 月起，Google 将 FAQ 富搜索结果限制为政府和健康类权威网站。但 FAQPage schema 仍对 AI 搜索引擎和语音搜索有价值。

可选的 TypeScript 类型增强：使用社区包 `schema-dts` 为 JSON-LD 添加类型检查：

```bash
npm install schema-dts
```

```typescript
import { MobileApplication, WithContext } from "schema-dts";

const jsonLd: WithContext<MobileApplication> = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  // ...TypeScript 会自动提示和校验字段
};
```

> 参考：
> - [Next.js JSON-LD 官方指南](https://nextjs.org/docs/app/guides/json-ld)（v16.1.6，更新于 2026-02-27——推荐使用 `<script>` 标签 + `dangerouslySetInnerHTML` + `.replace(/</g, "\\u003c")`）
> - [Google SoftwareApplication 结构化数据](https://developers.google.com/search/docs/appearance/structured-data/software-app)
> - [Schema.org MobileApplication](https://schema.org/MobileApplication)
> - [Google Rich Results Test](https://search.google.com/test/rich-results)（验证工具）
> - [Schema Markup Validator](https://validator.schema.org/)（通用验证工具）

---

### 2.7 OG 图片生成

**现状审计：** `src/app/layout.tsx:21-27` 的 OG 元数据中没有指定 `images` 字段。社交分享时无预览图。`public/` 目录下没有任何 OG 图片文件。也没有 `src/app/opengraph-image.tsx`。

**P0 - 方案一：静态 OG 图片（推荐首选，最简单）**

设计一张 1200x630px 的 OG 图片，放在 `public/og-image.png`，然后在 metadata 中引用（已在 2.1 节代码中包含）。

图片设计建议：
- 尺寸：1200 x 630px（1.91:1 比例），宽度不低于 1080px
- 内容：Melior 品牌名 + 副标题 "Write your year into a book." + 书本视觉元素
- 背景色：使用网站的 `--bg` 色 `#F7F6F4`
- 文件大小：控制在 300KB 以下

**P1 - 方案二：动态 OG 图片 (opengraph-image.tsx)**

使用 Next.js 内置的 `ImageResponse` API 动态生成。Next.js 16 中应从 `next/og` 导入（而非 `@vercel/og`）：

```typescript
// src/app/opengraph-image.tsx (新建)
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Melior — Write your year into a book";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F7F6F4",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 300,
            color: "#1E1E22",
            letterSpacing: "0.04em",
          }}
        >
          Melior
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#55555A",
            marginTop: 16,
            fontWeight: 300,
          }}
        >
          Write your year into a book.
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#84838A",
            marginTop: 24,
            fontWeight: 300,
          }}
        >
          30 Questions / 6 Chapters / iOS
        </div>
      </div>
    ),
    { ...size }
  );
}
```

使用 file-based API 时，Next.js 会自动为 OG 和 Twitter 元标签设置正确的 URL，无需在 metadata 中手动指定 `images`。

注意：`ImageResponse` 支持 Flexbox 布局和基本排版，但不支持 CSS Grid、`calc()`、CSS 变量、`transform` 和动画。

> 参考：
> - [Next.js opengraph-image 文件约定](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)（v16.1.6）
> - [Vercel OG Image Generation](https://vercel.com/docs/og-image-generation)
> - [如何在 Next.js 15.4+ 自动生成 OG 图片](https://www.buildwithmatija.com/blog/complete-guide-dynamic-og-image-generation-for-next-js-15)
> - [Generate Dynamic OG Images with Next.js 16](https://makerkit.dev/blog/tutorials/dynamic-og-image)

---

### 2.8 Favicon 与 App Icons

**现状审计：** `public/` 目录下没有 `favicon.ico`、`apple-touch-icon.png` 或其他图标文件。`src/app/` 目录下也没有。浏览器标签页显示默认的地球图标或空白。

**P1 - 添加图标文件：**

Next.js App Router 支持 file-based icons。将图标文件放在 `src/app/` 目录下即可，Next.js 会自动添加相应的 `<link>` 标签：

```
src/app/
  favicon.ico          # 浏览器标签页图标 (32x32)，必须是 .ico 格式
  icon.png             # 现代浏览器图标 (32x32)，支持 .png/.svg
  apple-icon.png       # Apple Touch Icon (180x180)，用于 iOS 添加到主屏幕
```

注意事项：
- `favicon.ico` 只能放在 `src/app/` 的顶层（不能在子路由中）
- `favicon.ico` 不支持动态生成（必须是静态文件）
- `apple-icon` 支持 `.jpg`、`.jpeg`、`.png` 格式
- 建议使用 [Favicon Generator for Next.js](https://realfavicongenerator.net/favicon-generator/nextjs) 生成全套图标

或者在 metadata 中配置（如果文件放在 `public/`）：

```typescript
icons: {
  icon: "/favicon.ico",
  apple: "/apple-icon.png",
},
```

> 参考：[Next.js App Icons 文件约定](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons)（v16.1.6）

---

### 2.9 安全头 (Security Headers)

**现状审计：** `next.config.ts`（8 行）中没有配置任何自定义 headers。只有 `next-intl` 插件和空的 `nextConfig` 对象。

**P2 - 在 next.config.ts 中添加安全头：**

```typescript
// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
```

关于 Content-Security-Policy (CSP)：CSP 是最强的安全头，但配置复杂。Next.js 支持基于 nonce 的 CSP——每次页面请求生成新的随机 nonce，自动添加到 `<script>` 标签。但对于这个简单的营销站，上述基础安全头已足够。如需添加 CSP，参考 Next.js 官方 CSP 指南。

> 参考：
> - [Vercel Security Headers 文档](https://vercel.com/docs/headers/security-headers)
> - [Next.js Content Security Policy 指南](https://nextjs.org/docs/pages/guides/content-security-policy)
> - [Next.js headers 配置](https://nextjs.org/docs/advanced-features/security-headers)

---

### 2.10 URL 结构与尾部斜杠

**现状审计：** `next.config.ts` 中未配置 `trailingSlash`。默认行为是 Next.js 将带尾部斜杠的 URL（如 `/privacy/`）重定向到不带斜杠的版本（`/privacy`）。

**现状评估：** 默认行为可接受，保持一致即可。需确保 canonical URL 和 sitemap 中的 URL 风格一致（不带尾部斜杠）。已在上述配置中体现。

> 参考：[Next.js trailingSlash 配置](https://nextjs.org/docs/app/api-reference/config/next-config-js/trailingSlash)

---

## 3. 内容 SEO

### 3.1 标题层级 (H1/H2/H3)

**现状审计：**

首页（`src/app/page.tsx`）：
- `<h1>` — "Melior"（第 122 行，`.hero-title`）
- `<h2>` — "A Look Inside"（第 141 行，`.section-title`）
- `<div>` — "Contents"（第 179 行，`.toc-title`）— **应为 `<h2>`**
- `<h2>` — "Year After Year"（第 224 行，`.section-title`）
- `<h2>` — "Write in Peace"（第 266 行，`.section-title`）
- `<h2>` — "What would you like to say this year?"（第 303 行，`.ending-title`，用 `dangerouslySetInnerHTML`）

Privacy 页面（`src/app/privacy/page.tsx`）：
- `<h1>` — "Melior Privacy Policy" / "Melior 隐私政策"（第 68/142 行）
- 11 个 `<h2>` 用于各节标题

Support 页面（`src/app/support/page.tsx`）：
- `<h1>` — "Support" / "支持与帮助"（第 121/147 行）
- 3 个 `<h2>` 用于 FAQ、Contact、Links

**评估与建议：**

**P2 - 首页 `<h1>` 增加描述性文本：**

当前 `<h1>` 只有 "Melior" 一个词，搜索引擎难以仅从标题理解页面主题。建议在视觉隐藏的方式下增加描述性文本：

```tsx
<h1 className="hero-title" ref={heroTitleRef}>
  Melior
  <span className="sr-only"> — Write your year into a book</span>
</h1>
```

添加对应 CSS：
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**P2 - Table of Contents 标题语义化：**

`src/app/page.tsx:179` 使用 `<div className="toc-title">`，建议改为 `<h2>` 以保持语义完整性和标题层级连贯。

---

### 3.2 图片 Alt 文本

**现状审计：**

`src/app/page.tsx` 中有 6 张截图（中英文各 3 张），使用原生 `<img>` 标签：
- 第 150 行：`alt="Summary screen"`
- 第 156 行：`alt="Home screen"`
- 第 162 行：`alt="Chapter screen"`

这些 alt 文本过于泛化，没有描述具体内容，也没有包含任何 SEO 关键词。

**P1 - 改进 alt 文本：**

Alt 文本应描述图片内容并自然包含相关关键词：

英文版：
```
alt="Melior app home screen showing year-end reflection chapters and guided questions"
alt="Melior app chapter view with reflection prompts like 'What was the happiest thing?'"
alt="Melior app annual summary with personal year-end reflections organized by chapter"
```

中文版：
```
alt="Melior 应用首页，展示年终回顾的六个篇章和引导式反思问题"
alt="Melior 应用篇章页面，包含'最开心的事是什么？'等引导式反思问题"
alt="Melior 应用年度总结，按篇章展示个人年终回忆录"
```

实现方式——在 `page.tsx` 中根据 locale 动态设置 alt：

```tsx
const altTexts = isZh
  ? {
      home: "Melior 应用首页，展示年终回顾的六个篇章和引导式反思问题",
      chapter: "Melior 应用篇章页面，包含引导式反思问题",
      summary: "Melior 应用年度总结，按篇章展示个人年终回忆录",
    }
  : {
      home: "Melior app home screen showing year-end reflection chapters and guided questions",
      chapter: "Melior app chapter view with guided reflection prompts",
      summary: "Melior app annual summary with personal year-end reflections by chapter",
    };
```

> 参考：[web.dev 图片无障碍指南](https://web.dev/learn/accessibility/images/)

---

### 3.3 关键词策略

**P2 - App Landing Page 关键词建议：**

核心关键词（英文）：
- year-end reflection app
- annual review journal
- year in review app iOS
- personal reflection journal
- end of year reflection questions
- journaling app no account
- private journal app

核心关键词（中文）：
- 年终回顾 app
- 年度总结应用
- 年终反思日记
- 年度盘点 iOS
- 无账号日记应用

长尾关键词：
- "write your year into a book"
- "30 questions year end reflection"
- "private journaling app no tracking"
- "iCloud journal app no sign up"

当前 `src/i18n/messages/en.json` 和 `zh.json` 中的文案已自然包含部分关键词（如 "30 Questions", "6 Chapters", "No Account", "No Tracking"），但 meta description 可以进一步优化以包含更多长尾关键词。已在 2.1 节的 metadata 中添加 `keywords` 字段。

---

### 3.4 内部链接

**现状审计：**

- 首页 → App Store 链接（2 处外链，`page.tsx:126` 和 `305`）
- Footer（`src/components/Footer.tsx:20-23`）使用 `<a href>` 链接到 `/privacy` 和 `/support`，以及 `mailto:`
- Privacy 页 → 链接到 `mailto:`（`privacy/page.tsx:138,212`）
- Support 页 → 链接到 `/privacy`（`support/page.tsx:141,166`）和 `mailto:`
- Nav（`src/components/Nav.tsx:20`）使用 `<Link href="/">` 链接到首页

**P2 - 改进建议：**

1. Footer 中的 `/privacy` 和 `/support` 链接使用了 `<a href>`（`Footer.tsx:20-21`），应改为 Next.js 的 `<Link>` 组件以获得客户端导航和 prefetch 优化
2. Support 页底部可以添加回到首页的链接
3. 首页的 App Store 链接建议添加 `rel="noopener noreferrer"` 属性（虽然现代浏览器已默认处理，但明确声明是更好的实践）

> 参考：[Next.js Link 组件文档](https://nextjs.org/docs/app/api-reference/components/link)

---

## 4. 性能 SEO (Core Web Vitals)

### 2026 年 Core Web Vitals 阈值

| 指标 | Good | Needs Improvement | Poor |
|------|------|-------------------|------|
| LCP (Largest Contentful Paint) | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| INP (Interaction to Next Paint) | ≤ 200ms | ≤ 500ms | > 500ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | ≤ 0.25 | > 0.25 |

2026 年数据：43% 的网站仍未通过 INP 的 200ms 阈值，INP 是目前最常失败的 Core Web Vital 指标。通过全部三项 CWV 的网站平均跳出率低 24%。

> 参考：
> - [web.dev Core Web Vitals 阈值定义](https://web.dev/articles/defining-core-web-vitals-thresholds)
> - [Google Core Web Vitals 搜索文档](https://developers.google.com/search/docs/appearance/core-web-vitals)
> - [Core Web Vitals 2026 优化指南](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide)

---

### 4.1 图片优化 (next/image)

**现状审计：** 所有截图使用原生 `<img>` 标签（`src/app/page.tsx:150,156,162`），例如：

```html
<img src="/screen-home.png" alt="Home screen" className="ph-img" />
```

`public/` 目录下有 6 张 PNG 截图（中英文各 3 张）：`screen-home.png`、`screen-chapter.png`、`screen-summary.png` 及其 `-zh` 变体。

这意味着：
- 没有自动 WebP/AVIF 格式转换——PNG 文件直接服务，体积可能是 WebP 的 2-3 倍
- 没有响应式 `srcset`——手机用户下载与桌面相同尺寸的图片
- 没有 `width`/`height` 属性——虽然 CSS `.ph` 有 `aspect-ratio: 9/19.2` 预留空间，但浏览器无法在 HTML 解析阶段确定尺寸
- 没有自动懒加载（这些图片在 fold 以下，应该被懒加载）
- 缺少 `sizes` 属性指导浏览器选择合适尺寸

**P1 - 替换为 next/image：**

```tsx
import Image from "next/image";

<Image
  src={isZh ? "/screen-home-zh.png" : "/screen-home.png"}
  alt={altTexts.home}
  width={390}
  height={844}
  className="ph-img"
  loading="lazy"
  sizes="(max-width: 700px) 42vw, 17vw"
  quality={85}
/>
```

注意事项：
- 需要确认 `.ph-img` 的 CSS（`width:100%; height:100%; object-fit:cover`）与 `next/image` 的工作方式兼容
- `next/image` 默认输出 `<img>` 标签但包裹在特定结构中，可能需要微调 CSS
- 可选：使用 `fill` 属性配合 `style={{ objectFit: 'cover' }}` 替代固定宽高，更灵活适应容器
- `quality` 默认为 75，建议设为 85 获得更好的视觉效果

另外，`public/` 目录下的 5 个默认 SVG 文件（`file.svg`、`globe.svg`、`next.svg`、`vercel.svg`、`window.svg`）是 Next.js 模板残留，应当删除。

> 参考：
> - [Next.js Image 优化入门](https://nextjs.org/docs/app/getting-started/images)（v16.1.6）
> - [Next.js Image 组件 API](https://nextjs.org/docs/app/api-reference/components/image)
> - [Next.js 图片优化深度指南](https://geekyants.com/blog/optimizing-image-performance-in-nextjs-best-practices-for-fast-visual-web-apps)

---

### 4.2 字体加载策略

**现状审计：** `src/app/layout.tsx:8-14` 使用 `next/font/google` 的 `Cormorant_Garamond`，配置了：
- `subsets: ["latin"]`
- `weight: ["300", "400", "500", "600"]`（4 个字重）
- `style: ["normal", "italic"]`（2 种样式）
- `display: "swap"`
- `variable: "--font-cormorant"`

**评估：** 字体加载策略已经是最佳实践。`next/font` 自动将字体 self-hosted（避免外部请求），CSS variable 方式避免了 FOIT/FOUT。

**P2 - 可选优化：**
- 检查是否所有 4 个字重都在使用。快速扫描 CSS 显示：`font-weight:300`（多处）、`400`（多处）、`500`（section-title、nav）、`600`（hero-title）。全部在使用。
- `italic` 样式仅在 `.yoy-q`（引用文本，`font-style:italic`）和 `.prose-lead`（`font-style:italic`）中使用。如果愿意牺牲这两处的 italic 渲染（改用 `font-synthesis: style` 让浏览器模拟），可以移除 italic 变体减小字体文件。

> 参考：[Next.js 字体优化文档](https://nextjs.org/docs/app/guides/optimizing/fonts)

---

### 4.3 客户端组件与 SSR

**现状审计：**
- `src/app/page.tsx`（首页）— `"use client"`，316 行
- `src/app/privacy/page.tsx` — `"use client"`，222 行
- `src/app/support/page.tsx` — `"use client"`，177 行
- `src/components/Nav.tsx` — `"use client"`，41 行
- `src/components/Footer.tsx` — `"use client"`，38 行

整个应用的所有页面和组件都是客户端组件。

**SEO 影响分析：**

在 Next.js App Router 中，`"use client"` 组件仍然会在服务端预渲染（SSR），生成完整的 HTML 发送给浏览器和爬虫。因此从 SEO 角度来说，标记为 `"use client"` 的组件仍然是可爬取的——这一点没有问题。

但 `"use client"` 意味着：
1. 组件的 JavaScript 代码会被发送到客户端，增加 bundle size
2. metadata 导出只能在 Server Components 中使用——这是 `/privacy` 和 `/support` 无法导出独立 metadata 的根本原因
3. 所有导入的库（如 `lucide-react`）也会被包含在客户端 bundle 中

**P2 - 长期优化建议：**

将 `page.tsx` 拆分为 server component 外壳 + 多个客户端组件：

```
page.tsx (server component)
  ├── metadata 导出
  ├── JSON-LD <script> 标签
  ├── <HeroSection /> (client — 动画)
  ├── <ShowcaseSection /> (client — 手势/轮播)
  ├── <TocSection /> (server — 纯静态内容)
  ├── <YoySection /> (client — IntersectionObserver)
  ├── <PromiseSection /> (server — 纯静态内容)
  └── <EndingSection /> (server — 纯静态内容)
```

这样可以减少客户端 JavaScript 体积，TOC、Promise、Ending 等纯展示 section 的代码不会被发送到客户端。但工作量较大，建议在有明确性能瓶颈时再进行。

> 参考：
> - [Next.js 16 Server Components 性能指南](https://www.digitalapplied.com/blog/nextjs-16-performance-server-components-guide)
> - [React & Next.js 2026 最佳实践](https://fabwebstudio.com/blog/react-nextjs-best-practices-2026-performance-scale)
> - [Next.js Server 和 Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

---

### 4.4 CLS 优化

**现状审计：**
- 手机截图使用 `<img>` 无 `width`/`height` HTML 属性，但 CSS `.ph` 设置了 `aspect-ratio: 9/19.2`（`globals.css:146`），在图片加载前容器已有确定尺寸——这缓解了 CLS
- 字体使用 `display: swap`，会有轻微的 FOUT（Flash of Unstyled Text），但 `next/font` 的 size-adjust fallback 机制已将影响降至最低
- Hero 动画使用 `opacity: 0` 初始状态 + `setTimeout` 延迟显示，但元素空间已在 DOM 中保留（通过 CSS `min-height` 等），不会导致布局偏移

**评估：** CLS 风险整体较低，主要归功于 `aspect-ratio` 的使用。使用 `next/image` 后会进一步改善（自动添加 `width`/`height` 防止 CLS）。

---

### 4.5 LCP 优化

**现状审计：**
- 首页的 LCP 元素最可能是 hero 区域的 `<h1>Melior</h1>` 或书本 CSS 图形
- 书本动画有 300ms 延迟（`page.tsx:37`），`<h1>` 有 1200ms 延迟（`page.tsx:38`）——但这些是 `opacity` 动画，元素的 HTML 已经在初始渲染中输出
- 手机截图在 fold 以下，不太可能是 LCP
- CSS 中有多个 SVG data URI（feTurbulence 纹理，`globals.css:18,104,209` 等），它们内嵌在 CSS 中不会产生额外网络请求

**P2 - 改进建议：**
- Hero 文字和背景不依赖 JavaScript 渲染——SSR 已输出完整 HTML，JavaScript 只控制 `opacity` 动画。LCP 应该是良好的
- 可以考虑在 hero 动画中移除 `opacity: 0` 的初始状态，改用 CSS-only 动画，这样即使 JavaScript 加载延迟，内容也立即可见
- 如果截图在大屏幕上进入首屏（可能性低），为第一张截图设置 `priority` 属性

> 参考：
> - [web.dev LCP 优化指南](https://web.dev/articles/lcp)
> - [web.dev CLS 优化指南](https://web.dev/articles/cls)

---

## 5. App 生态 SEO

### 5.1 Smart App Banner

**现状审计：** 已在 `src/app/layout.tsx:52` 的 `<head>` 中手动添加了：

```html
<meta name="apple-itunes-app" content="app-id=6759236940" />
```

**P2 - 改进建议：**

使用 Next.js Metadata API 的 `itunes` 字段替代手动 meta 标签（已在 2.1 节中包含）。这样可以移除 `layout.tsx` 中 `<head>` 块内的手动 `<meta>` 标签，代码更干净：

```typescript
itunes: {
  appId: "6759236940",
  appArgument: "melior://", // 可选，如果 app 支持 URL scheme
},
```

> 参考：[Apple Smart App Banners 文档](https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners)

---

### 5.2 Apple App Site Association

**现状审计：** 缺失。`public/` 目录下没有 `.well-known/` 文件夹。

**P2 - 说明：**

`apple-app-site-association` (AASA) 文件用于 iOS Universal Links——允许用户点击网站链接时直接在 app 中打开。对于一个营销站来说非严格必需，但如果 Melior app 将来支持 Universal Links 或通过网页打开 app 内容，需要添加此文件。

关键注意事项（Vercel 部署）：
- AASA 文件必须以 `application/json` 的 `Content-Type` 提供
- Vercel 默认可能将无扩展名文件作为 `application/octet-stream` 提供，导致 iOS 下载文件而非解析
- 需要在 `next.config.ts` 或 `vercel.json` 中添加自定义 headers 确保正确的 Content-Type

如果需要添加：

```
public/.well-known/apple-app-site-association
```

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appIDs": ["TEAM_ID.com.yourcompany.melior"],
        "paths": ["*"]
      }
    ]
  }
}
```

同时在 `next.config.ts` 中添加 header：

```typescript
{
  source: "/.well-known/apple-app-site-association",
  headers: [
    { key: "Content-Type", value: "application/json" },
  ],
},
```

> 参考：
> - [Apple Universal Links 文档](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app)
> - [Universal & Deep Links: 2026 Complete Guide](https://dev.to/marko_boras_64fe51f7833a6/universal-deep-links-2026-complete-guide-36c4)

---

### 5.3 App Links Meta 标签

**现状审计：** 缺失。

**P2 - 添加 appLinks：**

Next.js Metadata API 支持 `appLinks` 字段，用于告知 Facebook 等社交平台该网站关联的原生 app：

```typescript
// 添加到 layout.tsx 的 metadata 中
appLinks: {
  ios: {
    url: "https://getmelior.app",
    app_store_id: "6759236940",
  },
  web: {
    url: "https://getmelior.app",
    should_fallback: true,
  },
},
```

这会生成 `<meta property="al:ios:app_store_id">` 等标签，帮助 Facebook 在移动端展示 "Open in App" 按钮。

> 参考：[Next.js appLinks Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#applinks)

---

### 5.4 ASO 与 Web SEO 联动

**P2 - 策略建议：**

1. **App Store 链接**：网站 CTA 使用的 App Store 链接格式正确（`https://apps.apple.com/app/melior/id6759236940`），出现在 `page.tsx:126` 和 `page.tsx:305`
2. **关键词对齐**：网站和 App Store 页面应使用一致的关键词（"year-end reflection"、"30 questions"、"6 chapters"、"年终回顾"）
3. **反向链接**：在 App Store Connect 的 "Marketing URL" 字段中填写网站 URL
4. **JSON-LD 联动**：MobileApplication schema 中的 `url` 和 `downloadUrl` 指向 App Store 页面，帮助 Google 理解网站和 app 的关联关系
5. **App Store 的 Support URL**：设为 `https://getmelior.app/support`，增加网站的反向链接

> 参考：
> - [Apple App Store Search 文档](https://developer.apple.com/app-store/search/)
> - [SoftwareApplication Schema 2026 指南](https://schemavalidator.org/guides/software-application-schema)

---

## 6. 索引与爬虫

### 6.1 Google Search Console

**现状审计：** `src/app/layout.tsx` 的 metadata 中没有 `verification` 字段，无法确认是否已通过其他方式（DNS TXT）验证。

**P1 - 设置步骤：**

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加网站属性（推荐使用 "Domain" 类型——覆盖所有子域名和协议）
3. 验证方式（二选一）：
   - **DNS TXT 记录**（推荐）：在 Vercel DNS 或域名注册商处添加 Google 提供的 TXT 记录
   - **Meta 标签验证**：在 metadata 中添加 `verification.google`
4. 验证通过后，提交 sitemap：`https://getmelior.app/sitemap.xml`
5. 使用 URL 检查工具确认首页、`/privacy`、`/support` 三个页面均被正确索引
6. 检查 Core Web Vitals 报告

```typescript
// 如果使用 meta 标签验证，添加到 layout.tsx 的 metadata 中
verification: {
  google: "your-google-verification-code",
},
```

> 参考：[Google Search Console 入门](https://search.google.com/search-console/about)

---

### 6.2 Bing Webmaster Tools

**P1 - 设置步骤：**

1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 推荐方式：直接从 Google Search Console 导入（一键自动验证，最省事）
3. 或手动添加 meta 标签验证

```typescript
verification: {
  google: "your-google-code",
  other: {
    "msvalidate.01": "your-bing-verification-code",
  },
},
```

> 参考：[Bing 从 GSC 导入站点](https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools)

---

### 6.3 IndexNow 协议

**现状审计：** 未实现。

**P2 - 说明：**

IndexNow 是一个即时通知搜索引擎内容更新的协议，被 Bing、Yandex、Naver 等支持（Google 不支持）。对于一个变化不频繁的营销站，优先级较低。

实现方式：
1. 在 [IndexNow.org](https://www.indexnow.org/) 获取 API key
2. 将 key 文件放在 `public/` 目录（如 `public/abc123.txt`）
3. 每次部署后向 IndexNow API 发送 POST 请求通知 URL 更新
4. 可在 Vercel 的部署钩子中自动触发

示例调用：
```bash
curl "https://api.indexnow.org/indexnow?url=https://getmelior.app&key=YOUR_KEY"
```

> 参考：
> - [IndexNow 文档](https://www.indexnow.org/documentation)
> - [FreeCodeCamp: 用 IndexNow 加速 Next.js 索引](https://www.freecodecamp.org/news/how-to-index-nextjs-pages-with-indexnow/)

---

## 7. 社交媒体预览

**现状审计：** 有 OG title/description 和 Twitter card 配置（`layout.tsx:21-33`），但缺少 OG image。

**P0 - 完整的社交预览清单：**

| 平台 | 需要的 OG 字段 | 现状 |
|------|--------------|------|
| Twitter/X | `og:image` 或 `twitter:image` | 缺失 |
| Facebook | `og:image` (1200x630) | 缺失 |
| LinkedIn | `og:image` | 缺失 |
| iMessage 链接预览 | `og:image` + `og:title` | 部分（有标题无图） |
| Slack 链接预览 | `og:image` + `og:title` + `og:description` | 部分（有标题描述无图） |
| Discord 嵌入 | `og:image` + `og:title` | 部分（有标题无图） |
| WeChat 分享 | `og:image`（建议也提供 300x300 方形图） | 缺失 |

解决方案见 2.7 节。

**预览效果影响：** 没有 OG image 的链接在社交平台上只显示文字，点击率通常比带图链接低 50-70%。对于一个视觉驱动的 app 营销站，这是最直接影响转化的 SEO 问题。

---

## 8. SEO 验证工具与检查流程

每次实施优化后，使用以下工具验证效果。建议在优化前先跑一遍记录基线，优化后再跑一遍对比。

### 8.1 社交预览验证

| 工具 | URL | 说明 | 免费 |
|------|-----|------|------|
| **OpenGraph.xyz** | https://www.opengraph.xyz | 一站式多平台预览（Facebook、X、LinkedIn、Discord 等），最方便的综合工具 | 是 |
| **Facebook Sharing Debugger** | https://developers.facebook.com/tools/debug/ | Facebook 官方工具，可清除 OG 缓存并重新抓取（需登录 Facebook） | 是 |
| **LinkedIn Post Inspector** | https://www.linkedin.com/post-inspector/ | LinkedIn 官方工具，检查链接预览并刷新缓存（约 7 天缓存周期） | 是 |
| **X/Twitter 预览** | 直接在 x.com 发推界面粘贴链接 | Twitter 已移除独立 Card Validator 工具，这是目前唯一官方方式 | 是 |
| **Polypane Social Previews** | https://polypane.app/social-media-previews/ | 一次显示 9 个平台的预览效果 | 是 |

> **OG 图片建议尺寸：** 1200 x 630px（1.91:1 比例），宽度不低于 1080px。

### 8.2 Google 官方工具

| 工具 | URL | 说明 | 免费 |
|------|-----|------|------|
| **Google Search Console** | https://search.google.com/search-console | 索引状态、搜索流量、sitemap 管理、网址检查。**上线后必须注册。** | 是 |
| **Rich Results Test** | https://search.google.com/test/rich-results | 检测 JSON-LD 结构化数据能否生成富结果（如应用评分、FAQ 等） | 是 |
| **PageSpeed Insights** | https://pagespeed.web.dev/ | Core Web Vitals 评分（LCP、CLS、INP）+ 性能优化建议，包含真实用户数据 | 是 |
| **Lighthouse** | Chrome DevTools → Lighthouse 标签页 | 审计 Performance、Accessibility、SEO、Best Practices 四个维度，满分 100 | 是 |
| **Schema Markup Validator** | https://validator.schema.org/ | 通用 schema.org 结构化数据验证，不限于 Google | 是 |

### 8.3 免费 SEO 审计工具

| 工具 | URL | 说明 | 免费 |
|------|-----|------|------|
| **SEOptimer** | https://www.seoptimer.com/ | 输入 URL 即可生成全站 SEO 审计报告，按优先级排列建议 | 免费版可用 |
| **Screaming Frog SEO Spider** | https://www.screamingfrog.co.uk/seo-spider/ | 桌面端爬虫，检查断链、meta 标签、重复内容等 | 免费版 500 URL |

### 8.4 推荐检查流程

每次实施 SEO 优化后，按以下顺序检查：

```
优化前（记录基线）
  |-- 1. Chrome Lighthouse --> 记录 SEO 分数
  |-- 2. PageSpeed Insights --> 记录 Core Web Vitals
  |-- 3. OpenGraph.xyz --> 截图社交预览现状
  |-- 4. Rich Results Test --> 记录结构化数据状态

实施 P0 优化

优化后（对比验证）
  |-- 1. Chrome Lighthouse --> SEO 分数是否提升
  |-- 2. PageSpeed Insights --> Core Web Vitals 是否改善
  |-- 3. OpenGraph.xyz --> OG 图片和预览是否正确显示
  |-- 4. Rich Results Test --> JSON-LD 是否被正确识别
  |-- 5. Facebook Sharing Debugger --> 清除缓存，验证最新预览

中期跟踪（1-4 周后）
  |-- 1. Google Search Console --> 查看索引数量、曝光量、点击量变化
  |-- 2. site:你的域名 --> Google 搜索查看已收录页面数
  |-- 3. 目标关键词排名 --> 搜索 "year end reflection app" 等观察排名
```

---

## 9. 优先级汇总表

### P0 — 关键（不做会严重影响 SEO 和社交分享）

| # | 项目 | 工作量 | 涉及文件 |
|---|------|--------|---------|
| 1 | 添加 `metadataBase` + `canonical` URL + 增强 metadata | 小 | `src/app/layout.tsx` |
| 2 | 创建 `sitemap.ts` | 小 | `src/app/sitemap.ts`（新建）|
| 3 | 创建 `robots.ts` | 小 | `src/app/robots.ts`（新建）|
| 4 | 添加 OG 图片 | 中 | `public/og-image.png`（新建设计）或 `src/app/opengraph-image.tsx`（新建）|
| 5 | 增强 metadata 字段（keywords, robots, siteName, url, itunes）| 小 | `src/app/layout.tsx` |

### P1 — 重要（显著提升 SEO 效果和用户体验）

| # | 项目 | 工作量 | 涉及文件 |
|---|------|--------|---------|
| 6 | 子页面独立 metadata（title/description/canonical）| 小 | `src/app/privacy/layout.tsx`、`src/app/support/layout.tsx`（新建）|
| 7 | JSON-LD 结构化数据 (MobileApplication) | 中 | `src/components/JsonLd.tsx`（新建）+ `src/app/page.tsx` |
| 8 | 替换 `<img>` 为 `next/image` | 中 | `src/app/page.tsx` |
| 9 | 改进图片 alt 文本（中英文） | 小 | `src/app/page.tsx` |
| 10 | 添加 Favicon / Apple Touch Icon | 小 | `src/app/favicon.ico`、`src/app/apple-icon.png`（新建设计）|
| 11 | Google Search Console 验证 + 提交 sitemap | 小 | `src/app/layout.tsx` + DNS/GSC 控制台 |
| 12 | Bing Webmaster Tools 验证 | 小 | 从 GSC 导入 |
| 13 | Hreflang 标记 | 小 | `src/app/layout.tsx`（已在 #1 中包含）|

### P2 — 加分项（锦上添花）

| # | 项目 | 工作量 | 涉及文件 |
|---|------|--------|---------|
| 14 | 安全头 (Security Headers) | 小 | `next.config.ts` |
| 15 | FAQPage JSON-LD (Support 页) | 中 | `src/app/support/page.tsx` |
| 16 | H1 增加描述性文本（sr-only） | 小 | `src/app/page.tsx` + `src/app/globals.css` |
| 17 | TOC 标题改为 `<h2>` | 小 | `src/app/page.tsx` |
| 18 | Footer 链接改用 `next/link` | 小 | `src/components/Footer.tsx` |
| 19 | 删除 public 中的 5 个模板残留 SVG | 小 | 删除 `public/{file,globe,next,vercel,window}.svg` |
| 20 | Apple App Site Association | 小 | `public/.well-known/apple-app-site-association`（新建）+ `next.config.ts` |
| 21 | IndexNow 集成 | 中 | `public/` + 部署脚本 |
| 22 | App Links meta 标签 | 小 | `src/app/layout.tsx` |
| 23 | 页面拆分为 server + client 组件 | 大 | `src/app/page.tsx` 架构重构 |
| 24 | 字体 italic 变体移除（可选） | 小 | `src/app/layout.tsx` |
| 25 | 考虑 URL 语言前缀方案（长期 SEO） | 大 | `src/middleware.ts` + 架构重构 |

---

## 快速实施指南（建议顺序）

### 第一阶段（1-2 小时）：完成所有 P0 项目

1. 更新 `src/app/layout.tsx` 的 metadata（metadataBase、canonical、robots、keywords、itunes、OG images）
2. 创建 `src/app/sitemap.ts`
3. 创建 `src/app/robots.ts`
4. 制作并放置 OG 图片（`public/og-image.png` 或 `src/app/opengraph-image.tsx`）
5. 部署后用 OpenGraph.xyz + Lighthouse 验证

### 第二阶段（2-3 小时）：完成核心 P1 项目

6. 创建 `src/app/privacy/layout.tsx` 和 `src/app/support/layout.tsx` 导出独立 metadata
7. 创建 `src/components/JsonLd.tsx` 并在首页引入
8. 将 `<img>` 替换为 `next/image`，改进 alt 文本
9. 添加 `src/app/favicon.ico` 和 `src/app/apple-icon.png`
10. 注册 Google Search Console，提交 sitemap
11. 从 GSC 导入到 Bing Webmaster Tools
12. 部署后用 Rich Results Test + Facebook Debugger 验证

### 第三阶段（按需）：P2 优化

13. 添加安全头、FAQPage schema、H1 优化、Footer Link 组件改进等

---

## 参考资源汇总

### Next.js 官方文档（v16.1.6，2026-02-27 更新）

- [generateMetadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Metadata 与 OG 图片入门](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Sitemap 文件约定](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Robots.txt 文件约定](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [opengraph-image 文件约定](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [App Icons 文件约定](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons)
- [Image 组件 API](https://nextjs.org/docs/app/api-reference/components/image)
- [Image 优化入门](https://nextjs.org/docs/app/getting-started/images)
- [Font 优化](https://nextjs.org/docs/app/guides/optimizing/fonts)
- [JSON-LD 指南](https://nextjs.org/docs/app/guides/json-ld)
- [Content Security Policy](https://nextjs.org/docs/pages/guides/content-security-policy)
- [Server 和 Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Package Bundling 指南](https://nextjs.org/docs/app/guides/package-bundling)
- [trailingSlash 配置](https://nextjs.org/docs/app/api-reference/config/next-config-js/trailingSlash)
- [Link 组件](https://nextjs.org/docs/app/api-reference/components/link)
- [Adding Metadata 教程](https://nextjs.org/learn/dashboard-app/adding-metadata)

### Google / 搜索引擎

- [Google SoftwareApplication 结构化数据](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [Google FAQPage 结构化数据](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Google Core Web Vitals 与搜索排名](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

### Schema.org

- [MobileApplication](https://schema.org/MobileApplication)
- [SoftwareApplication](https://schema.org/SoftwareApplication)
- [FAQPage](https://schema.org/FAQPage)

### Apple Developer

- [Smart App Banners](https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners)
- [Universal Links](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app)
- [App Store Search](https://developer.apple.com/app-store/search/)

### Vercel

- [Security Headers](https://vercel.com/docs/headers/security-headers)
- [OG Image Generation](https://vercel.com/docs/og-image-generation)
- [如何生成 Sitemap](https://vercel.com/kb/guide/how-do-i-generate-a-sitemap-for-my-nextjs-app-on-vercel)

### Web 性能

- [web.dev LCP 优化](https://web.dev/articles/lcp)
- [web.dev CLS 优化](https://web.dev/articles/cls)
- [web.dev Core Web Vitals 阈值](https://web.dev/articles/defining-core-web-vitals-thresholds)
- [Core Web Vitals 2026 优化指南](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide)

### 索引工具

- [IndexNow 文档](https://www.indexnow.org/documentation)
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

### 社区教程与指南

- [How to Configure SEO in Next.js 16](https://jsdevspace.substack.com/p/how-to-configure-seo-in-nextjs-16)
- [Next.js 16 Canonical & Hreflang 详解](https://www.buildwithmatija.com/blog/nextjs-advanced-seo-multilingual-canonical-tags)
- [next-intl App Router i18n Guide (2026)](https://nextjslaunchpad.com/article/nextjs-internationalization-next-intl-app-router-i18n-guide)
- [Next.js 16 Server Components 性能指南](https://www.digitalapplied.com/blog/nextjs-16-performance-server-components-guide)
- [React & Next.js 2026 最佳实践](https://fabwebstudio.com/blog/react-nextjs-best-practices-2026-performance-scale)
- [FreeCodeCamp: IndexNow + Next.js](https://www.freecodecamp.org/news/how-to-index-nextjs-pages-with-indexnow/)
- [Universal & Deep Links: 2026 Complete Guide](https://dev.to/marko_boras_64fe51f7833a6/universal-deep-links-2026-complete-guide-36c4)
- [SoftwareApplication Schema 2026 指南](https://schemavalidator.org/guides/software-application-schema)
- [Favicon Generator for Next.js](https://realfavicongenerator.net/favicon-generator/nextjs)
- [Next.js 图片优化深度指南](https://geekyants.com/blog/optimizing-image-performance-in-nextjs-best-practices-for-fast-visual-web-apps)
- [Complete Next.js SEO Guide (2025)](https://www.adeelhere.com/blog/2025-12-09-complete-nextjs-seo-guide-from-zero-to-hero)
- [Strapi: Complete Next.js SEO Guide](https://strapi.io/blog/nextjs-seo)
