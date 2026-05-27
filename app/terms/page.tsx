"use client";

import { useT } from "@/lib/i18n/context";
import { PageShell } from "@/components/page-shell";

export default function TermsPage() {
  const t = useT();
  return (
    <PageShell
      eyebrow={t.footer.links.terms}
      title={t.legal.termsTitle}
      intro={t.legal.termsIntro}
      back={t.legal.backHome}
    >
      <article className="max-w-[760px] space-y-6 text-[14.5px] leading-[1.7] text-fg-soft">
        <section>
          <h2 className="mb-2 text-[16px] font-medium tracking-[-0.01em] text-fg">Pilot scope</h2>
          <p className="text-fg-mute">
            Pilots run for an agreed duration with a fixed scope: runner deployment, Jira workflow integration, and
            heuristic calibration against a defined product surface. Out-of-scope changes are tracked but not delivered
            under the pilot.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-[16px] font-medium tracking-[-0.01em] text-fg">Service availability</h2>
          <p className="text-fg-mute">
            Pilots target 99.5% control-plane uptime measured monthly. The runner runs inside your infrastructure and
            its availability follows your own deployment.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-[16px] font-medium tracking-[-0.01em] text-fg">Confidentiality</h2>
          <p className="text-fg-mute">
            Mutual NDA executed before pilot kickoff. Artefacts shared with our control plane stay confidential and are
            never used to train third-party models or shared with other customers.
          </p>
        </section>
        <p className="font-mono text-[12px] tracking-[0.04em] text-fg-dim">{t.legal.lastUpdated} · 2026-05-01</p>
      </article>
    </PageShell>
  );
}
