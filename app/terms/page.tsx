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
        {t.legal.termsSections.map((s) => (
          <section key={s.heading}>
            <h2 className="mb-2 text-[16px] font-medium tracking-[-0.01em] text-fg">{s.heading}</h2>
            <p className="text-fg-mute">{s.body}</p>
          </section>
        ))}
        <p className="font-mono text-[12px] tracking-[0.04em] text-fg-dim">
          {t.legal.lastUpdated} · 2026-05-01
        </p>
      </article>
    </PageShell>
  );
}
