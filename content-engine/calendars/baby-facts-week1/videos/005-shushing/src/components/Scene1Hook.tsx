import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 6, stiffness: 300, mass: 0.5 } });
  const titleOpacity = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Sound wave animation
  const waveOffset = frame * 3;

  // dB number counter
  const dbProgress = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const dbValue = Math.round(dbProgress * 90);

  // "Way louder" reveal
  const louderOpacity = interpolate(frame, [55, 70], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Pulsing glow
  const glowIntensity = 30 + Math.sin(frame * 0.15) * 20;

  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, #1B1040, ${COLORS.background})`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      {/* Sound wave bars */}
      {Array.from({ length: 20 }, (_, i) => {
        const height = 30 + Math.sin((frame * 0.08) + i * 0.5) * 25 + Math.cos((frame * 0.05) + i * 0.3) * 15;
        return (
          <div key={i} style={{ position: "absolute", bottom: 200, left: 54 * i, width: 30, height: height, backgroundColor: COLORS.accent3, opacity: 0.15, borderRadius: 4 }} />
        );
      })}

      <div style={{ fontSize: 46, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.muted, textAlign: "center", transform: `scale(${titleScale})`, opacity: titleOpacity, letterSpacing: 3 }}>THE WOMB IS</div>

      <div style={{ fontSize: 90, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", transform: `scale(${titleScale})`, opacity: titleOpacity, marginTop: 10, textShadow: `0 0 ${glowIntensity}px ${COLORS.accent}80` }}>LOUDER</div>

      <div style={{ fontSize: 50, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", transform: `scale(${titleScale})`, opacity: titleOpacity, marginTop: 10 }}>than a vacuum cleaner</div>

      {/* dB meter */}
      <div style={{ marginTop: 50, display: "flex", alignItems: "baseline", gap: 10 }}>
        <div style={{ fontSize: 120, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, textShadow: `0 0 30px ${COLORS.accent2}60` }}>{dbValue}</div>
        <div style={{ fontSize: 40, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.muted }}>dB</div>
      </div>

      <div style={{ fontSize: 38, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent3, textAlign: "center", marginTop: 20, opacity: louderOpacity }}>Way louder.</div>
    </AbsoluteFill>
  );
};
