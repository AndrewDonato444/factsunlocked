import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene2Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Comparison bars
  const comparisons = [
    { label: "Adults", count: "~5,000", width: 45, color: COLORS.muted },
    { label: "Babies", count: "~10,000", width: 90, color: COLORS.accent2 },
  ];

  // Location reveals
  const locations = [
    { text: "Tongue", delay: 150 },
    { text: "Roof of mouth", delay: 180 },
    { text: "Back of throat", delay: 210 },
    { text: "Sides of mouth", delay: 240 },
  ];

  const pickyOpacity = interpolate(frame, [320, 340], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const pickyY = interpolate(frame, [320, 340], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, #0D0620 0%, #1A0A2E 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      <div style={{ fontSize: 42, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", opacity: titleOpacity, marginBottom: 40 }}>
        Taste bud comparison
      </div>

      {comparisons.map((c, i) => {
        const delay = 20 + i * 40;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 120 } });
        const barWidth = interpolate(progress, [0, 1], [0, c.width]);
        const opacity = interpolate(progress, [0, 1], [0, 1]);

        return (
          <div key={i} style={{ marginBottom: 20, opacity, width: 800 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: 32, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.text }}>{c.label}</div>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: c.color }}>{c.count}</div>
            </div>
            <div style={{ width: "100%", height: 28, backgroundColor: `${c.color}20`, borderRadius: 14 }}>
              <div style={{ width: `${barWidth}%`, height: "100%", backgroundColor: c.color, borderRadius: 14, boxShadow: i === 1 ? `0 0 15px ${c.color}60` : "none" }} />
            </div>
          </div>
        );
      })}

      <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", marginTop: 40, marginBottom: 20, opacity: interpolate(frame, [130, 145], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }) }}>
        They're EVERYWHERE
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", width: 800 }}>
        {locations.map((loc, i) => {
          const opacity = interpolate(frame, [loc.delay, loc.delay + 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          const scale = spring({ frame: frame - loc.delay, fps, config: { damping: 10, stiffness: 150 } });
          return (
            <div key={i} style={{ opacity, transform: `scale(${scale})`, backgroundColor: `${COLORS.accent3}20`, border: `2px solid ${COLORS.accent3}40`, borderRadius: 16, padding: "14px 28px" }}>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.accent3 }}>{loc.text}</div>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 34, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, textAlign: "center", opacity: pickyOpacity, transform: `translateY(${pickyY}px)`, marginTop: 40, lineHeight: 1.4 }}>
        That's why everything tastes
        <br />
        <span style={{ color: COLORS.text, fontWeight: 800 }}>SO intense to them</span>
      </div>
    </AbsoluteFill>
  );
};
