import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for the pilot",
  description:
    "Four spots remain for the Q3 cohort. Tell us about your team and we'll get back personally within two business days.",
  alternates: { canonical: "/pilot" },
};

export default function PilotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
