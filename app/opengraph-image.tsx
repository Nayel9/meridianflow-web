import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Meridian Flow · Pretriage for software teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse 100% 60% at 30% 0%, oklch(0.87 0.20 130 / 0.10), transparent 60%), #1c1d1c",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "oklch(0.87 0.20 130)" }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
            <path d="M12 3 Q5 12 12 21" stroke="currentColor" strokeWidth="1.4" fill="none" />
            <path d="M12 3 Q19 12 12 21" stroke="currentColor" strokeWidth="1.4" fill="none" />
            <path d="M3 12 H21" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span style={{ fontSize: 28, color: "white", letterSpacing: "-0.01em" }}>Meridian Flow</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 24,
              color: "oklch(0.87 0.20 130)",
              fontFamily: "monospace",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Pretriage for software teams
          </div>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              color: "white",
              maxWidth: 1000,
            }}
          >
            Bugs reach developers{" "}
            <span style={{ color: "oklch(0.87 0.20 130)" }}>reproduced, or ruled out</span>. Never ambiguous.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.55)",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          <span>Jira + Playwright</span>
          <span>meridianflow.dev</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
