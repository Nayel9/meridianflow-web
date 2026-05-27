"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, ScrollText, Terminal } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { PageShell } from "@/components/page-shell";

type Card = { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; href: string };

export default function DocsPage() {
  const t = useT();
  const cards: Card[] = [
    {
      icon: BookOpen,
      title: "Verdict schema",
      desc: "JSON contract that every pretriage run emits — status, category, blast radius, suspected component, artefacts.",
      href: "/contact",
    },
    {
      icon: Terminal,
      title: "Runner setup",
      desc: "Docker / k8s sidecar deployment, staging credentials, env scopes. Pulled together with your solutions engineer.",
      href: "/contact",
    },
    {
      icon: ScrollText,
      title: "Jira workflow",
      desc: "Transition labels, automation rules, and how Meridian Flow posts back verdicts as structured comments.",
      href: "/contact",
    },
  ];

  return (
    <PageShell
      eyebrow="Documentation"
      title={t.legal.docsTitle}
      intro={t.legal.docsIntro}
      back={t.legal.backHome}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="group flex flex-col gap-3 rounded-lg border border-line bg-bg-elev p-5 transition-all hover:-translate-y-0.5 hover:border-[oklch(0.34_0.013_250)]"
          >
            <c.icon className="size-5 text-accent" />
            <h3 className="text-[15px] font-medium tracking-[-0.01em] text-fg">{c.title}</h3>
            <p className="text-[13.5px] leading-[1.55] text-fg-mute">{c.desc}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.04em] text-accent">
              Request access <ArrowRight className="arrow size-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
