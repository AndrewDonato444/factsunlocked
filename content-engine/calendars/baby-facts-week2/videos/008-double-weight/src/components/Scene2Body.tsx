import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene2Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Growth bar animation
  const barProgress = interpolate(frame, [30, 120], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const months = [
    { label: "Birth", weight: "7.5 lbs", pct: 25 },
    { label: "2 months", weight: "10 lbs", pct: 40 },
    { label: "5 months", weight: "15 lbs", pct: 65 },
    { label: "12 months", weight: "21 lbs", pct: 90 },
  ];

  const adultOpacity = interpolate(frame, [280, 300], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const adultY = interpolate(frame, [280, 300], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, #0D0620 0%, #1A0A2E 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      <div style={{ fontSize: 42, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", opacity: titleOpacity, marginBottom: 20 }}>
        The fastest growth of
      </div>
      <div style={{ fontSize: 48, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", opacity: titleOpacity, marginBottom: 50 }}>
        their entire life
      </div>

      {/* Growth milestones */}
      {months.map((m, i) => {
        const delay = 40 + i * 50;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 120 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const barW = interpolate(progress, [0, 1], [0, m.pct]);

        return (
          <div key={i} style={{ marginBottom: 20, opacity, width: 850, padding: "0 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: 30, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.text }}>{m.label}</div>
              <div style={{ fontSize: 30, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.accent }}>{m.weight}</div>
            </div>
            <div style={{ width: "100%", height: 20, backgroundColor: `${COLORS.accent}20`, borderRadius: 10 }}>
              <div style={{ width: `${barW}%`, height: "100%", backgroundColor: i === 2 ? COLORS.accent2 : COLORS.accent, borderRadius: 10, boxShadow: i === 2 ? `0 0 15px ${COLORS.accent2}60` : "none" }} />
            </div>
          </div>
        );
      })}

      {/* 2x highlight */}
      <div style={{ fontSize: 100, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, textAlign: "center", opacity: interpolate(frame, [180, 200], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }), marginTop: 30, textShadow: `0 0 30px ${COLORS.accent2}60` }}>
        2×
      </div>

      <div style={{ fontSize: 34, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.accent3, textAlign: "center", opacity: adultOpacity, transform: `translateY(${adultY}px)`, marginTop: 30, lineHeight: 1.4 }}>
        If adults grew this fast
        <br />
        <span style={{ color: COLORS.text, fontWeight: 800 }}>you'd weigh 300+ lbs by summer</span>
      </div>
    </AbsoluteFill>
  );
};
