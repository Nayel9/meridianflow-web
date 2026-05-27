import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to a Meridian Flow founder about pretriage in your team.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
