import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene2Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline items
  const timeline = [
    { label: "Day 1", fact: "Crying sounds ✅", sub: "Tears ❌", color: COLORS.accent2 },
    { label: "2-4 weeks", fact: "Tear ducts developing", sub: "First real tears", color: COLORS.accent },
    { label: "2 months", fact: "Full tear production", sub: "The real deal", color: COLORS.accent3 },
  ];

  // "They can cry but..." header
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // What they CAN do
  const canDoOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, #0D0620 0%, #1A0A2E 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      {/* Header */}
      <div style={{ fontSize: 44, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", opacity: headerOpacity, marginBottom: 20 }}>
        They cry. <span style={{ color: COLORS.accent2 }}>A lot.</span>
      </div>

      <div style={{ fontSize: 36, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.muted, textAlign: "center", opacity: canDoOpacity, marginBottom: 50 }}>
        But no actual tears at first.
      </div>

      {/* What they can do from day 1 */}
      <div style={{ display: "flex", gap: 30, marginBottom: 50, opacity: canDoOpacity }}>
        {["😭 Sounds", "😖 Faces", "💧 No tears"].map((item, i) => (
          <div key={i} style={{ backgroundColor: `${COLORS.accent2}15`, border: `2px solid ${COLORS.accent2}30`, borderRadius: 16, padding: "16px 24px", fontSize: 32, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: i === 2 ? COLORS.accent2 : COLORS.text }}>
            {item}
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", marginBottom: 30, opacity: interpolate(frame, [150, 170], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }) }}>
        TEAR TIMELINE
      </div>

      {timeline.map((item, i) => {
        const delay = 180 + i * 50;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 120 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const x = interpolate(progress, [0, 1], [i % 2 === 0 ? -150 : 150, 0]);

        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20, transform: `translateX(${x}px)`, opacity, backgroundColor: `${item.color}12`, border: `2px solid ${item.color}35`, borderRadius: 20, padding: "18px 30px", width: 700 }}>
            <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: item.color, minWidth: 160 }}>{item.label}</div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.text }}>{item.fact}</div>
              <div style={{ fontSize: 24, fontWeight: 500, fontFamily: "system-ui, sans-serif", color: COLORS.muted }}>{item.sub}</div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
