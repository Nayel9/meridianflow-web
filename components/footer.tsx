"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/context";
import type { Translations } from "@/lib/i18n/types";
import { Brand } from "./brand";

type LinkKey = keyof Translations["footer"]["links"];
type LinkItem = { href: string; key: LinkKey };

const PRODUCT: LinkItem[] = [
  { href: "/#workflow", key: "howItWorks" },
  { href: "/#outputs", key: "outputs" },
  { href: "/security", key: "security" },
  { href: "/#stack", key: "stack" },
];
const COMPANY: LinkItem[] = [
  { href: "/contact", key: "about" },
  { href: "/contact", key: "careers" },
  { href: "/docs", key: "blog" },
  { href: "/contact", key: "contact" },
];
const TRUST: LinkItem[] = [
  { href: "/security", key: "secCompliance" },
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
  { href: "/docs", key: "status" },
];

function Column({ title, links }: { title: string; links: LinkItem[] }) {
  const t = useT();
  return (
    <div>
      <h5 className="mb-3.5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-fg-dim">{title}</h5>
      <ul className="grid gap-2.5 text-[13.5px]">
        {links.map((l) => (
          <li key={`${l.href}-${l.key}`}>
            <Link href={l.href} className="text-fg-mute transition-colors hover:text-fg">
              {t.footer.links[l.key]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-line-soft py-16 pb-10 text-fg-mute">
      <div className="shell">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex">
              <Brand />
            </Link>
            <p className="mt-3.5 max-w-[320px] text-[13.5px] leading-[1.55] text-fg-mute">
              {t.footer.tagline}
            </p>
          </div>
          <Column title={t.footer.product} links={PRODUCT} />
          <Column title={t.footer.company} links={COMPANY} />
          <Column title={t.footer.trust} links={TRUST} />
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-line-soft pt-6 font-mono text-[11.5px] uppercase tracking-[0.04em] text-fg-dim">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.build}</span>
        </div>
      </div>
    </footer>
  );
}
