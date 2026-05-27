"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";
import { LangToggle } from "./lang-toggle";
import { Button } from "./ui/button";
import { Tag } from "./ui/tag";

const SECTIONS: { id: string; key: "howItWorks" | "outputs" | "security" | "stack" | "pilot" }[] = [
  { id: "workflow", key: "howItWorks" },
  { id: "outputs", key: "outputs" },
  { id: "security", key: "security" },
  { id: "stack", key: "stack" },
  { id: "pilot", key: "pilot" },
];

export function Nav({ variant = "landing" }: { variant?: "landing" | "page" }) {
  const t = useT();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkBase = "transition-colors hover:text-fg";

  return (
    <nav
      className={cn(
        "sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-bg/70",
        "border-b transition-colors duration-200",
        scrolled ? "border-line-soft" : "border-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-8">
        <Link href="/" aria-label="Meridian Flow home" className="flex items-center gap-2">
          <Brand />
          <Tag tone="info" className="ml-1">
            {t.nav.beta}
          </Tag>
        </Link>

        <div className="hidden items-center gap-7 text-sm text-fg-soft md:flex">
          {SECTIONS.map((s) => (
            <Link
              key={s.id}
              href={variant === "landing" ? `#${s.id}` : `/#${s.id}`}
              className={linkBase}
            >
              {t.nav[s.key]}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <LangToggle className="hidden sm:inline-flex" />
          <Button asChild size="md" className="hidden sm:inline-flex">
            <Link href="/pilot">
              {t.nav.applyPilot} <ArrowRight className="arrow size-4" />
            </Link>
          </Button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-line text-fg-soft transition-colors hover:bg-bg-elev md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line-soft bg-bg/95 backdrop-blur md:hidden">
          <div className="shell flex flex-col gap-1 py-4">
            {SECTIONS.map((s) => (
              <Link
                key={s.id}
                href={variant === "landing" ? `#${s.id}` : `/#${s.id}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-fg-soft hover:bg-bg-elev hover:text-fg"
              >
                {t.nav[s.key]}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-3 px-3 pt-2">
              <LangToggle />
              <Button asChild size="md" className="flex-1">
                <Link href="/pilot" onClick={() => setOpen(false)}>
                  {t.nav.applyPilot} <ArrowRight className="arrow size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
