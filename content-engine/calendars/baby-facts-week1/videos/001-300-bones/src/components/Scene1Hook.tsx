import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "YOUR BABY HAS" slides up
  const line1Progress = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const line1Y = interpolate(line1Progress, [0, 1], [80, 0]);
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);

  // "MORE BONES" slams in
  const bigScale = spring({ frame: frame - 12, fps, config: { damping: 6, stiffness: 300, mass: 0.5 } });
  const bigOpacity = interpolate(frame, [12, 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // "THAN YOU DO" fades in
  const line3Opacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const line3Y = interpolate(frame, [35, 50], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Animated number counter: 300 counting up
  const counterProgress = interpolate(frame, [20, 60], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const boneCount = Math.round(counterProgress * 300);

  // Pulsing glow on the number
  const glowIntensity = 30 + Math.sin(frame * 0.15) * 15;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 30%, #2D1B4E, ${COLORS.background})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Floating bone-like particles */}
      {Array.from({ length: 15 }, (_, i) => {
        const x = (i * 137.5) % 1080;
        const baseY = (i * 123.7) % 1920;
        const y = baseY + Math.sin(frame * 0.02 + i) * 30;
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
              opacity: 0.12,
            }}
          />
        );
      })}

      {/* YOUR BABY HAS */}
      <div
        style={{
          fontSize: 60,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
          color: COLORS.muted,
          textAlign: "center",
          transform: `translateY(${line1Y}px)`,
          opacity: line1Opacity,
          letterSpacing: 4,
        }}
      >
        YOUR BABY HAS
      </div>

      {/* BIG NUMBER */}
      <div
        style={{
          fontSize: 180,
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
          color: COLORS.accent,
          textAlign: "center",
          transform: `scale(${bigScale})`,
          opacity: bigOpacity,
          textShadow: `0 0 ${glowIntensity}px ${COLORS.accent}80`,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {boneCount}
      </div>

      {/* MORE BONES */}
      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
          color: COLORS.text,
          textAlign: "center",
          transform: `scale(${bigScale})`,
          opacity: bigOpacity,
          letterSpacing: 2,
        }}
      >
        MORE BONES
      </div>

      {/* THAN YOU DO */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 600,
          fontFamily: "system-ui, sans-serif",
          color: COLORS.accent2,
          textAlign: "center",
          marginTop: 40,
          opacity: line3Opacity,
          transform: `translateY(${line3Y}px)`,
        }}
      >
        than you do right now
      </div>
    </AbsoluteFill>
  );
};
