"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Security } from "@/components/sections/security";

export default function SecurityPage() {
  const t = useT();
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Nav variant="page" />
      <main>
        <div className="shell pt-12 sm:pt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.04em] text-fg-mute transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-3.5" /> {t.legal.backHome}
          </Link>
        </div>
        <Security />
      </main>
      <Footer />
    </div>
  );
}
