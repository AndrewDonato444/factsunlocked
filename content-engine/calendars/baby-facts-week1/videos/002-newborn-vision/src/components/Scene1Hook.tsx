import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 6, stiffness: 300, mass: 0.5 } });
  const titleOpacity = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Blur circle that represents blurry vision
  const blurSize = interpolate(frame, [0, 60], [800, 300], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const blurOpacity = interpolate(frame, [0, 30], [0.4, 0.2], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // "on purpose" reveal
  const purposeOpacity = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const purposeY = interpolate(frame, [50, 65], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Distance indicator
  const distOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, #1a1535, ${COLORS.background})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Blurry vision circle */}
      <div
        style={{
          position: "absolute",
          width: blurSize,
          height: blurSize,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent3}30 0%, transparent 70%)`,
          opacity: blurOpacity,
          filter: "blur(40px)",
        }}
      />

      {/* YOUR NEWBORN */}
      <div style={{ fontSize: 56, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.muted, textAlign: "center", transform: `scale(${titleScale})`, opacity: titleOpacity, letterSpacing: 3 }}>
        YOUR NEWBORN IS
      </div>

      {/* BASICALLY BLIND */}
      <div style={{ fontSize: 90, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", transform: `scale(${titleScale})`, opacity: titleOpacity, marginTop: 10, textShadow: `0 0 30px ${COLORS.accent2}60` }}>
        BASICALLY BLIND
      </div>

      {/* And it's on purpose */}
      <div style={{ fontSize: 48, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", marginTop: 50, opacity: purposeOpacity, transform: `translateY(${purposeY}px)` }}>
        And it's on purpose.
      </div>

      {/* 8-12 inches indicator */}
      <div style={{ position: "absolute", bottom: 300, fontSize: 36, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent3, textAlign: "center", opacity: distOpacity }}>
        8-12 inches of clarity
      </div>
    </AbsoluteFill>
  );
};
