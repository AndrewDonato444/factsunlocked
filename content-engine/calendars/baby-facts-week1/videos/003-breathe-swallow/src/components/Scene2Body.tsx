import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene2Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main fact reveal
  const factOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Comparison cards
  const babyCardProgress = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 120 } });
  const adultCardProgress = spring({ frame: frame - 80, fps, config: { damping: 12, stiffness: 120 } });

  // "Why" section
  const whyOpacity = interpolate(frame, [180, 200], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const whyY = interpolate(frame, [180, 200], [40, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // "Lost for speech" reveal
  const speechOpacity = interpolate(frame, [380, 400], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, #0D0620 0%, #1A0A2E 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      {/* Main fact */}
      <div style={{ fontSize: 42, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", opacity: factOpacity, marginBottom: 40, lineHeight: 1.3 }}>
        BREATHE & SWALLOW
        <br />
        <span style={{ color: COLORS.accent }}>AT THE SAME TIME</span>
      </div>

      {/* Baby vs Adult comparison */}
      <div style={{ display: "flex", gap: 30, marginBottom: 40 }}>
        {/* Baby card */}
        <div style={{ backgroundColor: `${COLORS.accent3}15`, border: `2px solid ${COLORS.accent3}40`, borderRadius: 24, padding: "30px 40px", width: 420, textAlign: "center", opacity: interpolate(babyCardProgress, [0, 1], [0, 1]), transform: `translateY(${interpolate(babyCardProgress, [0, 1], [40, 0])}px)` }}>
          <div style={{ fontSize: 60 }}>👶</div>
          <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.accent3, marginTop: 10 }}>BABY</div>
          <div style={{ fontSize: 28, fontWeight: 500, fontFamily: "system-ui, sans-serif", color: COLORS.text, marginTop: 8 }}>Can do both</div>
          <div style={{ fontSize: 50, marginTop: 10 }}>✅</div>
        </div>

        {/* Adult card */}
        <div style={{ backgroundColor: `${COLORS.accent2}15`, border: `2px solid ${COLORS.accent2}40`, borderRadius: 24, padding: "30px 40px", width: 420, textAlign: "center", opacity: interpolate(adultCardProgress, [0, 1], [0, 1]), transform: `translateY(${interpolate(adultCardProgress, [0, 1], [40, 0])}px)` }}>
          <div style={{ fontSize: 60 }}>🧑</div>
          <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, marginTop: 10 }}>ADULT</div>
          <div style={{ fontSize: 28, fontWeight: 500, fontFamily: "system-ui, sans-serif", color: COLORS.text, marginTop: 8 }}>Cannot</div>
          <div style={{ fontSize: 50, marginTop: 10 }}>❌</div>
        </div>
      </div>

      {/* Why explanation */}
      <div style={{ fontSize: 34, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", opacity: whyOpacity, transform: `translateY(${whyY}px)`, lineHeight: 1.5, padding: "0 20px" }}>
        Their larynx sits higher,
        <br />
        <span style={{ color: COLORS.muted }}>creating separate pathways</span>
        <br />
        for air and food
      </div>

      {/* Lost for speech */}
      <div style={{ fontSize: 32, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, textAlign: "center", opacity: speechOpacity, marginTop: 30 }}>
        Lost when the throat develops
        <br />
        <span style={{ color: COLORS.text, fontWeight: 800, fontSize: 36 }}>for speech</span>
      </div>
    </AbsoluteFill>
  );
};
