import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Naija2050 — Where Nigeria's History Meets Its Future";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#ffffff",
          color: "#041a10",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#008751",
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Naija2050
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 24, lineHeight: 1.1, maxWidth: 900 }}>
          Where Nigeria{"'"}s History Meets Its Future
        </div>
        <div style={{ fontSize: 28, marginTop: 32, color: "#0a4d2e", maxWidth: 800 }}>
          Six sector visions · Interactive timeline · Sourced projections to 2050
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: "#008751",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
