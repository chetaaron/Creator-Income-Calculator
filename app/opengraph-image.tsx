import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Creator Income Calculator - Model your creator business"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F4F2",
        padding: "40px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: 900,
            color: "#1A1A1A",
            margin: "0 0 16px 0",
            textAlign: "center",
          }}
        >
          Creator Income Calculator
        </h1>
        <p
          style={{
            fontSize: "20px",
            color: "#4A4A4A",
            margin: 0,
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Model your creator business – test how product pricing, video performance, conversion rates and posting
          schedule shape your path to revenue.
        </p>
      </div>

      {/* Mock Calculator Interface */}
      <div
        style={{
          display: "flex",
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "32px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "90%",
          maxWidth: "1000px",
        }}
      >
        {/* Left side - Inputs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            marginRight: "32px",
          }}
        >
          <h3
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#1A1A1A",
              margin: "0 0 24px 0",
            }}
          >
            Your Business
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "#4A4A4A", marginBottom: "8px" }}>
                Product Price: $197
              </div>
              <div style={{ height: "8px", backgroundColor: "#E8E6E3", borderRadius: "4px", width: "100%" }}>
                <div style={{ height: "8px", backgroundColor: "#D4967A", borderRadius: "4px", width: "30%" }}></div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "#4A4A4A", marginBottom: "8px" }}>
                Annual Revenue Goal: $100,000
              </div>
              <div style={{ height: "8px", backgroundColor: "#E8E6E3", borderRadius: "4px", width: "100%" }}>
                <div style={{ height: "8px", backgroundColor: "#D4967A", borderRadius: "4px", width: "50%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Results Preview */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <h3
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#1A1A1A",
              margin: "0 0 24px 0",
            }}
          >
            Results
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 16px",
                backgroundColor: "#F9F8F6",
                borderRadius: "8px",
                borderLeft: "4px solid #D4967A",
              }}
            >
              <span style={{ fontSize: "16px", fontWeight: 600, color: "#1A1A1A" }}>Your Scenario</span>
              <span style={{ fontSize: "16px", color: "#4A4A4A" }}>Every 2 weeks</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 16px",
                backgroundColor: "#F9F8F6",
                borderRadius: "8px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#4A4A4A" }}>Realistic - Average</span>
              <span style={{ fontSize: "14px", color: "#4A4A4A" }}>Every 3 weeks</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 16px",
                backgroundColor: "#F9F8F6",
                borderRadius: "8px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#4A4A4A" }}>Optimistic - Good</span>
              <span style={{ fontSize: "14px", color: "#4A4A4A" }}>Every month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "32px",
          fontSize: "16px",
          color: "#6A6A6A",
        }}
      >
        Created by Chet Callahan
      </div>
    </div>,
    {
      ...size,
    },
  )
}
