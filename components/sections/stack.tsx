"use client";

import { useT } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/reveal";

export function Stack() {
  const t = useT();
  return (
    <section id="stack" className="border-t border-line-soft py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHead eyebrow={t.stack.eyebrow} title={t.stack.title} sub={t.stack.sub} />

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {t.stack.items.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.06}>
              <article className="flex h-full flex-col gap-3.5 rounded-lg border border-line bg-bg-elev p-6 transition-all hover:-translate-y-0.5 hover:border-[oklch(0.32_0.010_140)]">
                <header className="flex items-center gap-4">
                  <span className="rounded border border-accent-line bg-accent-soft px-1.5 py-1 font-mono text-[11.5px] tracking-[0.06em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="text-[18px] font-medium tracking-[-0.015em]">{it.name}</div>
                    <div className="mt-0.5 text-[12.5px] text-fg-mute">{it.role}</div>
                  </div>
                </header>
                <p className="text-[14px] leading-[1.6] text-fg-mute">{it.desc}</p>
                <div className="border-t border-dashed border-line-soft pt-3.5 font-mono text-[11.5px] tracking-[0.04em] text-fg-dim">
                  {it.mono}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-7">
          <div className="rounded-lg border border-line-soft bg-[oklch(0.165_0.005_140)] p-6">
            <div className="mb-3.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
              {t.stack.notHead}
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-1.5 text-[13.5px] text-fg-mute sm:grid-cols-2 lg:grid-cols-3">
              {t.stack.notItems.map((n, i) => (
                <span key={i} className="flex items-center gap-2 py-1">
                  <span aria-hidden="true" className="h-px w-3.5 bg-line" />
                  {n}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
