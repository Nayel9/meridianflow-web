import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://meridianflow.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] =
    [
      { path: "", changeFrequency: "weekly", priority: 1 },
      { path: "/security", changeFrequency: "monthly", priority: 0.8 },
      { path: "/docs", changeFrequency: "monthly", priority: 0.6 },
      { path: "/pilot", changeFrequency: "monthly", priority: 0.9 },
      { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
      { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
      { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    ];
  return paths.map((p) => ({
    url: `${siteUrl}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
