import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms governing Meridian Flow pilots.",
  alternates: { canonical: "/terms" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
