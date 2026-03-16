import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene2Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Facts
  const facts = [
    { text: "Hearing develops at 18 weeks in the womb", color: COLORS.accent },
    { text: "Your voice is the loudest sound they hear", color: COLORS.accent2 },
    { text: "They prefer mom's voice over any stranger", color: COLORS.accent3 },
  ];

  const studyOpacity = interpolate(frame, [300, 320], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const studyY = interpolate(frame, [300, 320], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Heart rate visual
  const heartBeat = Math.sin(frame * 0.3) * 0.08;
  const heartOpacity = interpolate(frame, [200, 220], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, #0D0620 0%, #1A0A2E 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60 }}>
      <div style={{ fontSize: 42, fontWeight: 800, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", opacity: titleOpacity, marginBottom: 50 }}>
        9 months of listening
      </div>

      {facts.map((fact, i) => {
        const delay = 30 + i * 70;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 120 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const x = interpolate(progress, [0, 1], [i % 2 === 0 ? -200 : 200, 0]);

        return (
          <div key={i} style={{ marginBottom: 30, opacity, transform: `translateX(${x}px)`, backgroundColor: `${fact.color}15`, border: `2px solid ${fact.color}40`, borderRadius: 24, padding: "28px 40px", width: 850 }}>
            <div style={{ fontSize: 34, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: fact.color, textAlign: "center" }}>{fact.text}</div>
          </div>
        );
      })}

      {/* Heart rate indicator */}
      <div style={{ opacity: heartOpacity, marginTop: 40, textAlign: "center" }}>
        <div style={{ fontSize: 60, transform: `scale(${1 + heartBeat})` }}>💓</div>
        <div style={{ fontSize: 30, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.muted, marginTop: 10 }}>Their heart rate changes</div>
        <div style={{ fontSize: 30, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, marginTop: 4 }}>when they hear mom's voice</div>
      </div>

      <div style={{ fontSize: 36, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.accent3, textAlign: "center", opacity: studyOpacity, transform: `translateY(${studyY}px)`, marginTop: 40, lineHeight: 1.4 }}>
        You were their favorite sound
        <br />
        <span style={{ color: COLORS.text, fontWeight: 800 }}>before they were even born</span>
      </div>
    </AbsoluteFill>
  );
};
