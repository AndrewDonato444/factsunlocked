import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";
import { SceneBackgroundImage } from "./SceneBackgroundImage";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Progress = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const line1Y = interpolate(line1Progress, [0, 1], [80, 0]);
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);

  const bigScale = spring({ frame: frame - 10, fps, config: { damping: 6, stiffness: 300, mass: 0.5 } });
  const bigOpacity = interpolate(frame, [10, 16], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const line3Opacity = interpolate(frame, [40, 55], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const line3Y = interpolate(frame, [40, 55], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Pulsing heartbeat glow effect
  const pulseRate = 2.5; // ~150 bpm visual
  const pulse = Math.sin(frame * pulseRate * (Math.PI / fps));
  const glowIntensity = 30 + pulse * 20;
  const heartScale = 1 + pulse * 0.04;

  return (
    <AbsoluteFill>
      <SceneBackgroundImage
        sceneName="bg-scene-1"
        fallbackGradient={`radial-gradient(ellipse at 50% 30%, #1E1A3A, ${COLORS.background})`}
        scrimOpacity={0.55}
      />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
            color: COLORS.muted,
            textAlign: "center",
            transform: `translateY(${line1Y}px)`,
            opacity: line1Opacity,
            letterSpacing: 4,
          }}
        >
          YOUR BABY'S HEART
        </div>

        <div
          style={{
            fontSize: 86,
            fontWeight: 900,
            fontFamily: "system-ui, sans-serif",
            color: COLORS.accent,
            textAlign: "center",
            transform: `scale(${bigScale * heartScale})`,
            opacity: bigOpacity,
            textShadow: `0 0 ${glowIntensity}px ${COLORS.accent}80`,
            marginTop: 10,
            marginBottom: 10,
            lineHeight: 1.1,
          }}
        >
          IS BEATING
          <br />
          TWICE AS FAST
          <br />
          AS YOURS
        </div>

        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            fontFamily: "system-ui, sans-serif",
            color: COLORS.accent3,
            textAlign: "center",
            marginTop: 30,
            opacity: line3Opacity,
            transform: `translateY(${line3Y}px)`,
          }}
        >
          right now.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
