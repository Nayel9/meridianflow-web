"use client";

import { useT } from "@/lib/i18n/context";
import { PageShell } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  const t = useT();
  return (
    <PageShell
      eyebrow={t.nav.signIn}
      title={t.contact.pageTitle}
      intro={t.contact.pageSub}
      back={t.legal.backHome}
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5 text-[14.5px] leading-[1.65] text-fg-soft">
          <p>{t.legal.pilotPageIntro}</p>
          <ul className="grid gap-3 border-t border-dashed border-line-soft pt-5 text-[13.5px] text-fg-mute">
            <li>EU & US timezones · réponse sous 48h ouvrées</li>
            <li>hello@meridianflow.dev</li>
            <li>Paris · Berlin</li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </PageShell>
  );
}
