import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "A NEWBORN'S STOMACH" slides up
  const line1Progress = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const line1Y = interpolate(line1Progress, [0, 1], [80, 0]);
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);

  // "IS THE SIZE OF" fades in
  const line2Opacity = interpolate(frame, [18, 30], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Marble circle scales in with bounce
  const marbleScale = spring({ frame: frame - 25, fps, config: { damping: 6, stiffness: 300, mass: 0.5 } });
  const marbleOpacity = interpolate(frame, [25, 32], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // "A MARBLE" slams in
  const bigScale = spring({ frame: frame - 30, fps, config: { damping: 8, stiffness: 250, mass: 0.5 } });
  const bigOpacity = interpolate(frame, [30, 38], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Pulsing glow on marble
  const glowIntensity = 25 + Math.sin(frame * 0.12) * 15;

  // Marble shimmer rotation
  const shimmerAngle = frame * 2;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, #2D1B4E, ${COLORS.background})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Floating particles */}
      {Array.from({ length: 12 }, (_, i) => {
        const x = (i * 137.5) % 1080;
        const baseY = (i * 157.3) % 1920;
        const y = baseY + Math.sin(frame * 0.02 + i) * 25;
        const size = 4 + (i % 4) * 3;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: i % 3 === 0 ? COLORS.accent : i % 3 === 1 ? COLORS.accent2 : COLORS.accent3,
              opacity: 0.1,
            }}
          />
        );
      })}

      {/* A NEWBORN'S STOMACH */}
      <div
        style={{
          fontSize: 54,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
          color: COLORS.muted,
          textAlign: "center",
          transform: `translateY(${line1Y}px)`,
          opacity: line1Opacity,
          letterSpacing: 3,
        }}
      >
        A NEWBORN'S STOMACH
      </div>

      {/* IS THE SIZE OF */}
      <div
        style={{
          fontSize: 44,
          fontWeight: 600,
          fontFamily: "system-ui, sans-serif",
          color: COLORS.muted,
          textAlign: "center",
          opacity: line2Opacity,
          marginTop: 16,
          letterSpacing: 2,
        }}
      >
        IS THE SIZE OF
      </div>

      {/* Marble visual */}
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, ${COLORS.accent3}dd, ${COLORS.accent3}66, ${COLORS.accent3}33)`,
          boxShadow: `0 0 ${glowIntensity}px ${COLORS.accent3}80, inset 0 0 40px rgba(255,255,255,0.2)`,
          transform: `scale(${marbleScale})`,
          opacity: marbleOpacity,
          marginTop: 40,
          marginBottom: 30,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Shimmer highlight */}
        <div
          style={{
            position: "absolute",
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.3)",
            top: "20%",
            left: "25%",
            filter: "blur(8px)",
            transform: `rotate(${shimmerAngle}deg)`,
          }}
        />
      </div>

      {/* A MARBLE */}
      <div
        style={{
          fontSize: 90,
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
          color: COLORS.accent,
          textAlign: "center",
          transform: `scale(${bigScale})`,
          opacity: bigOpacity,
          textShadow: `0 0 ${glowIntensity}px ${COLORS.accent}80`,
          letterSpacing: 4,
        }}
      >
        A MARBLE
      </div>
    </AbsoluteFill>
  );
};
