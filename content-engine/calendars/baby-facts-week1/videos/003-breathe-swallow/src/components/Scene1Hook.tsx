import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 6, stiffness: 300, mass: 0.5 } });
  const titleOpacity = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // "SUPERPOWER" glow pulse
  const glowIntensity = 30 + Math.sin(frame * 0.12) * 20;

  // "every adult has LOST" reveal
  const lostOpacity = interpolate(frame, [55, 70], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const lostY = interpolate(frame, [55, 70], [40, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Lightning bolt decorations
  const boltOpacity = interpolate(frame, [20, 35], [0, 0.3], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 35%, #1B1040, ${COLORS.background})`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      {/* Lightning bolts */}
      <div style={{ position: "absolute", top: 400, left: 100, fontSize: 120, opacity: boltOpacity, transform: `rotate(-15deg)` }}>⚡</div>
      <div style={{ position: "absolute", top: 350, right: 100, fontSize: 100, opacity: boltOpacity, transform: `rotate(15deg)` }}>⚡</div>

      <div style={{ fontSize: 50, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.muted, textAlign: "center", transform: `scale(${titleScale})`, opacity: titleOpacity, letterSpacing: 3 }}>BABIES HAVE A</div>

      <div style={{ fontSize: 100, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", transform: `scale(${titleScale})`, opacity: titleOpacity, textShadow: `0 0 ${glowIntensity}px ${COLORS.accent}80`, marginTop: 10 }}>SUPERPOWER</div>

      <div style={{ fontSize: 44, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, textAlign: "center", marginTop: 60, opacity: lostOpacity, transform: `translateY(${lostY}px)`, lineHeight: 1.4 }}>
        that every adult
        <br />
        <span style={{ color: COLORS.text, fontSize: 52, fontWeight: 800 }}>has lost forever</span>
      </div>
    </AbsoluteFill>
  );
};
