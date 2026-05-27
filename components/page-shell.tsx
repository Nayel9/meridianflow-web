import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "./nav";
import { Footer } from "./footer";

export function PageShell({
  eyebrow,
  title,
  intro,
  back,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  back?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Nav variant="page" />
      <main className="pt-12 pb-24 sm:pt-16 lg:pt-20">
        <div className="shell">
          {back ? (
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.04em] text-fg-mute transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-3.5" /> {back}
            </Link>
          ) : null}
          <header className="max-w-[760px]">
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            <h1 className="section-title mt-4 mb-5 text-fg">{title}</h1>
            {intro ? <p className="section-sub">{intro}</p> : null}
          </header>
          <div className="mt-12">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
