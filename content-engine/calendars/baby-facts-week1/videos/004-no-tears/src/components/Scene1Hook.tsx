import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../lib/constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 6, stiffness: 300, mass: 0.5 } });
  const titleOpacity = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // "FAKE" stamp animation
  const stampScale = spring({ frame: frame - 25, fps, config: { damping: 5, stiffness: 400, mass: 0.4 } });
  const stampOpacity = interpolate(frame, [25, 30], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const stampRotation = interpolate(frame, [25, 35], [-15, -8], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Literally text
  const litOpacity = interpolate(frame, [55, 70], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Tear drops floating
  const tearY1 = interpolate(frame, [0, 120], [600, 1400], { extrapolateRight: "clamp" });
  const tearY2 = interpolate(frame, [10, 130], [500, 1300], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, #1a1535, ${COLORS.background})`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 60, overflow: "hidden" }}>
      {/* Floating tear drops */}
      <div style={{ position: "absolute", left: 200, top: tearY1, fontSize: 60, opacity: 0.15 }}>💧</div>
      <div style={{ position: "absolute", right: 250, top: tearY2, fontSize: 50, opacity: 0.12 }}>💧</div>
      <div style={{ position: "absolute", left: 700, top: tearY1 - 200, fontSize: 40, opacity: 0.1 }}>💧</div>

      <div style={{ fontSize: 50, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: COLORS.muted, textAlign: "center", transform: `scale(${titleScale})`, opacity: titleOpacity, letterSpacing: 3 }}>YOUR NEWBORN'S</div>

      <div style={{ fontSize: 100, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.text, textAlign: "center", transform: `scale(${titleScale})`, opacity: titleOpacity, marginTop: 10 }}>TEARS</div>

      {/* FAKE stamp */}
      <div style={{ fontSize: 120, fontWeight: 900, fontFamily: "system-ui, sans-serif", color: COLORS.accent2, textAlign: "center", transform: `scale(${stampScale}) rotate(${stampRotation}deg)`, opacity: stampOpacity, border: `6px solid ${COLORS.accent2}`, borderRadius: 16, padding: "10px 40px", marginTop: 30, textShadow: `0 0 30px ${COLORS.accent2}60` }}>FAKE</div>

      {/* Literally */}
      <div style={{ fontSize: 40, fontWeight: 600, fontFamily: "system-ui, sans-serif", color: COLORS.accent, textAlign: "center", marginTop: 40, opacity: litOpacity }}>Like, literally.</div>
    </AbsoluteFill>
  );
};
