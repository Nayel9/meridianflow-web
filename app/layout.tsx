import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { LangProvider } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://meridianflow.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Meridian Flow — Pretriage for software teams",
    template: "%s · Meridian Flow",
  },
  description:
    "Meridian Flow reproduces, validates, and contextualises bug reports before engineering picks them up — turning vague tickets into incidents with a failing spec, a verdict, and the traces to fix them.",
  keywords: [
    "bug triage",
    "QA automation",
    "Playwright",
    "Jira",
    "AI pretriage",
    "incident reproduction",
    "engineering productivity",
  ],
  applicationName: "Meridian Flow",
  authors: [{ name: "Meridian Flow" }],
  creator: "Meridian Flow",
  publisher: "Meridian Flow",
  openGraph: {
    type: "website",
    siteName: "Meridian Flow",
    title: "Meridian Flow — Pretriage for software teams",
    description: "Every bug reaches developers already confirmed and reproducible.",
    url: siteUrl,
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meridian Flow — Pretriage for software teams",
    description: "Every bug reaches developers already confirmed and reproducible.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "/",
    languages: { fr: "/", en: "/" },
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1f2a",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark">
      <body className={cn(sans.variable, mono.variable, "font-sans antialiased")}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
