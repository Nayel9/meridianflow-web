"use client";

import { Check } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/reveal";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

function ArchNode({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span
      className={cn(
        "flex-1 rounded-md border px-3.5 py-3 text-center text-[13px] font-medium tracking-[-0.005em]",
        accent
          ? "border-accent-line bg-accent-soft text-accent"
          : "border-line bg-bg-elev-2 text-fg",
      )}
    >
      {label}
    </span>
  );
}

function ArchLine() {
  return (
    <span
      aria-hidden="true"
      className="h-px w-6 bg-gradient-to-r from-line to-line-soft"
    />
  );
}

export function Security() {
  const t = useT();
  return (
    <section id="security" className="border-t border-line-soft py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHead eyebrow={t.security.eyebrow} title={t.security.title} sub={t.security.sub} />

        <Reveal>
          <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
            {/* Perimeter */}
            <div className="flex flex-col">
              <div className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
                {t.security.perimeter}
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-lg border border-line bg-bg-elev p-6">
                <div className="flex items-center gap-3">
                  <ArchNode label={t.security.nodes.jira} />
                  <ArchLine />
                  <ArchNode label={t.security.nodes.runner} accent />
                </div>
                <div className="-mt-1.5 text-center font-mono text-[11px] tracking-[0.04em] text-fg-dim">
                  {t.security.subLines[0]}
                </div>
                <div className="flex items-center gap-3">
                  <ArchNode label={t.security.nodes.staging} />
                  <ArchLine />
                  <ArchNode label={t.security.nodes.workers} />
                </div>
                <div className="-mt-1.5 text-center font-mono text-[11px] tracking-[0.04em] text-fg-dim">
                  {t.security.subLines[1]}
                </div>
              </div>
            </div>

            {/* Bridge */}
            <div className="flex min-w-[200px] flex-col items-center justify-center gap-2 lg:flex-col">
              <div
                aria-hidden="true"
                className="hidden w-px flex-1 lg:block"
                style={{
                  background:
                    "repeating-linear-gradient(180deg, oklch(0.87 0.20 130 / 0.30) 0 4px, transparent 4px 8px)",
                }}
              />
              <div className="flex flex-col items-center gap-1.5 rounded-full border border-line bg-bg-elev px-5 py-3.5 font-mono text-[11.5px] tracking-[0.04em] text-fg-mute">
                <Tag tone="info">mTLS</Tag>
                <span>verdict · trace · har</span>
                <Tag>{t.security.bridgeTag}</Tag>
              </div>
              <div
                aria-hidden="true"
                className="hidden w-px flex-1 lg:block"
                style={{
                  background:
                    "repeating-linear-gradient(180deg, oklch(0.87 0.20 130 / 0.30) 0 4px, transparent 4px 8px)",
                }}
              />
            </div>

            {/* SaaS */}
            <div className="flex flex-col">
              <div className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
                {t.security.saasLabel}
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-lg border border-line bg-bg-elev p-6">
                <div className="flex items-center gap-3">
                  <ArchNode label={t.security.nodes.control} accent />
                </div>
                <div className="-mt-1.5 text-center font-mono text-[11px] tracking-[0.04em] text-fg-dim">
                  {t.security.subLines[2]}
                </div>
                <ul className="grid gap-2 border-t border-dashed border-line-soft pt-3.5 text-[13px] text-fg-soft">
                  {t.security.bullets.map((b, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="size-3.5 shrink-0 text-pass" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="mb-3.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
            {t.security.modesLabel}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {t.security.modes.map((m) => (
              <div
                key={m.name}
                className="rounded-lg border border-line-soft bg-bg-elev p-5"
              >
                <div className="mb-2.5 flex items-center gap-2.5">
                  <span className="size-2 rounded-full bg-accent shadow-[0_0_0_4px_oklch(0.87_0.20_130_/_0.18)]" />
                  <span className="text-[15px] font-medium tracking-[-0.01em]">{m.name}</span>
                </div>
                <p className="mb-3.5 text-[13.5px] leading-[1.55] text-fg-mute">{m.desc}</p>
                <div className="border-t border-dashed border-line-soft pt-3 font-mono text-[11px] tracking-[0.06em] text-fg-dim">
                  {m.best}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
