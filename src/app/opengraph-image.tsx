import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";
import { CONTENT_STATS } from "@/lib/content-stats";
import { siteName, siteTagline } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteName} - ${siteTagline}`;
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
          backgroundColor: BRAND.white,
          padding: "80px",
          borderBottom: `12px solid ${BRAND.green700}`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: BRAND.green700,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {siteName}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: BRAND.green950,
            marginTop: 24,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {siteTagline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: BRAND.green800,
            marginTop: 28,
            maxWidth: 800,
          }}
        >
          {`${CONTENT_STATS.sectorCount} sector visions · Interactive timeline · Sourced projections to 2050`}
        </div>
      </div>
    ),
    { ...size },
  );
}
