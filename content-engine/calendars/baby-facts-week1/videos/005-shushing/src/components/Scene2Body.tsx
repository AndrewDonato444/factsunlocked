import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene2Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sound comparison items
  const sounds = [
    { label: "Normal conversation", db: "60 dB", width: 40, color: COLORS.accent3 },
    { label: "Vacuum cleaner", db: "75 dB", width: 55, color: COLORS.accent },
    { label: "Inside the womb", db: "80-90 dB", width: 75, color: COLORS.accent2 },
  ];

  // "Shushing mimics" reveal
  const mimicOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // "Blood flow" reveal
  const bloodOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // "White noise" reveal
  const whiteNoiseOpacity = interpolate(frame, [400, 420], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const whiteNoiseY = interpolate(frame, [400, 420], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, #0D0620 0%, #1A0A2E 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      {/* Shushing explanation */}
      <div style={{ fontSize: 42, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", opacity: mimicOpacity, marginBottom: 10 }}>
        "Shhhh" isn't random
      </div>
      <div style={{ fontSize: 34, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", opacity: bloodOpacity, marginBottom: 50, lineHeight: 1.4 }}>
        It mimics the whooshing
        <br />
        of blood flow in the womb
      </div>

      {/* Sound level comparison */}
      <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.muted, textAlign: "center", marginBottom: 30, opacity: interpolate(frame, [140, 160], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }) }}>
        SOUND LEVELS
      </div>

      {sounds.map((sound, i) => {
        const delay = 170 + i * 50;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 120 } });
        const barWidth = interpolate(progress, [0, 1], [0, sound.width]);
        const opacity = interpolate(progress, [0, 1], [0, 1]);

        return (
          <div key={i} style={{ marginBottom: 24, opacity, width: 800 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: 30, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.text }}>{sound.label}</div>
              <div style={{ fontSize: 30, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: sound.color }}>{sound.db}</div>
            </div>
            <div style={{ width: "100%", height: 24, backgroundColor: `${sound.color}20`, borderRadius: 12 }}>
              <div style={{ width: `${barWidth}%`, height: "100%", backgroundColor: sound.color, borderRadius: 12, boxShadow: `0 0 15px ${sound.color}60` }} />
            </div>
          </div>
        );
      })}

      {/* White noise machine */}
      <div style={{ fontSize: 36, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.accent3, textAlign: "center", opacity: whiteNoiseOpacity, transform: `translateY(${whiteNoiseY}px)`, marginTop: 40, lineHeight: 1.4 }}>
        That's why white noise
        <br />
        <span style={{ color: COLORS.text, fontWeight: 800 }}>works so well</span>
      </div>
    </AbsoluteFill>
  );
};
