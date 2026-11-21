import { ImageResponse } from "next/og";

export const alt = "NASU Blood Donation Campaign";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DROP_PATH =
  "M 64 10 C 51 29 26 53 26 80 A 38 38 0 1 0 102 80 C 102 53 77 29 64 10 Z";

const ORBIT_ARC_PATHS = [
  "M 21 51 C 9 70 12 97 29 113 C 40 122.5 52 125.5 64 125 C 52 122.5 41.5 117.5 34 109.5 C 20 95.5 18.5 72.5 21 51 Z",
  "M 85 27 C 103 40 114.5 59 113 83 C 109.5 63 100 46 85 27 Z",
];

const OBELISK_PATHS = [
  "M 64 28 L 56.5 42 L 54.9 56 Q 63.5 50.5 72.0 46 L 71.5 42 Z",
  "M 54.4 61 L 53.4 69.5 Q 63.5 62.5 73.5 59.5 L 72.6 51.5 Q 63.5 55.5 54.4 61 Z",
  "M 52.8 75 L 51.4 87 Q 63 72.5 76.0 82 L 74.2 65.5 Q 63 66.5 52.8 75 Z",
  "M 50.7 93.5 L 49.5 104 L 78.5 104 L 76.7 88 Q 63.5 79.5 50.7 93.5 Z",
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #871227 0%, #c41e3a 55%, #dc2f4d 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Flagship oversized watermark emblem */}
        <svg
          width="360"
          height="360"
          viewBox="0 0 128 128"
          fill="none"
          style={{
            position: "absolute",
            right: "-36px",
            bottom: "-36px",
            opacity: 0.12,
          }}
        >
          {ORBIT_ARC_PATHS.map((d, i) => (
            <path key={`wm-arc-${i}`} d={d} fill="#ffffff" />
          ))}
          <path
            d={DROP_PATH}
            stroke="#ffffff"
            strokeWidth="3.5"
            fill="none"
          />
          {OBELISK_PATHS.map((d, i) => (
            <path key={`wm-ob-${i}`} d={d} fill="#ffffff" />
          ))}
        </svg>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
        >
          <svg width="80" height="80" viewBox="0 0 128 128" fill="none">
            {ORBIT_ARC_PATHS.map((d, i) => (
              <path
                key={`arc-${i}`}
                d={d}
                fill="rgba(255,255,255,0.65)"
              />
            ))}
            <path d={DROP_PATH} fill="#ffffff" />
            {OBELISK_PATHS.map((d, i) => (
              <path key={`ob-${i}`} d={d} fill="#871227" />
            ))}
          </svg>
          <div
            style={{
              width: "2px",
              height: "44px",
              background: "rgba(255,255,255,0.45)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "0.01em",
              }}
            >
              NASU Blood Donation Campaign
            </span>
            <span
              style={{
                fontSize: "19px",
                fontWeight: 500,
                color: "#ffe4e6",
              }}
            >
              Ain Shams National University
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "74px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: "880px",
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
