import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Integration guides, verdict schema, runner setup. Public docs open with pilots.",
  alternates: { canonical: "/docs" },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
