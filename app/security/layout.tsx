import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & architecture",
  description:
    "How Meridian Flow keeps your source code inside your network. Architecture overview, privacy modes, and SOC 2 progress.",
  alternates: { canonical: "/security" },
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
