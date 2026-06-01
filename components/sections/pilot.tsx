"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

export function Pilot() {
  const t = useT();
  return (
    <section
      id="pilot"
      className="relative border-t border-line-soft py-20 sm:py-28 lg:py-32"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 30% 0%, oklch(0.87 0.20 130 / 0.06) 0%, transparent 60%)",
      }}
    >
      <div className="shell">
        <Reveal>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <span className="eyebrow">{t.pilot.eyebrow}</span>
              <h2 className="section-title mt-4 text-fg">{t.pilot.title}</h2>
              <p className="section-sub mt-4">{t.pilot.sub}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/pilot">
                    {t.pilot.ctaPrimary} <ArrowRight className="arrow size-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="/contact">{t.pilot.ctaSecondary}</Link>
                </Button>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.04em] text-fg-mute">
                <span className="size-1.5 rounded-full bg-pass" />
                {t.pilot.spots}
              </div>
            </div>

            <div className="rounded-xl border border-line bg-bg-elev p-6 lg:p-7">
              <div className="mb-4 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
                <span>{t.pilot.listHead}</span>
                <Tag tone="info">{t.pilot.pilotTag}</Tag>
              </div>
              <ul className="grid gap-3">
                {t.pilot.list.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-fg-soft">
                    <Check className="size-3.5 shrink-0 text-pass" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-dashed border-line-soft pt-4">
                <div className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-fg-mute">
                  {t.pilot.fitLabel}
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-2 text-[12px] text-fg-mute sm:grid-cols-2">
                  {t.pilot.fitItems.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-2">
                      <Check className="size-3.5 shrink-0 text-pass" /> {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
