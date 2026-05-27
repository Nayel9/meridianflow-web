"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Circle, Loader2, MoveRight } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type StepState = "queued" | "running" | "done";

type Step = { k: string; startAt: number };

const STEPS: Step[] = [
  { k: "ingest", startAt: 0 },
  { k: "parse", startAt: 800 },
  { k: "repro", startAt: 1700 },
  { k: "spec", startAt: 2800 },
  { k: "verdict", startAt: 3700 },
];
const LOOP_MS = 5400;
const END_AT = 4400;

function HeroShowcase() {
  const t = useT();
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      setTick((now - start) % LOOP_MS);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Reveal className="mt-12 sm:mt-16 lg:mt-20">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-bg-elev to-[oklch(0.165_0.008_250)]">
        {/* head */}
        <div className="flex items-center justify-between border-b border-line-soft px-4 py-3 font-mono text-xs text-fg-mute sm:px-5">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[oklch(0.3_0.012_250)]" />
              <span className="size-2.5 rounded-full bg-[oklch(0.3_0.012_250)]" />
              <span className="size-2.5 rounded-full bg-[oklch(0.3_0.012_250)]" />
            </span>
            <span className="hidden sm:inline">{t.showcase.run}</span>
          </div>
          <div className="flex items-center gap-3.5">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-pass" /> {t.showcase.env}
            </span>
            <span className="hidden text-fg-dim sm:inline">{t.showcase.elapsed}</span>
          </div>
        </div>

        <div className="grid min-h-[380px] md:grid-cols-[1.2fr_1.5fr]">
          {/* left — ticket input */}
          <div className="flex flex-col gap-4 border-b border-line-soft bg-[oklch(0.16_0.008_250)] p-5 md:border-b-0 md:border-r">
            <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
              <span>{t.showcase.inputLabel}</span>
            </div>

            <div className="grid gap-2 rounded-lg border border-line-soft bg-bg-elev p-4 text-[13.5px]">
              <div className="flex items-center gap-2.5 font-mono text-[11.5px] tracking-[0.04em] text-fg-mute">
                <span className="font-medium text-fg-soft">PROD-2814</span>
                <span>•</span>
                <span>{t.showcase.ticketReporter}</span>
                <Tag tone="warn" className="ml-auto">
                  {t.showcase.ticketStatus}
                </Tag>
              </div>
              <div className="text-[14px] font-medium tracking-[-0.008em] text-fg">
                {t.showcase.ticketTitle}
              </div>
              <p className="text-[13px] leading-[1.55] text-fg-mute">{t.showcase.ticketBody}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Tag>checkout</Tag>
                <Tag>promo</Tag>
                <Tag>p1</Tag>
              </div>
            </div>

            <div className="mt-1 flex items-center gap-2 font-mono text-[11.5px] tracking-[0.04em] text-fg-mute">
              <span className="text-fg-dim">{t.showcase.handoff}</span>
              <MoveRight className="size-3.5 text-accent" />
              <span>{t.showcase.runner}</span>
            </div>
          </div>

          {/* right — pretriage */}
          <div className="flex flex-col gap-4 p-5">
            <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
              <span>{t.showcase.pretriageLabel}</span>
              <span className="text-fg-mute">{t.showcase.stepsCount}</span>
            </div>

            <ul className="grid divide-y divide-line-soft overflow-hidden rounded-lg border border-line-soft bg-[oklch(0.165_0.008_250)]">
              {STEPS.map((s, i) => {
                const next = STEPS[i + 1];
                const endAt = next ? next.startAt : END_AT;
                let state: StepState = "queued";
                if (tick >= s.startAt && tick < endAt) state = "running";
                else if (tick >= endAt) state = "done";

                return (
                  <li
                    key={s.k}
                    data-state={state}
                    className={cn(
                      "grid grid-cols-[22px_1fr_auto] items-center gap-3 px-4 py-2.5 text-[13px] transition-colors",
                      state === "done" && "text-fg-soft",
                      state === "running" && "bg-accent/[0.06] text-fg",
                      state === "queued" && "text-fg-dim",
                    )}
                  >
                    <span className="inline-flex size-4 items-center justify-center">
                      {state === "done" ? (
                        <Check className="size-3.5 text-pass" />
                      ) : state === "running" ? (
                        <Loader2 className="size-3.5 animate-spin text-accent" />
                      ) : (
                        <Circle className="size-2 fill-current text-fg-dim" />
                      )}
                    </span>
                    <span>{t.showcase.steps[i]}</span>
                    <span
                      className={cn(
                        "font-mono text-[10.5px] uppercase tracking-[0.1em]",
                        state === "done" && "text-pass",
                        state === "running" && "text-accent",
                        state === "queued" && "text-fg-dim",
                      )}
                    >
                      {state === "done"
                        ? t.showcase.stateDone
                        : state === "running"
                          ? t.showcase.stateRunning
                          : t.showcase.stateQueued}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="rounded-lg border border-line-soft bg-[oklch(0.155_0.008_250)] p-3.5 font-mono text-[12.5px]">
              <div className="flex items-center gap-3.5 border-b border-dashed border-line-soft py-1.5">
                <span className="w-[88px] text-[11px] uppercase tracking-[0.06em] text-fg-dim">
                  {t.showcase.verdictMuted}
                </span>
                <Tag tone="fail">{t.showcase.verdictValue}</Tag>
              </div>
              <div className="flex items-center gap-3.5 border-b border-dashed border-line-soft py-1.5">
                <span className="w-[88px] text-[11px] uppercase tracking-[0.06em] text-fg-dim">
                  {t.showcase.componentMuted}
                </span>
                <span className="text-fg-soft">checkout/PromoCodeInput.tsx</span>
              </div>
              <div className="flex items-center gap-3.5 py-1.5">
                <span className="w-[88px] text-[11px] uppercase tracking-[0.06em] text-fg-dim">
                  {t.showcase.artefactsMuted}
                </span>
                <span className="text-fg-soft">{t.showcase.artefactsValue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Hero() {
  const t = useT();
  return (
    <header className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28">
      <div className="bg-grid" aria-hidden="true" />
      <div className="shell relative">
        <div className="grid max-w-[880px] gap-7">
          <Reveal>
            <span className="inline-flex h-7 items-center gap-2.5 rounded-full border border-line bg-bg-elev pl-2 pr-3 text-[12.5px] text-fg-soft">
              <span className="rounded-full bg-accent-soft px-2 py-[2px] font-mono text-[10.5px] uppercase tracking-[0.08em] text-accent">
                {t.hero.pillTag}
              </span>
              <span>{t.hero.pillText}</span>
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-[clamp(40px,6.4vw,76px)] font-medium leading-[1.02] tracking-tighter3 text-balance">
              {t.hero.titleBefore}
              <em className="not-italic text-accent">{t.hero.titleEm}</em>
              {t.hero.titleAfter}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="max-w-[620px] text-[clamp(17px,1.6vw,20px)] tracking-[-0.005em] text-fg-mute text-pretty">
              {t.hero.sub}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/pilot">
                  {t.hero.ctaPrimary} <ArrowRight className="arrow size-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/contact">{t.hero.ctaSecondary}</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] text-fg-mute">
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-pass" /> {t.hero.meta1}
              </span>
              <span className="size-1 rounded-full bg-fg-dim" />
              <span>{t.hero.meta2}</span>
              <span className="size-1 rounded-full bg-fg-dim" />
              <span>{t.hero.meta3}</span>
            </div>
          </Reveal>
        </div>

        <HeroShowcase />
      </div>
    </header>
  );
}
