import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene2Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Timeline items
  const stages = [
    { label: "At birth", detail: "Soft cartilage", icon: "\uD83E\uDDB4", color: COLORS.accent2 },
    { label: "3-6 months", detail: "Ossification begins", icon: "\u26A1", color: COLORS.accent },
    { label: "3-5 years", detail: "Full kneecap formed", icon: "\u2705", color: COLORS.accent3 },
  ];

  const flexOpacity = interpolate(frame, [280, 300], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const flexY = interpolate(frame, [280, 300], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, #0D0620 0%, #1A0A2E 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      <div style={{ fontSize: 42, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", opacity: titleOpacity, marginBottom: 20 }}>
        Instead of bone...
      </div>
      <div style={{ fontSize: 52, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", opacity: interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }), marginBottom: 60 }}>
        SOFT CARTILAGE
      </div>

      {/* Timeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: 30, width: 800 }}>
        {stages.map((stage, i) => {
          const delay = 60 + i * 70;
          const progress = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 120 } });
          const opacity = interpolate(progress, [0, 1], [0, 1]);
          const x = interpolate(progress, [0, 1], [-150, 0]);

          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 24, opacity, transform: `translateX(${x}px)` }}>
              <div style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: `${stage.color}20`, border: `2px solid ${stage.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>
                {stage.icon}
              </div>
              <div>
                <div style={{ fontSize: 34, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: stage.color }}>{stage.label}</div>
                <div style={{ fontSize: 30, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.text, marginTop: 4 }}>{stage.detail}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connector line */}
      <div style={{ position: "absolute", left: 98, top: "38%", width: 3, height: 280, background: `linear-gradient(to bottom, ${COLORS.accent2}, ${COLORS.accent}, ${COLORS.accent3})`, opacity: interpolate(frame, [60, 200], [0, 0.4], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }) }} />

      <div style={{ fontSize: 36, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, textAlign: "center", opacity: flexOpacity, transform: `translateY(${flexY}px)`, marginTop: 50, lineHeight: 1.4 }}>
        That's why baby legs
        <br />
        <span style={{ color: COLORS.text, fontWeight: 800 }}>are so flexible!</span>
      </div>
    </AbsoluteFill>
  );
};
