"use client";

import { useT } from "@/lib/i18n/context";
import { PageShell } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";

export default function PilotPage() {
  const t = useT();
  return (
    <PageShell
      eyebrow={t.pilot.eyebrow}
      title={t.legal.pilotPageTitle}
      intro={t.legal.pilotPageIntro}
      back={t.legal.backHome}
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4 text-[14.5px] leading-[1.65] text-fg-mute">
          <ul className="grid gap-3 text-[14px] text-fg-soft">
            {t.pilot.list.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
          <div className="rounded-lg border border-line-soft bg-bg-elev p-5">
            <div className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
              {t.pilot.fitLabel}
            </div>
            <div className="grid grid-cols-1 gap-2 text-[13px] text-fg-soft sm:grid-cols-2">
              {t.pilot.fitItems.map((f, i) => (
                <span key={i}>· {f}</span>
              ))}
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </PageShell>
  );
}
