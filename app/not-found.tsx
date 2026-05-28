"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n/context";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useT();
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Nav variant="page" />
      <main className="shell flex min-h-[60vh] flex-col items-start justify-center py-20">
        <span className="eyebrow">{t.notFound.eyebrow}</span>
        <h1 className="section-title mt-4 mb-4 text-fg">{t.notFound.title}</h1>
        <p className="section-sub mb-7">{t.notFound.sub}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/">
              {t.notFound.ctaHome} <ArrowRight className="arrow size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/contact">{t.notFound.ctaContact}</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
