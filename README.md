# Dubbing AI Blog - Vibe Coding 工作流

## 项目简介

这是 Dubbing AI Blog 的独立 Next.js 项目，部署在 `blog.dubbingai.io`。

通过反向代理（Cloudflare Workers 或 Vercel Rewrites），用户访问 `dubbingai.io/blog/*` 会被透明代理到本项目。

## 本地开发

```bash
cd blog-app
npm install
npm run dev      # 启动开发服务器 http://localhost:3000
```

## 内容编辑（Vibe Coding）

所有文章以 Markdown 格式存放在 `content/blog/` 目录下，修改后重新构建即可。

### 新增文章

1. 在 `content/blog/` 下创建 `your-article-slug.md`
2. 使用以下模板填写 frontmatter：

```yaml
---
title: "文章标题"
description: "文章摘要（用于 SEO 和列表页展示）"
slug: "your-article-slug"
date: 2026-07-07
author: "作者名"
image: "https://dubbingai.io/blog/images/cover.png"
keywords: []
category: "voice-changer-review"
related: []
lang: "en"
status: "published"
source: "manual"
canonical: "https://dubbingai.io/blog/your-article-slug/"
cta_title: "Your Call-to-Action Title"
cta_intro: "Supporting sentence for the CTA. Keep it under 160 characters."
---
```

3. Frontmatter 下方写 Markdown 正文
4. 可在文章末尾添加 FAQ 段落（`## FAQ`，使用 `###` 表示问题）

### 分类系统

| category key | 显示名称 |
|---|---|
| `voice-changer-tips` | Voice Changer Tips |
| `voice-changer-review` | Voice Changer Review |
| `sound-effect-tips` | Sound Effect Tips |
| `soundboard-tips` | Soundboard Tips |
| `voice-actors` | Voice Actors |
| `vocal-remover-tips` | Vocal Remover Tips |

### 301 重定向

如果某篇文章需要重定向到另一篇，设置 `superseded_by: "target-slug"`。

### 构建与部署

```bash
npm run build    # 先编译 Markdown → TypeScript 数据，再 Next.js 构建
                 # Vercel 部署时会自动执行此命令
```

## 项目结构

```
blog-app/
├── content/blog/*.md           # 文章源文件（Markdown + YAML frontmatter）
├── scripts/build-blog-data.ts  # 构建脚本：.md → src/data/blog-data.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 根布局
│   │   ├── page.tsx            # Blog 列表页（/）
│   │   ├── [slug]/page.tsx     # Blog 详情页（/[slug]）
│   │   ├── sitemap.ts          # Sitemap 生成
│   │   ├── robots.ts           # Robots.txt
│   │   └── globals.css         # 全局样式
│   ├── components/
│   │   ├── blog/               # Blog 专属组件
│   │   │   ├── ArticlePage.tsx
│   │   │   ├── MarkdownRenderer.tsx
│   │   │   ├── ShareButtons.tsx
│   │   │   └── ShareRail.tsx
│   │   ├── shared/             # 共享组件
│   │   │   ├── Breadcrumbs.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── FinalCTASection.tsx
│   │   │   └── JsonLd.tsx
│   │   └── ui/                 # shadcn UI 基础组件
│   │       ├── accordion.tsx
│   │       ├── breadcrumb.tsx
│   │       └── button.tsx
│   ├── lib/
│   │   ├── blog.ts             # BlogPost 类型 + 常量
│   │   ├── blog-server.ts      # 服务端数据访问
│   │   ├── blog-faq.ts         # FAQ 解析
│   │   ├── download.ts         # CTA 常量
│   │   ├── finalCtaCopy.ts     # CTA 文案生成
│   │   └── utils.ts            # cn() 工具函数
│   ├── data/
│   │   └── blog-data.ts        # 自动生成，勿手动编辑
│   └── views/
│       └── Blog.tsx            # Blog 列表页视图
└── public/
    └── placeholder.svg          # 图片加载失败占位
```

## 反向代理配置

### 方案 A：Cloudflare Workers（推荐）

将 `cloudflare-worker.js` 部署到 Cloudflare Workers，绑定在 `dubbingai.io` 域名上。

### 方案 B：Vercel Rewrites

在主站 `next.config.ts` 中添加：

```ts
async rewrites() {
  return [
    {
      source: '/blog/:path*',
      destination: 'https://blog.dubbingai.io/:path*',
    },
  ];
}
```

## SEO 说明

- 所有页面的 canonical URL 指向 `https://dubbingai.io/blog/...`
- 结构化数据（JSON-LD）：Article、Blog、FAQPage、BreadcrumbList
- Sitemap 由 `src/app/sitemap.ts` 自动生成
- 搜索引擎看到的 URL 样式为 `dubbingai.io/blog/*`（通过反向代理透明转发）

---

## 迁移记录 — 2026-07-07

### 背景

Blog 系统最初作为 `dubbingai-web` 主站的一部分运行，路由为 `/[locale]/blog`（列表）和 `/blog/[slug]`（详情）。为支持 Blog 与主站独立运营（独立构建、独立部署、不互相阻塞），将 Blog 拆分为独立 Next.js 项目。

### 迁移内容

**从主站迁移到 blog-app 的文件：**

| 类别 | 操作 | 数量 |
|---|---|---|
| 路由 | `app/[locale]/blog/`、`app/blog/` 重写为 `app/page.tsx` 和 `app/[slug]/page.tsx` | 3 |
| 页面组件 | `views/Blog.tsx`、`components/blog/ArticlePage.tsx` 等 | 5 |
| 数据层 | `lib/blog.ts`、`lib/blog-server.ts`、`lib/blog-faq.ts` | 3 |
| 数据文件 | `data/blog-data.ts`（构建产物，3.7MB） | 1 |
| 内容源 | `content/blog/*.md`（257 篇 Markdown 文章） | 257 |
| 构建脚本 | `scripts/build-blog-data.ts` | 1 |

**内联复制的共享依赖：**

| 组件 | 来源 | 附带的内联依赖 |
|---|---|---|
| `Breadcrumbs.tsx` | `@/components/shared/` | `ui/breadcrumb.tsx`（shadcn） |
| `FAQSection.tsx` | `@/components/shared/` | `ui/accordion.tsx`（shadcn） |
| `FinalCTASection.tsx` | `@/components/shared/` | `ui/button.tsx`（shadcn）、`lib/download.ts` |
| `JsonLd.tsx` | `@/components/shared/` | 零内部依赖 |
| `cn()` | `@/lib/utils` | `clsx` + `tailwind-merge` |

**从主站清理的内容：**

- 路由：`src/app/[locale]/blog/`、`src/app/blog/` 整个目录
- 组件：`src/components/blog/`、`src/views/Blog.tsx`
- lib：`src/lib/blog.ts`、`src/lib/blog-server.ts`、`src/lib/blog-faq.ts`
- 数据：`src/data/blog-data.ts`
- 构建脚本：`scripts/build-blog-data.ts`
- `middleware.ts`：移除 Blog 详情 locale 剥离规则和 passthrough 规则
- `sitemap.ts`：移除 Blog 详情条目和 `/blog` 本地化路由
- `package.json`：移除 `gray-matter` 依赖，简化 `build` 命令

### 架构简化

| 维度 | 迁移前（主站内） | 迁移后（独立） |
|---|---|---|
| 国际化 | `next-intl` 11 种语言（列表页 locale 化） | 统一英文 |
| 路由前缀 | `/[locale]/blog`、`/blog/[slug]` | `/`、`/[slug]` |
| 布局 | 主站 Navigation + Footer + next-intl Provider | 极简 `<html>` + `<body>` |
| 依赖数量 | 共享主站全部依赖 | 仅 blog 必要的 10 个 runtime 依赖 |

### 验证结果

- **blog-app**：`npm run build` 通过，生成 261 个静态页面（1 列表 + 256 详情 + not-found + sitemap + robots）
- **主站**：`npm run build` 通过，生成 2985 个页面，不再包含 blog 路由
- TypeScript 类型检查：两端均无错误

