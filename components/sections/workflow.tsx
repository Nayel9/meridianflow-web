"use client";

import * as React from "react";
import { useT } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/reveal";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import type { WorkflowStep } from "@/lib/i18n/types";

function SpecBlock({ raceComment }: { raceComment: string }) {
  return (
    <pre className="m-0 whitespace-pre-wrap font-mono text-[12.5px] leading-[1.7] text-fg-soft">
      <span className="tok-kw">test</span>(<span className="tok-str">{`'promo code race condition'`}</span>,{" "}
      <span className="tok-kw">async</span> ({"{ page }"}) {"=>"} {"{"}
      {"\n  "}
      <span className="tok-kw">await</span> page.<span className="tok-fn">goto</span>(
      <span className="tok-str">{`'/checkout'`}</span>);{"\n  "}
      <span className="tok-kw">await</span> page.<span className="tok-fn">fill</span>(
      <span className="tok-str">{`'#promo'`}</span>, <span className="tok-str">{`'SUMMER25'`}</span>);{"\n  "}
      <span className="tok-kw">await</span> page.<span className="tok-fn">click</span>(
      <span className="tok-str">{`'#apply'`}</span>);{"\n  "}
      <span className="tok-kw">await</span> page.<span className="tok-fn">click</span>(
      <span className="tok-str">{`'#pay'`}</span>); <span className="tok-com">{`// ${raceComment}`}</span>
      {"\n  "}
      <span className="tok-kw">await</span> <span className="tok-fn">expect</span>(page.
      <span className="tok-fn">locator</span>(<span className="tok-str">{`'#total'`}</span>)).
      <span className="tok-fn">toBeVisible</span>();{"\n"}
      {"}"});
    </pre>
  );
}

function renderDetail(step: WorkflowStep, raceComment: string) {
  if (step.pre) {
    return (
      <pre className="m-0 whitespace-pre-wrap font-mono text-[12.5px] leading-[1.7] text-fg-soft">{step.pre}</pre>
    );
  }
  if (step.code) {
    return <SpecBlock raceComment={raceComment} />;
  }
  if (step.rows) {
    return (
      <div className="flex flex-col">
        {step.rows.map((r, i, arr) => (
          <div
            key={i}
            className={cn(
              "grid grid-cols-[130px_1fr] items-center gap-3 py-1.5 font-mono text-[13px]",
              i < arr.length - 1 && "border-b border-dashed border-line-soft",
            )}
          >
            <span className="text-[11px] uppercase tracking-[0.08em] text-fg-dim">{r.k}</span>
            <span className={r.pass ? "text-pass" : undefined}>
              {r.tag ? <Tag tone={r.tag}>{r.v}</Tag> : r.v}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function Workflow() {
  const t = useT();
  const steps = t.workflow.steps;
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    setActive((a) => Math.min(a, steps.length - 1));
  }, [steps.length]);

  const current = steps[active]!;

  return (
    <section id="workflow" className="border-t border-line-soft py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHead eyebrow={t.workflow.eyebrow} title={t.workflow.title} sub={t.workflow.sub} />

        <Reveal>
          <div className="grid items-start gap-7 lg:grid-cols-[320px_1fr]">
            <div
              role="tablist"
              aria-label={t.workflow.title}
              className="flex flex-col gap-0.5 rounded-lg border border-line-soft bg-bg-elev p-1.5"
            >
              {steps.map((s, i) => (
                <button
                  key={i}
                  role="tab"
                  type="button"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "grid grid-cols-[28px_1fr_8px] items-center gap-3 rounded-md border border-transparent px-3.5 py-3.5 text-left transition-all",
                    active === i
                      ? "border-line bg-bg-elev-2 text-fg"
                      : "text-fg-soft hover:bg-bg-elev-2",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[11px] tracking-[0.05em]",
                      active === i ? "text-accent" : "text-fg-dim",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-[0.14em]",
                        active === i ? "text-accent" : "text-fg-dim",
                      )}
                    >
                      {s.tag}
                    </span>
                    <span className="text-sm font-medium tracking-[-0.01em]">{s.title}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-1.5 justify-self-end rounded-full",
                      active === i ? "bg-accent" : "bg-line",
                    )}
                  />
                </button>
              ))}
            </div>

            <div
              role="tabpanel"
              className="flex min-h-[420px] flex-col overflow-hidden rounded-lg border border-line bg-bg-elev"
            >
              <div className="border-b border-line-soft px-6 py-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                  {current.tag}
                </span>
                <h3 className="mt-1 text-[22px] font-medium tracking-[-0.02em] text-fg">
                  {current.title}
                </h3>
                <p className="mt-1.5 max-w-[580px] text-fg-mute text-pretty">{current.desc}</p>
              </div>
              <div className="flex flex-1 flex-col gap-2 bg-[oklch(0.165_0.008_250)] px-6 py-5">
                {renderDetail(current, t.workflow.raceComment)}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
