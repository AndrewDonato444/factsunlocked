import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Progress = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const line1Y = interpolate(line1Progress, [0, 1], [80, 0]);
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);

  const bigScale = spring({ frame: frame - 12, fps, config: { damping: 6, stiffness: 300, mass: 0.5 } });
  const bigOpacity = interpolate(frame, [12, 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const line3Opacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const line3Y = interpolate(frame, [35, 50], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const glowIntensity = 30 + Math.sin(frame * 0.15) * 15;

  // X mark that appears
  const xOpacity = interpolate(frame, [15, 22], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const xScale = spring({ frame: frame - 15, fps, config: { damping: 8, stiffness: 250 } });

  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 30%, #2D1B4E, ${COLORS.background})`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      {Array.from({ length: 12 }, (_, i) => {
        const x = (i * 137.5) % 1080;
        const baseY = (i * 123.7) % 1920;
        const y = baseY + Math.sin(frame * 0.02 + i) * 30;
        const size = 4 + (i % 4) * 3;
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", backgroundColor: i % 3 === 0 ? COLORS.accent : i % 3 === 1 ? COLORS.accent2 : COLORS.accent3, opacity: 0.12 }} />;
      })}

      <div style={{ fontSize: 56, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.muted, textAlign: "center", transform: `translateY(${line1Y}px)`, opacity: line1Opacity, letterSpacing: 4 }}>
        YOUR BABY HAS
      </div>

      <div style={{ fontSize: 120, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, textAlign: "center", transform: `scale(${bigScale})`, opacity: bigOpacity, textShadow: `0 0 ${glowIntensity}px ${COLORS.accent2}80`, marginTop: 10, marginBottom: 10, position: "relative" }}>
        NO
        <div style={{ position: "absolute", top: -20, right: -40, fontSize: 80, color: COLORS.accent, opacity: xOpacity, transform: `scale(${xScale})` }}>&#x2715;</div>
      </div>

      <div style={{ fontSize: 80, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", transform: `scale(${bigScale})`, opacity: bigOpacity, letterSpacing: 2 }}>
        KNEECAPS
      </div>

      <div style={{ fontSize: 44, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent3, textAlign: "center", marginTop: 50, opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}>
        seriously, none at all
      </div>
    </AbsoluteFill>
  );
};
