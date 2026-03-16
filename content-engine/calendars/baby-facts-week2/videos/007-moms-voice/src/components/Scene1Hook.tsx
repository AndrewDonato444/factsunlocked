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

  // Sound wave animation
  const waveAmplitude = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 30%, #2D1B4E, ${COLORS.background})`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      {/* Sound wave lines */}
      {Array.from({ length: 7 }, (_, i) => {
        const height = 40 + Math.sin(frame * 0.12 + i * 1.2) * 30 * waveAmplitude;
        return <div key={i} style={{ position: "absolute", top: 300, left: 180 + i * 110, width: 30, height, backgroundColor: i % 2 === 0 ? COLORS.accent2 : COLORS.accent, borderRadius: 15, opacity: 0.25, transition: "height 0.1s" }} />;
      })}

      <div style={{ fontSize: 56, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.muted, textAlign: "center", transform: `translateY(${line1Y}px)`, opacity: line1Opacity, letterSpacing: 4 }}>
        YOUR BABY
      </div>

      <div style={{ fontSize: 80, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, textAlign: "center", transform: `scale(${bigScale})`, opacity: bigOpacity, textShadow: `0 0 30px ${COLORS.accent2}80`, marginTop: 10, marginBottom: 10 }}>
        ALREADY KNOWS
      </div>

      <div style={{ fontSize: 72, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", transform: `scale(${bigScale})`, opacity: bigOpacity, letterSpacing: 2 }}>
        YOUR VOICE
      </div>

      <div style={{ fontSize: 44, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent3, textAlign: "center", marginTop: 50, opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}>
        from the very first moment
      </div>
    </AbsoluteFill>
  );
};
