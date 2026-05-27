import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Meridian Flow",
    short_name: "Meridian",
    description: "Pretriage for software teams. Every bug reaches developers already confirmed and reproducible.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1f2a",
    theme_color: "#1a1f2a",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  };
}
