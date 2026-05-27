"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Nav variant="page" />
      <main className="shell flex min-h-[60vh] flex-col items-start justify-center py-20">
        <span className="eyebrow">404</span>
        <h1 className="section-title mt-4 mb-4 text-fg">Page introuvable</h1>
        <p className="section-sub mb-7">
          Cette page n&apos;existe pas — ou n&apos;est pas encore publique. Retournez à l&apos;accueil ou écrivez-nous.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/">
              Retour à l&apos;accueil <ArrowRight className="arrow size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
