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

  // Water wave animation at bottom
  const waveOffset = frame * 2;

  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 30%, #0D2B45, ${COLORS.background})`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      {/* Bubble particles */}
      {Array.from({ length: 15 }, (_, i) => {
        const x = (i * 137.5) % 1080;
        const baseY = 1920 - ((frame * (1 + i * 0.3) + i * 200) % 1920);
        const size = 8 + (i % 5) * 6;
        return <div key={i} style={{ position: "absolute", left: x, top: baseY, width: size, height: size, borderRadius: "50%", backgroundColor: COLORS.accent3, opacity: 0.15 }} />;
      })}

      <div style={{ fontSize: 56, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.muted, textAlign: "center", transform: `translateY(${line1Y}px)`, opacity: line1Opacity, letterSpacing: 4 }}>
        YOUR NEWBORN
      </div>

      <div style={{ fontSize: 80, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent3, textAlign: "center", transform: `scale(${bigScale})`, opacity: bigOpacity, textShadow: `0 0 30px ${COLORS.accent3}80`, marginTop: 10, marginBottom: 10 }}>
        CAN SWIM
      </div>

      <div style={{ fontSize: 64, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", transform: `scale(${bigScale})`, opacity: bigOpacity, letterSpacing: 2 }}>
        (sort of)
      </div>

      <div style={{ fontSize: 44, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, textAlign: "center", marginTop: 50, opacity: line3Opacity, transform: `translateY(${line3Y}px)` }}>
        it's called the dive reflex
      </div>

      {/* Wave at bottom */}
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: 1080, height: 200, opacity: 0.2 }} viewBox="0 0 1080 200">
        <path d={`M0,100 Q${270 + Math.sin(waveOffset * 0.02) * 50},${50 + Math.sin(waveOffset * 0.015) * 30} 540,100 T1080,100 V200 H0 Z`} fill={COLORS.accent3} />
      </svg>
    </AbsoluteFill>
  );
};
