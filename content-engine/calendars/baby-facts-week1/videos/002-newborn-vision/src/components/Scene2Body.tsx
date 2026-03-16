import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene2Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const milestones = [
    { age: "Birth", fact: "See 8-12 inches only", icon: "👶", color: COLORS.accent2 },
    { age: "3 months", fact: "Track moving objects", icon: "👀", color: COLORS.accent },
    { age: "6 months", fact: "Full color vision", icon: "🌈", color: COLORS.accent3 },
  ];

  // "The perfect distance" reveal
  const perfectOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Distance line animation
  const lineWidth = interpolate(frame, [30, 60], [0, 600], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #0D0620 0%, #1A0A2E 50%, #0D0620 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Perfect distance text */}
      <div style={{ fontSize: 42, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", opacity: perfectOpacity, marginBottom: 20 }}>
        The perfect distance to see...
      </div>

      {/* YOUR FACE */}
      <div style={{ fontSize: 70, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", opacity: perfectOpacity, marginBottom: 10 }}>
        YOUR FACE
      </div>

      {/* Distance line */}
      <div style={{ width: lineWidth, height: 4, backgroundColor: COLORS.accent, marginBottom: 60, borderRadius: 2 }}>
        <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 30, color: COLORS.muted, position: "absolute", left: 0, top: 10 }}>👶</span>
          <span style={{ fontSize: 30, color: COLORS.muted, position: "absolute", right: 0, top: 10 }}>🤱</span>
        </div>
      </div>

      {/* Vision development timeline */}
      <div style={{ fontSize: 40, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.muted, textAlign: "center", marginBottom: 30, opacity: interpolate(frame, [100, 115], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }) }}>
        VISION TIMELINE
      </div>

      {milestones.map((m, i) => {
        const delay = 120 + i * 45;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 120 } });
        const x = interpolate(progress, [0, 1], [-200, 0]);
        const opacity = interpolate(progress, [0, 1], [0, 1]);

        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24, transform: `translateX(${x}px)`, opacity, backgroundColor: `${m.color}15`, border: `2px solid ${m.color}40`, borderRadius: 20, padding: "20px 30px", width: 680 }}>
            <div style={{ fontSize: 50 }}>{m.icon}</div>
            <div>
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: m.color }}>{m.age}</div>
              <div style={{ fontSize: 30, fontWeight: 500, fontFamily: "system-ui, sans-serif", color: COLORS.text }}>{m.fact}</div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
