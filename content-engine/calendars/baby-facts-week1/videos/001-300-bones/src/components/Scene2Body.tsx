import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene2Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fact cards that slide in sequentially
  const facts = [
    { number: "300", label: "bones at birth", color: COLORS.accent },
    { number: "206", label: "bones as adults", color: COLORS.accent3 },
    { number: "94", label: "bones fuse together", color: COLORS.accent2 },
  ];

  // "Soft spots" text reveal
  const softSpotsOpacity = interpolate(frame, [200, 220], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const softSpotsY = interpolate(frame, [200, 220], [40, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // "Birth canal" text reveal
  const birthOpacity = interpolate(frame, [320, 340], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const birthY = interpolate(frame, [320, 340], [40, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #1A0A2E 0%, #0D0620 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        gap: 40,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 48,
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          color: COLORS.text,
          textAlign: "center",
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          marginBottom: 20,
        }}
      >
        THE NUMBERS
      </div>

      {/* Fact cards */}
      {facts.map((fact, i) => {
        const delay = 20 + i * 50;
        const progress = spring({
          frame: frame - delay,
          fps,
          config: { damping: 12, stiffness: 120 },
        });
        const x = interpolate(progress, [0, 1], [i % 2 === 0 ? -200 : 200, 0]);
        const opacity = interpolate(progress, [0, 1], [0, 1]);

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              transform: `translateX(${x}px)`,
              opacity,
              backgroundColor: `${fact.color}15`,
              border: `2px solid ${fact.color}40`,
              borderRadius: 24,
              padding: "24px 40px",
              width: 700,
            }}
          >
            <div
              style={{
                fontSize: 90,
                fontWeight: 900,
                fontFamily: "system-ui, sans-serif",
                color: fact.color,
                minWidth: 200,
                textAlign: "center",
              }}
            >
              {fact.number}
            </div>
            <div
              style={{
                fontSize: 40,
                fontWeight: 600,
                fontFamily: "system-ui, sans-serif",
                color: COLORS.text,
              }}
            >
              {fact.label}
            </div>
          </div>
        );
      })}

      {/* Soft spots explanation */}
      <div
        style={{
          fontSize: 38,
          fontWeight: 600,
          fontFamily: "system-ui, sans-serif",
          color: COLORS.accent,
          textAlign: "center",
          opacity: softSpotsOpacity,
          transform: `translateY(${softSpotsY}px)`,
          marginTop: 30,
          lineHeight: 1.4,
          padding: "0 40px",
        }}
      >
        Those soft spots on their head?
        <br />
        <span style={{ color: COLORS.muted, fontSize: 34 }}>
          Skull bones that haven't fused yet
        </span>
      </div>

      {/* Birth canal reveal */}
      <div
        style={{
          fontSize: 36,
          fontWeight: 600,
          fontFamily: "system-ui, sans-serif",
          color: COLORS.accent3,
          textAlign: "center",
          opacity: birthOpacity,
          transform: `translateY(${birthY}px)`,
          lineHeight: 1.4,
        }}
      >
        It's what lets them fit through
        <br />
        the birth canal
      </div>
    </AbsoluteFill>
  );
};
