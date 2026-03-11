# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Melior landing page — a single-page marketing site for an iOS annual reflection/journaling app. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4. English default with Chinese toggle.

## Commands

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — ESLint

## Architecture

**Pages**: Main landing at `src/app/page.tsx` (client component), plus `src/app/privacy/page.tsx` and `src/app/support/page.tsx`. Shared layout in `src/app/layout.tsx` (server component, loads fonts + next-intl provider).

**6 content sections** in page.tsx: Hero (open book on desktop, closed book on mobile) → Showcase (3-phone fan on desktop, single phone on mobile) → Table of Contents (6 chapters) → Year-Over-Year (dark section, 4 cards with timeline narrative) → Promise (privacy badges, 2x2 grid on desktop) → Ending (CTA)

**Components**: `src/components/Nav.tsx` (language toggle, dark mode observer) and `src/components/Footer.tsx`.

**i18n**: Uses `next-intl` with custom middleware (NOT `createMiddleware`). Flat routing — `localePrefix: "never"`, no `[locale]` URL segments. Middleware at `src/middleware.ts` sets `x-locale` header + `NEXT_LOCALE` cookie. Client components use `useTranslations()`, `t.raw()` for HTML content. Messages in `src/i18n/messages/{en,zh}.json`.

**CSS**: All styles in `globals.css` (~640 lines). Custom CSS with class names, CSS custom properties for tokens. Tailwind is imported but barely used. Responsive breakpoints: 480px (small mobile), 700px (mobile), 1024px (desktop), 1440px (wide desktop).

**Fonts**: `Cormorant_Garamond` via `next/font/google` in layout.tsx — always reference as `var(--font-cormorant)`, never as literal string (avoids layout shift). Chinese uses system PingFang SC via `:lang(zh-Hans)` overrides.

**Animations**: `useEffect` hooks in page.tsx handle: hero book/title sequence (setTimeout chain), scroll reveal (IntersectionObserver + `.reveal`/`.v` classes), nav dark mode (IntersectionObserver on YOY section). Stagger delays via `.rd1`/`.rd2`/`.rd3`.

## CSS Patterns

- **Desktop vs Mobile**: Mobile-first base styles. Desktop overrides in `@media(min-width:1024px)` block. Hero has separate `.book-closed` (mobile) and `.book-open` (desktop) structures, toggled via `display:none`.
- **Tokens**: `--bg`, `--gold`, `--gold-light`, `--gold-warm`, `--dark-*` (for YOY section), `--ch1`–`--ch6` (chapter colors)
- **State classes**: `.on` (animation complete), `.v` (scroll-revealed), `.dk` (dark mode nav)
- **Textures**: Paper/cloth textures via SVG `feTurbulence` filters in data URIs
- **Chinese typography**: `:lang(zh-Hans)` overrides switch specific classes to PingFang SC with adjusted letter-spacing and font-weight (e.g., `.toc-name` uses weight 400 in Chinese, 500 in English)

## Key Conventions

- Brand name is always title case: `Melior` (never ALL-CAPS)
- CTA buttons have NO `text-transform` — casing is manual in content to preserve "iCloud", "Melior"
- The reference design file is `src/docs/melior-landing-v7.html` with spec in `src/docs/melior-landing-page-prompt.md`
- Path alias: `@/*` maps to `./src/*`

## Gotchas

- **Middleware location**: Must be at `src/middleware.ts` (not project root) when using `src/` directory. Silently ignored otherwise.
- **Middleware data passing**: Use request headers (`x-locale`), NOT response cookies. Cookies set in middleware aren't visible to `cookies()` in server components on the same request.
- **CSS `clamp()` with negatives**: `clamp(min, val, max)` requires min ≤ max. For negative values, the order flips: `clamp(-180px, -14vw, -100px)` not `clamp(-100px, -14vw, -180px)`.
- **i18n HTML content**: Some translation values contain `<br/>` tags (e.g., `yoyQ`). These are rendered via `dangerouslySetInnerHTML` + `t.raw()`. Desktop CSS hides `<br/>` via `display:none` where line breaks aren't wanted.
