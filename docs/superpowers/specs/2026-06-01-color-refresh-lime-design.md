# Color Refresh — Lime Design

**Date:** 2026-06-01  
**Status:** Approved  
**Scope:** Replace the blue-cyan accent with lime, neutralize all blue-tinted neutrals, add lime glow effects throughout.

---

## Context

The current MeridianFlow landing uses `oklch(0.84 0.09 200)` as its primary accent — a cool blue-cyan visually close to Seascope Landing's `#5EEAD4` teal. The goal is to differentiate the two projects by adopting a lime green identity while refreshing the full visual atmosphere (Option C: full visual refresh).

---

## 1. Color Palette

### Accent

| Token | Old value | New value |
|---|---|---|
| `accent` | `oklch(0.84 0.09 200)` | `oklch(0.87 0.20 130)` |
| `accent-soft` | `oklch(0.84 0.09 200 / 0.18)` | `oklch(0.87 0.20 130 / 0.15)` |
| `accent-line` | `oklch(0.84 0.09 200 / 0.32)` | `oklch(0.87 0.20 130 / 0.30)` |
| `accent-ring` | `oklch(0.84 0.09 200 / 0.45)` | `oklch(0.87 0.20 130 / 0.45)` |

### Backgrounds — neutralize blue cast (hue 250 → 140)

| Token | Old value | New value |
|---|---|---|
| `bg` | `oklch(0.145 0.008 250)` | `oklch(0.145 0.004 140)` |
| `bg-elev` | `oklch(0.175 0.009 250)` | `oklch(0.175 0.005 140)` |
| `bg-elev-2` | `oklch(0.205 0.010 250)` | `oklch(0.205 0.006 140)` |
| `surface` | `oklch(0.185 0.010 250)` | `oklch(0.185 0.005 140)` |
| `line` | `oklch(0.265 0.012 250)` | `oklch(0.265 0.008 140)` |
| `line-soft` | `oklch(0.225 0.011 250)` | `oklch(0.225 0.006 140)` |

### Foreground — neutralize blue cast

| Token | Old value | New value |
|---|---|---|
| `fg` | `oklch(0.965 0.004 90)` | `oklch(0.965 0.004 90)` *(unchanged)* |
| `fg-soft` | `oklch(0.82 0.006 240)` | `oklch(0.82 0.005 140)` |
| `fg-mute` | `oklch(0.62 0.010 240)` | `oklch(0.62 0.007 140)` |
| `fg-dim` | `oklch(0.48 0.012 245)` | `oklch(0.48 0.008 140)` |

### Status colors — unchanged

`pass`, `fail`, `warn` are kept as-is (they already work well with lime).

---

## 2. Visual Effects

### Glow — body background (`globals.css`)

```css
/* old */
radial-gradient(ellipse 90% 60% at 50% -10%, oklch(0.84 0.09 200 / 0.05), transparent 60%)
/* new */
radial-gradient(ellipse 90% 60% at 50% -10%, oklch(0.87 0.20 130 / 0.05), transparent 60%)
```

### Glow — hero section (`components/sections/hero.tsx`)

New: add a subtle lime halo on the hero wrapper, plus a top border line:

```css
/* hero wrapper background */
radial-gradient(ellipse 80% 50% at 50% -5%, oklch(0.87 0.20 130 / 0.10), transparent 65%)

/* top border line */
border-top: 1px solid oklch(0.87 0.20 130 / 0.35)
```

### Glow — pilot section (`components/sections/pilot.tsx`)

```js
/* old */
radial-gradient(ellipse 80% 60% at 30% 0%, oklch(0.84 0.09 200 / 0.06) 0%, transparent 60%)
/* new */
radial-gradient(ellipse 80% 60% at 30% 0%, oklch(0.87 0.20 130 / 0.06) 0%, transparent 60%)
```

### Focus ring (`globals.css`)

```css
/* old */ outline: 2px solid oklch(0.84 0.09 200 / 0.55)
/* new */ outline: 2px solid oklch(0.87 0.20 130 / 0.55)
```

---

## 3. Hardcoded Colors in Components

All inline OKLCH values with hue 250 are neutralized to hue 140. All `oklch(0.84 0.09 200 ...)` accent references are replaced with lime.

### `components/sections/hero.tsx`
- `oklch(0.165_0.008_250)` → `oklch(0.165_0.005_140)` (×3)
- `oklch(0.3_0.012_250)` → `oklch(0.28_0.006_140)` (window dots, ×3)
- `oklch(0.16_0.008_250)` → `oklch(0.16_0.004_140)` (×2)
- `oklch(0.155_0.008_250)` → `oklch(0.155_0.004_140)`

### `components/sections/problem.tsx`
- `oklch(0.34_0.013_250)` hover border → `oklch(0.32_0.010_140)`

### `components/sections/workflow.tsx`
- `oklch(0.165_0.008_250)` → `oklch(0.165_0.005_140)`

### `components/sections/outputs.tsx`
- `oklch(0.165_0.008_250)` → `oklch(0.165_0.005_140)` (×2)
- `oklch(0.22_0.01_250)` / `oklch(0.2_0.008_250)` frame gradient → hue 140
- `oklch(0.84 0.09 200 / 0.32)` running ring → `oklch(0.87 0.20 130 / 0.30)`
- `oklch(0.225 0.011 250)` grid lines → `oklch(0.225 0.006 140)`
- `oklch(0.18_0.008_250)` → `oklch(0.18_0.005_140)`

### `components/sections/security.tsx`
- `oklch(0.84 0.09 200 / 0.32)` dashed lines → `oklch(0.87 0.20 130 / 0.30)` (×2)
- `oklch(0.84_0.09_200_/_0.18)` dot halo → `oklch(0.87_0.20_130_/_0.18)`

### `components/sections/stack.tsx`
- `oklch(0.34_0.013_250)` hover border → `oklch(0.32_0.010_140)`
- `oklch(0.165_0.008_250)` → `oklch(0.165_0.005_140)`

---

## Files to Modify

1. `tailwind.config.ts` — palette tokens
2. `app/globals.css` — body glow, focus ring, `.eyebrow`, `.bg-grid`
3. `components/sections/hero.tsx` — hardcoded colors + new hero glow
4. `components/sections/problem.tsx` — hover border
5. `components/sections/workflow.tsx` — panel bg
6. `components/sections/outputs.tsx` — multiple hardcoded colors
7. `components/sections/security.tsx` — dashed lines + dot halo
8. `components/sections/stack.tsx` — hover border + note bg
9. `components/sections/pilot.tsx` — glow gradient
