import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

let imageManifest: Record<string, { file: string }> = {};
try {
  imageManifest = require("../../public/images/manifest.json");
} catch {
  // No manifest — all scenes will use fallback backgrounds
}

interface SceneBackgroundImageProps {
  sceneName: string;
  fallbackGradient: string;
  scrimOpacity?: number;
  kenBurnsScale?: number;
}

export const SceneBackgroundImage: React.FC<SceneBackgroundImageProps> = ({
  sceneName,
  fallbackGradient,
  scrimOpacity = 0.5,
  kenBurnsScale = 1.15,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const hasImage = sceneName in imageManifest;
  const scale = interpolate(frame, [0, durationInFrames], [1, kenBurnsScale], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <>
      <AbsoluteFill style={{ background: fallbackGradient }} />
      {hasImage && (
        <AbsoluteFill style={{ overflow: "hidden" }}>
          <Img
            src={staticFile(imageManifest[sceneName].file)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
          />
        </AbsoluteFill>
      )}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,${scrimOpacity * 0.4}) 0%, rgba(0,0,0,${scrimOpacity}) 100%)`,
        }}
      />
    </>
  );
};
