import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene2Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stomach size comparison cards
  const sizes = [
    { day: "Day 1", size: "Cherry", emoji: "🍒", volume: "5-7 mL", color: COLORS.accent2 },
    { day: "Day 3", size: "Walnut", emoji: "🥜", volume: "22-27 mL", color: COLORS.accent },
    { day: "Week 1", size: "Apricot", emoji: "🍑", volume: "45-60 mL", color: COLORS.accent3 },
    { day: "Month 1", size: "Egg", emoji: "🥚", volume: "80-150 mL", color: COLORS.accent2 },
  ];

  // "That's why" text reveal
  const whyOpacity = interpolate(frame, [280, 300], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const whyY = interpolate(frame, [280, 300], [40, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #1A0A2E 0%, #0D0620 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        gap: 30,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 46,
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          color: COLORS.text,
          textAlign: "center",
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          marginBottom: 20,
        }}
      >
        HOW IT GROWS
      </div>

      {/* Size comparison cards */}
      {sizes.map((item, i) => {
        const delay = 15 + i * 55;
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
              gap: 24,
              transform: `translateX(${x}px)`,
              opacity,
              backgroundColor: `${item.color}15`,
              border: `2px solid ${item.color}40`,
              borderRadius: 24,
              padding: "20px 36px",
              width: 750,
            }}
          >
            <div style={{ fontSize: 64, minWidth: 80, textAlign: "center" }}>
              {item.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  fontFamily: "system-ui, sans-serif",
                  color: item.color,
                }}
              >
                {item.day}
              </div>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 600,
                  fontFamily: "system-ui, sans-serif",
                  color: COLORS.text,
                }}
              >
                {item.size} — {item.volume}
              </div>
            </div>
          </div>
        );
      })}

      {/* That's why explanation */}
      <div
        style={{
          fontSize: 36,
          fontWeight: 600,
          fontFamily: "system-ui, sans-serif",
          color: COLORS.accent,
          textAlign: "center",
          opacity: whyOpacity,
          transform: `translateY(${whyY}px)`,
          marginTop: 20,
          lineHeight: 1.5,
          padding: "0 40px",
        }}
      >
        That's why they eat so often
        <br />
        <span style={{ color: COLORS.muted, fontSize: 32 }}>
          tiny tank, big appetite
        </span>
      </div>
    </AbsoluteFill>
  );
};
