import { ImageResponse } from "next/og";

export const alt = "NASU Blood Donation Campaign";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #9f1239 0%, #e11d48 55%, #fb7185 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "0.02em",
            opacity: 0.92,
          }}
        >
          NASU Blood Donation Campaign
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            One donation. Up to three lives.
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 500,
              color: "#ffe4e6",
              maxWidth: "820px",
            }}
          >
            Bust the myths, explore your blood, and make your interactive donor
            card.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "22px",
            color: "#fecdd3",
          }}
        >
          Fact or Myth · Blood 101 · Compatibility · Donor Card
        </div>
      </div>
    ),
    { ...size }
  );
}
