import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene3CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameScale = spring({ frame, fps, config: { damping: 8, stiffness: 200, mass: 0.6 } });
  const nameOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const subOpacity = interpolate(frame, [25, 40], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const subY = interpolate(frame, [25, 40], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const ringScale = 1 + Math.sin(frame * 0.1) * 0.05;

  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, #2D1B4E, ${COLORS.background})`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", border: `3px solid ${COLORS.accent}`, opacity: 0.3, transform: `scale(${ringScale})` }} />
      <div style={{ fontSize: 64, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", transform: `scale(${nameScale})`, opacity: nameOpacity, textShadow: `0 0 40px ${COLORS.accent}60`, letterSpacing: 2 }}>BABY FACTS</div>
      <div style={{ fontSize: 52, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", transform: `scale(${nameScale})`, opacity: nameOpacity, marginTop: 8 }}>UNLOCKED</div>
      <div style={{ fontSize: 40, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, textAlign: "center", marginTop: 60, opacity: subOpacity, transform: `translateY(${subY}px)` }}>Follow for more<br />mind-blowing baby facts</div>
    </AbsoluteFill>
  );
};
