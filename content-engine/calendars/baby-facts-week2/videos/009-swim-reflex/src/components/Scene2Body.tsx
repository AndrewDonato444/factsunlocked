import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene2Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const reflexes = [
    { label: "Hold their breath", detail: "automatically when submerged", color: COLORS.accent3 },
    { label: "Move arms & legs", detail: "in a swimming motion", color: COLORS.accent },
    { label: "Heart rate slows", detail: "to conserve oxygen", color: COLORS.accent2 },
  ];

  const disappearOpacity = interpolate(frame, [300, 320], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const disappearY = interpolate(frame, [300, 320], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, #0A1628 0%, #1A0A2E 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      <div style={{ fontSize: 42, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", opacity: titleOpacity, marginBottom: 15 }}>
        The Dive Reflex
      </div>
      <div style={{ fontSize: 34, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent3, textAlign: "center", opacity: interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }), marginBottom: 50 }}>
        When a baby touches water...
      </div>

      {reflexes.map((r, i) => {
        const delay = 50 + i * 70;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 120 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const scale = interpolate(progress, [0, 1], [0.8, 1]);

        return (
          <div key={i} style={{ marginBottom: 24, opacity, transform: `scale(${scale})`, backgroundColor: `${r.color}12`, border: `2px solid ${r.color}35`, borderRadius: 20, padding: "24px 36px", width: 850 }}>
            <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: r.color }}>{r.label}</div>
            <div style={{ fontSize: 28, fontWeight: 500, fontFamily: "system-ui, sans-serif", color: COLORS.muted, marginTop: 6 }}>{r.detail}</div>
          </div>
        );
      })}

      {/* Timer countdown */}
      <div style={{ marginTop: 40, textAlign: "center", opacity: interpolate(frame, [240, 260], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }) }}>
        <div style={{ fontSize: 80, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent }}>6</div>
        <div style={{ fontSize: 30, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.muted }}>months</div>
      </div>

      <div style={{ fontSize: 34, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, textAlign: "center", opacity: disappearOpacity, transform: `translateY(${disappearY}px)`, marginTop: 20, lineHeight: 1.4 }}>
        Then this reflex
        <br />
        <span style={{ color: COLORS.text, fontWeight: 800 }}>disappears forever</span>
      </div>
    </AbsoluteFill>
  );
};
