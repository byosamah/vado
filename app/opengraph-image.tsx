import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "VADO Consultants — Architecture & Engineering Studio";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0b0b",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 240,
            fontWeight: 700,
            color: "#f2f2f2",
            letterSpacing: "0.1em",
            lineHeight: 1,
            display: "flex",
          }}
        >
          VADO
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 36,
            fontWeight: 300,
            color: "#a1a8af",
            letterSpacing: "0.05em",
            display: "flex",
          }}
        >
          Architecture & Engineering Consultants
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 64,
            fontSize: 20,
            fontWeight: 400,
            color: "#a1a8af",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            display: "flex",
          }}
        >
          Est. 1994 — Al Khobar
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
