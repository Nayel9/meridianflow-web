# Color Refresh — Lime Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the blue-cyan accent with lime green (`oklch(0.87 0.20 130)`), neutralize all blue-tinted neutrals, and add lime glow effects throughout the landing page.

**Architecture:** Pure CSS/Tailwind token swap — no logic changes. Start with the design token layer (`tailwind.config.ts`), then `globals.css`, then update each component's hardcoded inline color values file by file. Finish with a build check and visual pass.

**Tech Stack:** Next.js 14, Tailwind CSS v3, OKLCH color space

**Spec:** `docs/superpowers/specs/2026-06-01-color-refresh-lime-design.md`

---

## Task 1: Update design tokens in `tailwind.config.ts`

**Files:**
- Modify: `tailwind.config.ts:26-62`

This is the foundation — all Tailwind utility classes (`text-accent`, `bg-bg`, `border-line`, etc.) derive from here. Changing these cascades to most of the UI automatically.

- [ ] **Step 1: Replace the full `colors` block**

Open `tailwind.config.ts` and replace lines 25–63 (the `colors:` key inside `extend`) with:

```ts
colors: {
  bg: "oklch(0.145 0.004 140)",
  "bg-elev": "oklch(0.175 0.005 140)",
  "bg-elev-2": "oklch(0.205 0.006 140)",
  surface: "oklch(0.185 0.005 140)",
  line: "oklch(0.265 0.008 140)",
  "line-soft": "oklch(0.225 0.006 140)",

  fg: "oklch(0.965 0.004 90)",
  "fg-soft": "oklch(0.82 0.005 140)",
  "fg-mute": "oklch(0.62 0.007 140)",
  "fg-dim": "oklch(0.48 0.008 140)",

  accent: {
    DEFAULT: "oklch(0.87 0.20 130)",
    soft: "oklch(0.87 0.20 130 / 0.15)",
    line: "oklch(0.87 0.20 130 / 0.30)",
  },

  pass: {
    DEFAULT: "oklch(0.80 0.13 155)",
    soft: "oklch(0.80 0.13 155 / 0.14)",
    line: "oklch(0.80 0.13 155 / 0.30)",
  },
  fail: {
    DEFAULT: "oklch(0.72 0.17 25)",
    soft: "oklch(0.72 0.17 25 / 0.14)",
    line: "oklch(0.72 0.17 25 / 0.32)",
  },
  warn: {
    DEFAULT: "oklch(0.82 0.13 75)",
    soft: "oklch(0.82 0.13 75 / 0.14)",
    line: "oklch(0.82 0.13 75 / 0.28)",
  },

  border: "oklch(0.265 0.008 140)",
  input: "oklch(0.225 0.006 140)",
  ring: "oklch(0.87 0.20 130 / 0.45)",
},
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "style: update design tokens to lime accent, neutralize backgrounds"
```

---

## Task 2: Update `app/globals.css` — glow, grid, focus ring, code token

**Files:**
- Modify: `app/globals.css:25-26,35,46-47,101,110`

These are the hardcoded OKLCH values in global styles that aren't derived from Tailwind tokens.

- [ ] **Step 1: Replace body background glow (lines 24–27)**

```css
body {
  @apply min-h-screen overflow-x-hidden;
  background:
    radial-gradient(ellipse 90% 60% at 50% -10%, oklch(0.87 0.20 130 / 0.05), transparent 60%),
    var(--tw-bg-opacity, 1) oklch(0.145 0.004 140);
}
```

- [ ] **Step 2: Replace focus-visible ring (line 35)**

```css
:focus-visible {
  outline: 2px solid oklch(0.87 0.20 130 / 0.55);
  outline-offset: 2px;
  border-radius: 4px;
}
```

- [ ] **Step 3: Replace `.bg-grid` line colors (lines 46–47)**

```css
.bg-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, oklch(0.265 0.008 140 / 0.35) 1px, transparent 1px),
    linear-gradient(to bottom, oklch(0.265 0.008 140 / 0.35) 1px, transparent 1px);
  background-size: 64px 64px;
  background-position: -1px -1px;
  mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%);
}
```

- [ ] **Step 4: Update `.tok-fn` (line 101) and `.tok-com` (line 110)**

```css
.tok-fn {
  color: oklch(0.87 0.20 130);
}
/* ... */
.tok-com {
  color: oklch(0.48 0.008 140);
  font-style: italic;
}
```

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "style: update globals.css glow, focus ring, bg-grid and code tokens to lime"
```

---

## Task 3: Update `components/sections/hero.tsx` — hardcoded colors + hero glow

**Files:**
- Modify: `components/sections/hero.tsx:43,48-50,64,103,151,181`

- [ ] **Step 1: Replace hardcoded inline colors**

| Line | Old | New |
|---|---|---|
| 43 | `to-[oklch(0.165_0.008_250)]` | `to-[oklch(0.165_0.005_140)]` |
| 48 | `bg-[oklch(0.3_0.012_250)]` | `bg-[oklch(0.28_0.006_140)]` |
| 49 | `bg-[oklch(0.3_0.012_250)]` | `bg-[oklch(0.28_0.006_140)]` |
| 50 | `bg-[oklch(0.3_0.012_250)]` | `bg-[oklch(0.28_0.006_140)]` |
| 64 | `bg-[oklch(0.16_0.008_250)]` | `bg-[oklch(0.16_0.004_140)]` |
| 103 | `bg-[oklch(0.165_0.008_250)]` | `bg-[oklch(0.165_0.005_140)]` |
| 151 | `bg-[oklch(0.155_0.008_250)]` | `bg-[oklch(0.155_0.004_140)]` |

- [ ] **Step 2: Add hero glow + top border line**

On the `<header>` element (line 181), add `style` prop and a top border class:

```tsx
<header
  className="relative border-t border-[oklch(0.87_0.20_130_/_0.35)] pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28"
  style={{
    backgroundImage:
      "radial-gradient(ellipse 80% 50% at 50% -5%, oklch(0.87 0.20 130 / 0.10), transparent 65%)",
  }}
>
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/hero.tsx
git commit -m "style: update hero hardcoded colors + add lime glow"
```

---

## Task 4: Update `problem.tsx`, `workflow.tsx`, `stack.tsx` — minor hardcoded colors

**Files:**
- Modify: `components/sections/problem.tsx:14`
- Modify: `components/sections/workflow.tsx:146`
- Modify: `components/sections/stack.tsx:17,37`

- [ ] **Step 1: `problem.tsx` line 14 — hover border**

```tsx
<article className="flex h-full flex-col gap-3 rounded-lg border border-line bg-bg-elev p-5 transition-all hover:-translate-y-0.5 hover:border-[oklch(0.32_0.010_140)]">
```

- [ ] **Step 2: `workflow.tsx` line 146 — code panel bg**

```tsx
<div className="flex flex-1 flex-col gap-2 bg-[oklch(0.165_0.005_140)] px-6 py-5">
```

- [ ] **Step 3: `stack.tsx` line 17 — hover border**

```tsx
<article className="flex h-full flex-col gap-3.5 rounded-lg border border-line bg-bg-elev p-6 transition-all hover:-translate-y-0.5 hover:border-[oklch(0.32_0.010_140)]">
```

- [ ] **Step 4: `stack.tsx` line 37 — note box bg**

```tsx
<div className="rounded-lg border border-line-soft bg-[oklch(0.165_0.005_140)] p-6">
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/problem.tsx components/sections/workflow.tsx components/sections/stack.tsx
git commit -m "style: neutralize hardcoded hue-250 colors in problem, workflow, stack"
```

---

## Task 5: Update `components/sections/outputs.tsx` — 6 hardcoded values

**Files:**
- Modify: `components/sections/outputs.tsx:145,216,217,225,251,264`

- [ ] **Step 1: `CommentPanel` bg (line 145)**

```tsx
<div className="bg-[oklch(0.165_0.005_140)] p-6">
```

- [ ] **Step 2: `FrameMock` gradient + running ring (lines 216–217)**

```tsx
"bg-[linear-gradient(180deg,oklch(0.22_0.006_140)_0%,oklch(0.22_0.006_140)_38px,oklch(0.2_0.005_140)_38px,oklch(0.2_0.005_140)_100%)]",
variant === "mid" && "shadow-[inset_0_0_0_1px_oklch(0.87_0.20_130_/_0.30)]",
```

- [ ] **Step 3: Grid lines (line 225)**

```tsx
background: "repeating-linear-gradient(180deg, oklch(0.225 0.006 140) 0 1px, transparent 1px 14px)",
```

- [ ] **Step 4: Frame bg (line 251) + frame footer (line 264)**

```tsx
{/* line 251 */}
<div className="relative aspect-[16/11] bg-[oklch(0.18_0.005_140)]">

{/* line 264 */}
<div className="flex items-center gap-3 border-t border-line-soft bg-[oklch(0.165_0.005_140)] px-4 py-3 font-mono text-[12px] text-fg-soft">
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/outputs.tsx
git commit -m "style: update outputs hardcoded colors to lime/neutral palette"
```

---

## Task 6: Update `components/sections/security.tsx` — dashed lines + dot halo

**Files:**
- Modify: `components/sections/security.tsx:75,88,129`

- [ ] **Step 1: Dashed accent lines (lines 75 and 88 — same pattern, two occurrences)**

```tsx
style={{
  background:
    "repeating-linear-gradient(180deg, oklch(0.87 0.20 130 / 0.30) 0 4px, transparent 4px 8px)",
}}
```

Apply this to both `<div aria-hidden="true">` elements with the repeating gradient.

- [ ] **Step 2: Dot halo shadow (line 129)**

```tsx
<span className="size-2 rounded-full bg-accent shadow-[0_0_0_4px_oklch(0.87_0.20_130_/_0.18)]" />
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/security.tsx
git commit -m "style: update security dashed lines and dot halo to lime"
```

---

## Task 7: Update `components/sections/pilot.tsx` — glow gradient

**Files:**
- Modify: `components/sections/pilot.tsx:18`

- [ ] **Step 1: Replace glow gradient**

```tsx
style={{
  backgroundImage:
    "radial-gradient(ellipse 80% 60% at 30% 0%, oklch(0.87 0.20 130 / 0.06) 0%, transparent 60%)",
}}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/pilot.tsx
git commit -m "style: update pilot section glow to lime"
```

---

## Task 8: Build verification + visual check

**Files:** none (verification only)

- [ ] **Step 1: Full build**

```bash
npm run build
```

Expected: build completes with no errors. No TypeScript or CSS errors.

- [ ] **Step 2: Start dev server**

```bash
npm run dev
```

Open `http://localhost:3000` and walk through each section visually:

| Section | What to check |
|---|---|
| Global | Body has subtle lime glow at top, no blue cast on backgrounds or text |
| Hero | Lime border-top visible, lime halo behind text, all showcase panel bgs neutral |
| Problem | Card hover border is lime (not blue) |
| Workflow | Code panel bg is neutral dark |
| Outputs | Running frame ring is lime, grid lines and frame bgs are neutral |
| Security | Dashed connector lines are lime, mode indicator dots have lime halo |
| Stack | Card hover border is lime, note box bg is neutral |
| Pilot | Glow gradient is lime |

- [ ] **Step 3: Check no residual hue-250 values**

```bash
grep -r "0\.008 250\|0\.009 250\|0\.010 250\|0\.011 250\|0\.012 250\|0\.09 200\|0\.84 0\.09" \
  app/ components/ --include="*.tsx" --include="*.ts" --include="*.css"
```

Expected: no matches. If any appear, fix them before proceeding.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "style: complete lime color refresh — visual verification passed"
```
