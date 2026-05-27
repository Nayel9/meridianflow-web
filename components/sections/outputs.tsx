"use client";

import * as React from "react";
import { useT } from "@/lib/i18n/context";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/reveal";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import type { CommentParagraph, OutputTab } from "@/lib/i18n/types";

type TabId = OutputTab["id"];

function CodeHead({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-line-soft px-4 py-2.5 text-[11.5px] tracking-[0.04em] text-fg-mute">
      <span>{left}</span>
      {right ? <span className="font-mono">{right}</span> : null}
    </div>
  );
}

function VerdictPanel() {
  const t = useT();
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-bg-elev font-mono text-[12.5px] text-fg-soft">
      <CodeHead left="verdict.json" right={t.outputs.verdictHeadMono} />
      <pre className="whitespace-pre overflow-x-auto px-4 py-4 leading-[1.65]">{`{
  `}
        <span className="tok-prop">{`"ticket"`}</span>: <span className="tok-str">{`"PROD-2814"`}</span>,{`
  `}
        <span className="tok-prop">{`"status"`}</span>: <span className="tok-fail">{`"reproduced"`}</span>,{`
  `}
        <span className="tok-prop">{`"category"`}</span>: <span className="tok-str">{`"race_condition"`}</span>,{`
  `}
        <span className="tok-prop">{`"severity"`}</span>: <span className="tok-num">3</span>,{`
  `}
        <span className="tok-prop">{`"component"`}</span>:{" "}
        <span className="tok-str">{`"checkout/PromoCodeInput.tsx"`}</span>,{`
  `}
        <span className="tok-prop">{`"reproduction"`}</span>: {`{
    `}
        <span className="tok-prop">{`"deterministic"`}</span>: <span className="tok-kw">true</span>,{`
    `}
        <span className="tok-prop">{`"runs"`}</span>: <span className="tok-num">12</span>,{`
    `}
        <span className="tok-prop">{`"failure_rate"`}</span>: <span className="tok-num">1.0</span>,{`
    `}
        <span className="tok-prop">{`"env"`}</span>: <span className="tok-str">{`"staging-eu"`}</span>{`
  `}
        {`},
  `}
        <span className="tok-prop">{`"ruled_out"`}</span>: [<span className="tok-str">{`"browser"`}</span>,{" "}
        <span className="tok-str">{`"network"`}</span>, <span className="tok-str">{`"promo_data"`}</span>],{`
  `}
        <span className="tok-prop">{`"suspected_cause"`}</span>:{" "}
        <span className="tok-str">{`"unawaited debounce on apply→pay"`}</span>,{`
  `}
        <span className="tok-prop">{`"blast_radius"`}</span>:{" "}
        <span className="tok-str">{`"~12% of code-applied checkouts"`}</span>,{`
  `}
        <span className="tok-prop">{`"artefacts"`}</span>: [<span className="tok-str">{`"spec.ts"`}</span>,{" "}
        <span className="tok-str">{`"trace.zip"`}</span>, <span className="tok-str">{`"frames/"`}</span>]{`
}`}
      </pre>
    </div>
  );
}

function SpecPanel() {
  const t = useT();
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-bg-elev font-mono text-[12.5px] text-fg-soft">
      <CodeHead left="e2e/promo-code.race.spec.ts" right={t.outputs.specHeadMono} />
      <pre className="whitespace-pre overflow-x-auto px-4 py-4 leading-[1.65]">
        <span className="tok-kw">import</span> {`{ test, expect }`} <span className="tok-kw">from</span>{" "}
        <span className="tok-str">{`'@playwright/test'`}</span>;{`\n\n`}
        <span className="tok-com">{`// ${t.outputs.specCom1}`}</span>
        {`\n`}
        <span className="tok-com">{`// ${t.outputs.specCom2}`}</span>
        {`\n`}
        <span className="tok-kw">test</span>(<span className="tok-str">{`'promo code race: apply then pay before debounce'`}</span>,{" "}
        <span className="tok-kw">async</span> ({`{ page }`}) {`=>`} {`{`}
        {`\n  `}
        <span className="tok-kw">await</span> page.<span className="tok-fn">goto</span>(
        <span className="tok-str">{`'/checkout'`}</span>);{`\n  `}
        <span className="tok-kw">await</span> page.<span className="tok-fn">getByRole</span>(
        <span className="tok-str">{`'textbox'`}</span>, {`{ name: 'Promo code' }`}).
        <span className="tok-fn">fill</span>(<span className="tok-str">{`'SUMMER25'`}</span>);{`\n  `}
        <span className="tok-kw">await</span> page.<span className="tok-fn">getByRole</span>(
        <span className="tok-str">{`'button'`}</span>, {`{ name: 'Apply' }`}).
        <span className="tok-fn">click</span>();{`\n  `}
        <span className="tok-com">{`// ${t.outputs.specCom3}`}</span>
        {`\n  `}
        <span className="tok-kw">await</span> page.<span className="tok-fn">getByRole</span>(
        <span className="tok-str">{`'button'`}</span>, {`{ name: 'Pay' }`}).
        <span className="tok-fn">click</span>();{`\n\n  `}
        <span className="tok-kw">await</span> <span className="tok-fn">expect</span>(page.
        <span className="tok-fn">getByTestId</span>(<span className="tok-str">{`'order-total'`}</span>)).
        <span className="tok-fn">toBeVisible</span>();{`\n  `}
        <span className="tok-kw">await</span> <span className="tok-fn">expect</span>(page.
        <span className="tok-fn">locator</span>(<span className="tok-str">{`'#error-banner'`}</span>)).
        <span className="tok-fn">toHaveCount</span>(<span className="tok-num">0</span>);{`\n`}
        {`}`});
      </pre>
    </div>
  );
}

function renderRich(parts: CommentParagraph) {
  return parts.map((p, i) => {
    if (typeof p === "string") {
      // tiny **bold** parser
      const segments: React.ReactNode[] = [];
      const re = /\*\*([^*]+)\*\*/g;
      let last = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(p)) !== null) {
        if (m.index > last) segments.push(p.slice(last, m.index));
        segments.push(
          <strong key={`b-${i}-${m.index}`} className="font-medium text-fg">
            {m[1]}
          </strong>,
        );
        last = m.index + m[0].length;
      }
      if (last < p.length) segments.push(p.slice(last));
      return <React.Fragment key={i}>{segments}</React.Fragment>;
    }
    return (
      <code
        key={i}
        className="rounded border border-line-soft bg-bg-elev-2 px-1.5 py-[1px] font-mono text-[12.5px] text-accent"
      >
        {p.code}
      </code>
    );
  });
}

function CommentPanel() {
  const t = useT();
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-bg-elev">
      <CodeHead left={t.outputs.commentHead} right={t.outputs.commentSub} />
      <div className="bg-[oklch(0.165_0.008_250)] p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-grid size-8 place-items-center rounded-full border border-accent-line bg-accent-soft font-mono text-[11px] tracking-[0.06em] text-accent">
            MF
          </span>
          <div>
            <div className="text-sm font-medium">
              {t.outputs.commentName} <Tag tone="info" className="ml-1.5">{t.outputs.commentBot}</Tag>
            </div>
            <div className="font-mono text-[11.5px] tracking-[0.04em] text-fg-dim">
              {t.outputs.commentWhen}
            </div>
          </div>
        </div>
        <div className="max-w-[720px] text-[14px] leading-[1.7] text-fg-soft">
          {t.outputs.commentParas.map((para, i) => (
            <p key={i} className={i < t.outputs.commentParas.length - 1 ? "mb-3" : ""}>
              {renderRich(para)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function TracePanel() {
  const t = useT();
  const events: { t: string; k: string; l: string; tone: "" | "warn" | "fail" }[] = [
    { t: "0.000s", k: "nav", l: "GET /checkout", tone: "" },
    { t: "0.420s", k: "click", l: "button[name='Apply']", tone: "" },
    { t: "0.421s", k: "net", l: "POST /api/promo/apply", tone: "" },
    { t: "0.530s", k: "click", l: "button[name='Pay']", tone: "warn" },
    { t: "0.531s", k: "js", l: "TypeError: cannot read 'amount' of undefined", tone: "fail" },
    { t: "0.531s", k: "net", l: "POST /api/checkout · 500", tone: "fail" },
    { t: "0.670s", k: "net", l: "GET /api/promo/apply · 200 (late)", tone: "" },
    { t: "1.800s", k: "end", l: t.outputs.traceLast, tone: "fail" },
  ];
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-bg-elev">
      <CodeHead left={t.outputs.traceHead} right={t.outputs.traceSub} />
      <div>
        {events.map((e, i, arr) => (
          <div
            key={i}
            className={cn(
              "grid grid-cols-[78px_92px_1fr] items-center gap-3.5 px-4 py-2.5 text-[13px]",
              i < arr.length - 1 && "border-b border-line-soft",
              e.tone === "fail" && "bg-fail/[0.05]",
              e.tone === "warn" && "bg-warn/[0.04]",
            )}
          >
            <span className="font-mono text-[11.5px] tracking-[0.04em] text-fg-dim">{e.t}</span>
            <Tag tone={e.tone || "default"} className="justify-self-start">
              {e.k}
            </Tag>
            <span className={cn("font-mono", e.tone === "fail" ? "text-fail" : "text-fg-soft")}>
              {e.l}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FrameMock({ variant }: { variant: "pre" | "mid" | "fail" }) {
  return (
    <div
      className={cn(
        "absolute inset-3 overflow-hidden rounded border border-line-soft",
        "bg-[linear-gradient(180deg,oklch(0.22_0.01_250)_0%,oklch(0.22_0.01_250)_38px,oklch(0.2_0.008_250)_38px,oklch(0.2_0.008_250)_100%)]",
        variant === "mid" && "shadow-[inset_0_0_0_1px_oklch(0.84_0.09_200_/_0.32)]",
        variant === "fail" && "shadow-[inset_0_0_0_1px_oklch(0.72_0.17_25_/_0.4)]",
      )}
    >
      <span className="absolute left-3.5 top-3.5 block h-2.5 w-[70%] rounded-[2px] bg-line" />
      <span
        className="absolute left-3.5 right-3.5 top-[58px] block h-14"
        style={{
          background: "repeating-linear-gradient(180deg, oklch(0.225 0.011 250) 0 1px, transparent 1px 14px)",
        }}
      />
    </div>
  );
}

function ScreensPanel() {
  const t = useT();
  const frames = [
    { label: t.outputs.frameLabels[0], variant: "pre" as const },
    { label: t.outputs.frameLabels[1], variant: "mid" as const, hot: true },
    { label: t.outputs.frameLabels[2], variant: "fail" as const, fail: true },
  ];
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-bg-elev">
      <CodeHead left={t.outputs.screensHead} right={t.outputs.screensSub} />
      <div className="grid sm:grid-cols-3">
        {frames.map((f, i, arr) => (
          <div
            key={i}
            className={cn(
              "flex flex-col",
              i < arr.length - 1 && "border-b border-line-soft sm:border-b-0 sm:border-r",
            )}
          >
            <div className="relative aspect-[16/11] bg-[oklch(0.18_0.008_250)]">
              <FrameMock variant={f.variant} />
              {"fail" in f && f.fail ? (
                <div className="absolute inset-x-3 bottom-3 rounded border border-fail-line bg-fail-soft px-2.5 py-1.5 font-mono text-[11px] tracking-[0.04em] text-fail">
                  {t.outputs.frameBanner}
                </div>
              ) : null}
              {"hot" in f && f.hot ? (
                <div className="absolute bottom-3 left-3 rounded border border-accent-line bg-accent-soft px-2 py-1 font-mono text-[10.5px] tracking-[0.06em] text-accent">
                  {t.outputs.frameHot}
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-3 border-t border-line-soft bg-[oklch(0.165_0.008_250)] px-4 py-3 font-mono text-[12px] text-fg-soft">
              <span className="text-fg-dim">{String(i + 1).padStart(2, "0")}</span>
              <span>{f.label}</span>
              {"fail" in f && f.fail ? <Tag tone="fail" className="ml-auto">fail</Tag> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Outputs() {
  const t = useT();
  const [tab, setTab] = React.useState<TabId>("verdict");

  return (
    <section id="outputs" className="border-t border-line-soft py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHead eyebrow={t.outputs.eyebrow} title={t.outputs.title} sub={t.outputs.sub} />

        <Reveal>
          <div className="grid items-start gap-6 lg:grid-cols-[260px_1fr]">
            <div
              role="tablist"
              aria-label={t.outputs.title}
              className="flex flex-row flex-wrap gap-1 rounded-lg border border-line-soft bg-bg-elev p-1.5 lg:flex-col lg:flex-nowrap"
            >
              {t.outputs.tabs.map((tb) => (
                <button
                  key={tb.id}
                  role="tab"
                  type="button"
                  aria-selected={tab === tb.id}
                  onClick={() => setTab(tb.id)}
                  className={cn(
                    "flex flex-col items-start gap-0.5 rounded-md border border-transparent px-3.5 py-2.5 text-sm tracking-[-0.005em] transition-all",
                    tab === tb.id
                      ? "border-line bg-bg-elev-2 text-fg"
                      : "text-fg-soft hover:bg-bg-elev-2",
                  )}
                >
                  <span>{tb.label}</span>
                  <span
                    className={cn(
                      "font-mono text-[10.5px] tracking-[0.06em]",
                      tab === tb.id ? "text-accent" : "text-fg-dim",
                    )}
                  >
                    {tb.mono}
                  </span>
                </button>
              ))}
            </div>

            <div className="min-h-[460px]">
              {tab === "verdict" && <VerdictPanel />}
              {tab === "spec" && <SpecPanel />}
              {tab === "comment" && <CommentPanel />}
              {tab === "trace" && <TracePanel />}
              {tab === "screens" && <ScreensPanel />}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
