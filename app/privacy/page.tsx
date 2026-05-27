"use client";

import { useT } from "@/lib/i18n/context";
import { PageShell } from "@/components/page-shell";

export default function PrivacyPage() {
  const t = useT();
  return (
    <PageShell
      eyebrow={t.footer.links.privacy}
      title={t.legal.privacyTitle}
      intro={t.legal.privacyIntro}
      back={t.legal.backHome}
    >
      <article className="prose prose-invert max-w-[760px] space-y-6 text-[14.5px] leading-[1.7] text-fg-soft">
        <section>
          <h2 className="mb-2 text-[16px] font-medium tracking-[-0.01em] text-fg">Data we collect</h2>
          <p className="text-fg-mute">
            Account information, billing details, and the artefacts produced by the runner you choose to share with our
            control plane (verdicts, traces, redacted screenshots). The runner itself runs inside your perimeter and
            never transmits source code to us.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-[16px] font-medium tracking-[-0.01em] text-fg">How we use it</h2>
          <p className="text-fg-mute">
            To operate Meridian Flow, improve heuristics on your own historical traces (opt-out available), and provide
            support. We never use customer data to train third-party models.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-[16px] font-medium tracking-[-0.01em] text-fg">Residency & retention</h2>
          <p className="text-fg-mute">
            EU data residency by default (eu-west-3). Artefacts are retained 90 days unless your workspace policy says
            otherwise. Account data is retained for the duration of your contract.
          </p>
        </section>
        <p className="font-mono text-[12px] tracking-[0.04em] text-fg-dim">{t.legal.lastUpdated} · 2026-05-01</p>
      </article>
    </PageShell>
  );
}
