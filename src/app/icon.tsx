import { ImageResponse } from "next/og";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ECEDEF", borderRadius: 32, color: "#0B0C10", fontSize: 30, fontWeight: 800 }}>VR</div>,
    size,
  );
}
