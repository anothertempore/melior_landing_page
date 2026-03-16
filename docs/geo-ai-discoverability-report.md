# Melior GEO（生成式引擎优化）研究报告：如何让 AI 推荐 Melior

> 研究日期：2026-03-15
> 目标：让 ChatGPT、Claude、Perplexity、Google AI Overviews 等 AI 在用户询问年终反思/日记类应用时推荐 Melior

---

## 目录

1. [什么是 GEO？AI 如何决定推荐什么？](#1-什么是-geo)
2. [llms.txt 标准](#2-llmstxt-标准)
3. [结构化数据（Schema.org）与 AI](#3-结构化数据schemaorg与-ai)
4. [内容策略](#4-内容策略)
5. [技术实施](#5-技术实施)
6. [AI 引用的权威来源](#6-ai-引用的权威来源)
7. [Perplexity / Google AI Overviews 专项优化](#7-perplexity--google-ai-overviews-专项优化)
8. [竞品参考](#8-竞品参考)
9. [实战 Playbook（按优先级排序）](#9-实战-playbook)
10. [参考资料](#10-参考资料)

---

## 1. 什么是 GEO？

**GEO（Generative Engine Optimization，生成式引擎优化）** 指优化内容使其出现在 AI 生成的回答中（ChatGPT、Claude、Perplexity、Google AI Overviews 等）。LLMO（Large Language Model Optimization）和 AIO（AI Optimization）本质相同。

### AI 如何决定推荐什么？

不同平台的机制不同：

- **ChatGPT**：主要依赖训练数据中的模式。知识截止日期之后的信息需要通过联网搜索获取。权威出版物、行业专家的提及权重远高于普通提及。
- **Claude**：倾向于提供平衡的比较（"一些热门选择包括..."），强调多个选项的优劣对比，而非直接推荐"最佳"。
- **Perplexity**：结合 LLM 与实时搜索，附带引用来源。新品牌和最近的产品更新更容易出现在结果中。
- **Google AI Overviews**：语义完整性是最强预测因子——得分 8.5/10 以上的内容被引用的概率是 6.0 以下的 4.2 倍。

### 关键数据

- 2025 年 58% 的消费者依赖 AI 进行产品推荐（两年前仅 25%）
- AI 搜索流量转化率是传统搜索的 4.4 倍
- AI 引荐的访客转化率达 27%，传统搜索仅 2.1%（12 倍差距）
- Perplexity 月处理查询超 7.8 亿次

> 参考：[GEO Industry Report 2025](https://www.omnius.so/blog/geo-industry-report) · [GEO vs. AIO vs. LLMO](https://www.firebrand.marketing/2025/04/geo-vs-aio-vs-llmo/) · [How AI Chatbots Choose Recommendations](https://www.trysight.ai/blog/how-ai-chatbots-choose-recommendations) · [How ChatGPT Chooses Brands](https://www.trysight.ai/blog/how-chatgpt-chooses-brands-to-recommend)

---

## 2. llms.txt 标准

### 是什么？

llms.txt 由 Answer.AI 的 Jeremy Howard 于 2024 年提出，是一个放置在网站根目录的 Markdown 格式文件，为 LLM 在推理时提供结构化的网站信息。

### 文件格式示例

```markdown
# Melior

> A year-end reflection and journaling iOS app that helps you review your year through guided chapters.

Melior is a beautifully designed annual reflection app...

## Features
- [Guided Reflection](https://melior.app/features): 6 chapters covering different life areas
- [Privacy-First](https://melior.app/privacy): All data stored in iCloud, never on our servers

## Optional
- [Support](https://melior.app/support)
```

### 还有 llms-full.txt

更详细的版本，包含完整上下文。Next.js 自身就提供了 `llms-full.txt`（见 https://nextjs.org/docs/llms-full.txt ）。

### 是否应该实施？

**现实情况：目前效果存疑。**

- Google 的 John Mueller 确认："目前没有 AI 系统使用 llms.txt"
- Semrush 测试显示，GPTBot、ClaudeBot、PerplexityBot 对 llms.txt 的访问量为零
- 截至 2025 年 7 月仅 951 个域名发布了 llms.txt
- 但 Anthropic、Stripe、Cloudflare 等公司自己发布了 llms.txt

**建议：P2 优先级。** 实施成本极低（Next.js 中仅需一个 route handler），作为前瞻性布局值得做，但不要指望立竿见影。

### Next.js 实现方式

创建 `app/llms.txt/route.ts`：

```typescript
export const dynamic = "force-static";
export async function GET() {
  const content = `# Melior\n\n> ...`;
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

> 参考：[llms.txt 官方规范](https://llmstxt.org/) · [Semrush: What Is LLMs.txt?](https://www.semrush.com/blog/llms-txt/) · [Next.js llms.txt 实现指南](https://www.buildwithmatija.com/blog/implementing-llms-txt-nextjs-15-sanity-cms) · [Next.js llms-full.txt](https://nextjs.org/docs/llms-full.txt)

---

## 3. 结构化数据（Schema.org）与 AI

### AI 确实使用结构化数据

2025 年 5 月，Google、Microsoft 和 ChatGPT 均发布文档确认结构化数据对 AI 搜索至关重要。Google 明确表示"结构化数据对现代搜索功能至关重要，因为它高效、精确，且易于机器处理。"基于知识图谱的 LLM 准确率比纯依赖非结构化数据的高 300%。

### Melior 应实施的 Schema 类型

**P0 — 必须实施：**

- `SoftwareApplication` — 标记 Melior 为 iOS 应用（含评分、价格、操作系统）
- `Organization` — 标记开发者/公司信息
- `FAQPage` — FAQ 内容的结构化标记（AI Overviews 中引用率最高的元素之一）
- `WebPage` / `WebSite` — 基础页面标记

**P1 — 推荐实施：**

- `Review` / `AggregateRating` — 用户评价
- `HowTo` — 如果有教程/使用指南内容
- `Person`（Author schema）— 创始人/开发者信息

> 参考：[Schema Markup for AI Search](https://www.geostar.ai/blog/complete-guide-schema-markup-ai-search-optimization) · [Google & Microsoft 确认使用 Schema](https://www.schemaapp.com/schema-markup/what-2025-revealed-about-ai-search-and-the-future-of-schema-markup/) · [FAQ Schema for GEO](https://insidea.com/blog/seo/geo/faq-schema-and-structured-data-for-geo/) · [Structured data for AI 2026](https://www.digidop.com/blog/structured-data-secret-weapon-seo)

---

## 4. 内容策略

### P0 — 最高优先级

1. **"Best Of" 比较文章**（在自己的博客/网站上发布）
   - "Best Year-End Reflection Apps 2026"
   - "Best Journaling Apps for Annual Reviews"
   - 格式：表格对比、评分、优缺点列表
   - 这类内容 AI 引用率极高

2. **FAQ 页面**
   - 用问答格式直接回答用户可能问 AI 的问题
   - 例如："What is the best app for year-end reflection?"
   - 每个答案前 40-60 字直接给出结论，再展开
   - 实施 FAQPage Schema

3. **App Store 优化**
   - 积累真实评价（对比：Day One 有 150,000+ 五星评价）
   - 关键词优化描述
   - App Store 是 AI 模型的重要数据来源

### P1 — 高优先级

4. **Reddit 存在感**
   - 在 r/journaling、r/productivity、r/selfimprovement 等社区自然提及
   - AI 模型（尤其 ChatGPT 和 Perplexity）大量引用 Reddit 讨论
   - 不要硬广，而是作为用户分享真实体验

5. **Product Hunt 发布**
   - 获得评论和 upvotes
   - Product Hunt 是 AI 训练数据的重要来源

6. **技术/评测博客覆盖**
   - 被 Zapier、Holstee 等网站的 "best journaling apps" 文章提及
   - 主动联系这些博主请求评测

### P2 — 中期目标

7. **Wikipedia / Wikidata**
   - AI 将 Wikipedia 视为"主要可信度检查点"
   - 有 Wikipedia 页面的品牌中，50% 进入了 AI 最常引用的前 10 名
   - 但 Wikipedia 对新产品有"关注度"门槛——需要先有独立可靠来源的报道
   - Wikidata 条目更容易创建，可作为第一步

8. **GitHub 存在感**
   - 如有开源组件，发布到 GitHub
   - AI 模型会索引 GitHub 内容

> 参考：[Best Journaling Apps 2026 (Reflection.app)](https://www.reflection.app/blog/best-journaling-apps) · [Best Journaling Apps (Holstee)](https://www.holstee.com/blogs/mindful-matter/best-journaling-apps) · [Best Journaling Apps (Zapier)](https://zapier.com/blog/best-journaling-apps/) · [How AI Models Use Wikipedia](https://buzzdealer.com/how-ai-models-use-wikipedia-to-understand-your-brand/) · [Building Brand Signals for LLMs](https://www.hawkwebmarketing.com/building-brand-signals-for-llms/) · [How to Get AI to Recommend Your Products](https://www.streamlineconnector.com/blogs/how-to-get-chatgpt-and-claude-to-recommend-your-products)

---

## 5. 技术实施

### robots.txt 配置（P0）

Melior 应明确允许 AI 搜索爬虫。对于一个想被 AI 推荐的小产品，应该允许所有 AI 爬虫（阻止爬虫只适合大型内容出版商保护版权）。

```
# 允许 AI 搜索爬虫（出现在 AI 搜索结果中）
User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Google-Extended
Allow: /

# 允许训练爬虫（增加被训练数据收录的机会）
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Amazonbot
Allow: /

# 默认
User-agent: *
Allow: /
```

### AI 爬虫分类

| 公司 | 训练爬虫 | 搜索爬虫 | 用户代理爬虫 |
|------|---------|---------|------------|
| OpenAI | GPTBot | OAI-SearchBot | ChatGPT-User |
| Anthropic | ClaudeBot | Claude-SearchBot | Claude-User |
| Perplexity | PerplexityBot | — | Perplexity-User |
| Google | Google-Extended | — | Googlebot |
| Apple | Applebot-Extended | — | Applebot |

> 参考：[AI Crawlers Guide](https://momenticmarketing.com/blog/ai-search-crawlers-bots) · [OpenAI Crawlers](https://developers.openai.com/api/docs/bots) · [Anthropic Bots robots.txt](https://almcorp.com/blog/anthropic-claude-bots-robots-txt-strategy/) · [robots.txt Strategy 2026](https://witscode.com/blogs/robots-txt-strategy-2026-managing-ai-crawlers/)

---

## 6. AI 引用的权威来源

按重要性排序：

| 来源 | 重要性 | Melior 当前状态 | 行动项 |
|------|--------|----------------|--------|
| App Store 评价与评分 | ⭐⭐⭐⭐⭐ | 需确认 | 积极引导用户评价 |
| "Best of" 评测文章（Zapier、Wirecutter 等） | ⭐⭐⭐⭐⭐ | 未被收录 | 主动联系博主 |
| Reddit 讨论 | ⭐⭐⭐⭐ | 需确认 | 在相关社区自然参与 |
| Product Hunt | ⭐⭐⭐⭐ | 需确认 | 策划一次正式发布 |
| 自有网站结构化内容 | ⭐⭐⭐⭐ | 部分实现 | 添加 Schema、FAQ |
| 新闻/科技媒体报道 | ⭐⭐⭐ | 需确认 | 发 press release |
| Wikipedia / Wikidata | ⭐⭐⭐ | 无 | 先积累独立来源报道 |
| GitHub | ⭐⭐ | 需确认 | 如有开源组件可发布 |

> 参考：[Building Citation-Worthy Content](https://www.averi.ai/blog/building-citation-worthy-content-making-your-brand-a-data-source-for-llms) · [Wikipedia & LLM Ranking](https://wikiconsult.com/en/how-to-rank-better-in-chatgpt-using-wikipedia)

---

## 7. Perplexity / Google AI Overviews 专项优化

### Perplexity 排名因素

Perplexity 不是传统"排名"，而是"被引用为可信来源"：

1. **内容新鲜度** — 每 2-3 天更新内容可防止衰减（对博客很重要）
2. **可提取性** — 短定义段、编号列表、数据表格、FAQ 结构、5-10 行内给出答案
3. **域名权威** — 被其他可信来源引用会产生"被引用的引用"效应
4. **主题权威** — 单篇文章不够，需要围绕主题建立内容集群
5. **技术可访问性** — 不要阻止 PerplexityBot
6. **原创性** — 原创框架、截图、第一手观察比二手总结权重高

### Google AI Overviews

1. **语义完整性**（最重要因素）— 内容需要自包含，不需要额外点击即可理解
2. **E-E-A-T** — 2025 年起成为主动过滤机制，缺乏 E-E-A-T 信号的内容直接被排除
3. **FAQ** — AI Overviews 中最常被引用的元素之一
4. **被引用的页面 46.5% 来自传统排名 50 名之外** — 说明内容结构和权威性可以弥补低排名

> 参考：[Perplexity SEO 2026](https://otterly.ai/blog/perplexity-seo/) · [How to Rank on Perplexity](https://aiclicks.io/blog/how-to-rank-on-perplexity) · [12 Tactics for Perplexity](https://nicklafferty.com/blog/how-to-rank-higher-in-perplexity/) · [Google AI Overviews Optimization](https://www.averi.ai/blog/google-ai-overviews-optimization-how-to-get-featured-in-2026) · [Google AI Overviews Ranking Factors](https://wellows.com/blog/google-ai-overviews-ranking-factors/)

---

## 8. 竞品参考

当前被 AI 推荐的主要日记/反思类应用：

| 应用 | 特点 | AI 推荐度 |
|------|------|----------|
| **Day One** | "gold standard"，150,000+ 五星评价，Apple 年度最佳应用 | 极高 |
| **Reflection.app** | AI 驱动日记，有大量 SEO 内容（自己写了 "best journaling apps" 博客） | 高 |
| **Journey** | 跨平台优势 | 高 |
| **Daylio** | 情绪追踪+日记 | 中高 |
| **Stoic** | 斯多葛哲学主题反思应用 | 中 |

**Melior 的差异化定位**：年终专属反思（非日常日记），6 章节引导式体验，隐私优先（纯 iCloud），精美书籍设计。这个定位有清晰的差异化空间，关键是要让 AI 模型"知道" Melior 的存在和定位。

> 参考：[Best Journaling Apps 2026 (Reflection.app)](https://www.reflection.app/blog/best-journaling-apps) · [Best Journaling Apps (Holstee)](https://www.holstee.com/blogs/mindful-matter/best-journaling-apps) · [Best Journaling Apps (Zapier)](https://zapier.com/blog/best-journaling-apps/) · [Best Digital Journal Apps 2026](https://home.journalit.app/best/digital-journal-app)

---

## 9. 实战 Playbook

### P0 — 立即执行（1-2 周内）

| # | 行动项 | 耗时 | 说明 |
|---|--------|------|------|
| 1 | **添加 robots.txt 允许所有 AI 爬虫** | 30 分钟 | 见第 5 节配置模板 |
| 2 | **添加 SoftwareApplication Schema** | 2 小时 | 标记应用名称、平台、评分、价格 |
| 3 | **添加 FAQPage Schema + FAQ 内容区域** | 3 小时 | "What is Melior?" "Is my data private?" 等 |
| 4 | **添加 Organization Schema** | 1 小时 | 公司/开发者信息 |
| 5 | **页面添加 "Answer Block"** | 1 小时 | 40-60 字的直接描述，方便 AI 提取 |
| 6 | **确保 sitemap.xml 完整** | 30 分钟 | 包含所有页面 |

### P1 — 短期执行（1-3 个月内）

| # | 行动项 | 耗时 | 说明 |
|---|--------|------|------|
| 7 | **撰写 "Best Year-End Reflection Apps 2026" 博客** | 1 天 | 在自有网站发布，表格对比 |
| 8 | **Product Hunt 正式发布** | 2-3 天准备 | 写好描述、截图、视频 |
| 9 | **Reddit 社区参与** | 持续 | r/journaling、r/productivity 自然分享 |
| 10 | **联系评测网站** | 持续 | Zapier、Holstee 等 "best apps" 作者 |
| 11 | **实现 llms.txt** | 1 小时 | 低成本前瞻布局 |
| 12 | **在 LinkedIn/Medium/Substack 发布内容** | 持续 | 年终反思主题文章，自然提及 Melior |
| 13 | **鼓励 App Store 评价** | 持续 | 应用内适时引导评价 |

### P2 — 中长期（3-6 个月）

| # | 行动项 | 耗时 | 说明 |
|---|--------|------|------|
| 14 | **建立内容集群** | 持续 | "年终反思" 主题的多篇关联文章 |
| 15 | **争取媒体报道** | 持续 | 科技博客、生活方式媒体 |
| 16 | **创建 Wikidata 条目** | 2 小时 | 比 Wikipedia 门槛低 |
| 17 | **监控 AI 推荐** | 每月 | 定期查询 ChatGPT/Claude/Perplexity "best reflection apps" |
| 18 | **视觉内容** | 持续 | Perplexity 70% 的查询引用视觉内容 |

### 效果预期

- **基础技术工作**（Schema、robots.txt、内容重构）：4-8 周实施
- **权威性建设**（跨平台存在感）：3-6 个月
- **多数品牌在系统优化 90 天内看到可衡量的引用改善**

---

## 10. 参考资料

### GEO 核心概念
- [GEO Industry Report 2025](https://www.omnius.so/blog/geo-industry-report)
- [GEO vs. AIO vs. LLMO](https://www.firebrand.marketing/2025/04/geo-vs-aio-vs-llmo/)
- [How AI Chatbots Choose Recommendations](https://www.trysight.ai/blog/how-ai-chatbots-choose-recommendations)
- [How ChatGPT Chooses Brands](https://www.trysight.ai/blog/how-chatgpt-chooses-brands-to-recommend)
- [AI Chatbot Not Recommending My Product](https://www.trysight.ai/blog/ai-chatbot-not-recommending-my-product)

### llms.txt
- [llms.txt 官方规范](https://llmstxt.org/)
- [Semrush: What Is LLMs.txt?](https://www.semrush.com/blog/llms-txt/)
- [Next.js llms.txt 实现指南](https://www.buildwithmatija.com/blog/implementing-llms-txt-nextjs-15-sanity-cms)
- [llms-txt.io Next.js 实践](https://llms-txt.io/blog/how-to-add-llms-txt-to-nextjs-react)

### 结构化数据
- [Schema Markup for AI Search](https://www.geostar.ai/blog/complete-guide-schema-markup-ai-search-optimization)
- [Google & Microsoft 确认使用 Schema](https://www.schemaapp.com/schema-markup/what-2025-revealed-about-ai-search-and-the-future-of-schema-markup/)
- [FAQ Schema for GEO](https://insidea.com/blog/seo/geo/faq-schema-and-structured-data-for-geo/)
- [Structured data for AI 2026](https://www.digidop.com/blog/structured-data-secret-weapon-seo)

### AI 爬虫
- [AI Crawlers Guide](https://momenticmarketing.com/blog/ai-search-crawlers-bots)
- [OpenAI Crawlers](https://developers.openai.com/api/docs/bots)
- [Anthropic Bots robots.txt](https://almcorp.com/blog/anthropic-claude-bots-robots-txt-strategy/)
- [robots.txt Strategy 2026](https://witscode.com/blogs/robots-txt-strategy-2026-managing-ai-crawlers/)

### 权威来源建设
- [Building Citation-Worthy Content](https://www.averi.ai/blog/building-citation-worthy-content-making-your-brand-a-data-source-for-llms)
- [Wikipedia & LLM Ranking](https://wikiconsult.com/en/how-to-rank-better-in-chatgpt-using-wikipedia)
- [How to Get AI to Recommend Your Products](https://www.streamlineconnector.com/blogs/how-to-get-chatgpt-and-claude-to-recommend-your-products)
- [Building Brand Signals for LLMs](https://www.hawkwebmarketing.com/building-brand-signals-for-llms/)

### AI 搜索引擎优化
- [Perplexity SEO 2026](https://otterly.ai/blog/perplexity-seo/)
- [How to Rank on Perplexity](https://aiclicks.io/blog/how-to-rank-on-perplexity)
- [12 Tactics for Perplexity](https://nicklafferty.com/blog/how-to-rank-higher-in-perplexity/)
- [Google AI Overviews Optimization](https://www.averi.ai/blog/google-ai-overviews-optimization-how-to-get-featured-in-2026)
- [Google AI Overviews Ranking Factors](https://wellows.com/blog/google-ai-overviews-ranking-factors/)

### GEO 实战指南
- [GEO Checklist 12 Steps](https://www.onely.com/blog/generative-engine-optimization-geo-checklist-optimize/)
- [Frase.io GEO Guide](https://www.frase.io/blog/what-is-generative-engine-optimization-geo)
- [LLMrefs GEO Guide](https://llmrefs.com/generative-engine-optimization)

### 竞品参考
- [Best Journaling Apps 2026 (Reflection.app)](https://www.reflection.app/blog/best-journaling-apps)
- [Best Journaling Apps (Holstee)](https://www.holstee.com/blogs/mindful-matter/best-journaling-apps)
- [Best Journaling Apps (Zapier)](https://zapier.com/blog/best-journaling-apps/)
- [Best Digital Journal Apps 2026](https://home.journalit.app/best/digital-journal-app)
