"use client";

import { useT } from "@/lib/i18n/context";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import type { ProblemTicket } from "@/lib/i18n/types";

function TicketCard({ ticket }: { ticket: ProblemTicket }) {
  const toneMap = { warn: "warn", fail: "fail", pass: "pass", info: "info", "": undefined } as const;
  const tone = toneMap[ticket.statusTone];
  return (
    <article className="flex h-full flex-col gap-3 rounded-lg border border-line bg-bg-elev p-5 transition-all hover:-translate-y-0.5 hover:border-[oklch(0.32_0.010_140)]">
      <header className="flex items-center gap-2.5 font-mono text-[11.5px] tracking-[0.04em] text-fg-mute">
        <span className="font-medium text-fg-soft">{ticket.key}</span>
        <span>•</span>
        <span>{ticket.reporter}</span>
        <Tag tone={tone ?? "default"} className="ml-auto">
          {ticket.status}
        </Tag>
      </header>
      <h3 className="text-[14px] font-medium tracking-[-0.008em] text-fg">{ticket.title}</h3>
      <p className="text-[13px] leading-[1.55] text-fg-mute">{ticket.body}</p>

      <div className="mt-1 flex flex-col gap-1.5 border-t border-dashed border-line-soft pt-3">
        {ticket.thread.map((m, i) => (
          <div
            key={i}
            className="grid grid-cols-[44px_1fr_auto] items-baseline gap-2.5 text-[12.5px] leading-[1.5]"
          >
            <span
              className={cn(
                "font-mono text-[11px] tracking-[0.04em]",
                m.from === "dev" ? "text-accent" : "text-[oklch(0.78_0.13_80)]",
              )}
            >
              {m.from === "dev" ? "@dev" : "@qa"}
            </span>
            <span className="text-fg-soft">{m.body}</span>
            <span className="font-mono text-[11px] text-fg-dim">{m.when}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export function Problem() {
  const t = useT();
  return (
    <section id="problem" className="border-t border-line-soft py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHead eyebrow={t.problem.eyebrow} title={t.problem.title} sub={t.problem.sub} />

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.problem.tickets.map((tk, i) => (
            <Reveal key={tk.key} delay={i * 0.06}>
              <TicketCard ticket={tk} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="grid grid-cols-2 border-y border-line-soft sm:grid-cols-4">
            {t.problem.stats.map((s, i, arr) => (
              <div
                key={i}
                className={cn(
                  "px-5 py-7",
                  i < arr.length - 1 && "sm:border-r sm:border-line-soft",
                  i < 2 && "border-b border-line-soft sm:border-b-0",
                  i % 2 === 0 && "border-r border-line-soft sm:border-r",
                )}
              >
                <div className="text-[clamp(28px,3.4vw,40px)] font-medium leading-none tracking-tighter2 text-fg">
                  {s.v}
                </div>
                <div className="mt-2.5 text-[13px] leading-[1.4] text-fg-mute text-pretty">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
