import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Meridian Flow handles your data and artefacts.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
