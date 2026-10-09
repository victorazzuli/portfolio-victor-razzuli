import { ImageResponse } from "next/og";
import { PROJECTS } from "@/data/projects";
export const alt = "Victor Razzuli — Desenvolvedor web & ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", background: "#0B0C10", color: "#ECEDEF" }}>
      <div style={{ fontSize: 26, color: "#6E8BFF", letterSpacing: 4 }}>DESENVOLVEDOR WEB & ML ENGINEER</div>
      <div style={{ fontSize: 96, fontWeight: 800, marginTop: 20, lineHeight: 1 }}>Victor Razzuli</div>
      <div style={{ fontSize: 34, color: "#8E95A3", marginTop: 24 }}>Sites que trabalham pelo seu negócio.</div>
      <div style={{ display: "flex", gap: 14, marginTop: 48 }}>
        {PROJECTS.map((p) => (
          <div key={p.id} style={{ width: 22, height: 22, borderRadius: 11, background: p.color }} />
        ))}
      </div>
    </div>,
    size,
  );
}
