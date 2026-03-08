# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Melior landing page — a single-page marketing site for an iOS annual reflection/journaling app. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4. Bilingual (Chinese default / English) with language toggle.

## Commands

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — ESLint

## Architecture

**Single-page app**: Everything lives in `src/app/page.tsx` (client component) + `src/app/globals.css`.

**5 content sections**: Hero (letter animation) → Showcase (phone mockups) → Pull Quote → Year-Over-Year (dark section) → Ending (privacy badges + CTA)

**i18n**: No library. A `useState<"zh" | "en">` drives an `i18n` object with `t(i18n.key, lang)` helper. Language switch also sets `document.documentElement.lang` for CSS `:lang(zh-Hans)` font overrides.

**CSS**: All styles in `globals.css` (~300 lines). Uses CSS custom properties for color tokens (`--bg`, `--gold`, `--dark-*`, `--ch1`–`--ch6`). Tailwind is imported but barely used — styling is custom CSS with class names matching the original HTML reference.

**Fonts**: `Cormorant_Garamond` loaded via `next/font/google` in `layout.tsx`. Chinese text uses system PingFang SC via `:lang(zh-Hans)` CSS overrides on specific classes.

**Animations**: 6 `useEffect` hooks handle: hero letter sequence (setTimeout chain), scroll reveal (IntersectionObserver + `.v` class), nav dark mode toggle (IntersectionObserver on YOY section), scroll-responsive light position, light leak parallax (rAF).

## Key Conventions

- Brand name is always title case: `Melior` (never ALL-CAPS)
- CTA buttons have NO `text-transform` — casing is manual in content to preserve "iCloud", "Melior"
- The reference design file is `melior-landing-v7.html` with spec in `melior-landing-page-prompt.md`
- Path alias: `@/*` maps to `./src/*`
