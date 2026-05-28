"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, ScrollText, Terminal } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { PageShell } from "@/components/page-shell";

const ICONS = [BookOpen, Terminal, ScrollText] as const;

export default function DocsPage() {
  const t = useT();

  return (
    <PageShell
      eyebrow={t.legal.docsTitle}
      title={t.legal.docsTitle}
      intro={t.legal.docsIntro}
      back={t.legal.backHome}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.legal.docsCards.map((c, i) => {
          const Icon = ICONS[i] ?? BookOpen;
          return (
            <Link
              key={c.title}
              href="/contact"
              className="group flex flex-col gap-3 rounded-lg border border-line bg-bg-elev p-5 transition-all hover:-translate-y-0.5 hover:border-[oklch(0.34_0.013_250)]"
            >
              <Icon className="size-5 text-accent" />
              <h3 className="text-[15px] font-medium tracking-[-0.01em] text-fg">{c.title}</h3>
              <p className="text-[13.5px] leading-[1.55] text-fg-mute">{c.desc}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.04em] text-accent">
                {t.legal.docsCta} <ArrowRight className="arrow size-3.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
