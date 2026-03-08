# Task: Build Melior Landing Page

Create a single-file landing page (`index.html`) for Melior, an iOS annual reflection app. Static HTML/CSS/JS — no frameworks, no build tools. Bilingual (Chinese default / English) with language toggle.

The attached `melior-landing-v7.html` is the **pixel-accurate reference**. Copy it as the starting point. This prompt documents every detail so you can reproduce it exactly.

---

## Architecture Overview

**5 content sections** + nav + footer, all in one HTML file:
1. Hero (full viewport, letter animation)
2. Showcase (app mockups)
3. Pull Quote (one question, editorial style)
4. Year-Over-Year (dark section, 4 cards)
5. Ending (privacy badges + CTA)

**Background atmosphere layers** (fixed, behind content):
- Mesh gradient (5 blobs simulating iOS MeshGradient)
- Light leaks (4 edge glows with parallax)
- Scroll-responsive light (follows reading position)
- Paper texture (2 SVG noise layers)

---

## Color Tokens

```
--bg: #F9F7F2          --bg-light: #FDFCFA
--dark: #1E1D1B         --dark-card: #282724
--dark-text: #E8E4DC    --dark-muted: #9C9890
--dark-stroke: rgba(255,255,255,.06)
--text: #212226         --muted: #818185         --faint: #A8A7AB
--gold: #8C6432         --gold-light: #B8965A    --gold-warm: #C4A882
--stroke: #E6E0D6
--ch1: #E8D5B8  --ch2: #C2D4B4  --ch3: #C8B8D8  --ch5: #B0C0D4  --ch6: #D4A888
```

---

## Typography Rules

**This is critical — read carefully.**

### Base (body)
`-apple-system, 'PingFang SC', 'Helvetica Neue', 'Noto Sans SC', sans-serif`

### English display
`'Cormorant Garamond', serif` — loaded from Google Fonts, weights 300–700 + italic.

### Brand name "Melior"
ALWAYS title case (`Melior`), NEVER all-caps. Applies to nav logo, footer logo, CTA button text, hero letters.

### `:lang(zh-Hans)` overrides
When the page is in Chinese mode, these elements switch from Cormorant Garamond to PingFang SC:
- `.hero-tag`, `.showcase-line`, `.pq-text`, `.yoy-q`, `.yoy-card-text`, `.yoy-pending`, `.ending-title`, `.chapters-line`, `.cta-btn`

Additionally, these Chinese elements also get **tighter letter-spacing** (0.12em instead of 0.22-0.3em) + PingFang SC:
- `.pq-chapter`, `.ending-badge`

### Elements that ALWAYS use Cormorant Garamond (regardless of language)
Nav logo, footer logo, hero letters, year numbers, decorative marks, "Scroll" text.

### No `text-transform: uppercase` on elements with mixed Chinese/English content
The CTA button and badges do NOT use `text-transform: uppercase`. Case is controlled manually in HTML. This preserves correct casing like "iCloud" and "Melior".

---

## Background Atmosphere System

### 1. Paper Texture (two fixed layers covering viewport)
- **Fine grain** (z-index 9999): SVG `feTurbulence` baseFrequency 0.8, 4 octaves, 200px tiles, 2.2% opacity
- **Coarse fiber** (z-index 9998): SVG `feTurbulence` baseFrequency 0.35, 3 octaves, 512px tiles, 1.2% opacity

### 2. Body Background Gradient
NOT flat. Vertical: `#F9F7F2` → `#F6F2EB` (50%) → `#F3EEE5` (75%) → `#F9F7F2`

### 3. Mesh Gradient (simulates iOS MeshGradient)
Container `.mesh` is `position:fixed; inset:0; z-index:0; overflow:hidden`. Contains 5 large blurred blobs that overlap and slowly drift:

| Blob | Size | Position | Color (rgba) | Blur | Animation |
|------|------|----------|-------------|------|-----------|
| b1 | 60vw (max 700px) | top:-10%, left:20% | 232,213,184, .22 | 80px | m1 20s |
| b2 | 50vw (max 600px) | top:25%, right:-5% | 176,192,212, .16 | 75px | m2 24s |
| b3 | 55vw (max 650px) | top:45%, left:-10% | 200,184,216, .14 | 85px | m3 22s |
| b4 | 50vw (max 600px) | top:70%, right:10% | 212,185,150, .18 | 80px | m4 18s |
| b5 | 45vw (max 550px) | top:30%, left:30% | 194,212,180, .10 | 70px | m5 26s |

Each blob animates through 3 waypoints (translate + scale). Example:
```css
@keyframes m1 {
  0%,100% { transform: translate(0,0) scale(1) }
  33% { transform: translate(5vw,3vh) scale(1.05) }
  66% { transform: translate(-3vw,5vh) scale(.97) }
}
```

### 4. Light Leaks (4 fixed narrow ellipses on page edges)

| Leak | Size | Position | Opacity | Blur | Rotate | Parallax speed |
|------|------|----------|---------|------|--------|---------------|
| 1 | 180×500px | top:8%, left:-40px | .12 | 40px | -12deg | 0.04 |
| 2 | 140×400px | top:35%, right:-30px | .10 | 35px | 8deg | 0.025 |
| 3 | 200×350px | top:60%, left:-50px | .08 | 45px | -5deg | 0.035 |
| 4 | 160×450px | top:80%, right:-35px | .09 | 38px | 15deg | 0.02 |

Parallax JS: on scroll, `requestAnimationFrame` sets `marginTop = -scrollY * speed` per leak.

### 5. Scroll-Responsive Reading Light
600×600px warm radial glow (`rgba(240,228,208,.15)`, blur 80px), fixed center. Vertical position: `top = 10 + (scrollY/maxScroll) * 75` vh. Transition: `top .15s linear`.

### 6. Section Color Temperatures
- **Showcase**: warm `rgba(238,226,208,.15)` in 40–60% band
- **Pull Quote**: cool `rgba(200,210,225,.08)` in 40–60% band
- **Ending**: warm `rgba(232,213,184,.08)` at 50%

### 7. Section Edge Blending
- Showcase `::after`: 80px gradient transparent → `var(--bg)`
- Pull Quote `::after`: 60px gradient transparent → `var(--bg)`

---

## Fixed Nav Bar

- Frosted glass: `background:rgba(249,247,242,.65); backdrop-filter:blur(20px)`, 1px bottom border
- Left: `Melior` (title case, Cormorant Garamond, 17px, weight 400, letter-spacing 0.08em)
- Right: Language buttons "中" / "EN"
- **Dark mode**: IntersectionObserver on YOY section (threshold 0.3) toggles `.dk` class

---

## Section 1: Hero

### Warm vignette
`::before`: `radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(230,220,206,.4) 100%)`

### Two ambient glows
1. Gold center: 420px, pulsing 0.03→0.07, 6s
2. Cool top-right: 300px, `var(--ch5)`, 8s, top:20% right:15%

### Letter-by-letter "Melior"
6 `<span>`, Cormorant Garamond clamp(68px, 13vw, 108px), weight 400. Each fades+slides up. First at 500ms, +130ms each.

### Gold tittle DROP on "i"
7px gold circle drops from 40px above with bounce:
```css
@keyframes tittleDrop {
  0%   { opacity:0; transform:translateX(-50%) translateY(-40px) }
  60%  { opacity:1; transform:translateX(-50%) translateY(2px) }
  80%  { transform:translateX(-50%) translateY(-3px) }
  100% { opacity:1; transform:translateX(-50%) translateY(0) }
}
```
`cubic-bezier(.34,1.56,.64,1)`, 0.7s, delay 0.15s after "i"

### Hairline, Tagline, CTA, Scroll
- Hairline: 60px gold gradient, fades in +350ms after letters
- Tagline: "把每一年，写成一本书。" 38% opacity, +150ms
- CTA button: dark premium with gold ring, +600ms
- Scroll: "Scroll" + breathing line, +1100ms

---

## Section 2: Showcase

- Text: "不是年终总结，是一本关于你自己的书。" clamp(17–22px), 70% opacity
- Three phones fan-arranged: center scale(1), sides scale(.88) rotate(±3deg) opacity(.65)
- Phone screens: Home (center), Chapter list (left), Summary (right)
- Below: "30 个问题 · 6 个篇章" 35% opacity
- Responsive <700px: side phones hidden

---

## Section 3: Pull Quote

- `"` mark: Cormorant clamp(80–120px), gold 12% opacity
- Question: "那段时间，什么撑着你？" clamp(32–56px)
- Label: "逆境重生" color `#C8B8D8`

---

## Section 4: Year-Over-Year (DARK #1E1D1B)

- Grain overlay 4%, gold+purple glows, gold bottom line
- Hairline (dark variant) + decorative `"` quote mark
- Question: "如果能回到年初，你想告诉自己什么？"
- **4-column card grid**, progressive opacity (2024:.45 → 2025:.65 → 2026:.9 → 2027:.35 dashed)
- Each card: year number → gold rule → answer text
- Connecting line at top:48px spanning 10–90%
- Responsive: 700px→2col, 480px→1col

---

## Section 5: Ending

- Badges: 无账号 / 无广告 / 无追踪 / iCloud 存储 (no text-transform!)
- Hairline separator
- Title: "今年的你，有什么想说的？"
- CTA button (no gold ring variant)

---

## CTA Button (Premium Dark)

```
Background: #1E1D1B
Text: #F0EDE6, Cormorant Garamond 14px, weight 500, letter-spacing 0.08em
NO text-transform
Pill shape, padding 16px 44px
Apple SVG icon + <span> text
```

Three layers:
1. Base: inset top highlight + bottom shadow + outer shadows
2. `::before`: diagonal gold gradient overlay
3. `::after`: shimmer sweep (4s infinite, background-position animation)

Hover: translateY(-2px), deeper shadows, gold ring. Hero variant has persistent gold ring.

---

## Footer

- `Melior` (Cormorant 17px, 0.08em)
- Links: 隐私政策 / 关于 / 联系
- `Made by Kexin` — link to https://kexin.li, hover gold

---

## Animation Timing (Hero sequence)

| Step | Element | Delay | Duration |
|------|---------|-------|----------|
| 1–6 | Letters M-e-l-i-o-r | 500ms + i×130ms | 0.65s each |
| 4b | Gold tittle drop | +150ms after "i" | 0.7s bounce |
| 7 | Hairline | 1630ms | 0.8s |
| 8 | Tagline | 1780ms | 0.9s |
| 9 | CTA | 2380ms | 0.8s |
| 10 | Scroll | 2880ms | 1.0s |

---

## JavaScript (6 scripts)

1. Hero sequential animation (setTimeout + class toggle)
2. Scroll reveal (IntersectionObserver → `.v` class)
3. Nav dark mode (IntersectionObserver on `#yoy` → `.dk` class)
4. Language toggle `L(lang)` (swap data attributes + lang attr)
5. Scroll light position (rAF, moves top from 10vh to 85vh)
6. Light leak parallax (rAF, marginTop per leak at different speeds)

---

## Responsive

- **700px**: hide side phones, YOY 2-col, hide connecting line
- **480px**: reduce paddings, YOY 1-col, smaller CTA
- **prefers-reduced-motion**: disable mesh blob + shimmer animations
