import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Naija2050 - Where Nigeria's History Meets Its Future";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          padding: "80px",
          borderBottom: "12px solid #008751",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#008751",
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Naija2050
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "#041a10",
            marginTop: 24,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {`Where Nigeria's History Meets Its Future`}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#0a4d2e",
            marginTop: 28,
            maxWidth: 800,
          }}
        >
          Six sector visions · Interactive timeline · Sourced projections to 2050
        </div>
      </div>
    ),
    { ...size },
  );
}
