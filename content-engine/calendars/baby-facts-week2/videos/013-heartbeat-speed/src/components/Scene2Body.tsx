import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";
import { SceneBackgroundImage } from "./SceneBackgroundImage";

export const Scene2Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const facts = [
    { label: "Baby BPM", detail: "120–160 beats/min", color: COLORS.accent },
    { label: "Adult BPM", detail: "60–100 beats/min", color: COLORS.accent2 },
    { label: "Heart size", detail: "A walnut", color: COLORS.accent3 },
  ];

  const whyOpacity = interpolate(frame, [200, 220], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const whyY = interpolate(frame, [200, 220], [40, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const slowsOpacity = interpolate(frame, [300, 320], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const slowsY = interpolate(frame, [300, 320], [40, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill>
      <SceneBackgroundImage
        sceneName="bg-scene-2"
        fallbackGradient="linear-gradient(180deg, #0D0B1A 0%, #060412 100%)"
        scrimOpacity={0.55}
      />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
          gap: 35,
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            fontFamily: "system-ui, sans-serif",
            color: COLORS.text,
            textAlign: "center",
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            marginBottom: 10,
          }}
        >
          THE NUMBERS
        </div>

        {facts.map((fact, i) => {
          const delay = 25 + i * 55;
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
                backgroundColor: `${fact.color}15`,
                border: `2px solid ${fact.color}40`,
                borderRadius: 24,
                padding: "20px 36px",
                width: 700,
              }}
            >
              <div style={{ fontSize: 34, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: fact.color, minWidth: 200 }}>
                {fact.label}
              </div>
              <div style={{ fontSize: 34, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.text }}>
                {fact.detail}
              </div>
            </div>
          );
        })}

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
            lineHeight: 1.4,
            padding: "0 40px",
          }}
        >
          A tiny heart has to work harder
          <br />
          <span style={{ color: COLORS.muted, fontSize: 32 }}>
            to pump blood through their growing body
          </span>
        </div>

        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            fontFamily: "system-ui, sans-serif",
            color: COLORS.accent2,
            textAlign: "center",
            opacity: slowsOpacity,
            transform: `translateY(${slowsY}px)`,
            lineHeight: 1.4,
          }}
        >
          It gradually slows down
          <br />
          to adult speed by age 10
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
