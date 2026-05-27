# Meridian Flow — Web

Production landing for **Meridian Flow**: AI-powered technical pretriage for Jira + Playwright teams.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript 5** (strict)
- **Tailwind CSS 3** + custom OKLCH design tokens
- **shadcn/ui-style primitives** (`Button`, `Input`, `Textarea`, `Label`, `Tag`) — cherry-picked, no CLI dependency
- **Framer Motion** — subtle reveal-on-scroll only
- **Lucide** — single icon set
- **next/font** — Geist + JetBrains Mono

## Scripts

Package manager: **pnpm** (≥ 10). Pinned via `packageManager` in `package.json` so Corepack picks the right version automatically.

```bash
pnpm install
pnpm dev         # http://localhost:3000
pnpm build
pnpm lint
pnpm typecheck
pnpm format
```

## Routes

| Path        | Purpose                                  |
| ----------- | ---------------------------------------- |
| `/`         | Landing — Hero, Problem, Workflow, Outputs, Security, Stack, Pilot |
| `/security` | Architecture deep-dive                   |
| `/docs`     | Documentation index (gated, request access) |
| `/pilot`    | Pilot application form (mocked submit)   |
| `/contact`  | General contact form (mocked submit)     |
| `/privacy`  | Privacy policy                           |
| `/terms`    | Pilot terms                              |
| `/_*`       | `not-found.tsx` fallback                 |

## i18n

FR (default) + EN, persisted to `localStorage` via `lib/i18n/context.tsx`. Switch via the FR / EN toggle in the nav.

## Contact form

Submits to a mocked success state (700ms latency). Wire to Resend / Formspree by replacing the `setTimeout` in
`components/contact-form.tsx`. Suggested env var: `NEXT_PUBLIC_CONTACT_ENDPOINT`.

## Environment

| Variable                | Purpose                                           |
| ----------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Canonical site URL used by metadata, sitemap, OG. Defaults to `https://meridianflow.dev`. |

## Deploy

Vercel-ready. `next build` outputs a fully static + edge-rendered build. The Vercel dashboard auto-detects pnpm from `packageManager`.
